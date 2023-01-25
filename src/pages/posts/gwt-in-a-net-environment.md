---
title: "GWT in a .Net environment"
slug: "gwt-in-a-net-environment"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1265155200000"
date: "2010-02-03"
categories: 
  - "software-engineering"
---

Hi All,

As you know we have recently release the [PicNet Mouse Eye Tracking service](http://met.picnet.com.au/). This project is by far the largest Javascript centric application that [PicNet](https://picnet.com.au/) has developed. This led us to do a lot of research on what technologies we would use for generating a maintainable javascript project.

We were restricted to having a .Net backend as that is what our existing infrastructure supports and its the technology where we live most comfortably. So the decision for the backend was simple, ASP.Net Mvc (w/ Spark View Engine) + NHibernate.

But now came the more complex decision of the client code (javascript). Do we stick to standard jquery code minified in our continous build? do we create our own bootstrapping js framework to easily allow OO in js? Do we leverage other such frameworks?

We ended up investigating a lot of different options but this article focuses on one of these which is [GWT](http://code.google.com/webtoolkit/).

Javascript development is hard, anyone that tells you otherwise thinks javascript development is for creating roll over buttons. JS development is hard for various reasons.

- The language is very flexible and it gives you all the rope in the world to ...
- At the heart of the language is the function. This is a concept that is difficult for most OO devs to wrap their heads around
- Performance is such a huge issue, compared to server languages
- Code size (and design) is a big issue
- Finally and most importantly is: The tools for javascript development are useless in comparison to other languages

The last item is huge. I mean with Java you use Eclipse or IntelliJ to manage your projects, builds, deployments, code analysis, error reporting, debugging, syntax highlighting, unit testing, code completion, refactoring, etc, etc, etc. For .Net you have Visual Studio giving the same support. Now try this as an experiment. Write a simple app in Java or .Net using notepad! That is what javascript development is like, regardless of language features, performance, etc. The tools issue is a killer.

[GWT](http://code.google.com/webtoolkit/) is a great framework and I would comfortably say, its the best framework for javascript development available. The reason it is the best framework is the fact that you can use good tools (Eclipse, IntelliJ, etc), it also removes alot of the Javascript hacky mentality required for writing fast javascript (but thats a secondary benefit in my opinion). Now for .Net developers learning to use Eclipse, etc is a bit of a pain but from a maintainability issue, if you were developing a solely javascript application it is definatelly worth the effort. HOWEVER!! Having a client (javascript) / server (.Net) application written in GWT / .Net has huge drawbacks. It is actually so painful that we finally decided to abandon the attempt.

**How do you do it**

Well our [service](http://met.picnet.com.au/) is a very complex html page with a very large javascript component. The html file we generate using Spark View Engine. This lets us modularise the html into nice little controls that are easy to work with. This is where we encounter our first GWT hurdle. To use GWT you have to have the html in the hosted server, well that's not true you could compile the javascript and stick it in your ASP.Net application and not have html in Java however if you cannot use GWT in hosted mode it is not worth using (My own opinion).

What does this mean? Well, basically it means that you have to view the source of your html and copy into your GWT environment. Thats correct, change html you need to remember to copy paste into GWT env every time. We tried doing crazy things like having iframes pointing to the ASP.Net app from GWT environment with cross domain policies, etc but this always failed.

Ok, this is a huge maintenance issue, however if this were the only issue I think we still would have used GWT given its previously described benefits.

Second issue!! Talking to the server. This issue actually has a few parts, the first is serialisation. GWT offers a few optimised serialisation mechanisms such as XML and JSON (and a custom one). Since our application used plain strings for its communications, rolling up our own XmlHttpRequests from GWT was no problem (we do this for performance reasons). So this was no big issue at all. The second issue is authentication. To use our application you must be logged in so in development mode we had to add a hack that would recognise GWT development requests and simulate a user, Ughh!! Still not a huge issue but getting bigger. And finally the last issue is the fact that to use GWT with a .Net backlend in development you have to use a proxy server. No problem here is a [great article](http://www.siafoo.net/snippet/258) describing how to set this up. Now it is difficult to describe the development process here but I will try.

- Start the hosted mode server
- Oh forgot to copy the new html
- Copy the html
- Restart hosted mode
- Crash!!
- Hughh?
- Oh, a crash on the .net side
- Done, try again
- Hmmm yes it does look better with that border

So you get my pain?

So my conclusions. GWT is awesome!! Enough cannot be said about how good this toolkit is but it is still too painful to be a real alternative in a .net application.

**[Guido Tapia](mailto:guido.tapia@picnet.com.au),** [Manager - Custom Software Development](https://picnet.com.au/software-development.html) [PicNet Pty Ltd](https://picnet.com.au/)
