---
title: "Upgrading from Angular 2 beta 17 to Angular 2 RC1"
slug: "upgrading-from-angular-2-beta-17-to-angular-2-rc1"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1462838400000"
date: "2016-05-10"
categories: 
  - "software-engineering"
---

Upgrading through the angular2 betas has been a bit of a pain with lots of breaking changes but it seemed manageable. However, upgrading to RC1 was bad… So in the hopes of helping others here is my step by step guide. Please note: This works on my project. If you have other dependencies I do not use this may not work for you.

 

## package.json

To upgrade package.json remove "angular2": "^2.0.0-beta.17" and replace with:

> "@angular/common": "2.0.0-rc.1",
> 
> "@angular/compiler": "2.0.0-rc.1",
> 
> "@angular/core": "2.0.0-rc.1",
> 
> "@angular/http": "2.0.0-rc.1",
> 
> "@angular/platform-browser": "2.0.0-rc.1",
> 
> "@angular/platform-browser-dynamic": "2.0.0-rc.1",
> 
> "@angular/router": "2.0.0-rc.1",
> 
> "@angular/router-deprecated": "2.0.0-rc.1",
> 
> "@angular/upgrade": "2.0.0-rc.1"

 

Also ensure these dependencies are also at compatible versions:

> "es6-promise": "^3.0.2",
> 
> "es6-shim": "^0.35.0",
> 
> "reflect-metadata": "0.1.2",
> 
> "rxjs": "^5.0.0-beta.6",
> 
> "systemjs": "^0.19.8",
> 
> "zone.js": "^0.6.12"

 

Delete your node\_modules directory

Run npm install to set up new dependencies

 

## Build

Update your build tool to copy [node\_modules/@angular/\*\*/index.js](mailto:node_modules/@angular/**/index.js) to your application directory. If you read your libraries straight from node\_modules then this step is not required.

 

## Index.html

I use index.html to set up my system.js so here is how to get going:

Remove old angular2 scripts, mine were:

> <script src="lib/angular2.dev.js"></script> <!-- TODO: angular2.min.js does not work -->
> 
> <script src="lib/router.min.js"></script>
> 
> <script src="lib/http.min.js"></script>

 

And this is my copy of my System.js configuration:

> System.config({
> 
> packages: {
> 
> 'app' : {format: 'register', defaultExtension: 'js'},
> 
> '@angular/core' : {defaultExtension: 'js', main: 'index.js'},
> 
> '@angular/common' : {defaultExtension: 'js', main: 'index.js'},
> 
> '@angular/compiler' : {defaultExtension: 'js', main: 'index.js'},
> 
> '@angular/router' : {defaultExtension: 'js', main: 'index.js'},
> 
> '@angular/router-deprecated' : {defaultExtension: 'js', main: 'index.js'},
> 
> '@angular/http' : {defaultExtension: 'js', main: 'index.js'},
> 
> '@angular/platform-browser' : {defaultExtension: 'js', main: 'index.js'},
> 
> '@angular/platform-browser-dynamic': {defaultExtension: 'js', main: 'index.js'}
> 
> },
> 
> map: {
> 
> '@angular/core' : 'lib/@angular/core',
> 
> '@angular/common' : 'lib/@angular/common',
> 
> '@angular/compiler' : 'lib/@angular/compiler',
> 
> '@angular/router' : 'lib/@angular/router',
> 
> '@angular/router-deprecated' : 'lib/@angular/router-deprecated',
> 
> '@angular/http' : 'lib/@angular/http',
> 
> '@angular/platform-browser' : 'lib/@angular/platform-browser',
> 
> '@angular/platform-browser-dynamic': 'lib/@angular/platform-browser-dynamic'
> 
> }
> 
> });

## Imports

Now the fun part, lets fix all the broken angular imports:

import {bootstrap} from 'angular2/platform/browser' -> import {bootstrap} from '@angular/platform-browser-dynamic'

import … from ‘angular2/router’ -> import … from '@angular/router-deprecated';

You can safely do a search and replace for “from ‘angular2/” -> “from ‘@angular/”

 

 

## A note on router

I am using router-deprecated as changing to the new router is evil and beyond the scope or sanity of this document and developer.

For deprecated router to work you still need to add the following:

Ensure you have this as one of your application providers: provide(APP\_BASE\_HREF, { useValue: '/' }). Example:

> import {APP\_BASE\_HREF} from '@angular/common';
> 
> import {provide} from '@angular/core';
> 
> import {ROUTER\_PROVIDERS} from '@angular/router-deprecated';
> 
> …
> 
> @Component({
> 
> selector: 'app',
> 
> templateUrl: 'app/layout/app.html',
> 
> directives: \[ROUTER\_DIRECTIVES\],
> 
> providers: \[ROUTER\_PROVIDERS, provide(APP\_BASE\_HREF, { useValue: '/' })\]
> 
> })

Hope the pain in the last few hours at least helps someone out there. And please do not try to upgrade to the new router yet. It is nasty!
