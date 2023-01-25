---
title: "Split Testing (A/B Testing) in ASP.Net Mvc"
slug: "split-testing-ab-testing-in-asp-net-mvc"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1273536000000"
date: "2010-05-11"
categories: 
  - "software-engineering"
---

Working on our [website heat maps](http://met.picnet.com.au/ "website heat maps") product, Mouse Eye Tracking, has allowed us to really get into some of the more lean and super agile approaches to developing software. Something that we have loved doing recently is [Split Testing (or A/B Testing)](http://en.wikipedia.org/wiki/A/B_testing). Its really amazing how much time you can save when using techniques like this.

Basically for our [heat map](http://met.picnet.com.au/ "website heat maps") product we try every deployment out before investing huge amount of time into it. For example. We wanted to see if the features video could be made more prominent. So what we did is created a page for this approach, published it and compared results. We realised that this in fact was a waste of time and left the page exactly as it was.

There are plenty of products out there that allow you to do AB testing but most of those are CMSs which is useless when your site is in a server side language so what we use is a custom ASP.Net Mvc solution that works a real treat. It's this solution that I hope to describe in this post.

### SplitABController

The brains of the whole operation is a new controller (descendant of System.Web.Mvc.Controller) that allows you to provide multiple views for each ViewResult. This is kind of hard to explain so why not just show some code:



<pre>using System;
using System.Web;
using System.Web.Mvc;
<div></div>
public abstract class SplitABController : Controller {
  private static readonly Results results = new Results();
  private const string B_TEST_SUFFIX = "_B";
  private const string SPLIT_TEST_VIEW_COOKIE_NAME = "SPLIT_TEST_VIEW_COOKIE";
  private static ViewFilesCache cache;
  public static Results GetSplitTestResults() { return results; }
<div></div>
protected over
<div></div>
ride void OnActionExecuting(ActionExecutingContext filterContext) {
  AddSplitTestResultsToResultsMap(filterContext);
  base.OnActionExecuting(filterContext);
}
<div></div>
private void AddSplitTestResultsToResultsMap(ActionExecutingContext filterContext){
// If last request was not for a split test view then just return
<div></div>
  if (Request.Cookies[SPLIT_TEST_VIEW_COOKIE_NAME] == null) return;
<div></div>
// Add this controller/action to the results of the split test
<div></div>
  ResultRow rr = ResultRow.FromString(Request.Cookies[SPLIT_TEST_VIEW_COOKIE_NAME].Value);
  results.RemoveOneFromResults(rr);
  rr.ToControllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
  rr.ToAction = filterContext.ActionDescriptor.ActionName;
  results.AddOneToResults(rr);
}
<div></div>
/// &lt;summary&gt;
/// If the view has a _B counterpart then we mark this action as a 'Split Test' we
/// then record the results of this split view in the next request (OnActionExecuting).
///
/// This method also determines if we should supply the A or B view depending on the
/// 'ShouldRequestUseBView' algorithm.
/// &lt;/summary&gt;
<div></div>
protected override ViewResult View(string viewName, string masterName, object model){
  if (String.IsNullOrEmpty(viewName)) { viewName = (string) RouteData.Values["action"]; }
<div></div>
bool isSplitTestingView = IsSplitTestingView(masterName, viewName);
<div></div>
// If this view does not have a _B counterpart then we mark this request as non split test (by
// removing the 'SPLIT_TEST_VIEW_COOKIE_NAME' cookie) and just send control to base.View
<div></div>
if (!isSplitTestingView) {
  Response.Cookies.Remove(SPLIT_TEST_VIEW_COOKIE_NAME);
  return base.View(viewName, masterName, model);
  }
<div></div>
// Whether to use the A or B view depending on the 'ShouldRequestUseBView' algorithm
<div></div>
bool useb = ShouldRequestUseBView();
<div></div>
// Lets create a results row and store it in the cookie (SPLIT_TEST_VIEW_COOKIE_NAME). This will let the
// next request (OnActionExecuting) know that we just hit a split test view.
<div></div>
ResultRow rr = new ResultRow {FromController = this, FromAction = viewName, UsedBView = useb};
Response.Cookies.Add(new HttpCookie(SPLIT_TEST_VIEW_COOKIE_NAME, rr.ToString()));
results.AddOneToResults(rr);
<div></div>
// Display the appropriate view (A or B)
<div></div>
return useb
? base.View(viewName + B_TEST_SUFFIX, masterName, model)
: base.View(viewName, masterName, model);
}
<div></div>
/// &lt;summary&gt;
/// Returns wether the specified view has a _B counterpart.
/// &lt;/summary&gt;
<div></div>
private bool IsSplitTestingView(string masterName, string viewName) {
  if (cache == null) { lock (GetType()) { if (cache == null) { cache = new ViewFilesCache(B_TEST_SUFFIX); } } }
  return cache.HasSplitTestingAlternative(this, masterName, viewName);
  }
<div></div>
/// &lt;summary&gt;
/// If odd IP then use 'B' view.  This will give a ~50% A / B split.
/// &lt;/summary&gt;
<div></div>
private bool ShouldRequestUseBView() {
  return Int32.Parse(Request.UserHostAddress.Substring(Request.UserHostAddress.LastIndexOf('.') + 1)) % 2 == 1;
  }
}
</pre>



### Description

So what is this code doing, basically it checks if a view has a '\_B' counterpart, i.e.: If there is an Index.spark and an Index\_B.spark. If the view does have a \_B counterpart then we mark the request as a split test and on the next request we save the results of that test.

To use this code simply extend this controller rather than the standard System.Web.Mvc.Controller.

### Download

I have created a very simple test project (which uses Spark View Engine) that you can download [here](https://picnet.com.au/blogs/guido/files/2010/05/demo.zip).

Once you get the project set up simply navigation to Home.mvc/Index (which has a '\_B' view also) and you can click around there for a while. You can then navigation to Home.mvc/SplitTestResults to see a sample of how the results are stored.

### Disclosure

This code was ripped quite aggressively from a much more comprehensive library and is intended only to illustrate the technique described here. I highly suggest you do not use the code in production until you are happy with its stability.

### Potential

I have been using this technique now for 2 months and have found it a fantastic way to measure true user acceptance of new features. I also know that there is no other open source solution for asp.net mvc that allows you to do split testing efficiently so if you would like to work with me on getting this code production ready as an open source project let me know and I'll be more than happy to spend a bit more time making this code a bit more robust and creating a project for it,

Thanks

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software_development.html "software development") Manager [PicNet Pty Ltd](https://picnet.com.au/)
