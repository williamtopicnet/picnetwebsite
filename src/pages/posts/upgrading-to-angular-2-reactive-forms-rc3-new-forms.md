---
title: "Upgrading to Angular 2 - Reactive Forms (RC3 New Forms)"
slug: "upgrading-to-angular-2-reactive-forms-rc3-new-forms"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1467244800000"
date: "2016-06-30"
categories: 
  - "software-engineering"
---

Upgrading to new the new form engine in Angular 2 (RC3) is fairly straight forward and not nearly as dawnting as some of the router changes in the past. So here is my quick and dirty how to which worked on my projects (no other guarantee).

**Firstly - Read the docs** One of the issues with working in this beta/RC arena is that the documentation of these things is quite hard to find. The best doc I found about this is here: [https://docs.google.com/document/u/1/d/1RIezQqE4aEhBRmArIAS1mRIZtWFf6JxN\_7B4meyWK0Y/pub](https://docs.google.com/document/u/1/d/1RIezQqE4aEhBRmArIAS1mRIZtWFf6JxN_7B4meyWK0Y/pub) Read that, it basically has all you need towards the bottom.

**npm packages.json** When you upgrade to RC3 you will need to run:

<pre>npm install --save @angular/forms</pre>

This will install your latest form.

**Gulp** Update your gulp script and ensure the new forms files are copied to your testing directory.

**System.js** Update your system JS to include this new forms folder. Since System.js can be configured a million ways I will just show what I added to my config:

<pre>packages: {
 ...,
'@angular/forms' : {defaultExtension: 'js', main: 'index.js'}
},
map : {
 ...,
 '@angular/forms' : 'lib/@angular/forms'
}</pre>

**Bootstrapper** In your boot.ts or app.ts add the following:

<pre>...
import {disableDeprecatedForms, provideForms} from '@angular/forms';
...
<div></div>
bootstrap(AppComponent, [
...
 disableDeprecatedForms(),
 provideForms()
]);</pre>

**Templates:** Search and replace your templates for the following:

<pre>ngFormModel -&gt; formGroup
ngSwitchWhen -&gt; ngSwitchCase (not really new forms but RC3 so do it anyway)
ngFormControl -&gt; formControl</pre>

That's all I had to do, but according to "the doc" you should also do the following (note, I did not test these):

<pre>REACTIVE_FORM_DIRECTIVES:
...
formControlName (deprecated: ngControl)
formGroupName (deprecated: ngControlGroup)
formArrayName (deprecated: ngControlGroup)</pre>

 

**Components** In your components remove all the old form related imports, these would be coming from @angular/common probably. The ones I removed are:

<pre>Control, ControlGroup, FormBuilder, Validators</pre>

And then replace with the new directives/components from @angular/forms. The new names are:

<pre>FormControl() (deprecated: Control)
FormGroup() (deprecated: ControlGroup)
FormArray() (deprecated: ControlArray)
FormBuilder (same)
Validators (same)</pre>

All directives are included in the single _REACTIVE\_FORM\_DIRECTIVES_ so just add this to your @Component.directives array. Then remember to search and replace component your code for the following.

<pre>ControlGroup -&gt; FormGroup
ControlArray -&gt; FormArray
Control -&gt; FormControl</pre>

**Conclusion** Very straight forward once you find "the doc" (the magical doc).
