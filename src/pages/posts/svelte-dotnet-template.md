---
title: ".Net / IIS – Svelte Project Template"
slug: "svelte-dotnet-template"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1660089600000"

date: "2022-08-10"
categories: 
  - "software-engineering"
tags: 
  - "dotnet"
  - "svelte"
  - "template"
---

<img src="/images/1200px-Svelte_Logo.svg_-374x450.png" width=159 height=191 alt="">

We recently [published](https://github.com/gatapia/svelte_dotnet) a simple, lightweight project template to help you start building a Svelte SPA (Single Page App) with a .Net backend, all hosted in IIS.

Github Link: [https://github.com/gatapia/svelte\_dotnet](https://github.com/gatapia/svelte_dotnet)

 

**Overview**

This project will get you started with the following tech stack:

- [Svelte](https://svelte.dev/docs)
- [SvelteKit](https://kit.svelte.dev/docs/introduction): Mainly just for routing
- [Carbon Design System](https://www.carbondesignsystem.com/): This can easily be replaced by your preferred UI framework
- [.Net 6.0](https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-6)
- [Hosted on IIS](https://www.iis.net/)
    - **Requires** the [IIS URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite)

 

**SPA vs SSR**

This template is for building single-page apps (SPAs). It disables SSR (server-side rendering) and other features offered by SvelteKit.  So, if you need SSR, consider using SvelteKit as your server technology and not .Net.

 

**Why .Net and not SvelteKit**

Sometimes your customer chooses the stack. Sometimes you have to work with existing APIs. This project is another option for using Svelte with a .Net backend. If you don't have these limitations, I recommend sticking to SvelteKit on the backend.

 

**Technical Details**

 <u class="undeline">Web.release.config</u>

This project includes a _Web.release.config_ that adds some rewrite rules to allow proper server-side route handling. These rewrite rules are:

<pre>&lt;rule name="sveltekit routes" stopProcessing="true"&gt;
&lt;match url="^/(.+)/.*"/&gt;
&lt;conditions logicalGrouping="MatchAll"&gt;
&lt;add input="{REQUEST_URI}" pattern="^/.+/(api|_app)/" negate="true"/&gt;
&lt;/conditions&gt;
&lt;action type="Rewrite" url="/{R:1}/" appendQueryString="true"/&gt;
&lt;/rule&gt;</pre>

 

These rewrite rules are only included in the release build of the project as local development using the SvelteKit dev server does not require it.

 

<u class="undeline">CORS for Development</u>

When using the SvelteKit development server, you need to enable CORS. This change is done only in DEBUG mode and is safe in release mode.

 

<u class="undeline">ASP.Net Minimal API</u>

The project uses the [ASP.Net Minimal API](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-6.0) to remove as much boilerplate as possible.

 

<u class="undeline">NUnit</u>

The project uses [NUnit](https://nunit.org/) for server-side unit tests, which can easily be swapped out with your preferred testing framework.

 

<u class="undeline">Release Scripts</u>

The project includes two release scripts. These are _release.bat_ and _release\_web.bat_. These scripts help set up a release directory that can be deployed to IIS.

_release.bat_: This script builds the .Net backend in release mode. It also builds the Svelte frontend. The entire build is included in the _.\\release_ directory. The contents of this directory can then be deployed to IIS.

**Note:** It is possible to point IIS directly to the _.\\release_ directory, but this will lock the .Net files in this directory. So further _release.bat_ runs will require killing the _w3wp.exe_ process.

If you want to update the Svelte component in the _.\\release_ directory, run _release\_web.bat._ This script does not require killing the IIS process.

 

<u class="undeline">svelte.config.js</u>

The following changes were made to the _svelte.config.js_ file:

- Using the _@sveltejs/adapter-static_ adapter, making the site a single-page application
- In release mode, sets the _paths.base_ directory to the virtual directory/application name in IIS. **Note:** This has to be hardcoded, so please change this to your directory name.

 

<u class="undeline">Carbon Design System</u>

We currently use [Carbon](https://carbon-components-svelte.onrender.com/), [SMUI](https://sveltematerialui.com/) and [Tailwind](https://tailwindcss.com/docs/guides/sveltekit) for some of our projects. We chose to publish this template with Carbon as it's probably the most "productive" framework,  with many components that just "work". However, it lacks some flexibility and customizability. This framework can easily be replaced with your preferred framework. Just use NPM and make the required changes in the _svelte.config.js_ file.

 

**Getting Started**

See the [Getting Started](https://github.com/gatapia/svelte_dotnet) section in the _readme.md_ to get started.

 

**Disclaimer**

This project is published to help you start quickly with Svelte and .Net. There is no commitment to keep this project updated with the latest libraries or to offer support. Please ask any .Net or Svelte-related questions in [Stackoverflow](https://stackoverflow.com/).
