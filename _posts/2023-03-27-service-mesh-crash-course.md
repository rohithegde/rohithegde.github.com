---
layout: post
title: "A crash course on Service Mesh"
#category: general
tags: [kubernetes, guide, istio, linkerd, microservices, network, proxy]
comments: true
---

Like Kubernetes, the topic of service meshes can get quite complex once you get into the details of implementation. Based on my 3 years of experience with service meshes, I am attempting to simplify the journey of someone looking to makes sense of this vast topic.
This is related to my [Kubernetes series]({{ site.url }}/#kubernetes) of posts.

<!-- TOC -->

- [Introduction](#introduction)
- [Do service meshes only work with Kubernetes?](#do-service-meshes-only-work-with-kubernetes)
- [Features](#features)
- [Service mesh cons](#service-mesh-cons)
- [Service mesh vs Event mesh](#service-mesh-vs-event-mesh)
- [Service mesh architecture types](#service-mesh-architecture-types)
  - [Sidecar proxy](#sidecar-proxy)
  - [Host based proxy](#host-based-proxy)
  - [eBPF based](#ebpf-based)
- [Comparison of different service meshes](#comparison-of-different-service-meshes)
- [References](#references)

<!-- /TOC -->

## Introduction

- At a high level, a service mesh ensures communication between applications.
- Specifically, a service mesh is a tool for adding observability, security, and reliability features to applications by inserting these features at the platform layer rather than the application layer (where libraries like Twitter’s Finagle, Netflix’s Hystrix, and Google’s Stubby were used).
- The term was introduced in 2016 by William Morgan, Buoyant CEO which eventually led to the creation of the Linkerd 1.0 service mesh. You can read his followup blog post [here](https://linkerd.io/2017/04/25/whats-a-service-mesh-and-why-do-i-need-one/){:target="\_blank" rel="nofollow"}.

## Do service meshes only work with Kubernetes?

- Service meshes are usually associated with Kubernetes. K8s network architecture and layered approach are well suited for service meshes.
- Some service meshes like [Linkerd 2.x work only with Kubernetes](https://linkerd.io/2.12/tasks/install/#requirements){:target="\_blank" rel="nofollow"}. Others like [Istio](https://istio.io/latest/docs/ops/deployment/vm-architecture/){:target="\_blank" rel="nofollow"}, [Consul](https://developer.hashicorp.com/consul/tutorials/developer-mesh/service-mesh-deploy-vms){:target="\_blank" rel="nofollow"} and [Cilium](https://cilium.io/blog/2020/11/10/cilium-19/){:target="\_blank" rel="nofollow"} can work with applications deployed on Virtual Machines too though the setup will likely involve some additional effort.

## Features

- Observability
  - Organizations can get observability support (e.g., metrics, logs, and traces) as well as dependency or service graphs for each of their services (microservice or not), as they adopt a service mesh.
- Security
  - A service mesh can help in setting up a zero trust security model.
  - Authentication, authorization and encrypting traffic between services(mTLS) can be tqaken up by a service mesh.
  - Most service meshes provide a certificate authority (CA) to manage keys and certificates for securing service-to-service communication.
- Reliability
  - Resiliency features typically include circuit-breaking, latency-aware load balancing, eventually consistent service discovery, retries, timeouts, and deadlines.
  - Service meshes also safeguard service reliability by enforcing a timeout on long-running requests. It can ensure services don’t get overloaded by utilizing techniques like circuit breaking.

## Service mesh cons

- Some service meshes can be quite resource heavy(eg: [Istiod uses 1 vCPU and 1.5 GB of memory](https://istio.io/v1.8/docs/ops/deployment/performance-and-scalability/){:target="\_blank" rel="nofollow"}).
- Additional network hops for the traffic.
- Operational complexity can significantly rise for some service meshes wth high learning curve.
- With increase in maturity in k8s and in network CNIs, a number of features are already present and your dependency on service mesh may not be as as much as before.

## Service mesh vs Event mesh

Event mesh and service mesh complement each other in the enterprise by providing two different but effective communication options.

- Event mesh connects not only microservices but also legacy applications, cloud-native services, devices, and data sources/sinks. These can operate both in cloud and non-cloud environments.
- While event mesh is asynchronous, service mesh supports more traditional synchronous request-reply messaging.

## Service mesh architecture types

### Sidecar proxy

!["service-mesh-sidecar"](/assets/images/service-mesh/service-mesh.png "service-mesh-sidecar")

- The most popular pattern for implementing a service mesh is the [sidecar pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar){:target="\_blank" rel="nofollow"}.
- It involves deploying a network proxy for every service instance which handles all communication between the services. This is part of the service mesh data plane which is controlled by the mesh control plane.
- Many service meshes like Istio, Consul, Cilium use [Envoy](https://github.com/envoyproxy/envoy){:target="\_blank" rel="nofollow"} as proxy.

### Host based proxy

- A host based proxy approach involves using a shared agent running on each node/vm of a cluster as proxy.
- It supposed to be a leaner alternative to the sidecar approach as Envoy based sidecars require a fair bit of resources to run (eg: [Istiod uses 1 vCPU and 1.5 GB of memory](https://istio.io/v1.8/docs/ops/deployment/performance-and-scalability/){:target="\_blank" rel="nofollow"}).
- There are service meshes out there who use host based proxy along with sidecar based proxy for better security and division of responsibilities. Eg: [Istio's new Ambient mesh](https://istio.io/latest/blog/2022/introducing-ambient-mesh/){:target="\_blank" rel="nofollow"} (this mode is [not ready for production yet](https://github.com/istio/istio/tree/experimental-ambient#limitations){:target="\_blank" rel="nofollow"} though).

Istio's Ambient mesh which uses both host based(ztunnel) and sidecar proxy(waypoint):
!["istio-ambient-mesh"](/assets/images/service-mesh/istio-ambient-mesh.png "istio-ambient-mesh")

### eBPF based

Isovalent's [Cilium service mesh architecture](https://isovalent.com/blog/post/2021-12-08-ebpf-servicemesh/){:target="\_blank" rel="nofollow"}:
!["ebpf-service-mesh"](/assets/images/service-mesh/ebpf-service-mesh.webp "ebpf-service-mesh")

- Extended Berkeley Packet Filter (eBPF) is a feature of the Linux kernel that allows applications to do certain types of work in the kernel itself. eBPF can be used to replace iptables rules, and accelerate the data plane by shortening the data path.
- There are efforts being made with eBPF to have an improved performance with sidecar free service meshes. Currently [Cilium](https://isovalent.com/blog/post/cilium-service-mesh/){:target="\_blank" rel="nofollow"} is a service mesh which uses eBPF and a node based proxy(Envoy). Istio is also experimenting on this with [Merbridge](https://istio.io/latest/blog/2022/merbridge/){:target="\_blank" rel="nofollow"}.
- The Linux kernel has decades of features and safeguards in it. [It looks difficult to have all proxy features of a service mesh in the kernel with eBPF](https://buoyant.io/blog/ebpf-sidecars-and-the-future-of-the-service-mesh){:target="\_blank" rel="nofollow"}(especially layer 7 features) but many organisations are looking into using eBPF for optimisation. We need to wait and watch to see how the winds blow here.

## Comparison of different service meshes

The below table compares the 4 prominent service meshes. For others you can look at <https://servicemesh.es/>{:target="\_blank" rel="nofollow"}(very detailed with a bit of outdated info and lesser meshes) or <https://layer5.io/service-mesh-landscape>{:target="\_blank" rel="nofollow"}.

| Factor                                 | Istio                                                                      | Linkerd2                                                                             | Consul Connect                                                                  | Cilium                                                                       |
| -------------------------------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------- |
| First stable release                   | 31 Jul 2018                                                                | 18 Sep 2018                                                                          | 16 Oct 2017                                                                     | 24 Apr 2018                                                                  |
| Repository                             | [Istio](https://github.com/istio/istio>){:target="\_blank" rel="nofollow"} | [Linkerd 2.0](https://github.com/linkerd/linkerd2){:target="\_blank" rel="nofollow"} | [Consul](https://github.com/hashicorp/consul){:target="\_blank" rel="nofollow"} | [Cilium](https://github.com/cilium/cilium){:target="\_blank" rel="nofollow"} |
| Language                               | go (control plane), C++(data plane ie Envoy)                               | go (control plane), rust (data plane)                                                | go                                                                              | go                                                                           |
| Supporting organizations               | Lyft, Google, IBM, Microsoft                                               | Cloud Native Foundation (CNCF)                                                       | HashiCorp                                                                       | Isovalent                                                                    |
| Workloads                              | Kubernetes + VMs                                                           | Kubernetes only                                                                      | Kubernetes + VMs                                                                | Kubernetes + VMs                                                             |
| Architecture : Single point of failure | No – uses sidecar per pod                                                  | No                                                                                   | No                                                                              | Partial - node proxy makes the services in affected node vulnerable          |
| Architecture : Proxy                   | Sidecar proxy (Envoy)                                                      | Sidecar proxy (custom)                                                               | Sidecar proxy (Envoy)                                                           | eBPF + node proxy (Envoy)                                                    |
| Architecture : Security                | Yes. Also supports Auth.                                                   | Yes. Also supports Auth.                                                             | Yes. Also supports Auth.                                                        | eBPF + node proxy (Envoy)                                                    |
| mTLS                                   | Yes                                                                        | Yes                                                                                  | Yes                                                                             | Yes                                                                          |
| Security : Certificate Management      | Yes                                                                        | Yes                                                                                  | Yes (with Vault integration)                                                    | Yes                                                                          |
| Communication Protocols                | TCP, HTTP/1.x, HTTP/2, gRPC                                                | TCP, HTTP/1.x, HTTP/2, gRPC                                                          | TCP, HTTP/1.x, HTTP/2, gRPC                                                     | TCP, HTTP/1.x, HTTP/2, gRPC                                                  |
| Traffic Management                     | Blue/Green Deployments, Circuit Breaking, Fault Injection, Rate Limiting   | Blue/Green Deployments, Fault Injection                                              | Blue/Green Deployments, Circuit Breaking, Fault Injection, Rate Limiting        | Blue/Green Deployments, Circuit Breaking, Fault Injection, Rate Limiting     |
| Multicluster Support                   | Yes                                                                        | Yes                                                                                  | Yes                                                                             | Yes                                                                          |
| Ingress                                | Istio gateway or Nginx ingress controller                                  | Any                                                                                  | Envoy and Ambassador                                                            | Any                                                                          |
| Operations Complexity                  | High                                                                       | Low                                                                                  | Medium                                                                          | Medium (debugging with eBPF can be hard)                                     |
| Learning curve                         | High                                                                       | Medium                                                                               | High (plenty of moving parts)                                                   | Medium                                                                       |
| Resources footprint                    | High                                                                       | Medium                                                                               | High                                                                            | Low                                                                          |
| Support                                | Largest community support                                                  | Large community support + Enterprise support                                         | Solid Enterprise support                                                        | Community support + Enterprise support                                       |

## References

- <https://linkerd.io/what-is-a-service-mesh/>{:target="\_blank" rel="nofollow"}
- <https://konghq.com/learning-center/service-mesh/what-is-a-service-mesh>{:target="\_blank" rel="nofollow"}
- <https://isovalent.com/blog/post/addressing-bandwidth-exhaustion-with-cilium-bandwidth-manager/>{:target="\_blank" rel="nofollow"}
- <https://medium.com/elca-it/service-mesh-performance-evaluation-istio-linkerd-kuma-and-consul-d8a89390d630>{:target="\_blank" rel="nofollow"}
- <https://www.toptal.com/kubernetes/service-mesh-comparison>{:target="\_blank" rel="nofollow"}
