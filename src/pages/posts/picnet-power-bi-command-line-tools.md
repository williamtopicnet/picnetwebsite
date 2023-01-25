---
title: "PicNet Power BI Command Line Tools"
slug: "picnet-power-bi-command-line-tools"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1628208000000"
date: "2021-08-06"
categories: 
  - "microsoft-power-platform"
  - "power-bi"
tags: 
  - "power-bi"
  - "powerbi"
---

Today we released our "PicNet Power BI Command Line Tools" project on [github](https://github.com/gatapia/picnet_pbi_cli).

This project is what allows PicNet developers to collaborate on Power BI projects by addressing a few issues, these are:

- Extracts the contents of the `pbix` file format allowing developers to:
    - Commit code to source code repository
    - Allow 'easier' merge of parallel work
    - Allow for search and replace of visual labels, title, etc.
    - Allow for global search / replace of visual properties (such as enabling drill down mode instead of highlight)
    - Allow for general use of modern source code editors to work with Power BI source code
- Allows the swapping in and out of `DataModel` files. Which allows developing on small datasets and swapping out larger more complete datasets for testing and deployment. This does not rely on Power BI's incremental refresh or deployment pipelines which means that it supports this dynamic workflow even if you are using Power BI Report Server.
- A basic analyser that validates the source code and compares this with the Measures available in the ssas `DataModel`. This allows us to report on duplicate measures, unused measures, etc.

This project comes with a "Works on my PC" guarantee, so if you are not using my PC then you must take care to ensure you backup your `pbix` files. This project is destructive, it overwrites your files, so backup!! (and read the documentation on the project github page)

<img src="/images/social-default-image.png" width=329 height=173  alt="">

Link: [https://github.com/gatapia/picnet\_pbi\_cli](https://github.com/gatapia/picnet_pbi_cli)
