---
title: "Annotated, Google Closure Javascript Compiler - Visual Studio Snippets"
slug: "annotated-google-closure-javascript-compiler-visual-studio-snippets"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1275523200000"
date: "2010-06-03"
categories: 
  - "software-engineering"
---

I have spoken [in the past](https://picnet.com.au/blogs/Guido/post/2009/12/10/Javascript-runtime-compilation-using-AspNet-and-Googles-Closure-Compiler.aspx) about my great respect for the [closure project](http://code.google.com/closure/). This project brings some semblance of order to the chaotic and dangerous world of large application javascript development. However it also has some problems, the biggest of this being the fact that it is very verbose. [This small set of Visual Studio 2010 snippets](http://closuresnippets.codeplex.com) aims to aliviate that issue when developing in VS2010. I have been using a similar set of these snippets in production for many months (in the [Mouse Eye Tracking service](http://met.picnet.com.au/)) and whilst not being industrial strength they are ready for you to get some efficiencies from.

**Why Visual Studio?**

At [PicNet](https://picnet.com.au) most of our server side code is .Net so when developing html and javascript we also use Visual Studio (saves opening up a new IDE). However the snippet template language is just XML so if you are interested in doing an XSLT into another language please [get in contact with me](mailto://guido.tapia@picnet.com.au) and we can bring that into the project also.

**How to install**

- Download [the vsi file](http://closuresnippets.codeplex.com/releases/)
- Run (double click - will be recognized by Visual Studio) and install
- Ready to use (by typing the shortcut name followed by TAB)

_Note_: The [VSI file is just a zip file](http://msdn.microsoft.com/en-us/library/ms246580(VS.80).aspx) with the extension renamed so if you are worried about running strange files just rename to .zip and import the snippets manually into the IDE.

**Current Snippets**

| Shortcut | Content | Declarations |
| --- | --- | --- |
| jsclass | 

<pre>/**
 * @fileoverview $classcomments$
 *
 */
goog.provide('$namespace$.$classname$');
goog.require('$require$');
/**
 * @constructor
 * @param {string} $param1$ A sample parameter.
 */
$namespace$.$classname$ = function($param1$) {
	$contents$
};</pre>

 | 
- classcomments: Comments describing this class
- namespace: The name of this class' namespace
- classname: The name of this class
- require: Classes to import
- param1: The name of the first constructor parameter.
- contents: The contents of the class.

 |
| jsconst | 

<pre>/**
 * @const
 * @type {$typename$}
 */
$namespace$.$constname$ = $constvalue$;</pre>

 | 

- typename: The type of this constant.
- namespace: The namespace that this constant resides in.
- constname: The name of this constant.
- constvalue: The value of this constant.

 |
| jsconstructor | 

<pre>/**
 * @constructor
 * @param {string} $param1$ A sample parameter.
 */
$namespace$.$classname$ = function($param1$) {
	$contents$
};</pre>

 | 

- namespace: The name of this class' namespace
- classname: The name of this class
- param1: The name of the first constructor parameter.
- contents: The contents of the class.

 |
| jsenum | 

<pre>/**
 * $enumcomments$
 * @enum {string}
 */
$namespace$.$enumname$ = {
  ON: 'on',
  OFF: 'off'
};</pre>

 | 

- enumcomments: Comments describing this enumeration
- namespace: The name of this class' namespace
- enumname: The name of this enumeration

 |
| jsextends | 

<pre>* @extends {$namespace$.$inherits$}</pre>

 | 

- namespace: The name of this class' namespace
- inherits: The name of the inherited class

 |
| jsimpclass | 

<pre>/**
 * @fileoverview $classcomments$
 *
 */
goog.provide('$namespace$.$classname$');
goog.require('$require$');
/**
 * @constructor
 * @implements {$namespace$.$implements$}
 * @param {string} $param1$ A sample parameter.
 */
$namespace$.$classname$ = function($param1$) {
	$contents$
};</pre>

 | 

- classcomments: Comments describing this class
- namespace: The name of this class' namespace
- classname: The name of this class
- implements: The name of the implemented interface
- require: Classes to import
- param1: The name of the first constructor parameter.
- contents: The contents of the class.

 |
| jsimplements | 

<pre>* @implements {$namespace$.$implements$}</pre>

 | 

- namespace: The name of this class' namespace
- implements: The name of the implemented interface

 |
| jsinherits | 

<pre>goog.inherits($namespace$.$classname$, $namespace$.$inherits$);</pre>

 | 

- namespace: The name of this class' namespace
- classname: The name of this class
- inherits: The name of the inherited class

 |
| jsinterface | 

<pre>/**
 * @fileoverview $interfacecomments$
 *
 */
goog.provide('$namespace$.$interfacename$');
goog.require('$require$');
/**
 * @interface
 */
$namespace$.$interfacename$ = function() {};
$namespace$.$interfacename$.prototype.$methodname$ = function() {};</pre>

 | 

- interfacecomments:
- namespace: The name of this interface's namespace
- interfacename: The name of this interface
- require: Classes to import
- methodname: A method definition in this interface.

 |
| jsparam | 

<pre>/**
 * @param {string} $param1$ A sample parameter.
 */</pre>

 | 

- param1: The name of this parameter.

 |
| jsparaminline | 

<pre>* @param {string|number=} $param1$ A sample parameter.</pre>

 | 

- param1: The name of this parameter.

 |
| jsprivate | 

<pre>		/**
		 * @type {$typename$}
     * @private
     */
    this.$attrname$ = $declaration$;</pre>

 | 

- typename: The name of thisattribute's type
- attrname: The name of this attribute
- declaration: The initial declaration of this attribute

 |
| jsprivateinline | 

<pre>* @private</pre>

 |  |
| jsprivatevar | 

<pre>		/**
		 * @type {$typename$}
     * @private
     */
    var $attrname$ = $declaration$;</pre>

 | 

- typename: The name of this attribute's type
- attrname: The name of this attribute
- declaration: The initial declaration of this attribute

 |
| jsprotected | 

<pre>		/**
		 * @type {$typename$}
     * @protected
     */
    this.$attrname$ = $declaration$;</pre>

 | 

- typename: The name of this attribute's type
- attrname: The name of this attribute
- declaration: The initial declaration of this attribute

 |
| jsprotectedinline | 

<pre>* @protected</pre>

 |  |
| jsprotomem | 

<pre>		/**
 * @param {*=} $param1$
 */
$namespace$.$classname$.prototype.$methodname$ = function($param1$) {
		return this.member * args;
};</pre>

 | 

- namespace: The name of this class' namespace
- classname: The name of this class
- methodname: The name of this method
- param1: The name of the sameple parameter

 |
| jsprovide | 

<pre>goog.provide('$namespace$.$classname$');</pre>

 | 

- namespace: The name of this class' namespace
- classname: The name of this class

 |
| jsrequire | 

<pre>goog.require('$namespace$.$require$');</pre>

 | 

- namespace: The name of this class' namespace
- require: Classes to import

 |
| jsreturn | 

<pre>* @return {string}</pre>

 |  |
| jssubclass | 

<pre>/**
 * @fileoverview $classcomments$
 *
 */
goog.provide('$namespace$.$classname$');
goog.require('$require$');
/**
 * @constructor
 * @extends {$namespace$.$inherits$}
 * @param {string} $param1$ A sample parameter.
 */
$namespace$.$classname$ = function($param1$) {
	$contents$
};
goog.inherits($namespace$.$classname$, $namespace$.$inherits$);</pre>

 | 

- classcomments: Comments describing this class
- namespace: The name of this class' namespace
- classname: The name of this class
- inherits: The name of the inherited class
- require: Classes to import
- param1: The name of the first constructor parameter.
- contents: The contents of the class.

 |
| jstypedef | 

<pre>/** @typedef {$type$} */
$namespace$.$typedefname$;</pre>

 | 

- namespace: The name of this class' namespace
- type: The composite type of this definition
- typedefname: The name of this typedef

 |

**License**

[MIT](http://en.wikipedia.org/wiki/MIT_License)

**Development**

If you are interested in helping mantain the source code, [let me know](mailto://guido.tapia@picnet.com.au) and we'll organise something.

Mantaining the code is very straight forward simply:

- [Download the latest source](http://closuresnippets.codeplex.com/SourceControl/list/changesets).
- Open the solution in visual studio
- Edit the snippets in the \\snippets directory
- F5 to build a new VSI file and the supporting documentation
- Install the VSI as described above to test your changes

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software_development.html "software development") Manager [PicNet Pty Ltd](https://picnet.com.au/)
