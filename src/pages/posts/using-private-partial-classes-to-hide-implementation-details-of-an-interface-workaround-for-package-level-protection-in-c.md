---
title: "Using private partial classes to hide implementation details of an interface.  Workaround for package level protection in C#"
slug: "using-private-partial-classes-to-hide-implementation-details-of-an-interface-workaround-for-package-level-protection-in-c"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1343260800000"
date: "2012-07-26"
categories: 
  - "software-engineering"
---

I miss very few things from the Java language, one gem I really miss is the package-private accessibility modifier. This was so useful, your IDE colour coded your package classes in another colour so you knew they were not part of the public API. You could skim read the files in a package (namespace) and see exactly what you needed to look at, ignoring all low-level implementation details.

This unfortunately is not in C#, the closest C# gets is the internal modifier. I personally really dislike this modifier as I think it has contributed to the nightmare that is 100-200 project solutions which are so common amongst some .Net shops.

This pattern is an alternative, I think its a very common alternative but recently during a code review I explained it to someone who appreciated the experience so I thought I'd write it up.

Often, C# developers will do this kind of encapsulation using nested private classes. I have a big problem with this as it leads to those 2-3k line files which are unintelligible. So why not just make those nested classes private partials? Let's see how this would work.

Let's assume we have a namespace Clown whose responsibility is to create clowns for customers (i.e. like a clown booking service for kids parties). The customer basically fills in the details that their clown should have and then books a clown for their party.

The details are specified using an instance of ClownSpecifications:

<pre>public class ClownSpecifications {
  public bool KidFriendly { get;set; }
  public bool Fun { get;set; }
  public bool Scary { get;set; }
  public bool Creepy { get;set; }
}</pre>

The clown itself is simply an implementation of the IClown interface. This interface is the only thing the user ever sees.

<pre>public interface IClown {
  void DoYourThing();
}</pre>

And then we need a clown factory that builds clowns based on the provided specifications:

<pre>public partial class ClownFactory
{
  public IClown CreateClown(ClownSpecifications specs) {
    if (specs.Creepy &amp;&amp; specs.Scary) { return new ThatClownFromStephenKingsBook(); }
    if (specs.Creepy) { return new TheJoker(); }
    if (specs.KidFriendly &amp;&amp; specs.Fun) { return new Bobo(); }
    if (specs.Fun) { return new RudeClown(); }
    return new GenericBoringClown();
  }
<div></div>
  private partial class ThatClownFromStephenKingsBook {}
  private partial class TheJoker {}
  private partial class Bobo {}
  private partial class RudeClown {}
  private partial class GenericBoringClown {}
}</pre>

A few things to notice here. The first is that the ClownFactory itself needs to be marked partial:

<pre>public partial class ClownFactory</pre>

This is required simply because there is no way to create top level private partial classes.

Secondly, the implementation classes are defined in a super minimalistic fashion:

<pre>private partial class ThatClownFromStephenKingsBook {}</pre>

They don't event implement the IClown interface in this definition.

So now an implementation of IClown looks like this:

<pre>public partial class ClownFactory {
  private partial class ThatClownFromStephenKingsBook : IClown {
    public void DoYourThing() {
      // ...
    }
  }
}</pre>

That's it, this is actually working code. And the great thing about it is that your namespace now looks like this: <img src="/images/clown_namespace.jpg" width=328 height=152  >

See, you can now more easily tell that the public API of that namespace is IClown, ClownSpecifications and ClownFactory. To clean this up even more you could create a new directory called impl and hide the implementations there. I personally do not do this as then Resharper starts yelling at me about mismatching namespaces.
