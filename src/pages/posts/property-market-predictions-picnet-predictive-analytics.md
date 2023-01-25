---
title: "Property Market Predictions - PicNet Predictive Analytics"
slug: "property-market-predictions-picnet-predictive-analytics"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1415145600000"
date: "2014-11-05"
categories: 
  - "software-engineering"
---

This post explores options for the application Machine Learning techniques to the Australian residential property market with the objective of predicting insights that would be useful for buyers, sellers and the industry. With access to good data it is possible to predict sale/auction prices by home, street, suburb, municipality, etc. We could also predict number of registered bidders at auctions or parties through on open days.

## Data Availability

The success of a Predictive Analytics and Machine Learning project depends totally on the data available and its applicability to the problem at hand. A careful analysis of available data is required before any work can begin in this space. But some potential data sources that could be brought together for a predictive model include:

- RPData: RPData contains ownership, property features, land size, sales history information. This data is generally considered to be of decent quality and can be relied on
- Real estate marketing strategy used in a property campaign will greatly affect the outcome of a sale/auction. However, access to this data will be difficult and may need to be omitted. Perhaps 2 models could be built, one with all participating real estates (that are providing this data) another where this data is unknown.
- Area demographics information available from census data will also affect predictions.
- Commercial properties in the area will also affect the outcome of a property campaign. This effect can be both positive and negative depending on the type of commercial (i.e. café vs factory) and quantity. RPData has some of this data but the quality of this may not be great. Local councils have commercial property data but this will be very hard to access. The best source for this data may simply be ABN registration details which is not good quality (many ABNs do not have a corresponding business) but it may serve the purpose of showing volumes and type of businesses registered in the area.
- Domain.com.au/Realestate.com.au web traffic logs: Interest in a property can be measured by analysing the web traffic activity for a property on property websites. Details such as number of visits, time on page, bounce rates, etc. could provide real insight into the volume and sentiment of potential buyers.
- Weather forecasts: The impact of the weather on open houses, auctions, etc. could be real and this data should also be included in any predictive model.
- Crime statistics available through various government web properties such as abs.gov.au and data.nsw.gov.au. This data should also be included in the predictive model.
- School location and performance data available from myschool.edu.au should be included as local school can affect property prices.
- Public transport location and frequency in the area also affects property prices. This data is available from various public transport online properties.
- Exchange rates and global economic statistics will also affect property prices. The state of the economy in our local region especially in China and South East Asia will affect prices in certain property markets in Australia. Exchange rates data is easily available; data for each relevant country may need to be sourced on a country by country basis.
- The state of the local economy will also affect property prices. This data can be sourced from the RBA web site and perhaps other sources.
- Social media could be a source of sentiment data showing shortage of property in an area, interest in properties in an area and general sentiment for an area. Social media data could also show movements in and out of an area. This data can be bought from Facebook and gnip.com.
- Number of registered bidders, parties at open houses: Real estates have this information which could be very valuable in many predictions. However access to this data could be hard to access.
- Google Trends. A great tool to analyse interest in a suburb, property, etc.

Given the wealth of data available in this space I believe that a very accurate predictive model can be built.

 

## Possible Predictive Models

### Sales/Auction Price

The holy grail of property market prediction is “how much will it go for?” Whilst a general trend can be identified the sale amount at the end of the day will depend on who is there on the day and how much they want the property. However, average figures for an area will be highly predictable as volume eventually overrides the confounding noise of an individual’s effect on a sale/auction.

### Auction Day Bidders

If it is possible to get past number of registered bidders from real estate agencies then predicting future number of bidders would also be highly accurate. This could also be applied in the prediction of number of people at open houses.

### Area Predictions

More general predictions at the street/suburb/municipality level would also be possible. Once data begins to be aggregated like this, predictions are generally much more accurate but they offcourse lose their granularity which may devalue the prediction.

 

## Proof of Concept

A potential project to gauge the effectiveness of a predictive model would be something like this:

### Find the current benchmark

Find current property predictors and use their accuracy as a benchmark. These benchmarks will be used to compare the accuracy of this project to what is currently available. From my initial research these predictions are usually very general (suburb, city, state, level) or they are of low accuracy

### Initial data

Depending on the interested stakeholders and their access to good data this step could range from easy to very difficult. Whatever access to data we get at this step could mean the success or failure of the proof of concept.

### P.O.C. implementation

Implement a simple model with the current available data and make predictions for the next period. These predictions will be used to measure against existing benchmarks.

### Iteratively add more data

If the proof of concept shows that we have the potential to make real and accurate property market predictions then we can start investing in getting more data. Talking to real estate web property owners, real estates, councils, etc. We would then add each new data source to the model measuring its impact on the prediction accuracy.

## Potential Business Opportunities

Once the model is proven and hard numbers can back its predictive power several business could be developed that would take advantage of this information:

### Real Estates

Real Estates are always looking for accurate ways to predict the price of their properties. This system could supplement their trained agents in predicting property prices and developing appropriate marketing campaigns.

### Investors/Home Buyers

A service for the public to accurately predict the price of a residential home would be invaluable to the individual. This service however could have a negative feedback to the model driving people from or to properties.

### Marketeers

If marketing strategies can be compared in effectiveness using these models then marketeers can use this data to charge for advertising space knowing and being able to prove effectiveness.

### Insurers

Insurance companies would be very interested in volumes of sales, price of assets, etc.

### Banks

Predicting loan volumes and areas of potential growth for their loans would be very valuable for banks. This would help plan future loan amounts and marketing opportunities.

### Builders

Demand planning for a future period would be dramatically improved with access to accurate predictions for a given sales period.

### Small Business Owners

Many small businesses offer services to new home owners in an area. These businesses could use future volume predictions for demand planning and marketing campaign planning and they could also use value predictions to identify customers in the correct financial demographics for their services.

## PicNet and Predictive Analytics

PicNet is ideally positioned to work with partners on this and many other Predictive Analytics projects having both the skills and tools required to build these sophisticated data environments and predictive models. Guido Tapia, PicNet’s manager of Software and Data has 20 years of Software and Machine Learning experience which increases the chances of success dramatically.

If you are interested in Machine Learning or anything else mentioned in this article please feel free to contact Guido Tapia directly.
