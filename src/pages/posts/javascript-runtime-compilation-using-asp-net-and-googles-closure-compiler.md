---
title: "Javascript runtime compilation using Asp.Net and Google's Closure Compiler"
slug: "javascript-runtime-compilation-using-asp-net-and-googles-closure-compiler"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1260403200000"
date: "2009-12-10"
categories: 
  - "software-engineering"
---

### Overview

Working on complex javascript projects usually means working with lots of javascript files. When it comes time to deploy this to production it can be be very tedious and sometimes dangerous to do this manually. This solution compiles all the javascript files in a directory to a single minified file ideal for release. This code will also automatically recompile this file if any of the files change.

### Code



<pre>///
<summary> /// This class will compile (using Google's Closure Compiler) a directory of javascript files if: /// - In Release Mode /// - The release (minified) file is older than other files in the directory (stale) /// - Not on localhost (Google cannot access your files) /// </summary>
public class JavascriptRuntimeCompiler { private static readonly ILog log = LogUtil.Logger(typeof (JavascriptRuntimeCompiler)); private const string CACHE_MARKER = "CACHE_MARKER"; private readonly string releaseFileName; private readonly string baseScriptsUri; private readonly HttpContextBase context; private FileInfo releaseFile; ///
<div></div>
<summary> /// Creates the JavascriptRuntimeCompiler. It is safe to create this per request as it is very efficient and /// will only create the new minified file if required. /// </summary>
<div></div>
&nbsp;
<div></div>
/// The relative file name of the release minified file. Eg: 'mydir\scripts\myscript.min.js' /// The relative uri of the directory holding the javascript files. Eg: '~/mydir/scripts/'. It is safe /// for this to be the same directory as the one holding the release file. /// /// The HttpContextBase object (Asp.Net Mvc) public JavascriptRuntimeCompiler(string releaseFileName, string baseScriptsUri, HttpContextBase context) { this.releaseFileName = context.Request.PhysicalApplicationPath + releaseFileName; this.baseScriptsUri = context.Request.Url.GetLeftPart(UriPartial.authorsity) + baseScriptsUri; this.context = context; } ///
<div></div>
<summary> /// Wether to use the release script or not. If true ensure your page points to your release file. If false /// your page should reference all of the debug scripts. /// </summary>
<div></div>
&nbsp;
<div></div>
public bool UseReleaseScript() { bool debug = false; #if (DEBUG) debug = true; #endif if (debug || baseScriptsUri.IndexOf("localhost") &gt;= 0) { return false; } CheckReleaseScriptValidity(); return true; } private void CheckReleaseScriptValidity() { releaseFile = new FileInfo(releaseFileName); if (releaseFile.Exists &amp;&amp; !IsReleaseFileOutOfDate()) { return; } RebuildReleaseScriptFile(); // This marker allows us to do a date check on all the files that the minified release file depends on context.Cache.Add(CACHE_MARKER, new Object(), new CacheDependency(GetJSFiles()), Cache.NoAbsoluteExpiration, Cache.NoSlidingExpiration, CacheItemPriority.Normal, null); } private bool IsReleaseFileOutOfDate() { if (context.Cache[CACHE_MARKER] != null) { return false; } DateTime releaseFileDate = releaseFile.LastWriteTime; foreach (string s in GetJSFiles()) { if (File.GetLastWriteTime(s) &gt; releaseFileDate) { return true; } } return false; } private void RebuildReleaseScriptFile() { string uri = "http://closure-compiler.appspot.com/compile?compilation_level=SIMPLE_OPTIMIZATIONS&amp;output_format=text&amp;output_info=compiled_code"; foreach (string f in GetJSFiles()) { uri += "&amp;code_url=" + baseScriptsUri + f.Substring(f.LastIndexOf("\\") + 1); } log.Debug("Requesting Compiler: " + uri); WebRequest r = WebRequest.Create(uri); r.Method = "POST"; r.ContentLength = 0; using (Stream s = r.GetResponse().GetResponseStream()) { using (StreamReader sr = new StreamReader(s, Encoding.UTF8)) { string content = sr.ReadToEnd(); log.Info(content); FileUtils.WriteFileContents(releaseFileName, Encoding.UTF8.GetBytes(content)); } } } private static string[] cached_js_files; private string[] GetJSFiles() { if (cached_js_files != null) return cached_js_files; List jsFiles = new List(); if (releaseFile.Directory == null) throw new ApplicationException(); foreach (FileInfo f in releaseFile.Directory.GetFiles()) { if (f.Name.Equals(releaseFile.Name) || f.Extension != ".js") { continue; } jsFiles.Add(f.FullName); } return cached_js_files = jsFiles.ToArray(); } }
</pre>



### Using this Class

This example uses Asp.Net Mvc and the Spark view engine. However it should be trivial to change the above file or this example to use any other framework.

<pre>&lt;if condition="new JavascriptRuntimeCompiler('resources\\scripts\\custom\\scripts.min.js', Url.Content('~/resources/scripts/custom/'), Context).UseReleaseScript()"&gt;
    &lt;script language="javascript" src="${ Url.Content('~/resources/scripts/custom/scripts.min.js') }"&gt;&lt;/script&gt;            
&lt;/if&gt;
&lt;else&gt;
    &lt;script language="javascript" src="${ Url.Content('~/resources/scripts/custom/Util.js') }"&gt;&lt;/script&gt;    
    &lt;script language="javascript" src="${ Url.Content('~/resources/scripts/custom/Class1.js') }"&gt;&lt;/script&gt;    
    &lt;script language="javascript" src="${ Url.Content('~/resources/scripts/custom/Class2.js') }"&gt;&lt;/script&gt;    
    &lt;script language="javascript" src="${ Url.Content('~/resources/scripts/custom/Class3.js') }"&gt;&lt;/script&gt;                
&lt;/else&gt;</pre>

Thanks

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software-development.html) Manager [PicNet Pty Ltd](https://picnet.com.au/)
