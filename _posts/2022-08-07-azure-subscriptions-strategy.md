---
layout: post
title: "Design strategies for Azure Subscriptions"
#category: general
tags: [azure, cloud]
comments: true
---

A guide to decide on how many subscriptions are right for your use case in Azure.
Many guides out there on this topic but most of them merely borrow from Microsoft's official documentation on this topic. I will attempt to give additional points around that post to help you take an informed decision.

<!-- TOC -->

- [What is a Subscription ?](#what-is-a-subscription-)
- [Factors to consider](#factors-to-consider)
- [Different strategies](#different-strategies)
  - [Application category strategy](#application-category-strategy)
  - [Application category strategy for Hub and Spoke](#application-category-strategy-for-hub-and-spoke)
  - [Functional strategy](#functional-strategy)
  - [Geographic strategy](#geographic-strategy)
  - [Mix subscription strategies](#mix-subscription-strategies)
- [Summary](#summary)
- [References](#references)

<!-- /TOC -->
## What is a Subscription ?

!["subscription"](/assets/images/azure/scope-levels.png "subscription")

- A subscription is a billing entity. It is an agreement with Microsoft to use one or more Microsoft cloud platforms or services.
- Each management group contains one or more subscriptions.
- Azure provides four levels of management scope:
  - Management groups
  - Subscriptions
  - Resource groups
  - Resources
- If you apply any access or policy at one level in the hierarchy, it propagates down to the lower levels. A resource owner or subscription owner can't alter an inherited policy. This limitation helps improve governance.
- An Azure subscription has a trust relationship with Azure Active Directory (Azure AD). A subscription trusts Azure AD to authenticate users, services, and devices.

## Factors to consider

- Resource limits at subscription level
  - Azure has limits set at different levels (like per region per subscription). Eg : App Service Certificates per subscription is set to 10.
  - You can get more details [here](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits).
- Resource specific restrictions
  - Some resources have dependencies which cannot be in other subscriptions. Eg : Virtual machine's boot diagnostics can be stored only in a Storage account in same subscription.
- Seperation of concerns.
  - In some organisations, subscriptions are used to seperate out governance (eg: Policy assignments) and isolate applications or environments. This can be done at management group or resource group level too.
  - Billing at env/subscription level is useful for some organisations which want to track prod expenses in an easy manner.
- Maintenance
  - Managing RBAC at subscription level is easier than maintaining the same at resource group or resource level.
  - Naming and tagging strategy will be important to maintain segregation between resource groups in a single subscription level.

## Different strategies

While there are many [different strategies documented](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/decision-guides/subscriptions/){:target="_blank" rel="nofollow"}, here are the main ones which we see in the industry.

### Application category strategy

- As an organization's cloud footprint grows, more subscriptions are typically created to support applications. These applications have fundamental differences in business criticality, compliance requirements, access controls, or data protection needs.
- Built from the initial production and nonproduction subscriptions, the subscriptions that support these application categories are organized under either the production or nonproduction management group as applicable.

!["subscription-hierarchy-app-category"](/assets/images/azure/decision-guide-subscriptions-hierarchy.png "subscription-hierarchy-app-category")

### Application category strategy for Hub and Spoke

- This is a modified version of Application category strategy for the hub and spoke network topology which I have used at various clients.
- By default there is a single Prod spoke subscription. This can be replaced by multiple prod subscriptions ie one for each application if the client wants a different subscription for each application (for billing or governance purposes).
- Also one Sandbox subscription for cloud engineers to use for experimentation.
- The segregation of different environments via subscriptions allows for additional abstraction between environments.

!["subscription-hierarchy-hub-spoke"](/assets/images/azure/subscription-hierarchy-hub-spoke.drawio.png "subscription-hierarchy-hub-spoke")

### Functional strategy

The functional strategy organizes subscriptions and accounts along functional lines like finance, sales, or IT support. This organization is done by using a management group hierarchy.

!["subscription-hierarchy-functional"](/assets/images/azure/subscription-hierarchy-functional.drawio.png "subscription-hierarchy-functional")

### Geographic strategy

For organizations with global operations, the geographic strategy groups subscriptions and accounts based on geographic regions using a management group hierarchy.

!["subscription-hierarchy-geographic"](/assets/images/azure/subscription-hierarchy-geographic.drawio.png "subscription-hierarchy-geographic")

### Mix subscription strategies

Management group hierarchies can be up to six levels deep. This depth gives you the flexibility to create a hierarchy that combines several of these strategies to meet your organizational needs.

!["subscription-hierarchy-mixed"](/assets/images/azure/decision-guide-subscriptions-hierarchy-mixed.png "subscription-hierarchy-mixed")

## Summary

As you see, the hierarchy you go for will depend based on your organisation and the Ops practices in place. This is an important foundational piece on which additional layers of governance, landing zones etc will be built on.

## References

- [CAF - Subscriptions decision guide](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/decision-guides/subscriptions/){:target="_blank" rel="nofollow"}
- [CAF - Subscription limits](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/resource-org-subscriptions){:target="_blank" rel="nofollow"}
- [Subscriptions](https://docs.microsoft.com/en-us/microsoft-365/enterprise/subscriptions-licenses-accounts-and-tenants-for-microsoft-cloud-offerings?view=o365-worldwide#subscriptions){:target="_blank" rel="nofollow"}
- [Subscriptions - AzureAD](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-subscriptions-associated-directory){:target="_blank" rel="nofollow"}
