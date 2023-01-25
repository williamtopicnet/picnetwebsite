---
title: "Review of Keras (Deep Learning) Core Layers"
slug: "review-of-keras-deep-learning-core-layers"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1463356800000"
date: "2016-05-16"
categories: 
  - "software-engineering"
---

## Introduction:

This is the first part in a planned series of posts which aims to explore the core layers in the [Keras](http://keras.io/) source code. These posts aim to take practical / a non-theoretical approach whereby we use code samples to demonstrate real usages of the Keras layers being investigated.

## Debug

All the code in this post requires the following imports and debug functions:

<pre>from keras.layers.core import *
from keras import backend as K
<div></div>
def call_f(inp, method, input_data):
  f = K.function([inp], [method])
  return f([input_data])[0]
<div></div>
def print_out(layer, input_data, train=True):
  if hasattr(layer, 'previous'):
    print call_f(layer.previous.input,
        layer.get_output(train=train), input_data)
  else:
    print call_f(layer.input, layer.get_output(train=train), input_data)</pre>



## Masking

The masking layer sets output values to 0 when the entire last dimension of the input is equal to the mask\_value (default value 0). This layers expects a 3 dimensional input tensor with the shape: (samples, timesteps, features).

For example let’s call a Masking layer with a 3D tensor with two rows of data:

<pre>print_out(Masking(mask_value=1), [[[1, 1, 0], [1, 1, 1]]])
# [[[ 1. 1. 0.], [ 0. 0. 0.]]]</pre>

Notice how only the last row gets masked as this was the only row with its entire content matching the mask\_value of 1.

Masking is the simplest implementation of MaskedLayer, which is the abstract base class which Masking layers can implement to inherit some boiler plate code. The Masking layer itself can also be extended to support more advanced masking. For instance let’s create a masking layer that masks value above a certain value.

<pre>class CustomMasking(Masking):   
  def get_output_mask(self, train=False):
    X = self.get_input(train)
    return K.any(K.ones_like(X) * (1. -
      K.equal(K.minimum(X, self.mask_value), 
        self.mask_value)), axis=-1)
<div></div>
  def get_output(self, train=False):
    X = self.get_input(train)
    return X * K.any((1. - K.equal(
      K.minimum(X, self.mask_value), 
        self.mask_value)), axis=-1, keepdims=True)
<div></div>
print_out(CustomMasking(mask_value=5), 
  [[[3, 4, 5], [5, 6, 7], [5, 5, 5]]])
# [[[ 3. 4. 5.], [ 0. 0. 0.], [ 0. 0. 0.]]]</pre>

 

## Dropout

Dropout layers are used to reduce overfitting by randomly turning off inputs. It is important to note that Dropout only occurs during training. During the test phase we do not turn off inputs. It is also very important to note that output values propagated forward (i.e. not turned off) must increase in value to compensate for the nodes being turned off. This means that the output value of the layer is the same with or without dropout. The following simple example shows this a little bit more intuitively:

<pre>print_out(Dropout(.3), [1, 2, 3, 4, 5])
# [0,0,0,5.71428585,7.14285755]</pre>

So with 30% dropout we see that 3 output nodes were turned off (set to 0). To compensate for the output value of the layer all the other values were increased accordingly (probabilistically so they may not exactly match the output).

To tune dropout layers [Hinton suggests](http://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf) training without dropout until a good layer settings are found. Then slowly increase dropout until optimal validation score is found after the layer.

## Activation

An activation function is a function that produces the layer output values by applying an arbitrary function to the input values of the layer. This function should have a useful derivative as this is used during the optimisation (backward) step of training. There are many standard activation functions used in NN a great visual summary of these common activation functions can be found at the bottom of the [Activation Function Wikipedia page](https://en.wikipedia.org/wiki/Activation_function). Partially reproduced here for convenience:

 

The activation function specified in this layer is applied to each input element individually (element wise) so input data dimensions can be arbitrary.

<pre>print_out(Activation('tanh'), [.5, 1, 2, 3])
# [0.46211714,0.76159418,0.96402758,0.99505478]
print_out(Activation('softplus'), [.5, 1, 2, 3])
# [ 0.97407699  1.31326163  2.12692809  3.04858732]
print_out(Activation('relu'), [-2, -1, 0, 1, 2])
# [ 0. 0. 0. 1. 2.]
print_out(Activation('sigmoid'), [.5, 1, 2, 3])
# [ 0.62245935  0.7310586   0.88079709  0.95257413]
print_out(Activation('hard_sigmoid'), [.5, 1, 2, 3])
# [ 0.60000002  0.69999999  0.89999998  1. ]
print_out(Activation('linear'), [.5, 1, 2, 3])
# [ 0.5  1. 2. 3. ] – no weights set</pre>

 

## Reshape

The reshape layer reshapes input to a new shape. The number of dimensions however must remain the same.

<pre>print_out(Reshape(dims=(2,-1)), [[1, 2, 3, 4, 5, 6]])
# [[[ 1. 2. 3.], [ 4. 5. 6.]]]
print_out(Reshape(dims=(3,-1)), [[1, 2, 3, 4, 5, 6]])
# [[[ 1. 2.],[ 3. 4.],[ 5. 6.]]]</pre>

 

## Permute

To permute dimensions of a tensor means rearranging the dimensions. So let’s say we wanted to pivot a matrix we would do something like:

<pre>print_out(Permute(dims=(2,1)), [[[1, 2, 3],[4, 5, 6]]])
# [[[ 1. 4.], [ 2. 5.], [ 3. 6.]]]</pre>

 

## Flatten

Flattens rows of a 3D matrix:

<pre>print_out(Flatten(), [[[1, 2, 3],[4, 5, 6]]])
# [[ 1. 2. 3. 4. 5. 6.]]</pre>



## RepeatVector

Copies a 2D input matrix into a 3D matrix n times.

<pre>print_out(RepeatVector(2), [[1, 2, 3]])
# [[[ 1. 2. 3.], [ 1. 2. 3.]]]</pre>

 

## Dense

A dense layer is a standard fully connected NN layer, let’s start with some sample source code:

<pre>d = Dense(3, init='uniform', activation='linear', input_dim=3)
d.set_weights([np.array([[.1, .2, .5], [.1, .2, .5], [.1, .2, .5]]), 
  np.array([0, 0, 0])])
print_out(d, [[10, 20, 30]])
# [[  6. 12. 30.]]</pre>

 

We see that the input \[10,20,30\] got converted to \[6, 12,30\] using a linear activation layer and the weights \[.1, .2, .5\] for each input row. So taking the last output node which all weights are 0.5 we get the output (30) by calculating: 10\*.5 + 20\*.5 + 30\*.5. This can be visualised as follows:

Where orange, blue and green arrows are weights of 10%, 20% and 50% respectively.

## TimeDistributedDense

A very similar layer to the standard Dense layer with the exception that we are now working with an additional time dimension. So the input and output are in the shape: (nb\_sample, time\_dimension, input\_dim). So reproducing the Dense example we get the following:

<pre>d = TimeDistributedDense(3, init='uniform', 
  activation='linear', input_dim=3)
d.set_weights([np.array([[.1, .2, .5], [.1, .2, .5], 
  [.1, .2, .5]]), np.array([0, 0, 0])])
print_out(d, [[[10, 20, 30]]])
# [[[  6. 12. 30.]]]</pre>

 

## Merge

Merges the output of multiple layers. This is used when a Graph model needs to recombine branches into a single trunk. Or when multiple models need to be combined into one. The following strategies are supported: sum, mul, concat, ave, dot.

No concise code example could be produced.

 

## TimeDistributedMerge

Converts a 3D TimeDistributed layer output into a 2D output with time steps merged using one of the following strategies: sum, mul, ave.

<pre>print_out(TimeDistributedMerge(mode='sum'), [[[1, 2, 3], [1, 2, 3]]])
# [[ 2. 4. 6.]]
print_out(TimeDistributedMerge(mode='mul'), [[[1, 2, 3], [1, 2, 3]]])
# [[ 1. 4. 9.]]
print_out(TimeDistributedMerge(mode='ave'), [[[1, 2, 3], [1, 2, 3]]])
# [[ 1. 2. 3.]]</pre>

 

## ActivityRegularization

ActivityRegularization is simply a wrapper around keras. Regularizers.ActivityRegularizer which applies regularisation to a loss function. We will briefly explore this here as regularization will be the subject of another post in the near future.

<pre>r = ActivityRegularizer(l1=.01)
r.layer = Layer()
r.layer.input = np.array([1, 2, 3, 4, 5])
K.eval(r(0.))
# array(0.029999999329447746)
<div></div>
r = ActivityRegularizer(l2=.01)
r.layer = Layer()
r.layer.input = np.array([1, 2, 3, 4, 5])
K.eval(r(0.))
# array(0.1099999975413084)
<div></div>
r = ActivityRegularizer(l1=.01, l2=.01)
r.layer = Layer()
r.layer.input = np.array([1, 2, 3, 4, 5])
K.eval(r(0.))
# array(0.13999999687075615)</pre>

 

## AutoEncoder

An Auto Encoder is an unsupervised neural net that aims to produce data that is similar to the input data. This allows the net to learn features about the data and regularisation parameters without using labels. This means the output of the last layer is the same size as the input of the first input layer. Scoring becomes simple as the row in the input can be used to measure similarity of the produced output.

The Aautoencoder has 2 logical parts, the encoder which is the layers of the net that creates a hidden representation of the input data. And the decoder which is the layers of the net that takes the produced representation from the encoder and creates the output which should match the input data to the encoder. A benefit of using Auto Encoders is that if the hidden representation of the data is smaller than the input data then we have basically compressed the data (dimensionality reduction).

No concise and descriptive code sample possible.

## Lambda

Creates a layer that performs an python arbitrary function over the layer’s input data:

<pre>print_out(Lambda(lambda x: x*x), [1, 2, 3])
# [ 1. 4. 9.]</pre>



## Siamese

A Siamese layer is very similar to a Merge layer with one difference. That is; a Siamese layer can merge output from multiple layers in a net and not just joining branches.
