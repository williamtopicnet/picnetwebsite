---
title: "Solid Principles: Part Two - Open Closed Principle"
slug: "solid-principles-part-two-open-closed-principle"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1340150400000"
date: "2012-06-20"
categories: 
  - "software-engineering"
---

'_Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification._' \[R. Martin\]

The OCP is a set of strategies based on inheritance and polymorphism that aims to make code more extensible with fewer side effects when extending. The way side effects are controlled is by adding functionality to the system without modifying any existing code. The key to the OCP is programming to abstractions, i.e. Interfaces and base classes. But not only programming to abstractions, but doing it well without using many of the common pitfalls that violates the OCP. An example is in order. Let's assume we have a Library stock management system. The system has several types of Stock items. These could be: Magazines, Periodicals, Books, DVDs, CDs, etc. Each of these items may have their own checkout rules and we may program this as follows:

<pre>class OrderProcess:
  def checkout_item(item):
    var due_date
    switch (item.type)
      case ITEM_TYPE_MAGAZINE:
        due_date = now.AddWeeks(2)
      case ITEM_TYPE_DVD:
        due_date = now.AddWeeks(1)
      case ITEM_TYPE_BOOK:
        due_date = now.AddWeeks(6)
      ...</pre>

This is a neive implementation because every time a new stock item type is added we will need to add a case to this statement (and any other switch statements that switch on item.type). So a better implementation, one that respects the OCP would be.

<pre>interface ItemType:
  def get_due_date(from)
  def checkout()</pre>

And we could have implementations like this:

<pre>class MagazineItemType implementes ItemType:
  def get_due_date(from):
    return from.AddWeeks(2)
<div></div>
  def checkout()
    var due = this_get_due_date(now)
    // Any other checkout processes applicable to Magazines
<div></div>
class DVDItemType implementes ItemType:
  def get_due_date(from):
    return from.AddWeeks(1)
<div></div>
  def checkout()
    var due = this_get_due_date(now)
    // Any other checkout processes applicable to DVDs
<div></div>
class OrderProcess:
  def checkout_item(ItemType item):
    item.checkout()</pre>

So now, if for any reason we needed to add a new Item Type, say Blu-ray we can just create a new class and the system will be able to handle it without modifying any existing code. The reason the system now 'magically' works with a new Item Type (Blu-ray) without modifying any code is that the high level functions of the system do not know anything about Magazines, DVDs, etc. They simply know about the abstraction which is the ItemType interface. As we've seen, switch statements or long if chains can be a smell that you're violating the OCP. Other signs include having code like this in your system:

<pre>  def checkout_item(item):
    if (item.type is ITEM_TYPE_BLU_RAY) 
      throw error ('Blu-ray cannot be checked out')
    item.checkout()</pre>

Having high level functions that are even remotely aware of concrete types is an indication of future heart ache. It is also important to note that even low level types should not know about each other. For instance, a Magazine should not know about DVDs. These relationships are also violations to the OCP. It is important to note that all of these techniques are ways to manage the complexity of source code. Now, inheritance and polymorphism themselves are complex tools so like always, you need to be judicious in your usage of inheritance hierarchies. It is important to adhere to the OCP when you think part of a system is likely to change. For instance, in the example above, it is perfectly reasonable for there to be new Stock Item Types in the future so creating a hierarchy of these types is a good idea. Other areas in the system which are not likely to change can violates the OCP. The thing is not to be religious about any technique but if you are going to ignore an OCP violation (or any other technique) do so consciously.
