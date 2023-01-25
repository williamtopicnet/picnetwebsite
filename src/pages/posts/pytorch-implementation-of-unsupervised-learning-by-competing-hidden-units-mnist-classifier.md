---
title: "PyTorch Implementation of “Unsupervised learning by competing hidden units” MNIST classifier"
slug: "pytorch-implementation-of-unsupervised-learning-by-competing-hidden-units-mnist-classifier"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1557014400000"
date: "2019-05-05"
categories: 
  - "machine-learning"
  - "software-engineering"
---

I recently watched [this lecture](https://www.youtube.com/watch?v=4lY-oAY0aQU) by Dmitry Krotov and found it very interesting so I thought it would make a good paper to try to reproduce. My original thoughts were that this could potentially solve the adversarial vulnerability inherent in most modern convolutional networks. This blog post are the details of this reproduction and some basic experiments into its adversarial robustness.

**Super High Level Summary of Paper**

This technique uses an unsupervised technique to learn the underlying structure of the image data. This unsupervised process generates weights that show which areas are positively and negatively correlated with a certain type of image. When comparing these weights with traditional convolutional generated weights they appear to be much more “natural” in appearance. See example from [the paper](https://www.pnas.org/content/116/16/7723).

<img src="/images/1.png" width=696 height=300  >

It’s important to reiterate that these weights are generated in a completely unsupervised manner hence my original suspicion that classifiers built on top of these weights would be resistant to adversarial attacks.

These unsupervised weights can then be used in a classifier/regressor get predictions based on input images. These predictions are comparable to accuracies achieved using traditional convolutional networks trained with SGD.

**Unsupervised Weights**

The authors provided a [numpy implementation](https://github.com/DimaKrotov/Biological_Learning/blob/master/Unsupervised_learning_algorithm_MNIST.ipynb) of the unsupervised process. I took this and converted it to PyTorch to allow for GPU parallelisation.

<pre>def get_unsupervised_weights(X, n_hidden, n_epochs, batch_size, 
        learning_rate=2e-2, precision=1e-30, anti_hebbian_learning_strength=0.4, lebesgue_norm=2.0, rank=2):
    sample_sz = X.shape[1]    
    weights = torch.rand((n_hidden, sample_sz), dtype=torch.float).cuda()    
    for epoch in range(n_epochs):    
        eps = learning_rate * (1 - epoch / n_epochs)        
        shuffled_epoch_data = X[torch.randperm(X.shape[0]),:]
        for i in range(X.shape[0] // batch_size):
            mini_batch = shuffled_epoch_data[i*batch_size:(i+1)*batch_size,:].cuda()            
            mini_batch = torch.transpose(mini_batch, 0, 1)            
            sign = torch.sign(weights)            
            W = sign * torch.abs(weights) ** (lebesgue_norm - 1)        
            tot_input=torch.mm(W, mini_batch)            
            
            y = torch.argsort(tot_input, dim=0)            
            yl = torch.zeros((n_hidden, batch_size), dtype = torch.float).cuda()
            yl[y[n_hidden-1,:], torch.arange(batch_size)] = 1.0
            yl[y[n_hidden-rank], torch.arange(batch_size)] =- anti_hebbian_learning_strength            
                    
            xx = torch.sum(yl * tot_input,1)            
            xx = xx.unsqueeze(1)                    
            xx = xx.repeat(1, sample_sz)                            
            ds = torch.mm(yl, torch.transpose(mini_batch, 0, 1)) - xx * weights            
            
            nc = torch.max(torch.abs(ds))            
            if nc &lt; precision: nc = precision            
            weights += eps*(ds/nc)
    return weights
</pre>

I used this method to generate the weights for the MNIST dataset using 200 unsupervised epochs with no data augmentation.

**Supervised Classification**

The interesting part of the paper was using these unsupervised weights to generate classifications. This is done by implementing this formula from the paper.

<img src="/images/2.png" width=394 height=299  >

And this loss function:

<img src="/images/3.png" width=465 height=111  >

These are implemented below:

<pre>class BioClassifier(nn.Module):
    # Wᵤᵢ is the unsupervised pretrained weight matrix of shape: (n_filters, img_sz)
    def __init__(self, Wᵤᵢ, out_features, n=4.5, β=.01):
        super().__init__()
        self.Wᵤᵢ = Wᵤᵢ.transpose(0, 1) # (img_sz, n_filters)
        self.n = n
        self.β = β
        self.Sₐᵤ = nn.Linear(Wᵤᵢ.size(0), out_features, bias=False)
        
    def forward(self, vᵢ): # vᵢ: (batch_sz, img_sz)
        Wᵤᵢvᵢ = torch.matmul(vᵢ, self.Wᵤᵢ)
        hᵤ = F.relu(Wᵤᵢvᵢ) ** self.n
        Sₐᵤhᵤ = self.Sₐᵤ(hᵤ)
        cₐ = torch.tanh(self.β * Sₐᵤhᵤ)
        return cₐ
<div></div>
class BioLoss(nn.Module):
    def __init__(self, out_features, m=6):
        super().__init__()
        self.out_features = out_features
        self.m = m
<div></div>
    def forward(self, cₐ, tₐ): 
        tₐ_ohe = torch.eye(self.out_features, dtype=torch.float, device='cuda')[tₐ]
        tₐ_ohe[tₐ_ohe==0] = -1.
        loss = (cₐ - tₐ_ohe).abs() ** self.m
        return loss.sum()
</pre>

This classifier gets reasonable results at around .97 accuracy, which is not near state of the art but I also did not do all the hyperparameter optimisations described in the paper. This accuracy was enough for me to test adversarial robustness.

**Adversarial Robustness**

My initial interest in this paper was because of the possibility of this method giving some sort of natural defence against adversarial attacks. Looking at the generated weights, they look so “natural” that I felt there was real potential that these would act as a filter to the adversarial perturbations generated by modern attack methods. I created a simple experiment. I started with a very simple Convolutional Net to act as a control:

<pre>class SimpleConvNet(nn.Module):
    def __init__(self, out_features):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 10, kernel_size=5)
        self.conv2 = nn.Conv2d(10, 20, kernel_size=5)
        self.conv2_drop = nn.Dropout2d()
        self.fc1 = nn.Linear(320, 50)
        self.fc2 = nn.Linear(50, out_features)
<div></div>
    def forward(self, x):
        x = x.view(len(x), 1, 28, 28)
        x = F.relu(F.max_pool2d(self.conv1(x), 2))
        x = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))
        x = x.view(-1, 320)
        x = F.relu(self.fc1(x))
        x = F.dropout(x, training=self.training)
        x = self.fc2(x)
        return F.log_softmax(x, dim=-1)
</pre>

I then used the adversarial example on the [PyTorch tutorials site](https://pytorch.org/tutorials/beginner/fgsm_tutorial.html) to test these two models. The results were unfortunate. Seems like this biological model was much more susceptible to adversarial attacks:<img src="/images/4.png" width=325 height=326  >

We see here as the amount of perturbations (Epsilon) increases the accuracy drops for both models. However, the Biological model’s accuracy drops significantly faster. However, we do see that while the convolutional net eventually reaches below random accuracy (10%) the biological net does resist this a little more, plateauing at around 28% accuracy.

**Conclusion**

The conclusion is that a lot more experimentation is required before ruling out whether this could be an effective way of increasing the tolerance to adversarial attacks. My experiment was very basic and was mainly aimed at implementing a very interesting paper I found rather than proving the theory.

My thanks to Dmitry Krotov for this help in getting the implementation finally working and for his great work in this unique domain.

Source Code: [https://github.com/gatapia/unsupervised\_bio\_classifier](https://github.com/gatapia/unsupervised_bio_classifier)
