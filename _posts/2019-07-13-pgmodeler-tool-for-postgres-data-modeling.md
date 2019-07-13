---
layout: post
title: "pgModeler : A great tool for Postgres data modeling"
#category: general
tags: [postgres, setup, opensource]
comments: true
---

## Story
> “A picture is worth a thousand words”

I always believed in keeping documentation as visual as possible. It helps you to run through the notes fast
 while revising and helps in onboarding new developers swiftly.<br/>
 An Entity Relationship Diagram (ERD) is a great way to represent a database without going through verbose artifacts
 like model files, sql scripts.<br/>

!["ERD"](/assets/images/erd.jpg "ERD")

Popular open source tools like MySQL Workbench allow you to create ERDs from scratch, get ERDs created automatically 
from an existing MySQL database as well as create databases from the ERD. However its counterpart in Postgres, pgAdmin
lacks this feature.<br/>
I wanted to create a ERD for a Postgres database. My apparent options were to create one manually or buy
a license for commercial softwares out there. The open source ones out there weren't as good. <br/>

[pgModeler](https://github.com/pgmodeler/pgmodeler){:target="_blank" rel="nofollow"} was one which stood out and came 
well recommended.<br/>
It was created by Raphael Araújo e Silva from Brazil using **C++** and [Qt](https://www.qt.io/){:target="_blank" rel="nofollow"}.
It has a paid version as well as a free version. You will need to compile it yourself to get the free version working and the 
instructions given might not work as well - especially if you use a Mac as your dev system.<br/>
I decided to blog on the setup in Mac which worked for me so as to help others. Most of the other 

## Setup on Mac

Get the source code. I have checked out the latest version even though its not the stable master branch 
since at this time, the mastwer branch had a bug which was resolved in the beta version.
<pre><code>
git clone https://github.com/pgmodeler/pgmodeler.git
cd pgmodeler
git checkout tags/v0.9.2-beta
</code></pre>

Install the dependencies
<pre><code>
brew install qt    
brew link qt5 --force
brew install postgresql
brew install libxml2
</code></pre>

Edit PGSQL_LIB, PGSQL_INC, XML_INC, XML_LIB in pgmodeler.pri 
<pre><code>
PGSQL_LIB = /usr/local/opt/postgresql/lib/libpq.dylib
PGSQL_INC = /usr/local/opt/postgresql/include
XML_INC = /usr/local/opt/libxml2/include/libxml2
XML_LIB = /usr/local/opt/libxml2/lib/libxml2.dylib
</code></pre>

Commands (note : The libssl.1.* and libcrypto.1.* are found in the openssl install, not in the pg install)
<pre><code>export QT_ROOT=/usr/local/opt/qt
export INSTALLATION_ROOT=/Applications/pgmodeler.app
export PGSQL_ROOT=/usr/local/opt/postgres
export OPENSSL_ROOT=/usr/local/opt/openssl

$QT_ROOT/bin/qmake -r CONFIG+=release pgmodeler.pro
make && make install
$QT_ROOT/bin/macdeployqt $INSTALLATION_ROOT \
                            $INSTALLATION_ROOT/Contents/MacOS/pgmodeler-ch \
                            $INSTALLATION_ROOT/Contents/MacOS/pgmodeler-cli

cp $PGSQL_ROOT/lib/libpq.5.dylib $OPENSSL_ROOT/lib/libssl.1.* \
      $OPENSSL_ROOT/lib/libcrypto.1.* $INSTALLATION_ROOT/Contents/Frameworks

install_name_tool -change "@loader_path/../lib/libcrypto.1.0.0.dylib" \
 "@loader_path/../Frameworks/libcrypto.1.0.0.dylib" \
  $INSTALLATION_ROOT/Contents/Frameworks/libssl.1.0.0.dylib

install_name_tool -change "@loader_path/../lib/libcrypto.1.0.0.dylib" \ 
 "@loader_path/../Frameworks/libcrypto.1.0.0.dylib" \
 $INSTALLATION_ROOT/Contents/Frameworks/libpq.5.dylib

install_name_tool -change "@loader_path/../lib/libssl.1.0.0.dylib" \
 "@loader_path/../Frameworks/libssl.1.0.0.dylib" \ 
 $INSTALLATION_ROOT/Contents/Frameworks/libpq.5.dylib

install_name_tool -change libpq.5.dylib "@loader_path/../Frameworks/libpq.5.dylib" \ 
 $INSTALLATION_ROOT/Contents/Frameworks/libpgconnector.dylib
</code></pre>

You should now be able to access it via Mac's spotlight !<br/>
One of my favourite features in this software is the option to **layer** different parts of the data model to hide or 
showcase them.

!["ERD with pgModeler"](/assets/images/erd_pgModeler.jpg "ERD with pgModeler")

If you like the software, please don't hesitate to donate to the creator via the [official website](https://pgmodeler.io/){:target="_blank" rel="nofollow"}.

## References
- <https://www.pgmodeler.io/support/installation>{:target="_blank" rel="nofollow"}
- <https://gist.github.com/jdforsythe/d25fe7bbf05eb6c9d509dc9c0bc71696>{:target="_blank" rel="nofollow"}
- <https://advishnuprasad.com/blog/2019/03/17/build-pgmodeler-from-source/>{:target="_blank" rel="nofollow"}

