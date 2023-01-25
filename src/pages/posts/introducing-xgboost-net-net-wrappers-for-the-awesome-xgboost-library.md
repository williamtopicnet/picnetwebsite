---
title: "Introducing XGBoost.Net - .Net wrappers for the awesome XGBoost library"
slug: "introducing-xgboost-net-net-wrappers-for-the-awesome-xgboost-library"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1480982400000"
date: "2016-12-06"
categories: 
  - "software-engineering"
---

**Introducing [XGBoost.Net](https://github.com/PicNet/XGBoost.Net) - .Net wrappers for the awesome [XGBoost](https://github.com/dmlc/xgboost) library**

[<img src="/images/xgboost.png" width=333 height=128  >](https://picnet.com.au/blogs/guido/files/2016/12/xgboost.png)

XGBoost is a big part of our [Machine Learning and Predictive Analytics](https://picnet.com.au/predictive-analytics/) toolkit here at [PicNet](https://picnet.com.au/). We use it almost heavily for our proof of concept and prototype work and it is always present in ensembles for production systems. We usually host our python models on a Linux server and communicate with other back-end systems using [RabbitMQ](https://www.rabbitmq.com/). However, this architecture is very often too big and cumbersome for simple systems and given the fact that .Net and Python integration is terrible we decided to build our own .Net wrappers to XGBoost.

**Note:** Currently this package only supports x64 bit applications.

I will be writing a tutorial soon to show how to use this but in the meantime this short set of instructions should be enough to get you going.

- Create a .Net project
- Install the package from [NuGet](https://www.nuget.org/packages/PicNet.XGBoost/) by opening the NuGet Package Manager Console and use the following command:
    - 

<pre>Install-Package PicNet. XGBoost</pre>


- Use it in your class:
    - Add the using statement: using XGBoost;
    - Create either a XGBClassifier or XGBRegressor
    - Train using the Fit method which takes two parameters:
        - Training data, which is a 2D float array (n\_rows & n\_columns)
        - Training labels which is a float array (n\_rows)
    - Predict using:
        - Predict: For regression and classification
        - PredictProba: Probabilities for classification

The train and predict (Fit / Predict / Predict Proba) methods are heavily inspired by the sklearn API. So please [read this](http://scikit-learn.org/stable/tutorial/statistical_inference/supervised_learning.html) to get a better idea of how these work.

The following code is an example of using this package in a Unit Test:

<pre>using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using XGBoost;
<div></div>
namespace TestXGBoost
{
  [TestClass] public class XGBoostTests
  {
    [TestMethod] public void TestXGBClassifierPredictProba()
    {
      var xgb = new XGBClassifier();
      var X = new[] {
        new[] {1f, 2f, 3f, 4f, 5f},
        new[] {1f, 2f, 3f, 4f, 5f}
      };
      var y = new[] {.5f, .5f};
      xgb.Fit(X, y);
      var h = xgb.PredictProba(X);
      CollectionAssert.AreEqual(y, h[0]);
    }
  }
}
<div></div>

</pre>


