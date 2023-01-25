---
title: "Html Web Worker Woes - Data Analysis not an Option"
slug: "html-web-worker-woes-data-analysis-not-an-option"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1266451200000"
date: "2010-02-18"
categories: 
  - "software-engineering"
---

During development of the [PicNet Mouse Eye Tracking service](http://met.picnet.com.au/) I carefully investigated the possibility of using [Html Web Workers](http://www.whatwg.org/specs/web-workers/current-work/).

After careful reading of the specs I thought this would be great but after some initial tinkering I found that communications between threads was done through the postMessage feature supported by **modern** browsers.

This instantly raised some suspicions as I know that this is a text only feature, I know FF will auto serialize/deserialize to/from JSON but this as expected performs pretty poorly for large data sets. But I gave it a benefit of the doubt thinking that there was no way that someone would go to the extreme pains of implementing a threading framework and cripple it by not allow memory references to be passed between threads.

WRONG!!! And now I can say that the new threading features in browsers is only usefull for making the UI more responsive. Now don't get me wrong thats great and a huge relief not to be having to use setTimeout hacks everywhere but seriously?? Why would you break my heart like that?

Threading is critical in calculation intensive or data analysis intensive applications. The [PicNet Mouse Eye Tracking service](http://met.picnet.com.au/) is a great example of this. The javascript engine gets a whole bunch of mouse coordinates and from this data we render heat maps, curved mouse tracks, etc, etc. This is a huge amount of calculations that lock the browser JS thread but it is impossible for me to use web workers. Why is that?

**The cost of postMessage**

postMessage can transfer strings between threads. But it is very rare that data requiring analysis is solely string based, mostly we are working with other primative types as well such as numbers, booleans, DateTimes, etc. And the cost of converting (serializing) strings to/from these data types is huge. After some early prototypes I tossed the idea of using Web Workers aside. I know this is very early days in the life of Web Workers but I was quite taken aback by this crippling flaw in the specs.

**Lets look at numbers**

K, lets support my whinging with numbers. Below is a table that shows an expensive operation on an array of numbers. We process the array using the specified number of threads. Note: Refresh to see it running in real time:

Run Test

| 1 Threads | 2 Threads | 3 Threads | 4 Threads | 5 Threads |
| --- | --- | --- | --- | --- |
| Idle | Idle | Idle | Idle | Idle |

**[Guido Tapia](mailto:guido.tapia@picnet.com.au),** [Software Development Manager](https://picnet.com.au/software_development.html) [PicNet Pty Ltd](https://picnet.com.au/)
