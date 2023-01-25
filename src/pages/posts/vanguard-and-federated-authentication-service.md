---
title: "VANguard and Federated Authentication Service"
slug: "vanguard-and-federated-authentication-service"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1464739200000"
date: "2016-06-01"
categories: 
  - "software-engineering"
---

We recently completed an integration project, where we connected a complex QlikView visualisation and analytics application to VANguard federated authentication service. [VANguard](http://www.vanguard.business.gov.au/ourservices/Pages/Federated-Authentication-Service-(FAS).aspx) is a service provided by the Federal government that allows government agencies to provide single sign on capabilities to their systems to different agencies.

The project itself ended up being much more complex than originally planned and some lessons learnt are listed below in the hopes it will help others.

**SAML**

VANguard uses the [SAML](https://en.wikipedia.org/wiki/SAML_2.0) specifications to provide federated authentication services. I must say that SAML appears to be greatly over engineered and considerably more complex than should be required. However, several libraries are available that allow the abstraction of the underlying SAML.

**No metadata**

VANguard does not provide metadata for their service. Metadata is a way for an identity provider to give details of its environment (URLs, certificates, etc). VANguard advised that they are not an identity provider, an explanation I found academic as providing a decent metadata file would have greatly simplified the process.

If you have are trying to integrate a system that comes with SAML support out of the box it will probably not work with VANguard due to this limitation.

**dk.nita.saml20**

We ended up using the [dk.nita.saml20](https://www.nuget.org/packages/dk.nita.saml20/) package to abstract the SAML boiler plate. We did however have to modify the source in several places to hack and patch things together. For instance we had to change the language on the service metadata to “en” rather than “da” and there were several other small things like this we changed. Customising the code also helped us work around the limitation of no metadata existing for the VANguard service.

**Resources**

Some resources that really helped are:

- SAML Abstraction: [https://www.nuget.org/packages/dk.nita.saml20/](https://www.nuget.org/packages/dk.nita.saml20/)
- Tutorial: [http://haishibai.blogspot.com.au/2009/06/get-started-with-danish-open-source.html](http://haishibai.blogspot.com.au/2009/06/get-started-with-danish-open-source.html)
- Open SSL: [https://indy.fulgan.com/SSL/openssl-0.9.8r-x64\_86-win64-rev2.zip](https://indy.fulgan.com/SSL/openssl-0.9.8r-x64_86-win64-rev2.zip)
- Hanging Open SSL: [http://stackoverflow.com/questions/9450120/openssl-hangs-and-does-not-exit](http://stackoverflow.com/questions/9450120/openssl-hangs-and-does-not-exit) (i.e. use winpty openssl)

**Conclusion**

If we were to try to integrate to VANguard again **we would** do things differently. The “no metadata” is a huge limitation and makes VANAguard integration very hard. The existing libraries out there just expect an identity provider to have a metadata file (and yes I know that in theory VANguard is not an identity provider but that should be transparent). Next time we will not use an abstraction library and do all creation and parsing of SAML files manually. This seems daunting at first given the over complexity of SAML payloads but I think we would have completed the project sooner going down this path. Live and learn.
