---
title: "Diminishing Returns in Machine Learning Projects"
slug: "diminishing-returns-machine-learning-projects"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1523577600000"
date: "2018-04-13"
categories: 
  - "software-engineering"
---

Any machine learning practitioner will tell you that there is a certain point in time where trying to eke out more performance/accuracy from a project seems like more effort than its worth. At [PicNet](https://picnet.com.au) we always suggest customers run a 4-6-week proof of concept to get an idea of the potential accuracy for their project. This figure of 3-5 weeks just came about from our own experience and this bothered me a little, so I decided to try to empirically define what a good period for a machine learning proof of project should be.

I used the [Meta Kaggle](https://www.kaggle.com/kaggle/meta-kaggle) data set which is made up of 85,970 competitors/teams in 253 competitions. This data is also spread across different type of projects like classification, regression, image recognition, natural language processing, etc. This gives us a broad sample of real projects.

If we limit the data to teams that had at least 50 submissions over a 50-day span, we get 2,701 teams across 94 competitions. We can then use this data to visualize the diminishing returns over a period of 50 days.

**Note:** To compare different evaluation metrics across different projects we scale all teams scores from 0-1. Where 1 is the team’s best score for a competition.

<img src="/images/im11.gif" width=412 height=282  > Here we can clearly see the rewards curve flatten out which gives us our diminishing returns. But what is the optimal proof of concept project duration? At what point, do we get the most bang for our buck understanding that there is still room for improvement post-POC.

I used a simple metric to calculate this, which is the average reward (max score / average days participated) and found the intercept with the curve above.

<img src="/images/im12.gif" width=407 height=279  >Here we see that the average reward slope intersects our diminishing rewards chart at around the 24-25-day mark. Which means that this is a good heuristic for determining a good POC duration. This also tells us that if we wanted to squeeze the last 10% improvement out of our project we we need to almost double the investment in time.

**Caveats:**

Please note that Kaggle projects are not the same as professional/enterprise projects for instance:

- Kaggle projects have the data available immediately
- Kaggle projects have relatively clean data when compared to enterprise data
- Kaggle projects have a clearly defined problem, target and metric
- Kaggle participants have proven to be extremely competent when comparing results against academic results (i.e. they pretty much destroy any previous academic best by a large margin)
- This dataset stopped being updated in 2016. I wonder if the explosion in Deep Learning submissions since then has changed these assumptions.

Please consider these points as they will increase the time for a successful POC.

**Source:** Source for this analysis is available [here](https://gist.github.com/gatapia/eb841639416b1b8db81d8b4e2df896ca).
