---
layout: post
title: 'Networking'
date: 2015-1-4T21:26:58.000Z
category: reference
---

##List all networking hardware in OSX

``` shell
networksetup -listallhardwareports
```

Should give you something like:

``` shell
Hardware Port: Wi-Fi
Device: en0
Ethernet Address: 6c:40:08:b7:a1:06

Hardware Port: Bluetooth PAN
Device: en3
Ethernet Address: 6c:40:08:b7:a1:07

Hardware Port: Thunderbolt 1
Device: en1
Ethernet Address: 72:00:06:b8:cb:f0

Hardware Port: Thunderbolt 2
Device: en2
Ethernet Address: 72:00:06:b8:cb:f1

Hardware Port: Thunderbolt Bridge
Device: bridge0
Ethernet Address: 6e:40:08:7b:1c:00
```


##Wireless sniffing tools

[https://supportforums.cisco.com/document/75221/wireless-sniffing-using-mac-os-x-106-and-above](https://supportforums.cisco.com/document/75221/wireless-sniffing-using-mac-os-x-106-and-above)

###Using airportd utility

``` shell
airportd {interface name} sniff {channel}
```

This will save results to a .cap file in your /tmp directory.


###Reading a package capture file (.cap) in OSX

``` shell
tcpdump -r {yourfile.cap} | less
```
