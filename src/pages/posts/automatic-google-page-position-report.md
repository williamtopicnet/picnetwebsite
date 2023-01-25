---
title: "Automatic Google Page Position Report"
slug: "automatic-google-page-position-report"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1268179200000"
date: "2010-03-10"
categories: 
  - "software-engineering"
---

**Overview**

The position of your website in the Google organic search is quickly becomming one of the most critical marketting measures. This [page/script](https://picnet.com.au/blogs/guido/files/2010/03/google_pos.txt) will allow you to automate this process.

**How To**

- ****Sign up for a google Ajax API Key (http://code.google.com/apis/ajaxsearch/signup.html)****

\- You will get a jsapi key from google, something like this

'ABQIAXFEakaXw3\_Fd-zqqMhjDLzqaRTTser7lsytcEDBoz0jKRWQmOpxexR7x409podV88a5eoPr2KIvw8Ub3B' (Note this is not a valid key)

- Download this html [page/script](https://picnet.com.au/blogs/guido/files/2010/03/google_pos.txt) and rename to .html (remove .txt extension)
- Open this page in a text editor (note pad is just fine)
- Replace <YOUR JSAPI KEY> (Line 53) with, you guessed it, your jsapi key.
- On line 59 you will see the configuration for this file, you will need to change the following items

\- lookfor (Line 66, 78, 87). These tell the script what to look for in the url and youtube title.

\- On line 75, replace "Sydney, NSW" with a location that you think some of your clients would be searching from.

- On line 228 the lookup table rows begin. You can add as many rows as you wish here. The rows must be in the format (replace <Search term or phrase>):



<pre><span style="font-weight: normal;">&lt;tr&gt;&lt;td&gt;&lt;Search term or phrase&gt;&lt;/td&gt;&lt;/tr&gt;</span></pre>



- You can have headers by adding rows in this format:



<pre><span style="font-weight: normal;">&lt;tr class='header'&gt;&lt;th&gt;This is a header row&lt;/th&gt;&lt;/tr&gt;</span></pre>



- Open the file in your browser and click 'Run Report'

Thats it, when the table is working you will get something that looks like this:

[<img src="/images/screen1.jpg" width=562 height=401  >](https://picnet.com.au/blogs/guido/files/2010/03/screen1.jpg)

Let me know if you have any problems with this.

Thanks

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software-development.html "software development") Manager [PicNet Pty Ltd](https://picnet.com.au/)
