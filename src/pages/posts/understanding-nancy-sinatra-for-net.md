---
title: "Understanding Nancy - Sinatra for .Net"
slug: "understanding-nancy-sinatra-for-net"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1300752000000"
date: "2011-03-22"
categories: 
  - "software-engineering"
---

For a project we are currently working on here at [PicNet](https://picnet.com.au/) we decided to forgo the bloat of ASP.Net and Mvc and go for a super light weight web platform. We tried [Kayak](https://github.com/kayak/kayak) but this was a little too 'bare' so we then shifted our attention to [Nancy](https://github.com/thecodejunkie/Nancy) which is a [Sinatra](http://www.sinatrarb.com/) clone (well, "inspired" project) in .Net.

We've now been working with Nancy for a few weeks and have thoroughly enjoyed the experience. One of the tougher parts of getting started with Nancy is the lack of documentation and tutorials, so I thought I would put what I've learned over the last week or so down on paper in the hopes that others may benefit.

This post is an introduction to the internal components of Nancy and how the nuts and bolts work (from a high level). In upcoming posts I hope to delve deeper into some of these areas and do a tutorial to bring all this into context.

**Host** Capturing http requests and sending responses back to the client are left to the 'Host'. The host is really a web server and Nancy comes pre-bundled with a couple of options. You can use [IIS](https://github.com/thecodejunkie/Nancy/tree/master/src/Nancy.Demo.Hosting.Aspnet), [WCF](https://github.com/thecodejunkie/Nancy/tree/master/src/Nancy.Hosting.Wcf) and finally Nancy comes with its own ["Self"](https://github.com/thecodejunkie/Nancy/tree/master/src/Nancy.Demo.Hosting.Self) implementation of the low level http hosting functionality. Both WCF and Self hosts can be used in windows services and in command line apps.

The host is also responsible for initialising and delegating request processing to the [NancyEngine](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/NancyEngine.cs). Internally (and hence not really important uless developing Nancy) the host usually uses a [NancyBootstrapper](https://github.com/NancyFx) to initialise the engine. The bootstrapper is responsible for initializing all modules of the system, we will iterate through most of those models in this document.

_Example: Setting up a WCF host with http and windows authentication binging:_

<pre class="prettyprint">WebHttpBinding whb =
  new WebHttpBinding(WebHttpSecurityMode.TransportCredentialOnly);
whb.Security.Transport.ClientCredentialType = HttpClientCredentialType.Windows;
<div></div>
var host = new WebServiceHost(new NancyWcfGenericService(), new Uri(serverUrl));
host.AddServiceEndpoint(typeof (NancyWcfGenericService), whb, "");
ServiceMetadataBehavior smb = new ServiceMetadataBehavior {
  HttpGetEnabled = true
};
host.Description.Behaviors.Add(smb);
host.Open();</pre>

**Bootstrapper** Internally, Nancy uses the bootstrapper to initialise all required modules and the DI container that will be used by other core modules. The default Nancy project comes with its own [IoC](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/TinyIoc/TinyIoC.cs) implementation but if you are a fan of other IoC containers then Nancy comes pre-bundled with support for [Ninject](https://github.com/NancyFx/Nancy), [StructureMap](https://github.com/NancyFx/Nancy), [Unity](https://github.com/NancyFx/Nancy) and [Windsor](https://github.com/NancyFx/Nancy).

**NancyEngine** The [NancyEngine](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/NancyEngine.cs) is the brains that the Host delegates requests to. The engine manages the request lifecycle. When the Engine receives a request from the Host, the engine:

- Creates the [request context](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/NancyContext.cs)
- Invokes the pre-request hook (if specified). If the pre-request hook returns a Response then then no Routing is used as Nancy assumes the Request has been processed.
- If the pre-request hook does not return a Response then Nancy looks for a valid Route to handle this Request. Routes are managed by [Modules](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/NancyModule.cs). (Note: Modules also have pre/post request hooks described below).
- The post-request hook is then called with the current context.

If you are not writing your own bootstrapper I would leave the pre/post hooks alone and use the NancyModule’s Before/After pipeline support.

**NancyContext** The [NancyContext](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/NancyContext.cs) has a reference to the [Request](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/Request.cs), [Response](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/Response.cs) (once it has been resolved) and the Request or context Items. The context Items is just an in-memory dictionary ideal for storing Request wide data.

**Request** The [Request](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/Request.cs) is a pretty standard http request having a Body, Cookies, Session, Files, Form, Headers, the Method (get/post/etc), Protocol, Query and Uri details.

**NancyModule** The [module(s)](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/NancyModule.cs) register the routes handled by the system. Each module can have a root path (module path) meaning that it is only responsible for that path branch.

Modules can also define pre request hooks by adding items to the Before member. post-request hooks are added using the After member. The rules for pre/post hooks are the same as for the NancyEngine hooks. Basically if a pre-request hook returns a response then processing of that Request ends and the Response is passed to the post-request hook.

The module also has access to the current [context](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/NancyContext.cs).

_Example: Setting up simple routes in a custom NancyModule_

<pre>public class MyModule : NancyModule
{
  public IEModule() {
      Get["/"] = x =&gt; GetMainWindow();
      Get["/resources/{name}"] = x =&gt;Response.AsFile(x.name);
      Get["/dl/{filePath}"] = x =&gt;
        GetDownloadResponse(Response.AsImage(filePath), filePath);
      Post["/open/{filePath}"] = x =&gt;
        GetDownloadResponse(Response.AsImage(filePath), filePath);
      Post["/ul/{dirid}/{fileName}"] = x =&gt; UploadFile(x.dirid, x.fileName);
    }
  }
  private Response GetDownloadResponse(Response r, string fileName) {
    r.Headers.Add("Expires",
      DateTime.Now.AddSeconds(1).ToUniversalTime().ToString());
    r.Headers.Add("content-disposition",
      "attachment;filename=" + new FileInfo(filePath).Name);
    return r;
  }
...</pre>

**Response** Each request has to return a [Response](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/Response.cs) to the client. There are currently implicit casts in-place that allow you to return objects of the following types:

- Strings
- [http status codes](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/HttpStatusCode.cs)
- Action
- Response

All of the non Response types are simply wrapped in a [Response](https://github.com/thecodejunkie/Nancy/blob/master/src/Nancy/Response.cs). The Response has the StatusCode, Headers, Cookies, ContentType and the Contents (as a stream).

The module also has access to helper methods that you can use to create Reponses. These are:

- Reponse.AsFile
- Reponse.AsCss
- Reponse.AsImage
- Reponse.AsJs
- Reponse.AsJson
- Reponse.AsRedirect
- Reponse.AsXml

**Views / ViewEngines** Nancy comes pre-packed with support for [NDjango](http://ndjango.org/index.php?title=NDjango_Home), [Razor](http://www.asp.net/mvc/mvc3#BM_TheRazorViewEngine) and [Spark](http://sparkviewengine.com/). Of course you could also just server html.

_Example: Delegating rendering of model data to the current View engine:_

<pre>Get["/"] = x =&gt;
{
  IEnumerable model =
    DB.BeerEvents.FindAllByEventDate(DateTime.Now.to(DateTime.Now.AddYears(1)));
  model = model.OrderBy(e=&gt;e.EventDate).Take(10);
  // Current view engine will render this model
  return View["views/index",model.ToArray()];
};</pre>

**Conclusion** That is pretty much every important module in Nancy. Who would have thought that a fully functional web framework was conceptually so simple. Next bat time we will go through a step by step tutorial in getting started with Nancy.

Thanks

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software-development.html "software development") Manager [PicNet](https://picnet.com.au/)
