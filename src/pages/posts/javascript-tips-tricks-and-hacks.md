---
title: "Javascript Tips, Tricks and Hacks"
slug: "javascript-tips-tricks-and-hacks"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1271203200000"
date: "2010-04-14"
categories: 
  - "software-engineering"
---

JavaScript is by far the most expressive language I use today, that expresiveness is a result of the amount of flexibility that the language gives the developer.  This is also the same reason why it is so hard to develop in JS, however I will not be focusing on that here.  This article is solely about the art of JS development.  I will be following this article up with a series of usefull patterns in javascript and usefull utility classes, but for now lets focus on the sugar.

Note: This article is extremely subjective so if any of the following views offend please accept this as my sincerest of apologies.

**Variables**

Sometimes the way you do things has no impact on the results but it just 'feels' (or 'smells' if you want to Fowler it up) better.  One very clear example is variable declaration.  Example;

\[code:js\]

var i;

var x = 10;

var y =100;

var product = x\*y;

\[/code\]

I prefer this:

\[code:js\]

var i,

     x = 10, 

     y = 100.

     product = x\*y;

\[/code\]

Why? Don't know, I just do.

Also, you must always remember that assignment always returns the value of the assignment so why not do something like:

\[code:js\]

var product;

callFunction(product = x \* y);

return product;

\[/code\]

When doing multy variable assignment (separated by ,) then the last assignment is returned.  This is rarely usefull so no sugar there.

**Conditions**

