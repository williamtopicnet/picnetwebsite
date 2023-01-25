---
title: "Naming Conventions in Predictive Analytics and Machine Learning"
slug: "naming-conventions-in-predictive-analytics-and-machine-learning"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1409011200000"
date: "2014-08-26"
categories: 
  - "software-engineering"
---

In this article I am going to discuss the importance of naming conventions in ML projects. What do I mean by naming conventions? I mainly mean using descriptive ways of labelling features in a data set. What is the reason for this? Speed of experimentation.

**Naming Conventions**

- Categorical columns start with ‘c\_’
- Continuous (numerical) columns start with ‘n\_’
- Binary columns start with ‘b\_’
- Date columns start with ‘d\_’

**Examples of Benefits**

Once your datasets is labelled clearly with these conventions then experimenting with features becomes very fast.

<pre>cv = functools.partial(do_cv, LogisticRegression(), n_folds=10, n_samples=10000)
cv(one_hot_encode(X), y) # One hot encode all categorical features
cv(contrasts(X), y) # Do simple contrast coding on all categorical features
cv(bin(X, n_bins=100), y) # Split all continuous features into 100 bins</pre>



<pre>X = engineer(X, ‘c_1(:)c_2’) # Create a new categorical feature that is a combination of 2 other
X = engineer(X, ‘n_1(*)n_2’) # Create a combination of 2 numericals (by multiplication)
X = engineer(X, ‘n_1(lg)’) # Create a log of feature ‘n_1’
X = engineer(X, ‘(^2)’) # Create a square feature for each numerical feature
X = engineer(X, ‘(lg)’) # Create a log feature for each numerical feature</pre>

In a real world example this would look something like:

<pre>X = remove(X, dates=True)
for n1, n2 in combinations(X, group_size=2, numericals=True): X = engineer(X, n1 + ‘(*)’ + n2)
for c1, c2 in combinations(X, group_size=2, categoricals=True): X = engineer(X, c1 + ‘(:)’ + c2)
X = engineer(X, ‘(^2)’)
X = engineer(X, ‘(lg)’)
cv(X, y)</pre>

**Summary**

The resulting [DSL](http://en.wikipedia.org/wiki/Domain-specific_language) from using good naming convention leads to very clear code that relates directly to the data munging operations being done. Another benefit is that but once your ‘one\_hot\_encode’ method is written and tested you can trust it for future projects (as long as they use the same naming conventions).
