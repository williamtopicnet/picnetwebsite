---
title: "Angular2 (NG2) Focus Directive"
slug: "angular2-ng2-focus-directive"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1474329600000"
date: "2016-09-20"
categories: 
  - "software-engineering"
---

Requesting focus on an input field is surprisingly hard in angular2. Especially when the input field is inside a dialog or an \*ngIf that is not initially visible.

After much trial and error this is the solution I came up with. It works on my machine and my scenarios, no other guarantees provided:

<pre>import {Directive, AfterViewInit, ElementRef, DoCheck} from '@angular/core';
<div></div>
@Directive({ selector: '[autofocus]' })
export class Autofocus implements AfterViewInit, DoCheck {
 private lastVisible: boolean = false;
 private initialised: boolean = false;
 constructor(private el: ElementRef) {}
<div></div>
ngAfterViewInit() {
 this.initialised = true;
 this.ngDoCheck(); 
}
<div></div>
ngDoCheck() { 
 if (!this.initialised) { return; }
 const visible = !!this.el.nativeElement.offsetParent;
 if (visible &amp;&amp; !this.lastVisible) { 
 setTimeout(() =&gt; { this.el.nativeElement.focus(); }, 1);
 }
 this.lastVisible = visible;
 }
}</pre>

This directive hooks into the change detection loop and on iteration checks whether the input element marked with the attribute \`\[autofocus\]\` has become visible. If so then we request focus.

It appears to work, however there may be scenarios and edge cases where this approach is too simplistic. Give it a go and let me know how it goes.
