---
layout: post
title: "A Hub spoke setup on Azure with secure private access"
#category: general
tags: [azure, cloud]
comments: true
---

This post serves to give a walkthrough of things to consider while creating a hub spoke based network topology in Azure. Highlights include :

- A secure setup with the Hub controlling all public access to the spokes.
- No public endpoints in the spoke.
- Private access to resources for the cloud or dev team.

<!-- TOC -->

- [Audience](#audience)
- [Important concepts](#important-concepts)
  - [Hub Spoke](#hub-spoke)
  - [Private endpoints](#private-endpoints)
  - [P2S and S2S](#p2s-and-s2s)
  - [Identity Access Management](#identity-access-management)
- [Architecture](#architecture)
- [References](#references)

<!-- /TOC -->

## Audience

The ideal audience for this post are :

- Cloud Architects exploring different strategies on the cloud.
- Cloud Engineers looking to implement a hub spoke setup on Azure cloud.

If you are an application developer tasked with the cloud setup, then this will give you a good overview of a production grade setup but as the famous Matrix quote goes - "There is a difference in knowing the path and walking it".

## Important concepts

### Hub Spoke

!["Hub Spoke"](/assets/images/hub-spoke/hub-spoke.png "Hub Spoke")

- [Pioneered by Delta Airlines in 1955](https://en.wikipedia.org/wiki/Spoke%E2%80%93hub_distribution_paradigm){:target="_blank" rel="nofollow"}, the Hub-spoke was adopted as the [Star Network](https://en.wikipedia.org/wiki/Star_network){:target="_blank" rel="nofollow"} model by the Information Technology sector in late 1970s.
- In its simplest form, one central hub acts as a conduit to transmit messages.
- The hub virtual network is peered with the spoke virtual network for a non-transitive, low latency connection.
- Advantages
  - **Saving on costs and efficient management** as the hub can be used for storing common resources and managing them.
  - **A separation of concerns** as the hub will be hardened to deal with public access and a spoke can benefit from the hub being the central point of external traffic for it.
- You can read more about it [here](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/hub-spoke?tabs=cli){:target="_blank" rel="nofollow"}.

### Private endpoints

- Private endpoint is now the recommended way to integrate an Azure cloud resource with the network (compared to [Service endpoint](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview){:target="_blank" rel="nofollow"} before).
- A private endpoint is a network interface that uses a private IP address from your virtual network. You can thus communicate with the cloud resource through the private ip.
- The public endpoint for the service will be disabled thus ensuring all traffic to the cloud resource goes through the cloud backbone.
- Resources involved:
  - Subnet - Private IP from this subnet will be assigned to the resource.
  - Private endpoint resource - Links the subnet to a NIC it creates internally which is connected to the [private link service](https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview){:target="_blank" rel="nofollow"} (ie self reference to the cloud resource. Eg : key vault in this case).
  - Private DNS zone - [One for each type of resource](https://docs.microsoft.com/en-us/azure/private-link/private-endpoint-dns){:target="_blank" rel="nofollow"} (Eg: privatelink.vaultcore.azure.net can be used for all Key vaults). This is linked to the virtual network via a vnet link. Additionally an A-record entry is made here for mapping the cloud resource (eg: key vault) to its new private IP. This allows resolution of the name to the right IP.
- You can read more about it [here](https://docs.microsoft.com/en-us/azure/private-link/private-endpoint-overview).

### P2S and S2S

- A [VPN gateway](https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways){:target="_blank" rel="nofollow"} is a specific type of virtual network gateway. VPN Gateway sends encrypted traffic between an Azure virtual network and an on-premises location over the public Internet. This allows for a secure way to connect to cloud resources.
- A [Point-to-Site (P2S)](https://learn.microsoft.com/en-us/azure/vpn-gateway/point-to-site-about){:target="_blank" rel="nofollow"} VPN gateway connection lets you create a secure connection to your virtual network from an individual client computer. This is ideal for Work from home scenarios.
- A [Site-to-site (S2S)](https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-site-to-site-classic-portal){:target="_blank" rel="nofollow"} VPN gateway connection is used to connect your on-premises network to an Azure virtual network. This type of connection requires a VPN device located on-premises that has an externally facing public IP address assigned to it.

### Identity Access Management

- While most of the content here deals with networks, IAM remains an extremely important part of this setup.
- As part of [Defense in Depth](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)){:target="_blank" rel="nofollow"} - network isolation and RBAC are fundamental pillars of any layered security strategy on the cloud.
- Azure AD allows us to give role based access (RBAC) of cloud resources to users and [service principals](https://learn.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals#service-principal-object){:target="_blank" rel="nofollow"}.

## Architecture

!["Hub Spoke"](/assets/images/azure/hub-spoke.png "Hub Spoke")

In the above diagram, I want to highlight some important things :

- Virtual Network and peering
- Virtual Network Gateway
- Private endpoints and private links
- Private DNS Zones
- DNS Forwarder Virtual machine
- Azure Firewall

!["Hub Spoke Private link"](/assets/images/azure/private-link-hub-spoke.png "Hub Spoke Private link")

## References

- [CAF - Hub Spoke best practices](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/hub-spoke-network-topology){:target="_blank" rel="nofollow"}
- [Hub Spoke Private Link](https://docs.microsoft.com/en-us/azure/architecture/guide/networking/private-link-hub-spoke-network){:target="_blank" rel="nofollow"}
