---
title: "Lean css in javascript"
slug: "lean-css-in-javascript"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1271635200000"
date: "2010-04-19"
categories: 
  - "software-engineering"
---

This weekend I was looking at the [lesscss.org](http://lesscss.org) project and found it very interesting. There is also a [.net implementation](http://www.dotlesscss.org/). The basic features of these projects is to make css less verbose, they do this by offering features like mixins, variables and nested rules. Now all of this is very straight forward lexical analysis to produce raw css so I thought to myself why does this need a server side component, what if I want to have a pure html site. I don't want php, ruby, .net, etc just to compile some css. I also don't want an additional deployment process to compile my css. So... Why not javascript.

I thought there must be some limitations but a very quick test shows that it is entirely possible. So here we go:

We want to prevent the bowser from doing 2 requests to css so change all your:

<pre>&lt;link rel='stylesheet' href='style.css'/&gt;</pre>

With:

<pre>&lt;link rel='lss' href='style.css'/&gt; &lt;!-- I have called it lss for less but it can be anything --&gt;</pre>

This will prevent the borwser from requesting this file, which is good as we will be manually requesting them. So now lets add a script file to load and parse our lss files:

<pre>&lt;script src="jsless.js" type="text/javascript"&gt;&lt;/script&gt;<span>  </span></pre>

**Content of jsless.js (Note I'm using jQuery)**

<pre>[code:js]
<div></div>
$('link').each(function() {
<div></div>
<span>  </span>var lss = $(this);
<div></div>
<span>  </span>var lssurl = lss.attr('href');
<div></div>
<span>  </span>// Should we make this block?  Probably, but lets leave for now
<div></div>
<span>  </span>$.ajax({url: lssurl, dataType:"text", success: function(css) { getcsscallback(lss, css); }});
<div></div>
});
<div></div>
function getcsscallback(lss, cssText) {<span>  </span>
<div></div>
<span>  </span>var vars = getVariables(cssText);<span>  </span>
<div></div>
<span>  </span>for (var i in vars) {
<div></div>
<span>  </span>i = trim(i);
<div></div>
<span>  </span>var val = trim(vars[i]);<span>  </span>
<div></div>
<span>  </span>cssText = cssText.replace(/@[A-z^:]+:.*/g, ''); // remove var line
<div></div>
<span>  </span>cssText = cssText.replace(new RegExp(i,  'g'), val); // replace replace variables
<div></div>
<span>  </span>}
<div></div>
<span>  </span>cssText = '&lt;style&gt;' + cssText + '&lt;/style&gt;'; // TODO: Add media, etc, etc from the attributes of lss into this tag
<div></div>
<span>  </span>$('head').append(cssText);
<div></div>
}
<div></div>
function getVariables(cssText) {
<div></div>
<span>  </span>return getMatches(/(@[A-z^:]+):([^;]+);/g, cssText);
<div></div>
}
<div></div>
/// Following code is just supporting regex and string manipulation code
<div></div>
function getMatches(regex, text) {<span>  </span>
<div></div>
<span>  </span>var matches = {};
<div></div>
<span>  </span>var match = null;
<div></div>
<span>  </span>while (match = regex.exec(text)) { <span>  </span>
<div></div>
<span>  </span>matches[match[1]] = match[2];<span>  </span>
<div></div>
<span>  </span>}
<div></div>
<span>  </span>return matches;
<div></div>
}
<div></div>
function trim(str, chars) {
<div></div>
<span>  </span>return ltrim(rtrim(str, chars), chars);
<div></div>
}
<div></div>
function ltrim(str, chars) {
<div></div>
<span>  </span>chars = chars || "\\s";
<div></div>
<span>  </span>return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
<div></div>
}
<div></div>
function rtrim(str, chars) {
<div></div>
<span>  </span>chars = chars || "\\s";
<div></div>
<span>  </span>return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
<div></div>
}
<div></div>
[/code]</pre>

Thats it, I have a test [project set up](https://picnet.com.au/blogs/guido/files/2010/04/lss.zip) that you can use to see this in action. You can also just click here to see [the html](https://picnet.com.au/blogs/guido/files/2010/04/test.html). The [css (lss) used is here](https://picnet.com.au/blogs/guido/files/2010/04/style.css) and the [js is here](https://picnet.com.au/blogs/guido/files/2010/04/jsless.js).

I personally think this project has some potential so if you are interested in working with me just [email me](mailto:guido.tapia@picnet.com.au) and we can set up an OS project and start from there.

Note, I have tested the above in chrome, firefox and IE8 and it appears to work.

Anyways hopefully this inspires someone to do this properly.

Thanks

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)**

[Software Development](https://picnet.com.au/software-development.html "software development") Manager

[PicNet Pty Ltd](https://picnet.com.au/)
