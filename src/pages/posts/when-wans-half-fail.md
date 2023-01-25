---
title: "When WANs “half fail”"
slug: "when-wans-half-fail"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "david-booth"
mils: "1417737600000"
date: "2014-12-05"
categories: 
  - "it-infrastructure"
  - "networks"
tags: 
  - "it-support"
  - "wan-performance"
---

Have your Internet or WAN links ever performed below the advertised specifications, but because of a lack of evidence and/or performance statistics, you were unable to prove it? Well, we recently faced such an issue and I would like to share with you how the issue was eventually resolved and what we learnt along the way.

Firstly, let me provide some context. At a large global enterprise with a vertically integrated IT team structure, PicNet provides level 2 system and project management support to their Australian offices. In effect, what this entails is the management and day-to-day administration of all local IT infrastructures. However, due to the vertically integrated nature of the IT team, management of the Wide Area Network links was the responsibility of the global Networks team based in their (overseas) head office, with the local IT team responsible for doing local “hands-on” support, communication and co-ordination of the business.

For some time, we had been suspecting that there was something not quite right with the WAN links in one of the local offices, however, the problem only appeared to be intermittent and followed no discernible pattern. Our investigations were hampered, as we had no access to real time or daily traffic bandwidth usage reports, which the global network support team collected. The issue was brought to a head when a new application was rolled out and increased the use of the link’s upload bandwidth usage by 10%. With the activation of this new service, the performance of applications, such as email, became unacceptable, which was a blessing in disguise, as we were now certain that the WAN connection for this office was not performing as intended and we had justification to raise the criticality of the issue and request access to the link’s daily utilisation reports.

Once we had access to these reports, we could see that during office hours the upload channel of the link would quickly ramp up to 20% and then stay there for the rest of the working day. This was a clear pointer that there were obvious problems with the connection’s upload channel which were causing serious performance issues with applications once the 20% performance threshold had been reached. The issue was finally escalated to the WAN provider. After several days of back and forwards between the WAN provider and the local Telco, eventually, the root cause of the issue was identified as a misconfiguration of a switch that connected the WAN provider’s router to the local Telco provider’s router, which caused severe packet loss.

In all, the local business suffered 10 days of continuous network disruptions and cripplingly slow WAN and Internet access speeds. During this time, the affected office had to deal with emails taking hours to send and constant disconnections to the mail server, poor telephone (VoIP) call quality, inability to access network files located in other offices on top of general Internet performance issues.

Some takeaways from this particular episode were: 1. Provide access to monitoring and reporting tools to your front line IT engineers and analysts. The whole scenario could have been avoided if the local IT staff had access to daily bandwidth usage reports, ensuring a swift identification of the problem when the upload channel plateaued at 20% utilisation.

2\. Trust your frontline engineers to provide you with accurate feedback and take their feedback seriously. It is all very well to have a team responsible for the management of your network at an enterprise level, however, often they are far too busy to micro manage every aspect of the network in far-flung remote locations. Also, an automated monitoring tool will not provide overt alerts to many issues and only careful analysis of the monitoring data will reveal these issues. This is where point 1 is important as this allows front line engineers to research their suspicions and provide proof to your enterprise teams of problems and issues that are often not immediately apparent.

3\. Never feel reluctant to raise and escalate an issue with your network service providers at the earliest opportunity. Even if you are not exactly sure what is wrong, you can always ask, “can you have a look? – Something doesn’t seem to be right”. This is especially true for managed WAN services involving multiple parties. Don’t forget, you are the customer, when you say “jump” your provider should say “how high?”.

4\. If you have the luxury of having a backup connection available to you, make sure you have a documented process as to when and how the backup link should be activated in the event of severe degradation (but not failure) of the primary link.

With the increasing use of cloud based services and application, WAN and Internet links are more important than ever to the day-to-day operations of an organisation. Degradation or failure of such links can have a major impact on businesses, therefore it is imperative that you have the systems, processes and the right people in place to make sure that your network links are operating to the limits of their capacity with the appropriate backups in place.

PicNet has been providing IT support, IT infrastructure management and IT consultation services for over 12 years and we have the expertise to put such systems and processes in place. [Contact us](https://picnet.com.au/business-it-support/) for a 60 minutes obligation free consultation on any network or general IT concerns you may have.
