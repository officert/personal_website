---
layout: post
title: 'Airport Commands'
date: 2015-1-4T21:26:58.000Z
category: reference
---

> Airport is a command line wireless utility

[http://osxdaily.com/2007/01/18/airport-the-little-known-command-line-wireless-utility/]

###Create a symlink to the airport binary

Because the airport binary is in such an obscure location, create a symlink to make it easier to use.

{% highlight bash %}
sudo ln -s /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/sbin/airport
{% endhighlight %}


| Command       | Description  |
| ------------- | -------------|
| airport -I         | list information about your connected wifi network |
