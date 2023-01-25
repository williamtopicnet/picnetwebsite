---
title: "Riverbed Performance Optimizations - Beyond the default Configuration"
slug: "riverbed-performance-optimizations-beyond-the-default-configuration"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "david-booth"
mils: "1266537600000"
date: "2010-02-19"
categories: 
  - "it-support"
---

[<img src="/images/riverbed-logo.jpg" width=220 height=63  >](https://picnet.com.au/blogs/david/files/2010/02/riverbed-logo.jpg)

After working with the Riverbed Steelhead Appliances for a number of years now I thought I would share some of the additional performance tweaks you can make beyond the out the box configuration without the need to contact Riverbed Technical Support. Some of the tweaks here require that you have the latest version of the Steelhead Operating System RiOS 6.0 which was released at the end of 2009. For those who have never heard of Riverbed they are the current market leader in WAN optimization products.

[PicNet](https://picnet.com.au "PicNet IT Services") is a reseller of all Riverbed Products and Services.

### 1\. Enable High Speed TCP (Configure -> Optimization -> Performance)

This is useful if you have a high bandwidth link with relatively high latency. To know whether you need to enable high speed TCP you need to calculate if your Bandwidth Delay Product (BDP) is greater than 256KB. To do this calculation:

BDP (in Kb) = 2 x Bandwidth (in bits per sec) x delay (in ms) / 8 (bits per byte)

### 2\. Selecting a Data Store Segment Replacement Policy (Configure -> Optimization -> Performance)

You have two options here for the data store policy either First-In, First-Out (FIFO) or Least Recently Used (LRU). All Steelhead Appliances prior to RiOS 6.0 had the default storage policy of FIFO but in RiOS 6.0 they have changed the default to LRU. Once you perform a RiOS upgrade to 6.0 your storage policy will change to LRU. This is a smart move in my opinion as it will allow for potentially more data reduction.

### 3\. Optimizing the Data Store for High-Throughput Environments (Configure -> Optimization -> Performance)

This setting may come in handy if you have high throughput workloads such as SAN replication for DR etc between two Steelhead appliances. To maintain consistent levels of performance, Riverbed recommends using separate Steelhead appliances for DR workloads than for optimization of other traffic. You basically have three options to choose from:

- Default – which provides the high level of data reduction (default setting)
- SDR-Adaptive – dynamically adjusts data reduction vs data throughput based on loads being placed on the Steelhead appliances.
- SDR-M – Performs optimization in memory only so there is no latency burden by the physical disks in the data store. In this mode the datastore is not used at all any latency/traffic improvement are done in memory only. This mode maybe useful for SAN replication.

### 4\. Configure CIFS Optimization (Configure -> Optimization -> CIFS)

There may be some additional tweaks you can make here to your environment to enable the acceleration of Windows File sharing traffic.

_**Optimize Connections with Security Signatures (aka SMB signing)**_ With older versions of RiOS they were unable to fully optimize CIFS traffic when Windows was configured to sign the traffic. This was especially true for File Shares hosted on Domain Controllers where this was the default setting. You either had to disable SMB signing in your Windows Environment or accept the fact that you would not get the full optimisation benefits. Now you have the option of making the Steelhead appliances members of the Windows domain environment to allow full optimisation without jeopardising security. To enable this setting you must make the Steelhead appliances a member of the domain first before enabling SMB signing otherwise you will get a warning. Secondly you need to choose the SMB mode either Transparent or Delegation with the former being far simpler. Delegation mode only needs to be selected if you had SMB signing configured in RiOS 5.5x and requires additional configuration not mentioned here.

_**Enable Dynamic Write Throttling**_ replaces the default static buffer scheme. When enabled it will dynamically adjust writes if there is a backlog of write messages on the server-side device.

**Enable SMBv1 Backward Compatibility** For a performance increase between clients that are Windows Vista and Windows Server 2008 it forces communication from SMBv2 to SMBv1 which allows for higher performance. At this stage I’m not sure if this also affects Windows 7 and Windows 2008 R2 where they use SMBv2.1 which is supposed to enhance CIFS performance further.

**Enable Print Optimization** Improves centralized print traffic performance. For example, when the print server is located in the data center and the printer is located in the branch office, enabling this option speeds the transfer of a print job spooled across the WAN to the server and back again to the printer. Note: This feature does not improve optimization for a Windows Vista client printing over a Windows 2008 server, because this client and server pair uses a different print protocol.

### 5\. Configure MAPI Optimization (Configure -> Optimization -> MAPI)

_**Exchange 2007 Optimization**_ In older versions of RiOS prior to 5.5x Exchange 2007 acceleration was not supported and then when it was supported it did not support Encrypted traffic by Outlook and hence encryption had to be disabled in Outlook 2007 clients to gain optimization benefits. Thankfully this has been rectified and is no longer an issue in RiOS 6.0. You should now enable this optimization if you use Outlook 2007 in your environment.

**Enable Transparent Population** This setting basically allows email for users located in branch sites that do not have a local Exchange Server to continue to pull down their mail even when they have Outlook closed. That way when they open their Outlook they receive any new email at LAN like speeds. This maybe particularly useful to curb the surge of network utilisation in the morning when remote users logon to the network and fire up Outlook.

### 6\. Configure Citrix ICA optimization (Configure -> Optimization -> Citrix ICA)

With the introduction of RiOS 6.0 brings about new Citrix Optimisation which allows optimization of the ICA protocol bandwidth as well as being able to provide QoS shaping and priority.

To enable this setting is quite straight forward:

- Specify the ICA ports (usually 1494 and 2598) and exclude them from the Interactive Ports label.
- Enable the Citrix ICA Optimization
- Optionally enable QoS priorities.

### 7\. Configure HTTP Optimization (Configure -> Optimization -> HTTP)

There are a few minor tweaks you can do over the default configuration here and that is around the areas of:

- URL Learning (enabled by default)
- Parse / Prefetch
- Object Prefetch Table

URL Learning - The Steelhead appliance learns associations between a base request and a follow-on request. This feature is most effective for Web applications with large amounts of static content, for example, images, style sheets, and so forth.

**Parse / Prefetch** Parse and Prefetch essentially reads a page, finds HTML tags that it recognizes as containing a prefetchable object, and sends out prefetch requests for those objects. Typically, a client would need to request the base page, parse it, and then send out requests for each of these objects. This still occurs, but with Parse and Prefetch the Steelhead appliance has quietly perused the page before the client receives it and has already sent out the requests. This allows it to serve the objects as soon as the client requests them, rather than forcing the client to wait on a slow WAN link.

**Object Prefetch Table** The Steelhead appliance stores object prefetches from HTTP GET requests for cascading style sheets, static images, and JavaScript files. This helps the client-side Steelhead appliance respond to If-Modified-Since (IMS) requests and regular requests from the client, thus cutting back on round trips across the WAN. This feature is useful for applications that use a lot of cacheable content.

To enable and test these 2 settings you may want to set up another server subnet (say that your internal web servers reside in) and apply one or both of these settings and test the results.

I have provided a comparison here from Riverbed of the different HTTP optimization features.

[<img src="/images/optimisation.jpg" width=600 height=251  >](https://picnet.com.au/blogs/david/files/2010/02/optimisation.jpg)
