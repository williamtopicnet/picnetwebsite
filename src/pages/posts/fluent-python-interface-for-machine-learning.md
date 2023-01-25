---
title: "Fluent python interface for Machine Learning"
slug: "fluent-python-interface-for-machine-learning"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1410220800000"
date: "2014-09-09"
categories: 
  - "machine-learning"
tags: 
  - "machine-learning"
  - "pandas"
  - "predictive-analytics"
  - "python"
  - "scikit-learn"
---

I often say that Machine Learning is like programming in the 60s, you prepare your program, double check everything, hand in your punch cards to the IBM operator, go home and wait. And just like back then, if you had a bug in your code it would mean a huge amount of wasted time. Sometimes these things cannot be helped, for instance; it is not uncommon to leave a feature selection wrapper running over the weekend only to find on Monday morning that you got an out of memory error sometime during the weekend. This article explains one way to reduce these errors and make your code less buggy.

## Less code = less bugs

This is the only truth in software development. A bug free system is only possible if it also contains no code. So we should always aim to reduce the amount of code needed. How??

- Use tried and tested libraries
- Write reusable code and test this code enough to have confidence that it works
- Only use this reusable code
- Whenever possible test your new code
- Write expressive code. Make logical bugs obvious.

## Libraries

All libraries are full of bugs, again code=bugs so this is of no fault of the library. However, if a library has lots of users you can be fairly certain that most bugs you will have been found and hopefully fixed. If you are pushing the boundaries of the library you will inevitably also find bugs but this is not the general case. Usually, a well-respected library should be reasonably safe to use and to trust.

## Reusable Code

Most libraries you use are generic, meaning that they can be used in many contexts. Depending on your job you will need something more specific. So write it, wrap your libraries in an abstraction that is specific to what you do. Do this and then TEST IT!!! Every time you find a use-case that your abstraction does not support, write it and test it. Use scikit-learns dummy datasets to create reproducible test cases that will guarantee a certain feature works for your given use case.

Try to always maintain this abstraction separate from any specific predictive project and ensure that it is project agnostic.

## Fluent interfaces for ML

This article focuses on using your reusable code wisely aiming to minimize bugs and enhance the expressiveness of the code.

Expressiveness is a key to writing logically correct code. If you want all rows with a date **greater than** the start of this year it is much easier to catch a logical bug in this code:

<pre>filtered = filter(data, greater_than_start_of_this_year)</pre>

Instead of this code:

<pre>filtered = filter(data, lambda row: row.date_created &gt;=
  date(date.today().year(), 1, 1))</pre>

Whilst the ‘greater\_than\_start\_of\_this\_year’ function has the same functionality as the lambda expression in the second example it differs in several important ways:

- It is easily tested: It is a separate function totally isolated from the context it is running in, this makes testability much easier.
- It is much, MUCH easier to read and review (it is more expressive).

This expressiveness is sometimes described as ‘declarative’ where the non-expressive form is sometimes called ‘imperative’. You should always strive to write declarative code as it is easier to read.

One of the best ways, I have found to write declarative code is to use fluent interfaces. These interfaces were popularized by jQuery and then by .Net Linq expressions and others. A sample fluent jQuery snippet is:

<pre>$("#divid")
    .addClass("classname")
    .css("color", "blue")
    .append("Some new text");</pre>

It’s funny but this ‘fluent’ style of programming was slammed in the late 90s as error prone, Marin Fowler identified ‘Message Chains’ as a code smell that should be remedied however, I have found totally the opposite effect. Fluent programming interfaces are easier to read, this means less bugs.

How can this be applied to machine learning? Easy, have a look at the following code:

<pre># load training data
classifier = linear_model.LogisticRegression()
X, y = load_train_X_and_y(6e6)
<div></div>
# replace missing values with the mode for
#   categoricals and 0 for continous features
X = X.missing('mode', 0)
<div></div>
# split the training set into categoricals and
# numericals features
X_categoricals = X[X.categoricals()]
X_numericals = X[X.numericals()]
<div></div>
# do some feature engineering (add log and linear combinations
# for all numericals features). Scale the numerical dataset and
# append one hot encoded categorical features to this dataset.
# Then cross validate using LogisticRegression classifier and
# 1 million samples.
X_numericals.\
  engineer('lg()').\
  engineer('mult()').\
  scale().\
  append_right(X_categoricals.one_hot_encode()).\
  cross_validate(classifier, 1e6)</pre>

The comments in the above code are totally redundant, the code pretty much documents itself; see:

<pre>classifier = linear_model.LogisticRegression()
X, y = load_train_X_and_y(6e6)
X = X.missing('mode', 0)
<div></div>
X_categoricals = X[X.categoricals()]
X_numericals = X[X.numericals()]
<div></div>
X_numericals.\
  engineer('lg()').\
  engineer('mult()').\
  scale().\
  append_right(X_categoricals.one_hot_encode()).\
  cross_validate(classifier, 1e6)</pre>

I would then add a comment at the end of this code block, something like:

<pre># 0.98 +/- 0.001 – took 2.5 minutes</pre>

Then commit this experiment to git.

The fact that I can trust my reusable code means I just have to review the code I write here and given the expressiveness of the code finding bugs is usually very straight forward.

After several experiments this is what a source file will look like. See how easy the code is to read. See how simple it is to review past experiments and think about what works and does not work.

<pre>classifier = linear_model.LogisticRegression()
X, y = load_train_X_and_y(6e6)
X = X.missing('mode', 0)
<div></div>
X.\
  engineer('lg()').\
  engineer('mult()').\
  scale().\
  one_hot_encode().\
  cross_validate(classifier, 1e6)
# 0.92 +/-0.0002  
<div></div>
X.\
  engineer('lg()').\
  scale().\
  one_hot_encode().\
  cross_validate(classifier, 1e6)
# 0.90 +/-0.001  
<div></div>
X.\
  engineer('lg()').\
  scale().\
  one_hot_encode().\
  cross_validate(classifier, 1e6)
# 0.86 +/-0.003</pre>

My wrapper for pandas and scikit-learn is available [here](https://github.com/gatapia/py_ml_utils/blob/master/pandas_extensions.py) and depends on naming conventions described [here](https://picnet.com.au/blogs/guido/post/2014/08/26/naming-conventions-in-predictive-analytics-and-machine-learning/). But I encourage you to write your own. You need confidence in your code and the only way to achieve that is to write it and test it yourself to your own level of comfort.
