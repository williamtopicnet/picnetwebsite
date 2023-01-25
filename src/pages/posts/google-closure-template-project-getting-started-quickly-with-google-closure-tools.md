---
title: "Google Closure Template Project - Getting Started Quickly with Google Closure Tools"
slug: "google-closure-template-project-getting-started-quickly-with-google-closure-tools"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1287100800000"
date: "2010-10-15"
categories: 
  - "software-engineering"
---

One of the hardest things about getting started properly with [Google Closure Tools](http://code.google.com/closure/) is that it has a huge amount of framework boilerplate that needs to be organised in order to write your first line of code. I have found that the effort is definately worthwhile but the process can definatelly be simplified. These views are shared by many in the community and projects like [plovr](http://plovr.com/) from Michael Bolin (authors of the most awesome [Closure: The Definitive Guide](http://www.amazon.com/Closure-Definitive-Guide-Michael-Bolin/dp/1449381871/ref=sr_1_1?ie=UTF8&s=books&qid=1287087880&sr=8-1)) offer alternatives to get started in a more efficient and intuitive way.

I created this sample project to get you going on your own closure project very quickly. I did not use plovr as I'm not a fan of the additional server (hence additional deployment step, hence one more thing that can go wrong) design.

To get started with this sample project you need to do the following:

1. Download [this zip](https://picnet.com.au/blogs/guido/files/2010/10/closure_template_project.zip) and extract somewhere on your dev box <installdir>.
2. [Download (if required) python 2.6 or 2.7](http://www.python.org/download/). Note: do not download 3+ as the calcdeps.py script does not work in 3 without modifications.
3. SVN Checkout 'http://closure-library.googlecode.com/svn/trunk' to <installdir>\\lib\\closure-library (which is currently empty). You may want to set up externals if you are using svn in your project. Once this step is completed you should have the following directory tree in your project <installdir>.
    - <installdir>\\src\\...
    - <installdir>\\lib\\soy\\...
    - <installdir>\\lib\\closure-library\\
    - <installdir>\\lib\\closure-library\\closure\\...
    - <installdir>\\lib\\closure-library\\third\_party\\...
4. Edit <installdir>\\build.bat, ensure python install path is correct
5. Run <installdir>\\build.bat
6. If everything above worked and both <installdir>\\index.html and <installdir>\\index.compiled.html show the following text:**Sum****Expected Value**: 15**Actual Value**: 15

Thats it, you have a running closure project, you can now use goog.require / goog.provide in your own source and have the above scripts manage all your dependencies. You can also use soy templates without any additional work.

Now just look around the code and familiarise yourself with the structure of the code. I'll go through the main items here:

**build.bat:** The build file. I used a windows batch file as using Ant is too java specific, using NAnt or MSBuild is too .Net specific. Apologies to non win people but changing this to any other build tool should be very easy.

**externs.js**: If your source requires access to external APIs then they need to be defined in this file. See here for documentation on extern files (http://code.google.com/closure/compiler/docs/api-tutorial3.html)

**index.html:** A development html file. This is used in development mode to debug your application.

**index.compiled.html:** Production html file. This file includes the compiled javascript and soy files

**requirements.js:** This file defines the entry point into the application. This is required as the closure compiler and calcdeps.py do not accept html files as valid input files.

**deps.js**: This file is created during the build process and its role is to define the dependencies of the application. This dependency tree is used in development mode (index.html) to load all the neccessary js files.

**lib\\:** Contains the compiler, the closure library, soy library files, etc

**lib\\closure-library\\:** An svn extern link to http://closure-library.googlecode.com/svn/trunk (**You need to set this up yourself** as its 20+ MB)

**src\\:** Your source code. It is recommended you use a Java like namespace directory structure. Eg. Class picnet.ui.tools.Grid should live in src\\picnet\\ui\\tools\\Grid.js file. Note: google use lowercase file names (i.e. grid.js) but this makes little sense to me so I choose to spit in the face of conventions.

Thanks All

Guido Tapia
