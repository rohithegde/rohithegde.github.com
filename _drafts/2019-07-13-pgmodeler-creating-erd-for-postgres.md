---
layout: post
title: "pgModeler : Creating ERDs for Postgres"
#category: general
tags: [postgres, erd, documentation, opensource]
comments: true
---

## Background story
- This is part 2 of a [2 part series]({{ site.url }}/#docker) to understand Docker & work with it.

## Agenda
1. [Docker management commands](#management-cmds)
2. [Basic commands to setup a single service](#basic-cmds)
3. [Artifacts](#artifacts)
    1. [Dockerfile](#Dockerfile)
    2. [.dockerignore](#dockerignore)
    3. [docker-compose.yaml](#docker-compose.yaml)
    4. [.env](#env)
4. [Other useful commands](#other-commands)
    1. [Image](#Image)
    2. [Container](#Container)
    3. [Volume](#Volume)
    4. [Network](#Network)
    5. [System](#System)
    6. [Logs](#Logs)
5. [Tips](#tips)

## <a id="management-commands">1.</a>Docker Management commands
- Before we move on the practical example, its important to talk about Docker management cmds.
- Earlier Docker commands were quite chaotic. Commands like `docker run`, `docker ps` existed without visible context on to what component they operated on. Additionally some of them were singular(`docker ps`) while some plural (`docker images`). They still exist & are still popular but with Docker v1.13, management commands were introduced which introduced some uniformity & organization.
- Executing `docker --help` gives you the list management commands : 

    !["Docker Management commands"](/assets/images/docker-management-cmds.png "Docker Management commands")
- We will be using management commands in all further examples.
- We will primarily concentrate on the management commands related to container, image, network, volume & system. 
- A summary of the other management commands :

|---
| cmd | description
|-|:-|
| checkpoint | Experimental feature of Docker to use Linux's CRIU (Checkpoint/Restore In Userspace) mechanism to generate a snapshot of a running container (filesystem + running processes).
| plugin | Allows you to extend core Docker capabilities(primarily Networking, Storage and Authorization) with 3rd party plugins.
| trust | Content trust provides the ability to use digital signatures for data sent to and received from remote Docker registries.
| swarm | Manage Swarm orchestrator.
| config | A swarm feature by which allows you to store non-sensitive information like config files outside an image or container.
| node | Manage Swarm nodes.
| secret | A swarm feature which allows you to manage any sensitive data which a container needs at runtime but you don’t want to store in the image or in source control (eg : credentials, SSK keys).
| service | A swarm feature which allows you to manage services.
|===

## <a id="artifacts">3.</a>Artifacts
The above commands are enough to setup basic apps from existing images. But for custom apps which are more complex to setup, we need to depend on some Docker artifacts. 

Lets take a look at the 4 artifacts of Docker.

## <a id="references">5.</a>Further reading / references
- <https://en.wikipedia.org/wiki/Docker_(software)>{:target="_blank" rel="nofollow"}
- Docker compose file versioning : <https://docs.docker.com/compose/compose-file/compose-versioning/#compatibility-matrix>{:target="_blank" rel="nofollow"}
- Docker plugins : <https://www.inovex.de/blog/docker-plugins/>{:target="_blank" rel="nofollow"}
- Docker build cache : <https://docs.docker.com/v17.09/engine/userguide/eng-image/dockerfile_best-practices/#build-cache>{:target="_blank" rel="nofollow"}
- Optimizing .dockerignore : <https://blog.codeship.com/leveraging-the-dockerignore-file-to-create-smaller-images/>

