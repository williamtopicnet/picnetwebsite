---
title: "A faster, better sql server and sql azure log appender for log4net"
slug: "a-faster-better-sql-server-and-sql-azure-log-appender-for-log4net"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1305072000000"
date: "2011-05-11"
categories: 
  - "software-engineering"
---

After much effort, trying to get the default DatabaseAppender working in log4net I decided to write my own, so with the help of one of my alpha geeks (Tnx Chinsu) we created this awesome (its awesome because it uses batch inserts and actually works on Azure) database appender for Log4Net.

[https://gist.github.com/965366](https://gist.github.com/965366)

Use at your own risk, I did have to modify the code slightly to remove an internal dependency and I did not test this in prod after the modification.  However the modification was very minor and should not cause any issues.

Also remember to schedule a service that deletes your old log files.

Guido Tapia
