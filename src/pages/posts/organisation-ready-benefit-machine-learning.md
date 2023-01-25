---
title: "When is an Organisation Ready to Benefit from Machine Learning"
slug: "organisation-ready-benefit-machine-learning"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1520467200000"
date: "2018-03-08"
categories: 
  - "software-engineering"
---

I am told quite frequently that an organisation is not “mature” enough for machine learning. By this, managers usually mean one of the following things items are not at a level deemed adequate:

- The data warehousing infrastructure
- The data sophistication of users
- The consolidation of multiple data sources
- The long-term data and analytics strategy

 

This falls back into the very common trap with managers thinking that machine learning projects should be treated similarly to traditional analytics and business intelligence projects.

I would encourage you to read “[How to Work with Machine Learning](https://picnet.com.au/blogs/guido/post/2018/03/05/work-machine-learning/)” to get a better understanding as to how I think machine learning projects should be approached. With this approach in mind the above hurdles are not as significant as many people think.

Let’s take a simple example to explain. Let’s assume a Health organisation wants to minimise the number of missed appointments by patients. This could be because this is a critical service and missed patients are in danger or it could simply be for cost reasons to the organisation.

Once the strategic decision is made, in this case to reduce the number of missed appointments by patients. We can then try to tackle this as a machine learning project. This approach would look something like this:

- Phrase this strategy question in a more machine learning friendly way; for instance:
    - With what accuracy, can we predict if a patient will miss their appointment
    - Can we give a patient a risk score where the higher the score the more likely they are to miss an appointment?
- Select one of these approaches, I think the second is slightly better as we can then rank patients in order of risk and focus our efforts on the highest risk patients.
- Think of company information that can be used to help solve this problem (notice I said information not data warehouse or database, etc). This could be:
    - The history of all appointments
    - The payments processed for all appointments
    - Patient information
- We then try to get this information for appropriate sources in as simple a manner as possible. This might mean:
    - Getting an Excel report from the CRM system
    - Getting and Excel report from the Accounting system
- We then use this to build our initial dataset, usually in the form of a simple CSV file. In this case, we would have a list of appointments with an extra column that shows if the appointment was missed (from the accounting system, i.e. missed appointments will not have a payment against them). In some cases, this “merge” with 2 datasets is fuzzy, i.e. there is no ID to match on, we perhaps just match on the name of the patient and date of the appointment. Again, at this stage we are keeping infrastructure to a bare minimum and not thinking about data warehouses.
- We then try simple models to predict this target column (missed appointment) and iteratively make the models more complex until we are satisfied with our accuracy
- This iteration process can also consider more data sources and other factors
- Once we have this accuracy we can then make the business decisions as to whether or not to proceed or not.

This whole process takes anywhere from 4 to 8 weeks (guide only) and after this period we know what data sources we need, what kind of accuracy we are likely to achieve or at the very least what additional information we need to collect to try again in a few months.

Proceeding from this stage (moving to production) usually means getting IT involved in formalising the data sources, considering model training / retraining schedules, integration to other systems (to give alerts, reports, emails, etc). This is a somewhat larger project that should only be undertaken if the proof of concept shows that the benefits are worth the expense.
