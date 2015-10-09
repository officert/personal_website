---
layout: post
title: 'Mongo DB Back Up & Restore'
date: 2015-1-4T21:26:58.000Z
category: reference
---

##mongodump & mongorestore

These are utilities that Mongo provides for creating a backup (mongodump) and restoring from a backup (mongorestore).

Mongodump docs: [Go Here](http://docs.mongodb.org/manual/reference/program/mongodump/)

Mongorestore docs: [Go Here](http://docs.mongodb.org/manual/reference/program/mongorestore/)


####Creating a backup with mongodump


You will need to get the username and password for our databases. The host and port might not be correct bellow either because for both Prod and Dev we have replica databases. So you may need to try a different host and post that below.


Prod database:
``` shell
mongodump --host {host} --port {port} --db tablelist-prod -u {username} -p {password}
```


Dev database:
``` shell
mongodump --host {host} --port {port} --db tablelist-dev -u {username} -p {password}
```


Running either of these will create a backup in ```~/dump```. You can change where the files are written using ```--out```.

You can also specify just a single collection to backup using ```--collection```.


####Restoring from a backup with mongorestore


``` shell
mongorestore --db {databasename} ~/dump/tablelist-dev
 ```

This is assuming you have already run ```mongodump``` and the files were written to ```~/dump```.

Running this will create a new database using the backup bson files from mongodump.

You can also choose to restore just a single collection by changing ```~/dump/tablelist-dev``` to ```~/dump/tablelist-dev/venues.bson```. Which will restore just the venues collection.

Use the ```--drop``` option to drop collection before they are restored.
