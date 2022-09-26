---
layout: post
title: "A secure Hub spoke setup on Azure with private access"
#category: general
tags: [azure, architecture, cloud]
comments: true
---

A secure setup on the cloud can be easy or difficult depending on who you ask.

- Ask junior application developers and they will say its probably easy.
- Ask cloud engineers and they will say its very complex.
- Ask an experienced cloud architect and he/she will say "It depends" :grin:.

This post serves to give a walkthrough of things to consider while creating a hub spoke based network topology with related resources in Azure. Highlights include :

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
  - [WAF](#waf)
  - [Azure Firewall](#azure-firewall)
- [Architecture](#architecture)
  - [Virtual network](#virtual-network)
  - [Firewall](#firewall)
  - [Private endpoints and private links](#private-endpoints-and-private-links)
  - [Virtual Network Gateway](#virtual-network-gateway)
  - [DNS Forwarder](#dns-forwarder)
  - [Disaster Recovery](#disaster-recovery)
  - [Security related tools](#security-related-tools)

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
- For more details please refer to the [Hub spoke ref architecture article](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/hub-spoke?tabs=cli){:target="_blank" rel="nofollow"} and the [Cloud Adoption Framework article](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/hub-spoke-network-topology){:target="_blank" rel="nofollow"} on it.

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
- Azure AD allows us to give [Role based access (RBAC)](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview){:target="_blank" rel="nofollow"} of cloud resources to users and [service principals](https://learn.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals#service-principal-object){:target="_blank" rel="nofollow"}.

### WAF

!["App Gateway WAF"](/assets/images/hub-spoke/app-gw-waf.png "App Gateway WAF")

- You need a Web Application Firewall (WAF) to protect HTTP endpoints.
- WAF comes as part of 3 load balancing services of Azure. You can use either of them depending on requirements:
  - Application Gateway for a regional level load balancing.
  - FrontDoor for a global level load balancing across various regions.
  - CDN (currently public preview).
- You can read more about it [here](https://learn.microsoft.com/en-us/azure/web-application-firewall/overview){:target="_blank" rel="nofollow"}.

### Azure Firewall

!["Azure Firewall"](/assets/images/hub-spoke/firewall-premium.png "Azure Firewall")

- It provides L3-L7 filtering.
- It also provides Threat intelligence-based filtering which can alert and deny traffic from/to known malicious IP addresses and domains which are updated in real time to protect against new and emerging attacks.
- It's Layer 7 filtering isnt a replacement of WAF. It is usually used with WAF for all round protection.
- You can use it as the public interface for routing all inbound non HTTP traffic. Eg: FTP, SSH etc.
- The most important feature of Azure Firewall is filtering outbound network calls. This is usually done by adding a route table entry to ensure outbound traffic goes to the Firewall in the hub.

## Architecture

!["Hub Spoke"](/assets/images/azure/hub-spoke.png "Hub Spoke")

Lets focus on some of the very significant parts shown or missing in the above diagram :

### Virtual network

- The hub vnet is peered with the vnet in each spoke (Eg: Dev, Qa, Prod spokes).
- In some cases, you can split the hub into two vnets - Prod hub vnet to be peered with the the prod spoke vnet and the non prod hub vnet to be peered with the dev and qa vnets. This setup gives you the advantage of network isolation of prod from the non prod environments. Howver this setup will likely double your hub setup cost as various linked resources will have to created in the hub for the 2 vnets.

### Firewall

!["App Gw Firewall Parallel"](/assets/images/hub-spoke/app-gw-firewall-parallel.png "App Gw Firewall Parallel")

- Assuming you go with an Application gateway with WAF and Azure Firewall, it can be [configured in many ways](https://learn.microsoft.com/en-us/azure/architecture/example-scenario/gateway/firewall-application-gateway){:target="_blank" rel="nofollow"}. The [Firewall and Application Gateway in parallel approach](https://learn.microsoft.com/en-us/azure/architecture/example-scenario/gateway/firewall-application-gateway#firewall-and-application-gateway-in-parallel){:target="_blank" rel="nofollow"} is popular.
- The Application gateway is usually placed in each spoke vnet with the Azure Firewall in the hub. Alternatively you could go with placing the Application gateway in the hub to save costs but there is a [limit of 100 active listeners](https://github.com/MicrosoftDocs/azure-docs/blob/main/includes/application-gateway-limits.md){:target="_blank" rel="nofollow"} on it. You could also split the Application gateway into prod and non prod instances in the hub assuming you have split the network for it.
- Another recommended approach would be the [Application gateway before Firewall approach](https://learn.microsoft.com/en-us/azure/architecture/example-scenario/gateway/firewall-application-gateway#application-gateway-before-firewall){:target="_blank" rel="nofollow"}. This follows zero-trust principles (End-to-End TLS encryption). This is relatively a complex setup as it requires SSL termination at various stages.
- Network Security Groups (NSG) should exist on all subnets with a deny all except allowed protocols. Exceptions will be those subnets for which Azure recommends no NSG (Eg: gateway subnet). Important to know that NSGs provide layer 3-4 protection and shouldnt be considered as an alternative to Azure Firewall. You can read more about their comparison [here](https://itnext.io/choosing-between-azure-firewall-and-network-security-groups-b3ed1e6eedbd){:target="_blank" rel="nofollow"}.

### Private endpoints and private links

- Most of the applicable cloud resources (Eg: key vault, storage account, k8s etc) will have private endpoints which bring them to the desired virtual network. Eg: A storage account in hub will have a private endpoint brining it to the hub vnet.
- Due to the [100% SLA of Private DNS Zone](https://azure.microsoft.com/en-us/support/legal/sla/dns/v1_1/){:target="_blank" rel="nofollow"}, we can have a single set of Private DNS zones in the hub itself which can support the whole setup. You can refer to this [private endpoints domain list](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns#azure-services-dns-zone-configuration){:target="_blank" rel="nofollow"} so as to know which Private DNS Zones to create.

### Virtual Network Gateway

- The VPN gateway supports P2S and S2S.
- It can support certificate based access as also Azure AD based access. I personally prefer AAD based access as it gives you more control of who can access the gateway. Using AAD based RBAC or Conditional Access Policy, you can further add restrictions as to which AAD user can access the gateway.
- It supports multiple P2S protocols - SSTP, OpenVPN and IKEv2 VPN. OpenVPN is the popular and industry recommended protocol. You can read about their comparison [here](https://www.vpnmentor.com/blog/vpn-protocol-comparison-pptp-vs-l2tp-vs-openvpn-vs-sstp-vs-ikev2/){:target="_blank" rel="nofollow"}.
- After setting up the above private endpoint base setup, you will not be able to access the cloud resources on the Azure portal. The VPN gateway "brings you into the network" to access the cloud resources.

### DNS Forwarder

!["Hub Spoke Private link"](/assets/images/azure/private-link-hub-spoke.png "Hub Spoke Private link")

- Cloud Engineers need to be able to access various resources from their local machines. Similarly in some organisations, application developers need to access specific cloud resources like storage account in a dev environment.
- A DNS forwarder is a Virtual Machine running on the Virtual Network linked to the Private DNS Zone that can proxy DNS queries coming from other Virtual Networks or from on-premises.
- Once its ready, you can access a FQDN like <https://abc123.vault.azure.net>{:target="_blank" rel="nofollow"} from your laptop assuming the below is true:
  - You have connected to the hub vnet via the VPN gateway (you might need to [modify the Azure VPN config file](https://learn.microsoft.com/en-us/answers/questions/64223/issue-with-resolving-hostnames-while-connected-to.html){:target="_blank" rel="nofollow"} once though). 
  - The DNS forwarder is setup properly and linked to the hub vnet.
  - The Private DNS Zones in your hub vnet resolve the FQDN to the private IP of the cloud resource.
  - If the cloud resource is in a spoke vnet, then the peering between the hub and the spoke will ensure the access goes through.
- A few options for DNS proxies are :
  - Windows VM running DNS services.
  - [Linux VM running DNS services](https://azure.microsoft.com/en-in/resources/templates/dns-forwarder/){:target="_blank" rel="nofollow"}.
  - [Azure Firewall as DNS Proxy](https://azure.microsoft.com/en-us/blog/new-enhanced-dns-features-in-azure-firewall-now-generally-available/){:target="_blank" rel="nofollow"}.
- You can read more about DNS forwarder [here](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns#on-premises-workloads-using-a-dns-forwarder){:target="_blank" rel="nofollow"}.

### Disaster Recovery

- While BCDR is a complex topic and requires a book by itself. In this blog post, I want to focus on an approach for having a resilient Hub as its often pointed out that the hub can be a single point of failure.
- A [multi-hub approach](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/hub-spoke-network-topology#subscription-limits-and-multiple-hubs){:target="_blank" rel="nofollow"} supported by a global load balancing solution can work well here. Infrastructure as Code (IaC) backed solution makes it easier to deploy though the one time investment to create the code is significant but worth it !

!["Multiple Hubs"](/assets/images/hub-spoke/network-hub-spokes-cluster.png "Multiple Hubs")

### Security related tools

Most of the content in this post focuses on network security. As a parting shot, let me just mention other tools which help in this secure setup.

- Tools like Defender for Cloud and Azure Monitor should be integrated with all resources. They provide some great insight which help to plug any gaps in your security.
- Activate regulatory policy initiatives like CIS, NIST etc by default and others like HIPAA, PCI etc based on your domain. Getting to a high regulatory compliance score takes some effort but its essential to be secure.
- Azure DDoS Protection Basic comes built in at free of cost. But a paid feature like [Azure DDoS Protection Standard](https://learn.microsoft.com/en-in/azure/ddos-protection/ddos-protection-overview){:target="_blank" rel="nofollow"} can help for adaptive tuning, monitoring reports, access to DDoS Rapid Response (DRR) team etc if your domain is a high value target for hackers.


That completes this blog post. I tried to make it as exhaustive as possible. Let me know if you want me to add some more details for something I missed.
