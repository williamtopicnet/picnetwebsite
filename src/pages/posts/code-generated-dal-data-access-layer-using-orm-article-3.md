---
title: "Code Generated DAL (Data Access Layer) using ORM - Article 3"
slug: "code-generated-dal-data-access-layer-using-orm-article-3"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1248048000000"
date: "2009-07-20"
categories: 
  - "software-engineering"
---

### Overview

Well, we're getting to the business end of these series of articles. In this article we will complete our PicNet.CodeGeneratedDALDemo.Data implementation, which means we will generate all of the required POCO files. We will also create a few tests to test the whole thing out.

### Generating the NHibernate POCO Objects

To generate the POCOs download [this articles source code.](https://picnet.com.au/blogs/guido/files/2009/07/CodeGeneratedDALDemo.zip) You can then just run nant dal as we described in [Article 1](https://picnet.com.au/blogs/guido/post/2009/07/08/code-generated-dal-data-access-layer-using-orm-article-1/ "Code Generated DAL (Data Access Layer) using ORM – Article 1").

### The Generated POCOs

Lets have a look at the objects I create.

**FIELDS**

You will notifce a FIELDS enumeration at the top. I use this instead of passing magic strings around the place and simply serves the purpose of trying to remove the use of these magic strings and give a little bit of compile time checking for field names.

**Constructors**

I generate 3 constructors. These are: - The default constructor (required for serialisation, etc). - Required fields constructor (All fields that do not allow nulls) - All fields constructor

**GetPropertyValueImpl and SetPropertyValueImpl**

These methods are just implementations of IGetSetPropertyValue which provide a lightning fast alternative to reflection.

**Properties**

All of the object properties will follow. These save their dirty state and have a few NHibernate hacks that make life a little easier.

**Misc Members**

Finally we have the miscellaneous members ToString, GetHashCode, Equals, Clone, etc.

### Compiling the Project

Once the POCOs have been generated you have to ensure that they are all included in the project. You also have to ensure that the hbm.xml files are marked as 'Embedded Resource'. Once you do this the entire project should compile.

### Creating Tests

I have included only one very simple test class in the testing project but more importantly I have included the class 'InMemeoryDataTests' . This class allows you to create in memory NHibernate tests using SQLite.

### Conclusion

This article wraps up this series of articles on using code generated data access layers. I hope that if you have taken the time to work through these things you will now appreciate the ease and speed of development that this approach gives. This approach is not for all projects but in my experience suits a vast majority of them. Some things that you may consider when working with this code.

- GetHashCode is not ideal as it uses the ID of an object for hashcode and this causes a plethora of well known issues when working with NHibernate.
- Nullables are not supported (have never gotten around to adding it in)
- This is a highly canabilised version of this code and is missing a lot of important features such as encryption, meta data helpers, serialisation helpers, etc.

Enjoy

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)** [Software Development](https://picnet.com.au/software-development.html) Manager [PicNet Pty Ltd](https://picnet.com.au/)