Become familiar with [falsy](http://en.wikipedia.org/wiki/JavaScript_syntax) expressions.  Use them in your conditions.

So instead of:

\[code:js\]

if (typeof console !== 'undefined' && typeof console.trace !== 'undefined') console.trace(); 

\[/code\]

Why not?

\[code:js\]

if (typeof console !== 'undefined'  && console.trace) console.trace(); 

\[/code\]

Also, lazy conditions (or null-coalescing) are also cool.  Example:

\[code:js\]

x = x || getDefaultValueOfX(); // Basically only call getDefaultValueOfX if x does not have a value.  Synonimouse with ?? operator in C#

\[/code\]

**Loops**

Iteration are a very personal thing some prefer to go backwards some forwards.  Some declare their 'i' before their 'for' some think this is very silly indeed.  This is how I loop.

\[code:js\]

for (var i = 0, e; e = array\[i\]; ++i) { ... }

\[/code\]

Nice...  Oops, better mention a caveat here.  The termination expression here is e = array\[i\] which means that if the array contains: 0, '', null, undefined, false then the iteration will finnish prematurely.

But this syntax can also be used for lots of nice expressive statements like:

\[code:js\]

for (var i = 0, e, j = array.length - 1; e = array\[i\]; ++i; --j) { ... } 

\[/code\]

How About:

\[code:js\]

for (var e; entries.length && (e = entries.shift());) { ... } // Awesome I hear you say?

\[/code\]

etc, etc

**Arrays**

Arrays in javascript are very interesting, they are like an object with growths.  Some of those growths are very usefull but the fact that its still an object is pretty awesome also. So:

\[code:js\]

var x = \[1, 2, 3 , 4\];

x.max = function() {

 var m = Number.MIN\_VALUE; 

 for (var i = 0, v; v = this\[i\]; ++i) { if (v > m) { m = v; } }

 return m;

}

\[/code\]

How about (Continued from above):

\[code:js\]

x.length = 100;  // This actually increased the size of the array to 100 and filled in gaps with undefined

x.length = 2;  // This will shorten the array and 'delete' all enties above the specified index.

\[/code\]

Something that needs to be mentioned here is the awesomeness of delete.  This marks a memory space for garbage collection so its a great way to ensure that something is infact 'deleted'.

Also, I highly suggest getting to know [splice](https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Objects/Array/Splice).  He can be a good friend.

**Augmentation**

The previous example (array x.max) is actually a form of augmentation but this concept can be taken even further and one of the pretties uses of this is a Crockfordian [parasitic inheritance](http://www.crockford.com/javascript/inheritance.html).  Let's have a look:

\[code:js\]

function Animal() {

 this.tallk = function() { return "Oink! Oink!"; }

}

function Dog() { // Dog will extend Animal parasitically (does that word exist?)

 var d = new Animal();

 d.talk = function() { return "Woooof, Grrrrrrrrrrr!"; }

 d.playDead = function() { return '.............'; }

}

alert(new Dog().talk());

\[/code\]

There we go, we just implemented inheritance without ugly .prototype (s) and other nasties. 

**Closures**

If you ever have a chat to a Ruby developer they will probably bore you half to death with their preaching about the beaty of a closure, anyways JS has closures also, but javascript is a more practical language so we don't don't preach we just do.

Have you ever done this:

\[code:js\]

somearray.sort(function(a, b) { return a - b; });

\[/code\]

We'll Array.sort takes in a cloure.  So closure is basically just a function that can be passed around and reused.  This is actually an amazingly powerful feature and can open a lot of doors when designing complex systems.  However, care must be taken when using closures, the context and hence the memory used up by the context of a function remains in memory as long as the closure is alive.  This is a common casue of JS memory leaks.

**Hashtables (Dictionaries)**

Objects are dictionaries.  This is actually a very usefull data structure so don't ignore it.

\[code:js\]

var dict = {};

dict\['property1'\] = prop1;

dict\['property2'\] = prop2;

dict\['sub'\] = function() { return this.propert1 + this.property2; };

\[/code\]

**Namespaces**

Namespaces are usefull, they allow you to nicely modularise your code and prevent your code from clasing with other's code.  Namespacing in javascript is very easy.  I suggest the following approach:

\[code:js\]

// Create the namespace (using the uril finction below)

namespace('au.com.picnet.scripts');

// Add a class to the namespace

au.com.picnet.scripts.TestClass = function() {

 this.test = function() { alert('test'); }

};

// Instantiate the class and call test()

new au.com.picnet.scripts.TestClass().test();

// A safe namespace generator, can be called many times 

// with the same ns fragmens without fear of loosing objects.

function namespace(ns) {

 ns = ns.split('.');

 var current = window;

 for (var i = 0, n; n = ns\[i\]; ++i) {

 if (!current\[n\]) current\[n\] = {};

 current = current\[n\];

 }

}

\[/code\]

**Function Scope**

The previous example of namespaces shows function scoping in action.  Function scope simply means that a function only has access its own members and its parent memebers (if it is nested).  So a parent funciton does not have access the the members of the nested function unless they are public.  This is actually a complex toic that I may explore further in its own article but for the time being I recommend reading [this](https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Functions).

**This!!**

The this keyword is also a tricky beast especially when it can be manipulated with Function.apply and Function.call.  But generally this points to the current function (not the current function literal) or else the global scope.  Again too complex for this article but read [this](https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Operators/Special_Operators/This_Operator).

Note I generally try not to rely on 'this' very much.  If I need to access 'this' in future I generally create a temp variable that I can use:

\[code:js\]

var instance = this; 

\[/code\]

This variable is created at a point I know that 'this' points to the right object and then don't worry about the technicalities.

**Static Classes (Singleton, Utility Classes)**

Object literals actually make great singletons.  Let see an example:

\[code:js\]

namespace('au.com.picnet.scripts');

au.com.picnet.scripts.Utilities = {

 add: function(x, y) { return x + y; },

 subtract: function(x, y) { return x - y; }

};

alert('add: ' + au.com.picnet.scripts.Utilities.add(1, 2) + ' subtrace: ' + au.com.picnet.scripts.Utilities.subtract(1, 2));

\[/code\]

**RegExp**

The RegExp is an awesomly powefull object, it can make a 100 line parsing function vanish in a puff of elegance.  Howewer!!!!!  If you are anything like me, you need to use RegExps roughly 2-3 times a year.  The other times you just copy a previous use of the same regexp.  So when that time of year comes around you ask yoursel: How the hell do I do named groups again?

Well I have found that the best way to work with RegExs is to ignore them until needed.  When you do need a regex simply give yourself a 5 minute refresher [here](https://developer.mozilla.org/En/Core_JavaScript_1.5_Guide/Regular_Expressions) and make sure you test your regex thrououghly in places like [here](http://www.regular-expressions.info/javascriptexample.html).  

I personally recommend not wasting too long getting good at RegExps as they are so rarely needed.  I have actually been good at RegExps several times but that all goes away... I have now accepted it.

**Misc**

\- Always use '===' instead of '==' .

\- Functions have a length attribute.  This is the length of expected parameters.

\- Functions have an argumens array with all the arguments passed to the function, regardless of function signature.

**Restraining the Beast**

Javascript does give the developer too much rope, this is nice when trying to flex your creative powers but can become overpowering when working on large systems.  There are a number of tools which now allow you to try to tame this beast.  And at the top of the list is [GWT](http://code.google.com/webtoolkit/) (And other such projects).  However this is an extreme solution to this problem I personally like Javascript and don't really want to stop using it unless there are clear advantages on a project.  So some of the tools I use and look interesting are:

\- [Google's Closure Compiler](http://code.google.com/closure/compiler/) : Adds some type safety to your beast (with annotations)

\- [FireBug](http://getfirebug.com/) : Don't leave home without it

\- DOM / Ajax Helper Libs ([jQuery](http://jquery.org/), [dojo](http://www.dojotoolkit.org/), [prototype](http://www.prototypejs.org/), [closure libs](http://code.google.com/closure/library/), etc): A must for cross browser development (I personally use jQuery as it seems to have won the popularity contest and regardless what the 'hardcore' tell you, this is actually very important)

The next generation of JS IDEs are also very exiting, leading this list are:

\- [WebStorm](http://www.jetbrains.com/webstorm/)

\- [Visual Studio 2010](http://www.microsoft.com/visualstudio/en-us/)

So [Notepad++'s](http://notepad-plus.sourceforge.net/uk/site.htm) domination of the js development world may be comming to an end soon.  Ahhh I actually have dreams of accurate type inferrence in real time for a JS IDE.

Thanks

****[Guido Tapia](mailto:guido.tapia@picnet.com.au)****

**

[Software Development](https://picnet.com.au/software_development.html "software development") Manager

[PicNet Pty Ltd](https://picnet.com.au/)

**
