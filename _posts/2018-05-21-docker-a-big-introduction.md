---
layout: post
title: "Docker : a big introduction"
#category: general
tags: [docker, container, tutorial, guide]
comments: true
---

## Background story
- This is part 1 of a 2 part series to understand Docker & work with it.
- I recently gave a session to my team at work on how an application deployment could be simplified with Docker. It was well received. I decided to convert the same to a blog so as to try to help out a larger audience.

!["Docker"](/assets/images/docker.jpg "Docker")

## Agenda
1. [About Containers](#1)
2. [About Hypervisor](#2)
3. [Need / World before Docker](#3)
4. [About Docker](#4)
5. [Timeline](#5)
6. [Applications of Docker](#6)
7. [Docker installation](#7)
8. [Docker architecture](#8)
9. [Docker components](#9)
10. [Docker alternative : Rocket](#10)

## <a id="1">1.</a>About Containers
- A real world shipping container can be placed anywhere. It can be moved onto a truck, a ship or hoisted by a crane. Its contents remain un-affected by the outside world. 
- Like them, software containers provide a loosely isolated environment. The isolation and security allow you to run many containers simultaneously on a given host. 
- Containers are lightweight because they don’t need the extra load of a hypervisor, but run directly within the host machine’s kernel.

!["Docker"](/assets/images/container.jpg "Docker")

## <a id="2">2.</a>About Hypervisor
- The Hypervisor is the layer of your stack that’s doing the actual virtualization, in which it takes computing resources from the Host Operating System and use them to create fake virtual hardware that will be then consumed by Guest Operating Systems. 
- Types :
    1. Type 1 : Can interact directly with the hardware. More efficient (eg : HyperKit in OSX, Hyper-V in Windows)
    2. Type 2 : Function as an app on the Host OS (eg : VirtualBox, VMWare) 
- Virtual Machine setup :
    
    [!["VM"](/assets/images/vm.png "an-introduction-to-docker-by-instructor-of-o-reilly-s-docker-tutorial"){:height="50%" width="50%"}](https://www.codementor.io/atbaker/an-introduction-to-docker-by-instructor-of-o-reilly-s-docker-tutorial-9x01rz9g7){:target="_blank" rel="nofollow"}
- Docker setup :
    
    [!["Container"](/assets/images/dockerc.png "an-introduction-to-docker-by-instructor-of-o-reilly-s-docker-tutorial"){:height="50%" width="50%"}](https://www.codementor.io/atbaker/an-introduction-to-docker-by-instructor-of-o-reilly-s-docker-tutorial-9x01rz9g7){:target="_blank" rel="nofollow"}

## <a id="3">3.</a>Need / World before Docker
Deployment of applications has improved a lot over the years. Here are some of the methods used :
1. Manual Configuration
    - The oldest method. Done manually via commands or via a script.
    - Minimum resources needed to setup each instance.
    - Can take a lot of time for each instance if a number of softwares have to be installed.
2. Configuration Management Tools (eg : Chef, Ansible etc)
    - Aids automatic deployment.
    - Similar issue as manual deployment ie can take a lot of time due to the installation step.
3. Virtual Machines (eg : Amazon Machine image)
    - Aids automatic deployment.
    - Lesser time for deployment/
    - A lot of resources since the image can be quite heavy.

Additionally Linux Containers(LXC) were used as lightweight alternatives. They were fast to setup but were quite complex.
[!["Deployment spectrum"](/assets/images/deployment_spectrum.png "an-introduction-to-docker-by-instructor-of-o-reilly-s-docker-tutorial")](https://www.codementor.io/atbaker/an-introduction-to-docker-by-instructor-of-o-reilly-s-docker-tutorial-9x01rz9g7){:target="_blank" rel="nofollow"}

Docker strives to strike the right balance between the two sides. It can be operational quite fast & isn't as resource heavy as a VM image.

## <a id="4">4.</a>About Docker
- Docker is an open-source engine that automates the deployment of applications into containers.
- Docker's underlying components are part of a project called [Moby](https://github.com/moby/moby){:target="_blank" rel="nofollow"}.
- Docker relies on Linux kernel features, such as namespaces and cgroups, to ensure resource isolation and to package an application along with its dependencies.
- Docker is licensed under the open source Apache 2.0 license.

### Docker CE vs EE
- Docker Community Edition (CE) is for individuals & DIY sys-ops teams.
- Docker Enterprise Edition (EE) ($750 - $2000 per year) has following addons :
    - Certified images and plugins
    - Docker DataCenter
    - Vulnerability scans
    - Official support
- Docker CE has 2 release channels :
    - Edge : every month
    - Stable : every 3 months
- Docker EE has releases every 3 months.


## <a id="5">5.</a>Timeline
- Solomon Hykes started Docker in France as an internal project within dotCloud, a platform-as-a-service company,[15] with initial contributions by other dotCloud engineers including Andrea Luzzardi and Francois-Xavier Bourlet.
- The software debuted to the public by dotCloud, a platform as a service company in Santa Clara at PyCon in 2013.
- Docker was released as open source in March 2013.
- On March 13, 2014, with the release of version 0.9, Docker dropped LXC as the default execution environment and replaced it with its own libcontainer library written in the Go programming language. It now uses runC from the Open Containers Initiative.
- A May 2016 analysis showed the following organizations as main contributors to Docker: The Docker team, Cisco, Google, Huawei, IBM, Microsoft, and Red Hat.


## <a id="6">6.</a>Applications of Docker
1. Running stand-alone services
    - Just like the old Java tagline 'Write once, run anywhere', an app supported by Docker can be expected to run on any environment if it works on one. 
    - This portabiity of Docker allows running stand-alone services and applications consistently across multiple environments, a concept especially useful in service-oriented architectures and deployments that rely heavily on microservices.
2. Sandboxed environment for testing    
    - Using Docker to create isolated instances to run tests like, for example, those launched by a Continuous Integration (CI) suite like Jenkins CI.
3. Building a multi-user Platform-as-a-Service (PAAS).
    - The isolation of each container simplifies setting up a multi tenant PAAS.
    - Docker also reduces hardware cost by ensuring more efficient use of resources.
4. Development setup
    - Makes your local development and build workflow faster, more efficient, and more lightweight.
    - With the app setup managed within Docker, developers can concentrate on the app logic.
    - Docker encourages developers to focus on a more service oriented architecture & eases maintenance.
    - No more 'it works on my machine' issue since everyone has a common Docker setup for the app.
!["It works"](/assets/images/it_works_on_my_machine.jpg "It works"){:height="50%" width="50%"}
5. Setting up GUI apps in your local setup
    - With apps running within containers, you can free your machine memory from further installations.
    - Docker allows you to specify limits on resources (eg : CPU, memory) & prevent bloating. This leads to greater control over your apps.

## <a id="7">7.</a>Docker installation
It is easiest to install Docker on a Linux OS (eg : Ubuntu).

**Setup Docker for your OS using <https://docs.docker.com/>{:target="_blank" rel="nofollow"}.**

I have listed some of the tools uses to run Docker on a non Linux OS below.

### Docker Toolbox
- Docker toolbox installs Docker Machine and Virtualbox so you can run containers inside a Linux VM run by the Virtualbox hypervisor.
- It installs :
    - Docker CE / EE
    - Docker Compose (to be explained later)
    - Docker machine
    - VirtualBox
- It uses to be the swiss-knife used regularly for the job. A number of tutorials on the net still reference this (& thus docker machine).

#### Docker Machine
- Docker Machine is a tool that lets you install Docker Engine on virtual hosts, and manage the hosts with docker-machine commands. 
- You can use Machine to create Docker hosts on your local Mac or Windows box, on your company network, in your data center, or on cloud providers like Azure, AWS, or Digital Ocean.
- Machine was the only way to run Docker on Mac or Windows previous to Docker v1.12. Starting with the beta program and Docker v1.12, Docker for Mac and Docker for Windows are available as native apps and the better choice for this use case on newer desktops and laptops.


### Docker For Mac/Windows - Recommended
- The popular way to run Docker now.
- Doesn’t require VirtualBox. It uses a Type 1 Hypervisor which exists in the OS (Yosemite 10.10.3+, Windows Pro, Enterprise, or Education edition).
- Docker for Mac runs containers inside a Linux VM run using Mac OS X’s built in hypervisor, xhyve. 
- It also shares the Mac’s network interface with the VM in a clever way so that networking is much simpler. There is no need to run docker-machine commands any more.
- It installs :
    - Docker CE / EE
    - Docker Compose (to be explained later)
- The Docker Engine API is exposed on a socket available to the Mac host at /var/run/docker.sock
- Current limitation : Docker for Windows won’t run if you have VirtualBox installed.
- **Pros**
    - Offers the most “native” experience, you can easily use any terminal you you want since Docker is effectively running on localhost.
    - Docker is actively working on it.
- **Cons**
    - On Windows, if you have legacy apps that need a VM, you can’t reasonably do both.
    - On Windows, volume mount performance is still quite poor, but its improving a lot with every release.

## <a id="8">8.</a>Docker architecture

[!["Docker Components"](/assets/images/engine-components-flow.png "Docker Components as represented in the documentation")](https://docs.docker.com/engine/docker-overview/#docker-engine){:target="_blank" rel="nofollow"}

### 1. Docker Engine

1. Docker server
    - A type of long-running program called a daemon process (the dockerd command).
2. REST API
    - Specifies interfaces that programs can use to talk to the daemon and instruct it what to do.
3. Docker client
    - A command line interface (CLI) client (the docker command).
    - The CLI uses the Docker REST API to control or interact with the Docker daemon through scripting or direct CLI commands.
    - Docker is a client-server application. The Docker client talks to the Docker server or daemon, which, in turn, does all the work.

### 2. Docker Registry

- Docker stores the images you build in registries. 
- There are two types of registries: public and private.
- Docker operates the public registry for images, called the **Docker Hub**.
- You can also store images that you want to keep private on the Docker Hub.
- You can also run your own private registry.


## <a id="9">9.</a>Docker components

### Images
- Images are the building blocks of the Docker world.
- You can consider images to be the "source code" for your containers. They are highly portable and can be shared, stored, and updated.
- You can explore a bunch of images at the Docker hub : <https://hub.docker.com/explore/>{:target="_blank" rel="nofollow"}
- In an un-official image, you can view the commands used to build the image. Eg: <https://hub.docker.com/r/selenium/node-chrome-debug/~/dockerfile/>{:target="_blank" rel="nofollow"}
- They are a layered format, using Union file systems, that are built step-by-step using a series of instructions. For example:
    - Add a file.
    - Run a command.
    - Open a port.

### Containers
- Docker helps you build and deploy containers inside of which you can package your applications and services.
- Containers are launched from images and can contain one or more running processes. 
- You can think about images as the building or packing aspect of Docker and the containers as the running or execution aspect of Docker.
- Each container contains a software image -- its 'cargo' -- and, like its physical counterpart, allows a set of operations to be performed. For example, it can be created, started, stopped, restarted, and destroyed.
- Like a shipping container, Docker doesn't care about the contents of the container when performing these actions; for example, whether a container is a web server, a database, or an application server. Each container is loaded the same as any other container.
- Docker also doesn't care where you ship your container: you can build on your laptop, upload to a registry, then download to a physical or virtual server, test, deploy to a cluster of a dozen Amazon EC2 hosts, and run. Like a normal shipping container, it is interchangeable, stackable, portable, and as generic as possible.

### Volumes
- A volume is a specially designated directory that bypasses the Union File System to provide several useful features for persistent or shared data:
    - Volumes can be shared and reused between containers.
    - A container doesn't have to be running to share its volumes.
    - Changes to a volume are made directly.
    - Changes to a volume will not be included when you update an image.
    - Volumes persist even if no containers use them.

### Networks
- Docker uses Linux kernel namespaces to provide network isolation ie separate virtual interfaces and IP addressing between containers.
- Every Docker container is assigned an IP address, provided through an interface created when we installed Docker. That interface is called docker0 (bridge0 on mac).
- The docker0 interface is a virtual Ethernet bridge that connects our containers and the local host network.
- Every time Docker creates a container, it creates a pair of peer interfaces that are like opposite ends of a pipe. 
- One end is plugged into the docker0 bridge, and the other end is plugged into the container.


## <a id="10">10.</a>Docker alternative : Rocket
- rkt (pronounced like a "rocket") is a CLI for running application containers on Linux. It was staretd in Dec 2014.
- rkt is designed to be secure, composable, and standards-based.
- It isn't as feature rich as Docker yet. So we should probably compare it to the initial versions of Docker.
- Differences from Docker :
    - Rocket does not have a daemon. 
        - A rkt command actually executes directly under the process that you started it from. 
        - Rocket is systemd-spawn or systemd in general. 
        - CoreOS have picked systemd as the init system for their Linux distro. 
        - Rocket is designed to be pluggable ie any other init systems like SysV or upstart should also work with it.
    - Rocket runs multiple processes inside the container. 
        - So you can think of it as there's an outside container, the root container, and each app runs in its own individual container an you can put contraints on those things. 
        - It also leads to lesser consumption of resources.
- Pros :
    - rkt can run Docker images.
    - rkt has a simpler architecture
    - rkt follows an open standard for images (unlike a custom one for building Docker images)
- Cons :
    - The OCI image format is not ready yet
    - Nomad & K8S support not fully mature
    - A bit less portable to other platforms

## Final thoughts
- This completes a summary of Docker basics. The next part will focus on the commands needed to work with Docker.

## References
- <https://en.wikipedia.org/wiki/Docker_(software)>{:target="_blank" rel="nofollow"}
- <https://docs.docker.com/engine/docker-overview/>{:target="_blank" rel="nofollow"}
- <https://www.codementor.io/atbaker/an-introduction-to-docker-by-instructor-of-o-reilly-s-docker-tutorial-9x01rz9g7>{:target="_blank" rel="nofollow"}
- <https://searchservervirtualization.techtarget.com/feature/A-brief-history-of-Docker-Containers-overnight-success>{:target="_blank" rel="nofollow"}
- Rocket : <https://github.com/rkt/rkt>{:target="_blank" rel="nofollow"}
- Docker vs Rocket : <https://medium.com/@adriaandejonge/moving-from-docker-to-rkt-310dc9aec938>{:target="_blank" rel="nofollow"}
- Docker vs Rocket : <https://www.quora.com/What-is-the-difference-between-Docker-and-Rocket>{:target="_blank" rel="nofollow"}
- Docker vs Rocket : <http://containerops.org/2014/12/19/docker-vs-rocket-gimme-a-break/>{:target="_blank" rel="nofollow"}
- Docket installation comparison : <https://nickjanetakis.com/blog/should-you-use-the-docker-toolbox-or-docker-for-mac-windows>{:target="_blank" rel="nofollow"}
- AWS - IAAS or PAAS : <http://www.tomsitpro.com/articles/amazon-aws-paas-iaas-cloud-computing,2-608.html>{:target="_blank" rel="nofollow"}
- GUI apps via containers : <https://medium.com/@dimitris.kapanidis/running-gui-apps-in-docker-containers-3bd25efa862a>{:target="_blank" rel="nofollow"}