---
title: "XML Settings Files - No more web.config"
slug: "xml-settings-files-no-more-web-config"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1252540800000"
date: "2009-09-10"
categories: 
  - "software-engineering"
---

One of my pet hates is working on projects where previous developers have decided to dump all of their settings in the web.config file. Some of the reasons why I dislike this practice is:

- It looks horrible
- You cannot modify settings at run time (it restarts the application)
- You are mixing application deployment config info with your own configuration
- Did I mention that it looks and smells horrible?
- It is so simple to do it nicely

So now lets look at the nice way of doing this.

### XML File

A settings file should look like this:

<pre>&lt;ApplicationSettings&gt;
  &lt;ConnectionString&gt;server=servername;database=databaseName;&lt;/ConnectionString&gt;
  &lt;AdministratorsGroup&gt;Admin&lt;/AdministratorsGroup&gt;
  &lt;MaxNumberOfAllowedConnections&gt;500&lt;/MaxNumberOfAllowedConnections&gt;
  &lt;Etc&gt;true&lt;/Etc&gt;
&lt;/ApplicationSettings&gt;
</pre>



Not like this (Did I mention ugly?):



<pre>&lt;appSettings&gt;
  &lt;add key="ConnectionString" value="server=servername;database=databaseName;" /&gt;
  &lt;add key="AdministratorsGroup" value="Admin" /&gt;
  &lt;add key="MaxNumberOfAllowedConnections" value="500" /&gt;
  &lt;add key="Etc" value="true" /&gt;
&lt;/appSettings&gt;
</pre>



So lets go ahead and assume that our settings file will look like the first one above.

### Accessing Application Settings

Accessing settings like this:



<pre>int maxConnections = SystemSettings.Instance.MaxNumberOfAllowedConnections;
</pre>



Is a million times nicer that accessing the like this:



<pre>int maxConnections = String.IsNullOrEmpty(ConfigurationSettings.AppSettings["MaxNumberOfAllowedConnections"]) ? 0 : Int32.Parse(ConfigurationSettings.AppSettings["MaxNumberOfAllowedConnections"]);
</pre>



### Basic Implementation

So now that I've made it easy to see how ugly the alternative is lets look at a simple implementation for this design.



<pre>using System;
using System.IO;
using System.Web;
using System.Xml.Serialization;
<div></div>
namespace Namespace {
  [Serializable] public class ApplicationSettings {
    private static readonly XmlSerializer serial = new XmlSerializer(typeof(ApplicationSettings));
    private static ApplicationSettings instance;
    public static ApplicationSettings Instance
  {
<div></div>
  get {
    if (instance != null) return instance;
    string filename = HttpContext.Current.Server.MapPath("~/resources/settings.xml");
    using (StringReader sr = new StringReader(filename)) return instance = (ApplicationSettings) serial.Deserialize(sr);
    }
  }
  public string ConnectionString { get; set;}
  public string AdministratorsGroup { get; set;}
  public int MaxNumberOfAllowedConnections { get; set;}
  public bool Etc { get; set;}
  }
}
</pre>



### Allow Changes at Runtime

The above design is very tidy but it has a flaw that it does not allow changes to the settings file at run time. To accomplish this we need

a file aware cache. Lukily the ASP.Net cache is ideal for this. So lets expand the above to take advantage of this.



<pre>using System;
using System.IO;
using System.Web;
using System.Web.Caching;
using System.Xml.Serialization;
<div></div>
namespace PicNet.FreeWeb.Settings {
  [Serializable] public class ApplicationSettings {
    private static readonly XmlSerializer serial = new XmlSerializer(typeof(ApplicationSettings));
    public static ApplicationSettings Instance
  {
<div></div>
get {
  Cache cache = HttpContext.Current.Cache;
  string filename = HttpContext.Current.Server.MapPath("~/resources/settings.xml");
  if (cache[filename] != null) return (ApplicationSettings) cache[filename];
  CacheDependency dep = new CacheDependency(filename);
  using (StringReader sr = new StringReader(filename)) {
    ApplicationSettings appSettings = (ApplicationSettings) serial.Deserialize(sr);
    cache.Insert(filename, appSettings, dep, DateTime.MaxValue, TimeSpan.MaxValue);
    return appSettings;
    }
  }
}
  public string ConnectionString { get; set;}
  public string AdministratorsGroup { get; set;}
  public int MaxNumberOfAllowedConnections { get; set;}
  public bool Etc { get; set;}
 }
}
<div></div>
</pre>



### Securing the Settings File

We may have sensitive data in this settings file such as passwords, etc. This kind of information should obviously not be delivered to the web. So how can we secure this. Well, there are 3 main ways.

**IIS**

IIS can be set not to deliver xml files. Or if you want just change the file name to settings.appsettings and then block the .appsettings filetype.

**Web.config**

This option is probably preferred to the IIS option as it will allow you to deploy to any server without having to remember to change IIS settings.

To do this simply add the following handler to your web.config:



<pre>&lt;add verb="*" path="*.xml" type="System.Web.HttpForbiddenHandler" validate="false"/&gt;
</pre>



Note: You will need to ensure that .xml files are being handled by the aspnet IIS handler.

**Global.asax.cs**

Finally and by far the best (in my opinion) is to hide the file by Filtering in Global.asax.cs



<pre>protected void Application_PreRequestHandlerExecute(object sender, EventArgs e) {
  if (HttpContext.Current.Request.Url.LocalPath.IndexOf(".xml") &gt;=0) { throw new SecurityException();}
  ...
}
</pre>



Note: You will need to ensure that .xml files are being handled by the aspnet IIS handler.

That's it, and again, there is no good reason to have your settings in that decaying Web.config file.

Enjoy

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software-development.html) Manager [PicNet Pty Ltd](https://picnet.com.au/)
