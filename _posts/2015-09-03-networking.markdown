---
layout: post
title: Networking
date: 2015-01-04T21:26:58.000Z
category: reference
author: 'Tim Officer'
---

####List all networking hardware in OSX

Run this command:

```
networksetup -listallhardwareports
```

and you should see something like:

<code>
Hardware Port: Wi-Fi<br>
Device: en0<br>
Ethernet Address: 6c:40:08:b7:a1:06<br>
<br>
Hardware Port: Bluetooth PAN<br>
Device: en3<br>
Ethernet Address: 6c:40:08:b7:a1:07<br>
<br>
Hardware Port: Thunderbolt 1<br>
Device: en1<br>
Ethernet Address: 72:00:06:b8:cb:f0<br>
<br>
Hardware Port: Thunderbolt 2<br>
Device: en2<br>
Ethernet Address: 72:00:06:b8:cb:f1<br>
<br>
Hardware Port: Thunderbolt Bridge<br>
Device: bridge0<br>
Ethernet Address: 6e:40:08:7b:1c:00<br>
</code>

####Using airportd utility

```
airportd {interface name} sniff {channel}
```

This will save results to a .cap file in your /tmp directory.

####Reading a package capture file (.cap) in OSX

```
tcpdump -r {yourfile.cap} | less
```

<hr>


##Links
- [http://www.tcpdump.org/](http://www.tcpdump.org/)
- [wireless-sniffing-using-mac-os-x-106-and-above](https://supportforums.cisco.com/document/75221/wireless-sniffing-using-mac-os-x-106-and-above)
- [How 802.11 Wireless Works](https://technet.microsoft.com/en-us/library/cc757419(WS.10).aspx)

###pcap
- [ifconfig-7-examples-to-configure-network-interface](http://www.thegeekstuff.com/2009/03/ifconfig-7-examples-to-configure-network-interface/)
- [node_pcap](https://github.com/mranney/node_pcap)
- [how-to-listen-to-wifi-with-node-js](http://blog.hexacta.com/how-to-listen-to-wifi-with-node-js/)
- [capturing-packets-in-javascript](http://howtonode.org/capturing-packets-in-javascript)
- [pcap lib](http://www.tcpdump.org/manpages/pcap.3pcap.html)
- [libpcap-tutorial.pdf](http://eecs.wsu.edu/~sshaikot/docs/lbpcap/libpcap-tutorial.pdf)
- [Programming with pcap](http://www.tcpdump.org/pcap.html)

###tcpdump
- [tcpdump man page](http://www.tcpdump.org/tcpdump_man.html)
- [12-tcpdump-commands-a-network-sniffer-tool](http://www.tecmint.com/12-tcpdump-commands-a-network-sniffer-tool/)

###reading .cap files
- [how-to-read-a-packet-capture-cap-file-from-command-line](https://scottlinux.com/2012/02/17/how-to-read-a-packet-capture-cap-file-from-command-line/)
