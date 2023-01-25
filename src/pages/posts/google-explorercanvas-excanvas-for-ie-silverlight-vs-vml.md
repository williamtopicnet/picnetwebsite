---
title: "Google Explorercanvas (excanvas) for IE.  Silverlight vs VML"
slug: "google-explorercanvas-excanvas-for-ie-silverlight-vs-vml"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1268611200000"
date: "2010-03-15"
categories: 
  - "software-engineering"
---

Many people do not realise that excanvas has a silverlight implementation. This implementation is apparently less stable (I have had very few issues with it) but much much faster. The only real draw back as I see it is that it requires clients to have silverlight installed ([stat owl](http://www.statowl.com/custom_ria_market_penetration.php) has this penetration rate at about 40%).

I use excanvas (silverlight) to allow support IE users to use the [Mouse Eye Tracking Service](http://met.picnet.com.au/). Now this is a highly graphical intensive application so the demands I put on my canvas tag are huge. The standard excanvas (VML) implementation just did not cut it at all however the silverlight version has allowed me to support IE.

The purpose of this article is to more intelligently compare the performance of both ex canvases. I have used slightly modified versions of the excanvas test cases for performance measures. You can download all the [tests here.](https://picnet.com.au/blogs/guido/files/2010/03/tests.zip)

All tests were run in IE8 on a poor spec Win XP box. This may be quite a limited but it suffices to give us a comparison between VML excanvas and silverlight excanvas. The tests measure the time taken to do 200 iterations of the mentioned test. Please see the [source code of the tests](https://picnet.com.au/blogs/guido/files/2010/03/tests.zip) for more details.

Note: I am using the dev versions of excanvas [from here](http://code.google.com/p/explorercanvas/downloads/list).

| Test | VML (ms) | Silverlight (ms) | x times faster |
| --- | --- | --- | --- |
| Arc | 1250 | 562 | 2.22 |
| Clearpath | 1109 | 281 | 3.95 |
| Colors | 9141 | 1906 | 4.8 |
| DrawImage | 3156 | 234 | 13.49 |
| DrawImageFlip | 128812 | n/a | n/a |
| Gradient | 828 | 406 | 2.04 |
| Gradient2 | 1359 | 422 | 3.22 |
| LineWidth | 378669 | 18953 | 19.98 |
| Overflow | 6859 | 344 | 19.94 |
| Overlay | 2703 | n/a | n/a |
| Pattern | 3140 | n/a | n/a |
| QuadraticCurve | 5032 | n/a | n/a |
| Resizing | n/a | n/a | n/a |
| Restorepath | 2484 | n/a | n/a |
| StrokeScaleAndRotate | 7860 | n/a | n/a |
| StrokeShouldNotClosePath | 4766 | n/a | n/a |
| Text | 6844 | n/a | n/a |

**Conclusions**

We can see that the silverlight excanvas has very limited support for many features. However the features it does support are many multiples faster (2 - 20 times faster). So if you are not using the advanced features, use silverlight.

Thanks

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software_development.html "software development") Manager [PicNet Pty Ltd](https://picnet.com.au/)
