---
layout: post
title: "Kubernetes - a simple non technical introduction"
#category: general
tags: [container, guide, kubernetes, software]
comments: true
---

This document was long overdue. Its an attempt to explain Kubernetes in a nutshell to people of all ages in a simple understandable manner. If you are a kid, then [CNCF's illustrated guide](https://www.cncf.io/phippy/the-childrens-illustrated-guide-to-kubernetes/){:target="_blank" rel="nofollow"} is a better fit.

This is Part 1 of my [Kubernetes series]({{ site.url }}/#kubernetes) which focuses on a simple introduction to Kubernetes.
The **target audience for this post are those absolutely new to Kubernetes - even if you are from a non technical background**. ["Part 2 of this series"]({{ site.url }}/2023/01/28/kubernetes-crash-course-part2-internals) which goes into the internals is meant for a technical audience.

<!-- TOC -->

- [What is Kubernetes?](#what-is-kubernetes)
    - [World before containers](#world-before-containers)
    - [What are containers ?](#what-are-containers-)
    - [Container Orchaestration](#container-orchaestration)
    - [Kubernetes as a Container Orchestrator](#kubernetes-as-a-container-orchestrator)
- [What are the features of Kubernetes ?](#what-are-the-features-of-kubernetes-)
- [Why is Kubernetes needed ?](#why-is-kubernetes-needed-)
- [Where did Kubernetes come from ?](#where-did-kubernetes-come-from-)
- [When can Kubernetes be a bad idea ?](#when-can-kubernetes-be-a-bad-idea-)
- [Who is using Kubernetes ?](#who-is-using-kubernetes-)

<!-- /TOC -->

## What is Kubernetes?

### World before containers

- In the old ages, an application would become "live" by installing software on machines by downloading files, libraries and dependencies.
- Difficulties in this approach:
  - Takes a lot of effort.
  - Takes a lot of time based on software size and how many machines involved(ie scale).
  - Compatibility of the software setup with different machines.
- You could reduce effort involved by via automation scripts or via other tools (Eg: Chef, Puppet, Ansible). But other issues remained.

### What are containers ?

- A container is a software package which bundles an application’s code together with the related configuration files, libraries and dependencies.
  - Simple eg : Conceptually its similar to a large zip file having everything needed for the application to run.
  - Real world eg: you can compare it to your large travel bag which has everything you need to function in another place.
- Though [containers existed for many years before](https://blog.aquasec.com/a-brief-history-of-containers-from-1970s-chroot-to-docker-2016){:target="_blank" rel="nofollow"}, Docker made it famous in 2013 by simplifying its usage with an ecosystem of related tools.

### Container Orchaestration

- Container Orchestrators are tools to manage, scale, and maintain containerized applications. 
  - Simple eg : Its like an automated organised admin which takes your zip file and extracts it to any number of suitable machine for making it functional, scalable and accessible.  
  - Real world eg : You can compare it to a hotel which enables you to function by taking care of you (and your travel bag!) by providing you security, support, scalability (more rooms!), ease of maintenance, easy access to the rooms (networking!) etc.
- Popular container orchestrators are Kubernetes (including tools built on top of it like Rancher, OpenShift), HashiCorp Nomad, Mesos and other managed cloud services.

### Kubernetes as a Container Orchestrator

- Kubernetes is a software system that allows you to easily deploy and manage containerized applications on top of it.
- Kubernetes can be thought of as an operating system for the cluster.

## What are the features of Kubernetes ?

- Simplifies application development and deployment.
  - With the automated Container Orchestration, app developers can focus on just making the application work in a container.
- Health checking and self healing.
  - If a container(ie an instance of the app inside it) fails and crashes, a new container(a new app instance) is brought up in its place.
- Automatic scaling.
  - Kubernetes supports load balancing between differences instances of the application container.
  - We can define how many instances we start off. We can also define the rules for scaling which will lead to automatic provisioning of more containers and load balancing of requests between them. Eg rule : Provision 1 container when CPU utilisation exceeds 80%.
- Better utilisation of hardware.
  - We configure how many virtual machines support the Kubernetes cluster.
  - Kubernetes keeps track of how many containers are provisioned in each virtual machine and ensures they are equally distributed among the machines (or as per configured rules).
- Infrastructure as code(IaC).
  - Kubernetes supports using a declarative style ie manifests(yaml or json files) for configuration.
  - IaC enables tracking of changes as its part of the VCS(Version control system).
  - IaC is an important step forward for the DevOps and NoOps initiative.

## Why is Kubernetes needed ?

Kubernetes provides a lot of features under a single umbrella.

## Where did Kubernetes come from ?

!["seven-of-nine-k8s"](/assets/images/k8s/seven-of-nine-k8s.png "seven-of-nine-k8s")

## When can Kubernetes be a bad idea ?

Below are the scenarios for which k8s can be a bad idea. For real-world incidents, please visit the infamous [k8s.af](https://k8s.af/){:target="_blank" rel="nofollow"}.

- You want to host a small web application.
  - Kubernetes was built for scale. Its power is clearly seen when you have a bunch of microservices accessed by a large audience while supported by hundreds of virtual machines.
  - Its overkill if you just have a few microservices and arent planning to scale as much. Serverless or other cloud managed services or a simple vistual machine are a better fit for hosting the app.
- Your organisation lacks Infrastructure engineers.
  - k8s can be simple or complex depending on which level you wish to explore.
  - Even the most self-running automated tool can run into problems. k8s comprises integration between many open source tools and concepts. Infra engineers who will manage the k8s cluster, need to know all about the internals so that they can debug any issue swiftly and well.
- Application architecture not conducive to k8s
  - Some legacy applications are not meant to be deployed into containers in their current form.
- Lack of awareness by stakeholders
  - Some stakeholders go for a shift to k8s with unrealistic expectations. They either have a blind belief in the hype or expect immediate returns.
  - A well built k8s setup requires some upfront investment - whether its research on k8s, well thought of strategies on logging, storage, monitoring and scaling, cost etc. The returns will take some time - especially when you have the microservices functioning smoothly at a high scale.

## Who is using Kubernetes ?

Mercedes
