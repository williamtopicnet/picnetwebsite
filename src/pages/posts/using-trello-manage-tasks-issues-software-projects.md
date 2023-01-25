---
title: "Using Trello to manage tasks and issues in Software Projects"
slug: "using-trello-manage-tasks-issues-software-projects"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "david-booth"
mils: "1522195200000"
date: "2018-03-28"
categories: 
  - "it-support"
tags: 
  - "agile"
  - "project-management"
  - "scrum"
  - "trello"
---

We use [Trello](http://trello.com) in our software projects to help us better manage tasks and issues as well as to increase efficiency through better collaboration between the developers, BA, QA/testers and Project Managers. I’m going to share my experience with using Trello and what I found to work and not work.

<img src="/images/Trello.gif" width=602 height=296  >

**What is Trello?**

For those not familiar Trello is scrum board like collaboration tool that help to organise project tasks. Being very similar to SCRUM or Kanban boards, Trello was probably built with agile projects in mind, however I don’t see why it can’t be used to manage tasks in more traditional waterfall type projects.

In Trello you have a “Board” that has one more “Lists” and each list can have one or more “Cards”. Each card has a Title, Description, and any number of comments, checklists and labels. Cards can be re-ordered in the list and moved from one list or another, all via click and drop. You are free to organise the project in any way that suits but if you follow the agile approach, each List would be akin to columns on a scrum board or swim lanes in a Kanban board such as To-do, In Progress, QA, Backlog, Done etc.

 

**What Isn’t Trello?**

Trello is not a tool for traditional project scheduling or visualisation of tasks and critical paths via Gantt Charts etc. as there is no concept of dates and time in Trello. Also, it is not a project resource management tool. Out of the box you cannot track time spent and there are no facilities for burn down charts etc. However, there are many tools that do resource management, reporting and forecasting, provide plugins that allow you to enter time through Trello. Also Trello will not function as a traditional ticketing system for incident and problem management (as per ITIL). There is no out of the box reports for Trello that will produce a report of cards categorised by labels etc.

 

**Using Trello**

Out of the gate, we generally found Trello to be very easy and intuitive to use. The drag and drop interface allowed you to get up and running in minutes. You didn’t need spend a lot of time planning on how to setup the board because reconfiguring was such an ease if you didn’t like how the board was structured and needed to rearrange the lists and card in a different order. Figure 1 – Lists, cards, images, checklists.. all can be drag and drop, copied or cloned making changes very fast and efficient.

<img src="/images/Trello-drag-drop-lists.gif" width=535 height=649  >

We particularly like the ability to drag and drop attachment such as images and other related files directly into the card with a thumbnail preview of the attachment displayed in the card. This was particularly useful for including screenshots of bugs with the card.

<img src="/images/Trello-adding-attachment.gif" width=436 height=131  >

There was however some confusion with some of our user at the beginning when they were sure they had either created new cards or added new comments to cards, but subsequently later found them additions and changes to be missing. We found out that these users either hadn’t pressed the green “Add” or “Save” buttons when after typed out the title to a new card or editing/adding a new comment. We found that it was very easy for a user to click away from the text box they were editing without clicking on the save button (there are no warnings or prompts) and the system will retain unsaved changes for the session thereby fooling the user that the changes are saved

dynamically, but once the session ends these unsaved changes and additions are discarded and disappeared.

<img src="/images/Add-a-new-card.gif" width=193 height=89  >
 

<img src="/images/Saving-comments.gif" width=400 height=136  >

**Useful Software Development Trello good practices**

Through some trial and error, we developed some Trello “good practices” that we encouraged our users to follow when using Trello to manage tasks in a software development project:

- Keep each card neat and tidy, do not use the comments section of each card as a message board. Only important information pertaining to the task such as requirements updates, steps to reproduce an error etc should be added as comments. Having too many comments makes the history of a task too hard to follow and the card very messy.
- Define a set procedure on the movement and flow of cards as they progress from one list to another and make sure all users follow it, otherwise in short order the board becomes a complete mess and impossible to manage.
- Setup colour coded labels to help categorise each card. Labels can be used to define such categories as priority, the origin of the tasks (whether it’s a bug, enhancement or original requirement etc). However, make sure only one or two users (the project manager or assistant) create and assign labels. Labels will soon lose their significance if they are created and assigned in a haphazard manner by many users.

<img src="/images/Labels.gif" width=219 height=492  >

- Use checklists in each card as a formal way to ensure all the requirements of a task are met before a card is advanced past “In Progress”, “Developer Testing” or “QA” stages. Checklists should be setup by the project manager and/or BA against the requirements.

<img src="/images/Checklist.gif" width=402 height=148 >

- Include extracts of the requirement document and wireframes as image of other attachments against each card for quick reference so user do not need to refer back to the original requirements document, but make sure to update these if the requirements are changed!
- When projects are broken into smaller sprints of discrete functional sub-components of an application, it is useful to have a separate list for each sprint and to label the sprint with the start and end date of the sprint so as to provide a constant reminder of all involved the project deadlines and whether the project is on track, ahead or behind.

<img src="/images/Sprints-as-Lists.gif" width=398 height=188  >

- Do not archive cards of completed tasks until everything has been signed off and in production.

 

Our journey with using Trello is continuing and no doubt as we use it more we will further refine our processes. I believe Trello is a very good tool for what it was design to do and it has help us in our software development projects immensely.
