---
title: "Introducing Mouse Eye Tracking - Tunnel Vision"
slug: "introducing-mouse-eye-tracking-tunnel-vision"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1266537600000"
date: "2010-02-19"
categories: 
  - "software-engineering"
---

One question that has been asked of me a few times since the release of the [PicNet Mouse Eye Tracking Service](http://met.picnet.com.au/) is that of accuracy. How acurate can the Mouse Eye Tracking service correlate eye activity from mouse activity. We have done a lot of testing on this topic and we believe that the correlation is significant. In fact it was significant enough for us to invest a huge amount of time and effor in producing this product. We are also highly encouraged by the academic research in this field that supports our own tests (See product home page for links to this research).

However, we are aware that the accuracy is not 100% and it will never be. If you want 100% accurate data about activity on your site you need to use eye tracking. However this also has many [downsides](https://picnet.com.au/blogs/Guido/post/2010/02/03/Mouse-Tracking-vs-Eye-Tracking.aspx). One of the ways that we try to increase the correlation between mouse and eye is by using an as yet undocumented feature called Tunnel Vision.

Tunnel Vision tries to encourage the user to use the mouse to view the page whilst attempting not to alter the normal behavior of the user on the page. Lets have a look at tunnel vision in action:

**Tunnel Vision Off** [<img src="/images/screen11.jpg" width=967 height=480  >](https://picnet.com.au/blogs/guido/files/2010/02/screen11.jpg)

**Tunnel Vision On** [<img src="/images/screen21.jpg" width=948 height=482  >](https://picnet.com.au/blogs/guido/files/2010/02/screen21.jpg)

As you can see, tunnel vision creates a tunnel around the user's mouse giving you a clear area of vision around the cursor but more importantly tunnel vision still allows the user's peripheral vision to look around the page in preparation for the next area of focus.

I encourage you to try tunnel vision in your closed testing (Do not put this on your live site!!!) and see the results for your self.

**Turning On/Off** To turn on tunnel vision simply add (use-tunnel-vision="true") to your PicNetEyeTracker span. i.e: \[code:html\] <span id='PicNetEyeTracker' usercode='picnetpilot' **use-tunnel-vision="true"**\>... \[/code\]

To turn off tunnel vision simply remove this tag or set use-tunnel-vision to "false".

I hope this feature helps you get that extra level of accuracy with your mouse/eye tracking.

Thanks

**[Guido Tapia](mailto:guido.tapia@picnet.com.au),** [Software Development](https://picnet.com.au/software_development.html) Manager [PicNet Pty Ltd](https://picnet.com.au/)
