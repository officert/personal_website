---
layout: post
title: 'Airport Commands'
date: 2015-1-4T21:26:58.000Z
category: reference
---

Airport is a command line wireless utility

[airport-the-little-known-command-line-wireless-utility/](http://osxdaily.com/2007/01/18/airport-the-little-known-command-line-wireless-utility/)

##Create a symlink to the airport binary


Because the airport binary is in such an obscure location, create a symlink to make it easier to use.

* Update: this syntax works for OSX pre v10.11

``` shell
sudo ln -s /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/sbin/airport
```

* OSX v10.11 El Capitan use:

``` shell
sudo ln -s /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/airport
```


* Note: you need to have /usr/local or /usr/sbin in your PATH


| Command       | Description  |
| ------------- | -------------|
| airport -I         | list information about your connected wifi network |
