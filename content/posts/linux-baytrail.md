--- 
draft: false
date: 2016-12-13T22:31:20+01:00
title: "Linux issues with Baytrail CPUs"
slug: "linux issues with baytrail cpus" 
categories: general
description: "Linux issues with Baytrail CPUs"
---

Linux randomly freezes on laptops with Baytrails processors and your are forced to do a hard restart, this an open issue of the kernel that apparently only affects the 4.x versions. You might feel hopeless as this is a low priority issue for the kernel but hopefully, there is a workaround.

[PState](https://software.intel.com/en-us/blogs/2008/05/29/what-exactly-is-a-p-state-pt-1) is a technology present in Intel processors that allows the OS to regulate CPU frequency and voltage to adequate power consumption and performance, mostly to safe battery life.

## Solution

This should work with 4.x kernels, it has worked for me in Ubuntu 16.04 and Linux Mint 18.

Steps:

1. *sudo nano **/etc/default/grub***

1. *Find the line starting with **GRUB_CMDLINE_LINUX_DEFAULT** and add **intel_idle.max_cstate=1**, in my case I had: **GRUB_CMDLINE_LINUX_DEFAULT=”quiet splash"** which I changed to **GRUB_CMDLINE_LINUX_DEFAULT=”quiet splash intel_idle.max_cstate=1"***

1. *Exit saving changes*

1. *sudo **update-grub***

1. sudo reboot

That’s it.

For more details check [this](https://bugzilla.kernel.org/show_bug.cgi?id=109051) Linux kernel thread.

Fedora users can use [this](https://ask.fedoraproject.org/en/question/83930/how-to-intel_idlemax_cstate1/) solution.

Hope it helps, happy hacking!
