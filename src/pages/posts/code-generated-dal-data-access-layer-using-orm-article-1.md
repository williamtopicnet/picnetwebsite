---
title: "Code Generated DAL (Data Access Layer) using ORM - Article 1"
slug: "code-generated-dal-data-access-layer-using-orm-article-1"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1247011200000"
date: "2009-07-08"
categories: 
  - "software-engineering"
---

Hi All,

This is the first in a series of posts about building a code generated data access layer. Over the next few weeks I will be publishing articles that will allow you to understand why the approach taken here at [PicNet](https://picnet.com.au) produces such high quality systems. Basically this approach is to use a code generated data access layer.

### Code Generated DAL

Let me begin by defining what I mean by ‘code generated DAL’. Basically I want to have an XML file like:

<pre>&lt;?xml version="1.0" encoding="utf-8" ?&gt;
  &lt;dal&gt;
    &lt;entity name="StorageUnit"&gt;
      &lt;field name="StorageUnitID" pk="true" /&gt;
      ...
    &lt;/entity&gt;</pre>

And then I can just fire up my code generator and create all the classes, configuration files, database schema, etc required to support this data layer.

### Disadvantages

Code generation removes a lot of the power of the tools you are using. Most modern ORM tools allow you to map any data schema to your domain model. Working with a nice domain model has well documented advantages so I will not go into them here. Generating your data layer will usually result in a one-to-one map of your data schema (hence not an nice abstract domain model). This is probably the biggest drawback to this approach, however I hope that you will find that this is very quickly overcome by the huge gains in efficiency.

### Advantages

- Fast, fast, fast. I can build a complex data layer in a couple of days (fully tested). This allows [PicNet](https://picnet.com.au) to provide customers with extremely cost effective solutions that are built on rock solid design principles and technologies.
- Code generated DAL lends itself to later more comlpex code generation, i.e. The user interface, user input validation, etc.
- Once you are comfortable with your own code generator you can pretty much do anything with it.
- A one-to-one map between database schema and domain is actually quite a positive thing. The last thing you want to do is abstract the database too much. You need to know when a join is being sent to the database, trying to hide this information can have very severe performance implications.
- Built on ORM technologies so all their benefits are inherited (caching, performance, security, etc).
- Many more which hopefully will be shown over the course of these articles.

### The Schema

The schema is basically the XML file that defines the schema of the database and DAL. This XML file will then be read by the code generator to create the required files. A few things I want to point out about this schema:

- It should be as simple as possible relying on default values wherever possible.
- It should clear (not verbose)
- It should be natural

Let's go into a sample application. I will use this application as the basis of my demo for the rest of these articles. Its going to be a super basic app that will allow me to catalogue my DVD collection. I will use Nant as my build tool, XSLT as my code gen engine and NHibernate as my ORM. However you can sue whatever you want.

<pre>&lt;?xml version="1.0" encoding="utf-8" ?&gt;
  &lt;dal&gt;
    &lt;namespace&gt;PicNet.CodeGeneratedDALDemo.Data&lt;/namespace&gt;
    &lt;assembly&gt;PicNet.CodeGeneratedDALDemo.Data&lt;/assembly&gt;
    &lt;outdir&gt;../../PicNet.CodeGeneratedDALDemo.Data/Generated&lt;/outdir&gt;
    &lt;entity name="StorageUnit"&gt;
      &lt;field name="StorageUnitID" pk="true" /&gt;
      &lt;field name="ParentStorageUnitID" objecttype="StorageUnit" /&gt;
      &lt;field name="StorageUnitTypeID" objecttype="StorageUnitType" /&gt;
      &lt;field name="StorageUnitLocation" type="string" length="200"&gt;&lt;name&gt;true&lt;/name&gt;&lt;/field&gt;
      &lt;field name="DateCreated" type="DateTime"/&gt;
      &lt;field name="DateLastUpdated" type="DateTime" /&gt;
    &lt;/entity&gt;
    &lt;entity name="StorageUnitType"&gt;
      &lt;field name="StorageUnitTypeID" pk="true" /&gt;
      &lt;field name="StorageUnitTypeName" type="string" length="200"&gt;&lt;name&gt;true&lt;/name&gt;&lt;/field&gt;
      &lt;field name="DateCreated" type="DateTime"/&gt;
      &lt;field name="DateLastUpdated" type="DateTime" /&gt;
    &lt;/entity&gt;
    &lt;entity name="DVD"&gt;
      &lt;field name="DVDID" pk="true"/&gt;
      &lt;field name="StorageUnitID" objecttype="StorageUnit" null="true" /&gt;
      &lt;field name="DVDName" type="string" length="200"&gt;&lt;name&gt;true&lt;/name&gt;&lt;/field&gt;
      &lt;field name="DVDDescription" type="string" length="500" null="true"/&gt;
      &lt;field name="DateCreated" type="DateTime" /&gt;
      &lt;field name="DateLastUpdated" type="DateTime" /&gt;
    &lt;/entity&gt;
  &lt;/dal&gt;</pre>

So, lets see whats going on. At the top of the schema we define namespaces, assembly name and output directory, pretty straight forward. Entities are then defined with the following format:

<pre>&lt;entity name="StorageUnit"&gt;
  &lt;field name="StorageUnitID" pk="true" /&gt;
  &lt;field name="ParentStorageUnitID" objecttype="StorageUnit" /&gt;
  &lt;field name="StorageUnitTypeID" objecttype="StorageUnitType" /&gt;
  &lt;field name="StorageUnitLocation" type="string" length="200"&gt;&lt;name&gt;true&lt;/name&gt;&lt;/field&gt;
  &lt;field name="DateCreated" type="DateTime"/&gt;
  &lt;field name="DateLastUpdated" type="DateTime" /&gt;
&lt;/entity&gt;</pre>

First thing we notice is the entity/@name attribute. This will map to the object, class and table name.

Let me interrupt myself here. I think its important to note that I'm not doing this to provide an open source DAL library. I'm trying to explain and teach how and why you would do this yourself. This means that if for example you want to have your object be called something totally different to your table then change this schema. I.e.:

<pre>&lt;entity name="StorageUnit" tableName="tblStorageUnit"&gt;</pre>

Ok, back to the post.

We then notice the fields. Some things I want to point out is:

- type="int" is the default and can be left out
- type="string" or "byte\[\]" must have a length attribute
- null="true" - allows null values
- <name>true</name> simply means that a generic string GetName() method will return the value of this field.

Apart from that I think its all pretty self explanitory.

### The Project Layout

I will lay my project out in this fashion:

<pre>CodeGeneratedDALDemo\
lib\
PicNet\
PicNet.Data\
PicNet.CodeGeneratedDALDemo.Data\
PicNet.CodeGeneratedDALDemo.Data\demo-dal.xml
PicNet.CodeGeneratedDALDemo.Data\Generated\
PicNet.CodeGeneratedDALDemo.Data.Test\
nant.bat
demo.build</pre>



### Description of Project Layout

**lib:** directory houses all my... libs. **PicNet and PicNet.Data:** Simply some reusable custom written libraries I use. I will be showing you the necessary code as we move along (next article actually). **PicNet.CodeGeneratedDALDemo.Data:** Houses the PicNet.CodeGeneratedDALDemo.Data project which is mostly code generated. **PicNet.CodeGeneratedDALDemo.Data\\demo-dal.xml:** The schema file. **PicNet.CodeGeneratedDALDemo.Data\\Generated\\:** The drirectory where to put the generated files. **PicNet.CodeGeneratedDALDemo.Data.Test:** The Unit tests directory of the PicNet.CodeGeneratedDALDemo.Data namespace. **nant.bat, demo.build:** The NAnt build files

### The Code Generator

I will be using XSLT driven by NAnt to generate my code, you can use other tools such as NVelocity, MyGeneration or CodeSmith or whatever you choose. I personally like XSLT and I think its a technology that every senior developer should be comfortable using. Note: If you are in the java world just drop the prefix 'N's from all the technologies mentioned and you will find the same tools in the java world, in fact they all came from the Java world. I will be using NHibernate as my ORM.

### NAnt Build File

What I like to do with NAnt is have a batch file to execute my builds, this allows me to have my NAnt executables somewhere tidy and not in my path and still accessible in a convenient location in my project. So lets add Nant.bat in the root directory of the project. In this batch file just put:

<pre>lib\NAnt\NAnt\nant.exe /f:demo.build %*</pre>

Please change to the location of your nant executables (if different to this).

Lets create the [demo.build](https://picnet.com.au/blogs/guido/files/2009/07/demo.build_.txt) [](https://picnet.com.au/blogs/guido/extra/CodeGeneratedDALDemo/Article1/demo.build.txt) file.

<pre>&lt;?xml version="1.0" encoding="utf-8" ?&gt;
&lt;project name="CodeGeneratedDALDemo" default="dal" xmlns="<a href="http://nant.sf.net/release/0.85-rc3/nant.xsd">http://nant.sf.net/release/0.85-rc3/nant.xsd</a>"&gt;
&lt;property name="root.dir" value="${path::get-file-name(directory::get-current-directory())}\.."/&gt;
&lt;property name="nant.settings.currentframework" value="net-3.5" /&gt;
&lt;property name="dal.dir" value="${root.dir}/PicNet.CodeGeneratedDALDemo.Data"/&gt;
&lt;property name="picnet.dal.dir" value="${root.dir}/PicNet.Data"/&gt;
<div></div>
&lt;target name="dal" depends="generate.dal" description="Generates DAL classess and configs for the current database."/&gt;
&lt;target name="generate.dal"&gt;
&lt;touch datetime="${datetime::now()}" file="${picnet.dal.dir}/xslt/dal-to-hibernate.xsl"/&gt;
&lt;style style="${picnet.dal.dir}/xslt/dal-to-hibernate.xsl" in="${dal.dir}/demo-dal.xml"&gt;
&lt;parameters&gt;&lt;parameter name="validate" value="false"/&gt;&lt;/parameters&gt;
&lt;/style&gt;
&lt;delete file="demo-dal.html"/&gt;
&lt;!-- Article 3
&lt;touch datetime="${datetime::now()}" file="${picnet.dal.dir}/xslt/dal-to-objects.xsl"/&gt;
&lt;style style="${picnet.dal.dir}/xslt/dal-to-objects.xsl" in="${dal.dir}/demo-dal.xml"&gt;
&lt;parameters&gt;&lt;parameter name="validate" value="true"/&gt;&lt;/parameters&gt;
&lt;/style&gt;
&lt;delete file="demo-dal.html"/&gt;
--&gt;
&lt;/target&gt;
&lt;/project&gt;</pre>



### Generating the Hibernate config files

Ok, Enough with the theory lets build our hibernate config file XSLT code generator. In the nant build file above we see that this file is called: dal-to-hibernate.xsl so lets see what it looks [like](https://picnet.com.au/blogs/guido/files/2009/07/dal-to-hibernate-xsl.zip).

This XSLT needs [common-xsl](https://picnet.com.au/blogs/guido/files/2009/07/common-xsl.zip) for some common funcitonality.

You can download the code samples of this entire article [here](https://picnet.com.au/blogs/guido/files/2009/07/Article1.zip):

I suggest you download the zip above ([here](https://picnet.com.au/blogs/guido/files/2009/07/Article1.zip)) and lets have a go at generating the NHibernate config files.

1. Unzip into your dev directory
2. Open a windows explorer and go to: CodeGeneratedDALDemo\\PicNet.CodeGeneratedDALDemo.Data\\Generated (It should be empty)
3. Open a command prompt
4. Go to the CodeGeneratedDALDemo directory
5. Run: nant dal
6. The CodeGeneratedDALDemo\\PicNet.CodeGeneratedDALDemo.Data\\Generated should now have the hbm.xml files.

These are the files that were just generated. You can review these files and change the code generator (xslt files) as you see fit. You may want to generate entities with a better identity generator for instance. Or change caching hints, etc. I also encourage you to review the 2 xsl files I have included. These files have been put together over a few years and have had pplenty of hacky work done on them so please feel free to keep and throw away what ever you need. If you want to play around with these files let me give you a few suggestions:

- I think it would be great if the 'pk' field was optional. I.e. If it is not specified then simply generate it (EntityName + 'ID').
- Relationships should have the name attribute optional. Just call it <RelatedEntityType>ID if not specified.
- Use a better, ORM friendly identity generator. Note: I like native because in SQL (which is the DB I use most) the identity column gives me a lot of nice information, like what order were rows added into the table. Or how many inserted records have been in a table, etc. So I am willing to put up with the draw backs of this identity generator (hashcode issues, db performance, etc).

### Next Article

That will do for now. In the next article we will look at some portions of the PicNet and the PicNet.Data projects.

**[Guido Tapia](mailto:guido.tapia@picnet.com.au)**, [Software Development](https://picnet.com.au/software-development.html) Manager [PicNet Pty Ltd](https://picnet.com.au/)
