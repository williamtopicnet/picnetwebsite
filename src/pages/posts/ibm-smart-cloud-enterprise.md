---
title: "IBM Smart Cloud Enterprise"
slug: "ibm-smart-cloud-enterprise"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "david-booth"
mils: "1341273600000"
date: "2012-07-03"
categories: 
  - "it-support"
---

It has been over a year since IBM launched its public cloud Infrastructure as a Service (IaaS) – [Smart Cloud Enterprise (SCE)](http://www-935.ibm.com/services/us/en/cloud-enterprise/) and over three months since PicNet moved its external facing applications to SCE. From this, I would like to share with you some of my thoughts on the experience.

### The Service

[<img src="/images/jul2012_ibmsce.jpg" width=274 height=220  >](https://picnet.com.au/blogs/david/files/2012/07/jul2012_ibmsce.jpg)

IBM SCE is an Infrastructure as a Service public cloud offering and a direct competitor to Amazon’s AWS EC2 service. At the most basic level, the service delivers virtual machines hosted in 1 of 6 IBM SCE data centres located around the globe (US East Coast, US West Coast, Canada, Japan, Singapore and Germany). In addition, there are additional optional add on services to provide persistent storage (i.e. a virtual SAN), machine image storage, virtual private cloud, self-managed firewall and managed VPN. To assist users in getting started quickly, IBM has also provided a number of publicly available pre-built VM images for operating systems ([Windows Server 2003 & 2008](http://www.microsoft.com/en-us/server-cloud/windows-server/default.aspx), [RedHat Enterprise Linux](http://www.redhat.com/products/enterprise-linux/), [Suse Linux Enterprise Server](http://www.suse.com/products/server/)) and Server Applications (COGNOS, Websphere, Lotus Domino, DB2 etc).

IBM is marketing SCE as a cost effective way for organisations to host test and development environments that are not business critical, however with the recent upgrade of their guaranteed service up time SLA to 99.9% and from practice, I would say the hosting of non bandwidth intensive production systems is viable on SCE. Web based applications, web sites and DR infrastructure would be prime candidates.

Technical support is provided at three levels – standard, premium and advance premium, with the latter two incurring additional charges for access to telephone and email support and advance premium the addition of ticket escalation SLAs while standard support is free via a support forum. In practice, we usually received a response to questions posted on the standard support forums within a 12 to 24 hour period, however for more critical systems, upgrading to premium or advance premium is recommended to provide you with the added security of having someone to call up and hassle should your require urgent support.

All active servers and services are charged to the nearest number of hours and billed on a monthly basis. Costs start as low as $0.25/hour for a BYO license Linux VM, $0.27/hour for a license inclusive SUSE Linux VM and $0.34/hour for a license inclusive Windows Server 2008 R2 VM.

### Using SCE

<img src="/images/ibmsce-controlpanel.jpg" width=304 height=301  >

Once your account has been setup, it is a relatively straightforward to log into the SCE portal via your IBM ID and password. From the SCE portal, you have access to the:

- SCE control panel which provide you with the tools to your VM instances, images and persistence storage.
- Account administration where you can manage the account profile, generate reports and manage users access to the SCE portal.
- Support portal which provide access to video tutorials, documentation and the standard support forum.

<img src="/images/ibmsce-addinstance.jpg" width=304 height=314  >

Provisioning a VM is quite a simple process of

1. Clicking on the “Add instance” button on the control panel
2. Selecting the data centre you want the VM instance to reside and the base VM image to apply to the VM instance
3. Configuring the instance name, VM size, network, IP and setting up a default username and password.

Once submitted the VM can take from 30 minutes to an hour to provision and once completed, you will be able to Remote Desktop to the VM via its IP.

While VM provisioning is a breeze, our experience with server imaging (taking snapshots) has been a little hit and miss with the imaging process failing even after following the proper process. The current process of taking images of Windows Server for SCE is a little convoluted especially if those Windows servers are joined to a domain. Also, SCE requires servers to be shutdown whilst being imaged, which limits the number of times images can be taken over a given period if the servers were in a production environment. We have been told that in the upcoming release of version 2.1 of SCE, the Windows Server imaging will process will be streamlined to make it easier, faster and more reliable.

We found the network performance of SCE to be quite good. With server hosted at the Singapore datacentre, average latency was between 140 to 145 milliseconds. IBM quotes a (unguaranteed) Internet bandwidth of 100Mb from their SCE data centres. Our real world tests gave us an average download/upload speed of around 70/95 megabits, which I believe should be sufficient for all but the most bandwidth intensive applications.

### Advantages and Cautions

From our experience, public cloud IaaS has several advantage compared to more traditional in house or colocation hosting services. These include:

- Lower cost of ownership. We have found hosting in IBM SCE is 20% to 25% cheaper when that compared to traditional approaches. Also the flexibility of only paying for what you use means no longer are you saddled with the cost of paying for equipment that sits idle, on the assumption that it “may be needed in the near future”.
- Ease and speed of “hardware” provisioning. Gone are the days of waiting up to 2 week to provision a new server. With IBM SCE a new server can be provisioned in less than 4 hours. Conversely, machines can be decommissioned in a fast and effective manner, reducing cost when they are no longer required.
- Reduction in time spent managing and dealing with hardware related problems. We no longer have to worry about server hardware failure.

All of this has allowed us to be more productive by taking away from us the hassle in dealing with low level issues of hardware, purchasing and provisioning and tackle higher level issues that are more about brining value to the organisation.

However even IBM would readily admit that “the cloud” is not a suitable solution for the hosting of certain types of systems and services - specifically those systems that that are business critical, network bandwidth hungry and/or latency intolerant. On its website, IBM provides some [examples](http://www-935.ibm.com/services/us/en/cloud-enterprise/uses-development-and-test.html) of applications that it believes organisations can host on SCE. This is by no means an exhaustive list, but it does provide some guidelines for potential users of the system.

### Conclusion

In conclusion, we found that overall IBM SCE was a relatively simple and easy service to use and manage. Provisioning is straight forward, there is ample documentation and support is adequate to provide peace of mind for the hosting of non-business critical applications. Network performance from is good; however we would like to see IBM open a local SCE datacentre to further reduce latency. The only major gripe we would have is the cumbersome process required to take server images. Given that the product has only been in the market for a bit over a year, it has matured quite quickly and will become a major player in the public IaaS space in the next year or two. If you are interested in exploring what IBM SmartCloud Enterprise can do for you I would suggest that you [contact](https://picnet.com.au/ContactUsGeneral.aspx) PicNet to help you setup an IBM SCE account.

Below are some links that may be helpful for those that want to do some more investigation themselves:

- [IBM SCE Cost Estimator](http://www-935.ibm.com/services/us/igs/cloud-development/estimator/Tool.htm?cfg=us-en)
- [Videos of example applications suitable for hosting on IBM SCE](http://www-935.ibm.com/services/us/en/cloud-enterprise/uses-development-and-test.html)
- [PicNet Enterprise Cloud Powered by IBM SCE – Managed cloud services from PicNet](https://picnet.com.au/enterprise-cloud.html)
