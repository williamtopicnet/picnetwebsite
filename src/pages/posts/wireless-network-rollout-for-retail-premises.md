---
title: "Wireless Network Rollout for Retail Premises"
slug: "wireless-network-rollout-for-retail-premises"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "david-booth"
mils: "1406073600000"
date: "2014-07-23"
categories: 
  - "it-infrastructure"
  - "wireless-networking"
tags: 
  - "aruba"
  - "wifi"
  - "wireless"
  - "wlan"
---

In the past 9 months we have been involved in a project to roll out Wireless network infrastructure to a large retail chain. I thought I would share some of the technical aspects of the project to help anyone that may be contemplating doing something similar.

We were approached by our customer to select a WLAN solution to be rolled out to their stores and to provide them with an indication of the hardware (type and number) required for such a solution to be implemented.

The first step was to find potential vendors of WLA solutions that we could partner with during the requirement analysis and the implementation phases of the project. As this would be a large rollout to a major retail, we felt that a best in class solution was required. Therefore we contacted Aruba and CISCO both identified by Gartner as “leaders” in the Wired and Wireless LAN Infrastructure Magic Quadrant, and sought out their interest in assisting us in finding the right solution for our customer and providing us with test / demo equipment to conduct some wireless site surveys to ascertain the effectiveness of the Wireless Hardware.

[Aruba Networks](http://www.arubanetworks.com/), through their distributors [Distribution Central](http://www.distributioncentral.com/) were the quickest to respond and most willing to partner with PicNet to find the right solution. Aruba had already supplied WLAN solutions to several large retail organisations and over the course of several discussions with Aruba and our customer, Aruba were able to recommend the wireless hardware and provide technical pre-sales support on the configuration and deployment of the Wireless Access Points.

Aruba recommended their [RAP-109](http://cloud.arubanetworks.com/products/instant-108-109) Access Points, which included the following features:

- Desk or wall mounting
- Dual band
- Dual radio
- Simultaneous Spectrum Analysis and Client Service
- Automatic channel and power adjustments
- Built in virtual controller
- Sticky client handling for seamless roaming of clients through multiple access points

The second major step of the project was to conduct extensive Wireless Surveys of a representative selection of our customer’s stores. We were provided with the floor plans of several stores of varying sizes and configurations for us to plan our site surveys. To conduct the site surveys we used the following tools:

- [Metageek inSSIDer Office](http://www.inssider.com/inssider/) with a 2.4Ghz spectrum analyser to:

- Take sample signal strength measurements at static locations in each store
- Measure the amount of radio inference from other devices in the 2.4Ghz spectrum
- Determine the best WiFi channel for each location

- [Ekahau Heatmapper](http://www.ekahau.com/wifidesign/ekahau-heatmapper) to produce graphical heat maps for WiFi signal coverage.
- 2 x Aruba RAP-109 access points.

From the site surveys we found that for the majority of the stores, one access point would be sufficient to provide coverage for the store, however we estimated that for about 10 to 30 percent of the stores that were considerably larger and/or had long or irregular footprints, two access points may be required depending on the location of the first access point. In addition the normal rules with regards to WAP placement apply i.e. place them as high as possible away from interference of electronic equipment that are generally placed lower down. In a retail store this normally includes POS computers / cash registers, barcode scanners, product shelving that are lit with lights etc.

<img src="/images/Heatmap2-300x203.jpg" width=300 height=203  >

The second outcome of the site survey was that signal interference from other WLAN network were quite severe for those stores in large shopping centres. Therefore the automatic signal analysis and channel adjustment feature of the Aruba RAP-109 would prove to be very useful.

Thirdly, we found that in most stores, the patch boards, switches and communication racks of many of the stores were very messy and/or hard to access. This was useful information for us to more accurately estimate the amount of time required to roll out the WLAN network to each store.

Lastly the site survey allowed us to confirm our initial hypothesis that using desk mounts for the access point would be the best option. The stores were very busy and in terms of design, layout and build, there were not too many commonalities from store to store, therefore it would have been near impossible to design and implement a process to mount the Access Points on the roof or walls with limited time and budget available. This confirmed to us that the RAP-109 was the best Access Point option from Aruba.

The customer required WLAN to be rolled out to around 100 of their stores nationwide within a time frame of 6 weeks from the first store to the last store (following a set schedule determined by the customer). In addition we were required to conduct a site survey and produce a heat map at each store once we have installed the wireless access point to provide evidence that the wireless signal was adequate at each store. Furthermore, our engineers were also required to several other tasks for this project that were not directly related, but integral to the success of the project for our customer.

The timeframe of the rollout present a challenge as it would mean we would need to complete slightly over 3 stores per day. To achieve this target with the number of available engineers for the project, we needed to minimise the amount of time each engineer had to spend configuring the access point(s) at each store. Therefore we pre-configured all of the access points with the base configuration that was common for each store, prior to the roll out. By doing this, we were able to limit the time spend with device setup and configuration to less than 20 minutes once the engineer go onsite. In addition detailed step-by-step processes were developed and documented to streamline the roll out activities that needed to be carried out at each site. We estimated that it would take between 90 to 120 minutes to complete the roll out at each store, thus, depending on the travel time between stores, each should be able to complete between 2 to 3 stores a day.

During the rollout itself, our engineers came across a number of situations which required them to “think on their feet”. However because we had well documented processes and procedures in place, they had extra time to deal with these issues and still complete the roll outs on schedule.

Therefore the three main takeaways from this experience was:

1. Develop a good relationship with a responsive distributor and solution vendor.
2. Make sure you do a thorough site survey(s) to determine the suitability of the proposed solution and to look for any potential implementation issues.
3. Have a well-documented implementation process and procedures for your engineers to follow, so they can concentrate on overcoming any “exceptions” they come across.

For more information on the Project Management and logistics of the project, my colleague Andres Pinar has an excellent blog post [here](https://picnet.com.au/blogs/marco/post/2014/07/22/project-management-for-a-wifi-rollout/).

For more information on the business requirements of the project and how PicNet help our customer, check out the case study [here](https://picnet.com.au/downloads/Clients-CaseStudy-PicNet-TWM.pdf).
