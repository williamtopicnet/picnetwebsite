---
title: "Vowpal Wabbit for Windows and Binary for Win x64"
slug: "vowpal-wabbit-for-windows-and-binary-for-win-x64"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1415836800000"
date: "2014-11-13"
categories: 
  - "software-engineering"
---

Getting VW working on windows is a real pain. Even though I had the whole environment set up as [described on the readme](https://github.com/JohnLangford/vowpal_wabbit/blob/master/README.windows.txt) it still took me a good couple of hours to build.

So with absolutely no guarantee or support options here is my built version of [vw.exe version 7.7.0](https://github.com/gatapia/py_ml_utils/blob/master/lib/vw.exe). This was built on a Windows 7 x64 box and I have only tested on this one box so use at your own risk!!

_If you were after the executable only then there is no need to continue reading, the rest is about python._

So I started playing around with VW.exe and quickly realised that the command line is a terrible place to experiment on a machine learning algorithm. So I started looking for python wrappers and found [this](https://github.com/josephreisinger/vowpal_porpoise). Which is a nice wrapper but it does not work on Windows. So I hacked it up a little (with no permission, sorry Joseph Reisinger) and have a [windows friendly version with updated command line options here](https://github.com/gatapia/py_ml_utils/blob/master/VowpalWabbit.py).

So how do you use the python wrapper?

First we need to convert your data into VW input format I use my [pandas extensions helper](https://github.com/gatapia/py_ml_utils/blob/master/pandas_extensions.py) method: **\_df\_to\_vw**

You will be able to turn this into a generic converter very easily, infact there are already plenty around such as:

[https://github.com/zygmuntz/phraug2](https://github.com/zygmuntz/phraug2)

So now you have your files converted, let’s use the classifier:

<pre># where files open file streams to the VW file
training_lines = training_vw_file.readlines()
testing_lines = testing_vw_file.readlines()
VowpalWabbitClassifier().fit(training_lines).\
  predict(testing_lines)
</pre>



The VowpalWabbitClassifier is fully scikit-learn compatible so use it in your cross validations, grid searches, etc with ease. And just have a [look at the code](https://github.com/gatapia/py_ml_utils/blob/master/VowpalWabbit.py) to see all the options it supports and if there are missing options please fork and submit back to me.
