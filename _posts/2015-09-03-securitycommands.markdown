---
layout: post
title: 'Security Commands'
date: 2015-1-4T21:26:58.000Z
---

http://osxdaily.com/2015/07/24/find-wi-fi-network-router-password-command-line-mac/

###Find & Show Wi-Fi Network Passwords from the Command Line in OS X

{% highlight bash %}
security find-generic-password -ga "ROUTERNAME" | grep "password:"
{% endhighlight %}
