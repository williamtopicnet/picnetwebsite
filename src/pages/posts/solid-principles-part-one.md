---
title: "Solid Principles: Part One"
slug: "solid-principles-part-one"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1336953600000"
date: "2012-05-14"
categories: 
  - "software-engineering"
---

Over the coming weeks I plan to do a bit of a study on the SOLID principles. SOLID stands for:

- Single Responsibility
- [Open-Closed](https://picnet.com.au/blogs/guido/post/2012/06/20/solid-principles-part-two-open-closed-principle/ "Open Closed Principle")
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

The term was coined by Robert Martin \[[http://cleancoder.posterous.com/](http://cleancoder.posterous.com/)\].

The five principles if used judiciously should result in code that is easier to maintain by being highly decoupled and allow the changing of specific implementation details without (or with less) friction.

Like every principle/guideline in software development the SOLID principles need to be understood but not used blindly. It is very easy to over architect a solution by being too dogmatic about the use of any guideline. You do however, need to be aware when a violation of SOLID principles occurs and make that decision based on its context and merits.

### Single Responsibility Principle - SOLID Principles

Robert Martin describes the Single Responsibility Principle (SRP) as: "_A class should have only one reason to change_"(1). I think the best way to get our heads around this concept is to view some code. So let's consider the following example which is a business rules object that defines how jobs are handled in an issue tracking system.

<pre>class JobHandler(db, query_engine, email_sender):
  this.db = db
  this.query_engine = query_engine
  this.email_sender = email_sender
<div></div>
  def add_job(job):
    this.db.add(job)
<div></div>
  def delete_job(job):
    this.db.delete(job)
<div></div>
  def update_job(job):
    this.db.update(job)
<div></div>
  def email_user_about_job(job):
    this.email_sender.send(job.get_html_details(), job.user.email)
<div></div>
  def find_all_jobs_assigned_to(user):
    return this.query_engine.run("select all jobs assigned to: ", user)
<div></div>
  def find_all_completed_jobs(user):
    return this.query_engine.run("select all jobs with status: ", "completed")</pre>

So, what is the jobs handler doing?

- Doing basic CRUD operations on the jobs (add/delete/update). We could also assume that we would do validation in these methods also.
- Doing queries on jobs. These could potentially get very complex if we add pagination support, etc.
- Doing workflow functions, such as email users.

Let's critically review this code. What can we see?

- There are 3 dependencies (db, query\_engine and email\_sender)
- There is low cohesion ([http://en.wikipedia.org/wiki/Cohesion\_(computer\_science)](http://en.wikipedia.org/wiki/Cohesion_(computer_science))) which is the 'smell' that Robert Martin was trying to address with this principle. Basically cohesion means that we have dependencies that are only used by part of a class. Low cohesion is usually an indication that a class is doing too much (or violates the Single Responsibility Principle).
- The name Handler, Controller, Manager, Oracle, Deity are all indications that you have a class that could be potentially too loosely defined and which in turn may have too many responsibilities.
- If we wanted to have a unit test to test the work flow of the system we would also need to instantiate a db and a query\_engine dependency. This adds friction to our tests and usually results in poor test coverage.

I think it's clear that the above object has 3 obvious responsibilities these are:

- Performing validation and CRUD like operations on a job
- Performing complex queries on jobs
- Managing workflows as they relate to jobs

So perhaps a better design would be something like:

<pre>class JobRepository(db):
  this.db = db
<div></div>
  def add_job(job):
    this.db.add(job);
<div></div>
  def update_job(job):
    this.db.update(job);
<div></div>
  def delete_job(job):
    this.db.delete(job);
<div></div>
class JobFinder(query_engine):
  this.query_engine = query_engine
<div></div>
  def find_all_jobs_assigned_to(user):
    return this.query_engine.run("select all jobs assigned to: ", user)
<div></div>
  def find_all_completed_jobs(user):
    return this.query_engine.run("select all jobs with status: ", "completed")
<div></div>
class JobWorkFlow(email_sender):
  this.email_sender = email_sender
<div></div>
  def email_user_about_job(job):
    this.email_sender.send(job.get_html_details(), job.user.email)</pre>

So let's critically analyse this code.

- We can see we have increased the number of classes to 3. This arguably increases complexity of the system as it adds modules that need to be understood.
- We can see that each class is highly cohesive and very small and focused. This is a good thing.
- We can see that any unit test only has a single dependency to initialise or mock to test a class. This will encourage developers to keep the test quality up to a good standard.
- If we place these 3 classes in a well named namespace such as 'jobs' it could in fact ease the complexity of the system (contradicting the first item in this list). As we could just browse the file names without even opening them to know exactly what functions are done by each class.

### Conclusion

Conclusion? Well there really is no conclusion. It is important to realise that this is a trivial example whose responsibilities were obvious. Many times separating concerns is not as easy and decoupling these concerns may be very difficult.

In the example above I would comfortably say that the refactored code is better than the original code but this may not be the case with a real world example. Now when you see a class that as; low cohesion, too much responsibility, too many reasons to change, too many dependencies, etc. You can recognise this as a smell and violation of the SRP. You can then make the educated decision as to whether refactoring the code will result in better, cleaner more maintainable code.

On the other hand, refactoring is a hard process and the more you do it the easier it becomes, so do not be scared to take a little bit of time to refactor something like this. You will find that the case for **not** fixing SRP violations will become less compelling.
