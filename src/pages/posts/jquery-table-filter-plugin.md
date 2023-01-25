---
title: "JQuery Table Filter Plugin"
slug: "jquery-table-filter-plugin"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1246233600000"
date: "2009-06-29"
categories: 
  - "software-engineering"
---

This project has moved. New [Home Page](https://picnet.com.au/picnet-table-filter.html)

**Update 1/Mar/2010** _The home page for this project is now at_ [_https://picnet.com.au/picnet-table-filter.html_](https://picnet.com.au/picnet-table-filter.html)

#### Was this plugin useful for you?

The PicNet Table Filter is free, so we appreciate if you would help us out by [recommending us on LinkedIn](http://www.linkedin.com/company/picnet-pty-ltd/software-development-1438/product?prdId=1438 "This will take you to our LinkedIn Software Development Page where you can click the 'Recommend' button").

Alternatively, write us a review on [Google Places](http://maps.google.com.au/maps/place?hl=en&ie=UTF8&q=it+services&fb=1&gl=au&hq=it+services&hnear=Sydney+New+South+Wales&cid=1017568245182759495&z=14) mentioning how the Table Filter helped your project. Finally, you can [follow us on Twitter](http://twitter.com/picnetit) or [subscribe to our YouTube channel](http://www.youtube.com/picnettv).

**Update 11/Feb/2010** _I will be moving this project to_ [_its own page_](https://picnet.com.au/picnet-table-filter.html) _with the source code at_ _[github](https://github.com/PicNet/tablefilter)_ _very shortly. This is because this project has taken on a life of its own and I personally don't want to be the only mantainer (having very limited time). So I'm sending a call out to anyone that wants to participate on the ongoing development of this project. Please email me (guido.tapia@picnet.com.au) if you would like to be a developer of this project. Note: I assume very little time will be required._

_Once the new site is ready this blog post will be sanitized (links removed and comments closed) as everything will live on the new site._

### Introduction

This **jQuery table filter** plugin adds column filtering capabilities to a regular <table> by adding a row to the <thead> section of a table and adding filters that allows real time filtering of tabular data. Download this demo bundle for a quick start.

Note: We use this library in the production of many of our [software development](https://picnet.com.au/software-development.html) projects so it is production ready.

### Demo

A simple demo page.

### Getting Started

This plugin uses several other popular plugins so you will need to download these plugins before starting.

- [jquery](http://jquery.com/)
- [jquery.cookie](http://plugins.jquery.com/project/Cookie)
- picnet.jquery.tablefilter

You can also use this [packed version of the scripts.](https://picnet.com.au/blogs/guido/files/2009/06/scripts-pack.js) These plugins will then need to be referenced in the <head> section of your page.

<pre>&lt;script type="text/javascript" src="Scripts/jquery-1.3.2.min.js"&gt;&lt;/script&gt;
<div></div>
&lt;script type="text/javascript" src="Scripts/jquery.cookie.js"&gt;&lt;/script&gt;   
<div></div>
&lt;script type="text/javascript" src="Scripts/picnet.jquery.tablefilter.js"&gt;&lt;/script&gt;</pre>

Or (For Production Code)

<pre>&lt;script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.3.2.min.js" type="text/javascript"&gt;&lt;/script&gt;    
<div></div>
&lt;script type="text/javascript" src="Scripts/scripts-pack.js"&gt;&lt;/script&gt;</pre>

This plugin will then create the filters in a row in the THEAD element of the table so add this if it is not already there.

<pre>&lt;table id='demotable'&gt;        
<div></div>
    &lt;thead&gt;
<div></div>
        &lt;tr&gt;&lt;th&gt;Col1&lt;/th&gt;&lt;th&gt;Col2&lt;/th&gt;&lt;th&gt;Col3&lt;/th&gt;&lt;/tr&gt;        
<div></div>
    &lt;/thead&gt;
<div></div>
    &lt;tbody&gt;
<div></div>
        &lt;tr&gt;&lt;td&gt;Value 1&lt;/th&gt;&lt;th&gt;Value 2&lt;/th&gt;&lt;th&gt;Value 3&lt;/th&gt;&lt;/tr&gt;        
<div></div>
        ....
<div></div>
    &lt;/tbody&gt;
<div></div>
&lt;/table&gt;</pre>

Hook in your table when the document is loaded.

<pre>$(document).ready(function() {
<div></div>
    $('#demotable).tableFilter();
<div></div>
});</pre>



### Filter Types

Currently the picnet.jquery.tablefilter.js only supports two kinds of filters. The first and default is 'text' which just produces a text box for context sensitive text matches. The second is 'ddl', this produces a drop down list that allows the selection of a single item in that list. To specify the filter type simply add "filter-type='ddl'" in the header cell of the required column. I.e.

<pre>&lt;table id='demotable'&gt;        
<div></div>
    &lt;thead&gt;
<div></div>
        &lt;tr&gt;&lt;th&gt;Col1&lt;/th&gt;&lt;th&gt;Col2&lt;/th&gt;&lt;th filter-type='ddl'&gt;Col3&lt;/th&gt;&lt;/tr&gt;        
<div></div>
    &lt;/thead&gt;
<div></div>
    &lt;tbody&gt;
<div></div>
        &lt;tr&gt;&lt;td&gt;Value 1&lt;/th&gt;&lt;th&gt;Value 2&lt;/th&gt;&lt;th&gt;Value 3&lt;/th&gt;&lt;/tr&gt;        
<div></div>
        ....
<div></div>
    &lt;/tbody&gt;
<div></div>
&lt;/table&gt;</pre>



## Options

We can also pass an options object to control some basic behaviours of the tableFilter. The current supported options are.

- **additionalFilterTriggers:** These are additional input controls that will be hooked in to the filter code. Currently only type='text' and type='checkbox' controls are supported.
- **clearFiltersControls:** Controls that onclick will clear all of the filter values (including additionalFilterTriggers).
- **matchingRow:** function(state, tr, textTokens) { ... } These event will allow you to determine wether a matching row is actually correctly matching. This event will be called when a row is considered to have matched the filter, returning false will override this assumtion and hide the row from the results.
- **matchingCell:** function(state, td, textTokens) { ... } This event behaves the same as the one above but allows more granular overriding capabilities. Returning false will again override the default match logic.

### Example 1: Adding an additional whole row filter

Lets suppose that appart from having column filters we also want to have a quick find style filter that matches any cell in a row. To do this simply add the textbox to the _additionalFilterTriggers_ array. TODO

<pre>&lt;head&gt;
<div></div>
    ...
<div></div>
    &lt;script type="text/javascript"&gt;  
<div></div>
    $(document).ready(function() {
<div></div>
        // Initialise Plugin
<div></div>
        var options = {
<div></div>
            additionalFilterTriggers: [$('#quickfind')]
<div></div>
        };
<div></div>
        $('#demotable).tableFilter(options);
<div></div>
    });
<div></div>
    &lt;/script&gt;
<div></div>
&lt;/head&gt;
<div></div>
&lt;body&gt;
<div></div>
    Quick Find: &lt;input type="text" id="quickfind"/&gt;
<div></div>
    &lt;table id='demotable'&gt;        
<div></div>
        &lt;thead&gt;
<div></div>
            &lt;tr&gt;&lt;th&gt;Col1&lt;/th&gt;&lt;th&gt;Col2&lt;/th&gt;&lt;th&gt;Col3&lt;/th&gt;&lt;/tr&gt;        
<div></div>
        &lt;/thead&gt;
<div></div>
        &lt;tbody&gt;
<div></div>
            &lt;tr&gt;&lt;td&gt;Value 1&lt;/th&gt;&lt;th&gt;Value 2&lt;/th&gt;&lt;th&gt;Value 3&lt;/th&gt;&lt;/tr&gt;        
<div></div>
            ...
<div></div>
        &lt;/tbody&gt;
<div></div>
    &lt;/table&gt;
<div></div>
    ...</pre>



### Example 2: Adding an additional checkbox filter

Let’s suppose that we have a Boolean column that we want to filter. The best way to do this will be to add a checkbox filter so let’s do this. We will keep the quick find filter to show how to have multiple additional filters.

<pre>&lt;head&gt;
<div></div>
    ...
<div></div>
    &lt;script type="text/javascript"&gt;
<div></div>
    $(document).ready(function() {
<div></div>
         // Initialise Plugin
<div></div>
        var options = {
<div></div>
            additionalFilterTriggers: [$('#onlyyes'), $('#quickfind')],
<div></div>
            matchingRow: function(state, tr, textTokens) {
<div></div>
                if (!state || state.id != 'onlyyes') { return true; }
<div></div>
                return state.value != true || tr.children('td:eq(2)').text() == 'yes';
<div></div>
            }
<div></div>
        };
<div></div>
         $('#demotable').tableFilter(options);
<div></div>
    });
<div></div>
&lt;
<div></div>
p&gt;    &lt;/script&gt;
<div></div>
&lt;/head&gt;
<div></div>
&lt;body&gt;    
<div></div>
    Only Show Yes: &lt;input type="checkbox" id="onlyyes"/&gt;
<div></div>
    &lt;br/&gt;
<div></div>
    Quick Find: &lt;input type="text" id="quickfind"/&gt;
<div></div>
    &lt;table id='demotable'&gt;        
<div></div>
        &lt;thead&gt;
<div></div>
            &lt;tr&gt;&lt;th&gt;Col1&lt;/th&gt;&lt;th&gt;Col2&lt;/th&gt;&lt;th&gt;Boolean Col3&lt;/th&gt;&lt;/tr&gt;        
<div></div>
        &lt;/thead&gt;
<div></div>
        &lt;tbody&gt;
<div></div>
            &lt;tr&gt;&lt;td&gt;Value 1&lt;/th&gt;&lt;th&gt;Value 2&lt;/th&gt;&lt;th&gt;yes&lt;/th&gt;&lt;/tr&gt;        
<div></div>
            ...
<div></div>
        &lt;/tbody&gt;
<div></div>
    &lt;/table&gt;
<div></div>
    ...</pre>



### Example 3: Clear Filters

Having a clear filters button comes in very handy, especially when you have a table with a larger number of columns. To add this functionality simply add your clickable control to the _clearFiltersControls_ array.

<pre>&lt;head&gt;
<div></div>
    ...
<div></div>
    &lt;script type="text/javascript"&gt;
<div></div>
        $(document).ready(function() {        
<div></div>
            // Initialise Plugin
<div></div>
            var options = {
<div></div>
                clearFiltersControls: [$('#cleanfilters')],            
<div></div>
            };
<div></div>
            $('#demotable').tableFilter(options);
<div></div>
        });
<div></div>
    &lt;/script&gt;
<div></div>
&lt;/head&gt;
<div></div>
&lt;body&gt;
<div></div>
    &lt;a id="cleanfilters" href="#"&gt;Clear Filters&lt;/a&gt;
<div></div>
    &lt;br/&gt;    
<div></div>
    &lt;table id='demotable'&gt;        
<div></div>
        &lt;thead&gt;
<div></div>
            &lt;tr&gt;&lt;th&gt;Col1&lt;/th&gt;&lt;th&gt;Col2&lt;/th&gt;&lt;th&gt;Col3&lt;/th&gt;&lt;/tr&gt;        
<div></div>
        &lt;/thead&gt;
<div></div>
        &lt;tbody&gt;
<div></div>
            &lt;tr&gt;&lt;td&gt;Value 1&lt;/th&gt;&lt;th&gt;Value 2&lt;/th&gt;&lt;th&gt;Value 3&lt;/th&gt;&lt;/tr&gt;        
<div></div>
            ...
<div></div>
        &lt;/tbody&gt;
<div></div>
    &lt;/table&gt;
<div></div>
...</pre>



### Known Limitations

- More custom filter types needed (such as multi select lists, radio lists, etc)
- No support for custom additional filters other than checkbox.

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)**, [Software Development](https://picnet.com.au/software_development.html) Manager

[PicNet Pty Ltd](https://picnet.com.au/)
