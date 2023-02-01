---
layout: post
title: "Kubernetes - a simple non technical introduction"
#category: general
tags: [container, guide, kubernetes, software]
comments: true
---

This post was long overdue. I have been working with Kubernetes for 5+ years now. This is an attempt to explain Kubernetes to people of all ages in a simple understandable manner. If you are a kid, then [CNCF's illustrated guide](https://www.cncf.io/phippy/the-childrens-illustrated-guide-to-kubernetes/){:target="_blank" rel="nofollow"} might be a better fit.

The **target audience for this post are those absolutely new to Kubernetes - even if you are from a non technical background**. The other parts of [my Kubernetes series]({{ site.url }}/#kubernetes) are meant for a technical audience.

<!-- TOC -->

- [Where did Kubernetes come from ?](#where-did-kubernetes-come-from-)
- [What is Kubernetes?](#what-is-kubernetes)
    - [World before containers](#world-before-containers)
    - [What are containers ?](#what-are-containers-)
    - [Container Orchaestrators](#container-orchaestrators)
- [Why is Kubernetes needed ?](#why-is-kubernetes-needed-)
- [When can Kubernetes be a bad idea ?](#when-can-kubernetes-be-a-bad-idea-)
- [Who is using Kubernetes ?](#who-is-using-kubernetes-)

<!-- /TOC -->

## Where did Kubernetes come from ?

- Kubernetes was announced by Google in mid-2014. It was inspired by Google's internal tool [Borg](https://research.google/pubs/pub43438/){:target="_blank" rel="nofollow"} which has been in use for more than a decade.
- Kubernetes is often abbreviated as k8s, counting the eight letters between the "K" and the "s".
- Kubernetes means "helmsman," "pilot," or "governor". Sticking to its ship analogy, most tools in the Kubernetes ecosystem have been named after some ship related concept or part.
- The creators of Kubernetes (and Borg) were inspired by the popular [Star Trek series](https://en.wikipedia.org/wiki/Star_Trek){:target="_blank" rel="nofollow"}:
  - The orginal tool was named after [the Borg](https://en.wikipedia.org/wiki/Borg){:target="_blank" rel="nofollow"} - the hive-mind alien species which are a recurring antagonist in the series.
  - Kubernetes was originally called "Project 7" after the Star Trek ex-Borg character [Seven of Nine](https://en.wikipedia.org/wiki/Seven_of_Nine){:target="_blank" rel="nofollow"} and gave its logo a seven-spoked wheel.
  
## What is Kubernetes?

### World before containers

- In the old ages, an application would become "live" by installing software on machines. It involved downloading files, libraries and dependencies.
- Difficulties in this approach:
  - Takes a lot of effort.
  - Takes a lot of time based on software size and how many machines are involved(ie scale).
  - Compatibility of the software setup with different machines.
- You could reduce effort involved by via automation scripts or via other tools (Eg: Chef, Puppet, Ansible). But other issues remained.

### What are containers ?

- A container is a software package which bundles an application’s code together with the related configuration files, libraries and dependencies.
  - Simple eg : Conceptually its similar to a large zip file having everything needed for the application to run.
  - Real world eg: you can compare it to your large travel bag which has everything you need to function in another place.
- Though [containers existed for many years before](https://blog.aquasec.com/a-brief-history-of-containers-from-1970s-chroot-to-docker-2016){:target="_blank" rel="nofollow"}, Docker made it famous in 2013 by simplifying its usage with an ecosystem of related tools. You can refer to [my blog posts on Docker]({{ site.url }}/#docker) if you want to learn more.

### Container Orchaestrators

- Container Orchestrators are tools to manage, scale, and maintain containerized applications. 
  - Simple eg : Its an automated tool which takes your "zip file" and extracts it to any number of suitable machine for making it functional, scalable and accessible.  
  - Real world eg : You can compare it to a hotel which enables you to function by taking care of you (and your travel bag!). It provides you security, support, scalability (more rooms!), ease of maintenance, easy access to the rooms (networking!) etc.
- Popular container orchestrators are Kubernetes, tools built on top of Kubernetes(Rancher, OpenShift, VMware Tanzu) and cloud managed services (GKE, AKS, EKS), HashiCorp Nomad, Apache Mesos and other container hosting services on the cloud (AWS Fargate, ECS, Azure Container Instance, Google Cloud Run) etc.
- Kubernetes is also known as the operating system of the cluster.

With a ship on top of it, the famous Marina Bay Sands hotel of Singapore can be a great way to remember Kubernetes.
!["k8s-real-world-example"](/assets/images/k8s/hotel-marina-bay-sands.png "k8s-real-world-example")

## Why is Kubernetes needed ?

Some advantages of Kubernetes:

- Simplifies application development and deployment.
  - With the automated Container Orchestration, app developers can focus on just making the application work in a container.
- Health checking and self healing.
  - If a container(ie an instance of the app inside it) fails and crashes, a new container(a new app instance) is brought up in its place.
- Automatic scaling.
  - Kubernetes supports load balancing between differences instances of the application container.
  - We can define how many instances we start off. We can also define the rules for scaling which will lead to automatic provisioning of more containers and load balancing of requests between them. Eg rule : Provision 1 more node when CPU utilisation exceeds 80%.
- Better utilisation of hardware.
  - We configure how many virtual machines support the Kubernetes cluster.
  - Kubernetes keeps track of how many containers are provisioned in each virtual machine and ensures they are equally distributed among the machines (or as per configured rules).
- Infrastructure as code(IaC).
  - Kubernetes supports using a declarative style ie manifests(yaml or json files) for configuration.
  - IaC enables tracking of changes as its part of the VCS(Version control system).
  - IaC is an important step forward for the DevOps and NoOps initiative.
- Helps in avoding vendor lock-in as k8s provides a high level of abstraction over various services due to its loosely coupled archtiecture.

## When can Kubernetes be a bad idea ?

Below are the scenarios for which k8s can be a bad idea. For real-world incidents, please visit the infamous [k8s.af](https://k8s.af/){:target="_blank" rel="nofollow"}.

- You just want to host a small web application.
  - Kubernetes was built for scale. Its power is clearly seen when you have a bunch of microservices accessed by a large audience while supported by hundreds of virtual machines.
  - Its overkill if you just have a few microservices and arent planning to scale as much. Serverless or other cloud managed services or a simple vistual machine are a better fit for hosting such an app.
- Your organisation lacks Infrastructure engineers.
  - K8s can be simple or complex depending on which level you wish to explore.
  - Even the most self-running automated tool can run into problems. K8s comprises integration between many open source tools and concepts. Infra engineers who will manage the k8s cluster, need to know all about the internals so that they can debug any issue swiftly.
- Application architecture not conducive to k8s.
  - Some legacy applications are not meant to be deployed into containers in their current form(eg: Monoliths).
- Unrealistic expectations by stakeholders.
  - Some stakeholders go for a shift to k8s with a lack of awareness. They either have a blind belief in the hype or expect immediate returns.
  - A well built k8s setup requires some upfront investment - whether its research on k8s, well thought of strategies on logging, storage, monitoring and scaling, cost etc. The returns will take time.

## Who is using Kubernetes ?

[Many organisations](https://kubernetes.io/case-studies/){:target="_blank" rel="nofollow"} are using k8s. Some prominent ones:

- [Mercedes and its 900 k8s clusters](https://www.infoworld.com/article/3664052/why-mercedes-benz-runs-on-900-kubernetes-clusters.html){:target="_blank" rel="nofollow"}
- [OpenAI](https://kubernetes.io/case-studies/openai/){:target="_blank" rel="nofollow"}
- [CERN](https://kubernetes.io/case-studies/cern/){:target="_blank" rel="nofollow"}
- [Tinder](https://medium.com/tinder/tinders-move-to-kubernetes-cda2a6372f44){:target="_blank" rel="nofollow"}
- [Adidas](https://kubernetes.io/case-studies/adidas/){:target="_blank" rel="nofollow"}


Stay tuned for [more posts on Kubernetes]({{ site.url }}/#kubernetes) !
