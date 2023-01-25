---
title: "Sharing MVC Views Across Projects"
slug: "sharing-mvc-views-across-projects"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1250035200000"
date: "2009-08-12"
categories: 
  - "software-engineering"
---

This is something I have been wanting to do for a while in the ASP.Net world however its not untill recently (with MVC) that this has been a 'clean' possibility. This article demonstrates how to do this.

### Inspiration

At [PicNet](https://picnet.com.au) are always trying to deliver quality products at the cheapest possible cost to the user. The way we do is is by having 'template' driven projects. This allows us to generate data access layers very quickly (see previous articles) and we also copy template web projects, windows projects, mobile projects that give us a good starting point. We also levarage custom libraries heavily. However we could never put any of the view code (aspx, ascx) in these libraries as it was just not clean.

### Embedded Views

To store your shared views in a library project simply copy the view code (aspx, ascx, master) into your library project. Please ensure that the view code compiles. By this I mean that all references are still valid (without requiring Web.config namespaces). Tools like Resharper will show wether the view is valid or not. Then mark the view as an 'Embedded Resource'. To do this just right click on the file name -> Properties and set the Buidl Action to 'Embedded Resource'. You will then need to rebuild the project to embed the resource in the DLL.

### The View Engine

Add the following View Engine to your library project.



<pre>/// &lt;summary&gt;
/// This class will read all embedded views in THIS dll and will dumpo them out to the
/// ~/tmp/Views directory.
/// &lt;/summary&gt;
public class EmbeddedResourceViewEngine : WebFormViewEngine {
  public EmbeddedResourceViewEngine() {
    MasterLocationFormats = new[] {
      "~/Views/{1}/{0}.master",
      "~/Views/Shared/{0}.master",
      "~/tmp/Views/{0}.master"
    };
  
    ViewLocationFormats = new[] {
      "~/Views/{1}/{0}.aspx",
      "~/Views/{1}/{0}.ascx",
      "~/Views/Shared/{0}.aspx",
      "~/Views/Shared/{0}.ascx",
      "~/tmp/Views/{0}.aspx",
      "~/tmp/Views/{0}.ascx"
    };
 
    PartialViewLocationFormats = ViewLocationFormats;
    DumpOutViews();
  }
<div></div>
private static void DumpOutViews() {
  IEnumerable&lt;string&gt; resources = typeof (EmbeddedResourceViewEngine).Assembly.GetManifestResourceNames().Where(name =&gt; name.EndsWith(".master") || name.EndsWith(".aspx") ||     name.EndsWith(".ascx"));
foreach (string res in resources) { DumpOutView(res); }
}
<div></div>
private static void DumpOutView(string res) {
string rootPath = HttpContext.Current.Server.MapPath("~/tmp/Views/");
  if (!Directory.Exists(rootPath)) {
    Directory.CreateDirectory(rootPath);
}
  Stream resStream = typeof (EmbeddedResourceViewEngine).Assembly.GetManifestResourceStream(res);
  int lastSeparatorIdx = res.LastIndexOf('.');
  string extension = res.Substring(lastSeparatorIdx + 1);
  res = res.Substring(0, lastSeparatorIdx);
  lastSeparatorIdx = res.LastIndexOf('.');
  string fileName = res.Substring(lastSeparatorIdx + 1);
  FileUtils.WriteFileContents(rootPath + fileName + "." + extension, resStream);
  }
}
</pre>

This view engine simply gets the views that have been stored as embedded resources and dumps them out to the ~/tmp/Views directory.

### Register the View Engine

In Global.asax.cs just add:



<pre>public static void RegisterCustomViewEngines(ViewEngineCollection viewEngines) {
  viewEngines.Clear();
  viewEngines.Add(new EmbeddedResourceViewEngine());
}
...
protected void Application_Start(object sender, EventArgs e) {
  RegisterRoutes(RouteTable.Routes);
  RegisterCustomViewEngines(ViewEngines.Engines);
}
</pre>



### That's It

That's it all the embedded views now simply behave like shared views.

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software_development.html) Manager [PicNet Pty Ltd](https://picnet.com.au/)
