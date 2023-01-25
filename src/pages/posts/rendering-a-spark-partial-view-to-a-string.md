---
title: "Rendering a Spark Partial View to a string"
slug: "rendering-a-spark-partial-view-to-a-string"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1253836800000"
date: "2009-09-25"
categories: 
  - "software-engineering"
---

I needed to do this recently so I searched the interweb and quickly found this great article by Brent Edwards:

[http://blog.edwardsdigital.com/post/Rendering-a-Spark-partial-view-to-a-string-or-JSONP-with-ASPNET-MVC.aspx](http://blog.edwardsdigital.com/post/Rendering-a-Spark-partial-view-to-a-string-or-JSONP-with-ASPNET-MVC.aspx)

Now don't get me wrong, this works and is explained very well but I don't see the point in re-creating the ViewEngine? So I cleaned this up and ended up with:



<pre>public static string GetPartialViewHtml(ViewDataDictionary viewData, string viewRalativePath) {
  SparkViewFactory f = (SparkViewFactory) ViewEngines.Engines.First(e =&gt; e is SparkViewFactory);
  SparkView view = (SparkView) f.Engine.CreateInstance(f.CreateDescriptor(null, null, viewRalativePath, null, false));
  view.ViewData = viewData;
  StringWriter writer = new StringWriter();
  view.RenderView(writer);
  return writer.ToString();
}
</pre>



Done, now for anyone that has tried to do this with ASP.Net MVC View engine, I pity you.

Thanks

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software-development.html) Manager [PicNet Pty Ltd](https://picnet.com.au/)
