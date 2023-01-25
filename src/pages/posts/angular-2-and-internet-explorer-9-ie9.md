---
title: "Angular 2 and Internet Explorer 9 (IE9)"
slug: "angular-2-and-internet-explorer-9-ie9"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1467504000000"
date: "2016-07-03"
categories: 
  - "software-engineering"
---

Getting Angular2 and IE9 working together is not very straight forward, since the move to release candidates some of the Shim libraries have been changed and others removed from the NG2 packages making things confusing.

After some research this is what I have determined to be the minimum number of “workaround” libs required. Note I have also included some other imports that are required since the move the RCs.

**NPM**

The following NPM libraries you will need to install are the following:
<pre>npm install --save angular2-ie9-shims
npm install --save core-js
npm install --save zone.js
npm install --save systemjs
npm install --save reflect-metadata
npm install --save rxjs</pre>

**Script tags**

The corresponding script imports are:

<pre>  &lt;!-- This first should be temporary --&gt;
  &lt;script src="lib/shims_for_IE.prod.js"&gt;&lt;/script&gt; 
  &lt;script src="lib/shim.min.js"&gt;&lt;/script&gt;&lt;!-- from core-js --&gt;
  &lt;script src="lib/zone.js"&gt;&lt;/script&gt;
  &lt;script src="lib/Reflect.js"&gt;&lt;/script&gt;
  &lt;script src="lib/system.js"&gt;&lt;/script&gt;
  &lt;script src="lib/Rx.min.js"&gt;&lt;/script&gt;</pre>
  
  This should have things working (for now) in IE9->11
