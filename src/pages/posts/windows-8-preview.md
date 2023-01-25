---
title: "Windows 8 Preview"
slug: "windows-8-preview"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "david-booth"
mils: "1336953600000"
date: "2012-05-14"
categories: 
  - "microsoft"
---

<img src="/images/win8-demo.jpg" width=635 height=346>

**With the upcoming release of the Windows 8 “release preview” in June and the full release of Windows 8 rumoured to be set for October, I thought now would be a good time to have a look at the next iteration of Microsoft’s flagship and see what the fuss is all about.**

It has been nearly three years since the launch of Windows 7 and Microsoft is in gearing up to launch the next in the series of their iconic Windows operating system. Unlike Windows 7, which was intended as an incremental upgrade to the troubled Windows Vista, Windows 8 promises to deliver a revolutionary user experience. In addition to supporting the tradition x86/64 hardware architecture, Windows 8 for the first time will support the ARM hardware architecture, which is basis of most of the microprocessors on many tablet and pad devices. [<img src="/images/win8-logo.jpg" width=279 height=62  >](https://picnet.com.au/blogs/david/files/2012/05/win8-logo.jpg)

Windows 8 will come in only four versions, with only two being available to the average consumer:

1. **Windows 8** – the standard edition for home users
2. **Windows 8 Pro** – for business users with support for file encryption, virtualisation and domain management
3. **Windows 8 Enterprise** – which will have the same feature set as Windows 8 Pro with some as yet unspecified management features, however it will only be available through volume licensing programs or to Windows 7 volume license customers that have a current Software Assurance agreement
4. **Windows RT** – which will only be available pre-installed on PCs, tablets and pads that utilise ARM hardware. Windows RT will not support any x86/64 software applications and will not have support for Windows domain environments.

For a more comprehensive look at the differences between the different versions, check out this [blog post from Microsoft](http://windowsteamblog.com/windows/b/bloggingwindows/archive/2012/04/16/announcing-the-windows-8-editions.aspx).

### Windows Reimagined

<img src="/images/metro-ui.jpg" width=635 height=346>
Windows 8 is supposed to have been ‘reimagined from the chipset to the user experience’, and indeed, from a user interface perspective, large changes from Windows 7 have been made. The biggest change that most users will first notice is the Metro UI. Instead of a traditional Windows desktop with icons for accessing applications, files and folders, users will now see a screen with a number of tiles that can represent Apps, Websites, People, Files / documents and other information. These tiles can be customised and re-arranged to suit each users. Also the ubiquitous “Start button” has been replaced by the Start screen, which is the default tiles screen displayed when a user logs into Windows 8. Interacting with the Metro UI differs significantly between devices with and without touch screens and only time will tell whether this new UI will win over those that have gotten use to the traditional Windows UI that has remain largely unchanged since Windows 95.

Windows 8 will also offer two alternate methods of login. For Tablet devices, in addition to the traditional password, user will have the option to enter a 4 digit pin or authenticate via a ‘Picture Password’, where users use a set of touch gestures on a selected picture to log in. For PC users, only password and pin authentication methods will be available.

The Task Manager in Windows 8 has been enhanced to also include:

- Performance data on CPU, memory, disk and network traffic
- Start up applications
- Processes list that display CPU, memory, disk and network utilisation
- Other new features of Windows 8 include:
- Windows Live ID integration – user accounts need to be local to the computer, but can be linked to an online Windows Live ID. This allows users to move from computer to computer and signing in via their Windows Live ID.
- Windows To Go – a feature that will allow users of Windows 8 Enterprise to create a bootable USB Flash drive with Windows 8, the user’s programs, settings and files in it.
- Storage Space – a storage virtualisation technology which allows the organisation of physical disk spindles into logical volumes, with the ability to add additional spindles or replace failed spindles on the fly.
- USB 3.0 Support
- Virtualisation – Pro and Enterprise versions of Windows 8 will ship with Hyper-V virtualisation software, which had in the past only been available on Windows Server operating systems.
- Shorter boots time through saving kernel memory to the hard disk on shutdown.

Here is a [video](http://youtu.be/nMxhopm6Roo "Windows 8 Consumer Preview") from Microsoft demoing some of the above mentioned features.

Finally, if what you have heard about Windows 8 has piqued your interest and you would like to have a look for yourself, the best way to run Windows 8 is through a virtual machine. This will guarantee you will not have any issues with hardware driver compatibility issues. Currently the only free desktop virtualisation platform that supports Windows 8 Consumer Preview release is Oracle VM VirtualBox, which can be downloaded from [here](https://www.virtualbox.org/wiki/Downloads). Also you will need the Windows 8 Consumer Preview ISO found [here](http://windows.microsoft.com/en-AU/windows-8/download).

For a more in depth instructions on how to setup Windows 8 using VirtualBox, [click here](http://www.pcworld.com/article/252922/try_windows_8_without_losing_windows_7.html).
