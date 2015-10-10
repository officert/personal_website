---
layout: post
title: 'Bash Commands'
date: 2015-09-20T21:26:58.000Z
category: reference
author: 'Tim Officer'
---

####Locate a program file in your path :

```
which curl
```

Should give you something like:

```
/usr/bin/curl
```
<br>

####Search a folder hierarchy for filename(s) that meet a desired criteria. Name, size, file type, etc...

```
find
```
<br>

####List any process running on a specific port.

This will list any process running on the internet port 35729

```
lsof -i:35729
```
