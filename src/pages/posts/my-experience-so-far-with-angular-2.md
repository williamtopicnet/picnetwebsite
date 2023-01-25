---
title: "My experience so far with Angular 2"
slug: "my-experience-so-far-with-angular-2"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1463702400000"
date: "2016-05-20"
categories: 
  - "software-engineering"
---

I know it’s still early in the piece for ng2 but we have to date worked on 3 angular 2 projects. These projects range from very small (5-10 pages/routes) to medium (50-70 pages/routes). We started on beta1 and we are now here at RC1, here is my experience so far:

# Bad Parts

## CSS Frameworks

Are still catching up. I ended up using [PrimeNG](http://www.primefaces.org/primeng/) from [PrimeFaces](http://www.primefaces.org/) which is great but it would have been nice to have the option of using Bootstrap or Angular Material.

## Router Issues

The ng2 router (now called router-deprecated) was a little buggy. We ended up having to wrap all calls to router.navigate(…) in a setTimeout to avoid [this bug](https://github.com/angular/angular/issues/6786). This was painful as tracing down any core network bug takes a while. I think this is now fixed in RC1 but cannot currently confirm.

I was a bit shocked when I saw in RC1 that the router had been deprecated. I tried upgrading but this was a total no-go as it is massively breaking. Especially since I am using a custom outlet to handle authentication.

I’m not looking forward to upgrading the router. This one upset me a little, there are such good routers out there, angular-ui, ember, durandal. Why re-invent the wheel? Routing is a hard issue, but it’s an issue that’s been solved. It’s like when Microsoft re-implemented jQuery (with their silly ajax libraries that lasted about 2 months) or NHibernate (with EF, which took about 5 versions to become usable). No good.

## Inheritance Issues

There are lots of issues with Component inheritance. Here are some that have caused us headaches:

### EventEmitter from ancestors sometimes do not fire correctly

Not sure why but I ended up having to re-declare some of my EventEmitters (override) in descendants to avoid this very hard to find bug.

### @Component attributes/decorators not inherited

Trying to tidy up @Component definitions by pushing up the hierarchy chain does not work. This may be a typescript limitation.

### Dependency injection does not work on inheritance hierarchies

You actually have to manually pass all constructor params to ancestors. This is even if you do not change constructor signature, i.e. You must add an empty constructor just to pass parameters to parents.

## Recursive Container Components

If a component can have a ng-content and that content can also have the container component it can cause issues. The page sometimes does not load. This was a nasty issue to identify and an ugly hack was required where we actually copy/pasted the entire component and renamed it. Other than the name it was identical this “solved” the issue.

## Error Messages

Error messages and stack traces are horrible. Clicking into the angular source is a no-go as you usually end up in totally irrelevant parts of the code (usually Zone.js or polyfills code). So trying to track down issues is a manual and slow process.

## Forms are messy

To utilise the great forms functionality you need a lot of boiler plate in both your template and component code. Fortunately it is not hard to wrap this code in your own abstraction but you lose a lot of functionality doing so.

Still the templates when using forms (especially validation) are really ugly with lots of ngFormModel, form.pristine, form.valid, form.find(‘controlid’), form.find(‘controlid’).pristing, etc, etc tags everywhere.

## CSS Encapsulation

Can lead to headaches. I found myself adding a non-encapsulated global.scss to get around component boundaries when required.

## Minification / Production

We still have not fully solved this, however we have delayed this on purpose waiting on the story to get better as angular progresses along to v1.

## IE9

This one is a little scary, I have to deliver an IE9 compatible system but it does not appear that IE9 currently works. I need to spend more time on this one as currently there is no error just a blank page so not sure where I’m going wrong here.

# Good Parts

## Productivity

When you are not commenting out code trying to identify a new bug after upgrading to beta x; ng2 is actually really, really productive. Much more so than ng1. By the time we got to the third system we are completing we were burning along.

The primary reason for this productivity is the great component syntax. NG1 tried to have a good component model using directives, they failed. I feel they got it right in ng2 and it makes a huge difference.

## Typescript / Decorators

Works great! We use typescript also for our ng1 projects but decorators bring this to a new level. Hopefully they clean up the need to define providers, directives and pipes but other than that it’s much cleaner.

## Overall

I’m glad we made the decision to write this new batch of projects using Angular 2, it was perhaps a little early but we learnt a lot. Now that things appear to be settling down I hope we can start being even more productive and stop trawling through ng source code which is not very nice.
