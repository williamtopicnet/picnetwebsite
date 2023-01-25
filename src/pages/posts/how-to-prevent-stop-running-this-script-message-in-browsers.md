---
title: "How to prevent 'Stop running this script' message in browsers"
slug: "how-to-prevent-stop-running-this-script-message-in-browsers"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1267660800000"
date: "2010-03-04"
categories: 
  - "software-engineering"
---

Avoiding the 'Script taking too long' (all browsers have some form or another of this) message in browsers is relatively simple. You just have to make sure the browser knows you have not created an endless loop or recursion. And the easiest way to do is is to just give the browser a breather in between long running tasks.

[<img src="/images/iestopscript.png" width=376 height=171  >](https://picnet.com.au/blogs/guido/files/2010/03/iestopscript.png)

So how would we go about this. Well the simplest solution is to just break up your task into mutliple smaller tasks with a setTimeout in between these tasks. The utility class below does just this:

### Utility Class



<pre>RepeatingOperation = function(op, yieldEveryIteration) {
  var count = 0;
  var instance = this;
  this.step = function(args) {
    if (++count &gt;= yieldEveryIteration) {
      count = 0;
      setTimeout(function() { op(args); }, 1, [])
      return;
      }
    op(args);
  };
};
</pre>



So how do we use this class, lets say we have the following code which is giving us a jerky browser and occasionally displaying those horrible 'Stop running this script' message:



<pre>// initdata is just an array of numbers (a very very large array)
var test1 = new Array(initdata.length);
for (var i = 0; i &lt; initdata.length; i++) { test1[i]  = initdata[i] * 2; } // Double each item in the initdata array
continueOperations();
</pre>



To use the utility class above we would change the code to this:



<pre>var test2 = new Array(initdata.length);
var i = 0;
var ro = new RepeatingOperation(function() {
  test2[i] = initdata[i] * 2;
  if (++i &lt; initdata.length) { ro.step(); }
  else { continueOperations(); }
  }, 100);
ro.step();
</pre>



That's it, a little bit more code, an extra closure, so not pretty but I think a relativelly stylish solution to a nasty problem. Note: Remember this will also give you a much more responsive browser during execution of this expensive code also.

**Note**: This solution is used in the [Mouse Eye Tracking system.](http://met.picnet.com.au/) So it is production ready (at your own risk tho).

Thanks

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software_development.html "software development") Manager [PicNet Pty Ltd](https://picnet.com.au/)
