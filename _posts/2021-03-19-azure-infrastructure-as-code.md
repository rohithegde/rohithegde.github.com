---
layout: post
title: "Infrastructure as Code tool for Azure"
#category: general
tags: [azure, cloud, iac, terraform, ansible, devops, pulumi]
comments: true
---

<!-- TOC -->

- [Background](#background)
- [Popular IaC options for Azure](#popular-iac-options-for-azure)
- [Consideration Factors to chose a good IaC option for Azure](#consideration-factors-to-chose-a-good-iac-option-for-azure)
  - [Cloud strategy](#cloud-strategy)
  - [DevOps maturity](#devops-maturity)
  - [Bleeding edge](#bleeding-edge)
  - [Programming paradigm](#programming-paradigm)
  - [Language affinity](#language-affinity)
- [Example scenarios](#example-scenarios)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->
## Background

> “The most powerful tool we have as developers is automation.” — Scott Hanselman

The DevOps movement envisions bringing together the best developer practices (code, reviews, versioning, peer programming, automation, testing etc) into the operations part to ensure high quality of software and reduce turnaround time.
Infrastructure as Code (IaC) is thus one of the main pillars of the DevOps movement.

The popular [CNCF landscape](https://landscape.cncf.io/){:target="_blank" rel="nofollow"} lists various IaC options in the Infrastructure provisioning section.

!["CNCF landscape part on provisoning"](/assets/images/iac/iac.jpg "CNCF landscape part on provisioning")

I have been working with Terraform and ARM templates as IaC options for deploying to the Azure cloud for the past couple of years. As such, when I attended Microsoft Ignite in Florida back in 2019, one session was of particular interest to me - [How to choose the right infrastructure management tool for the job](https://myignite.microsoft.com/archives/IG19-BRK2166){:target="_blank" rel="nofollow"}.
Some of the insightful points made in the session can be extended to newer tools too. So time to blog about it !

## Popular IaC options for Azure

1. [Azure CLI](https://github.com/Azure/azure-cli){:target="_blank" rel="nofollow"}
2. [Powershell](https://github.com/PowerShell/PowerShell){:target="_blank" rel="nofollow"}
3. [ARM templates](https://azure.microsoft.com/en-in/services/arm-templates/#features){:target="_blank" rel="nofollow"}
4. [Terraform](https://github.com/hashicorp/terraform){:target="_blank" rel="nofollow"}
5. [Ansible](https://github.com/ansible/ansible){:target="_blank" rel="nofollow"}
6. [Bicep](https://github.com/Azure/bicep){:target="_blank" rel="nofollow"}
7. [Pulumi](https://github.com/pulumi/pulumi){:target="_blank" rel="nofollow"}

Most of these tools are treated as first class citizens by Microsoft which is why it contributes to their development too.

[Pulumi](https://github.com/pulumi/pulumi){:target="_blank" rel="nofollow"} looks to be an interesting option as it has support for coding in Javascript, Typescript, Python, Go and .NET (C#/F#/VB.NET) though its support in the community is not as much as Ansible and Terraform.

## Consideration Factors to chose a good IaC option for Azure

### Cloud strategy

- To support Hybrid or Multi cloud setup, Terraform, Ansible or Pulumi would be good options.

### DevOps maturity

- The tool you select can depend on which stage of DevOps evolution your team is in. Going from lesser DevOps maturity to higher, the tools are usually : Azure CLI < (Powershell, Ansible) < (Terraform, ARM, Bicep, Pulumi)
- You also have to consider the number of teams that manage infrastructure since code structure will be important here.
- Learning and maintenance cost are additional factors.
- Community support and the ecosystem around the tools are important factors too.

### Bleeding edge

- The speed at which innovation is adopted at an org is an important factor.
- Usually support for newer cloud resources and features is in the descending order : ARM, Bicep > Powershell, Azure CLI > Terraform, Ansible, Pulumi.

### Programming paradigm

- Terraform, Bicep, ARM templates and Ansible are declarative in nature while Azure CLI, Powershell and Pulumi are imperative.
- Its better to go imperative if you want to add plenty of custom validations or dynamic changes.
- Extensibility, customisation are important factors too though simplicity and ease of use triumphs most.
- You have to consider native tooling for each option that provides the best experience for you. Plenty of extensions in IDEs like VSCode for a lot of languages. Something like Terraform has great ecosystem for testing too (eg: Terratest).

### Language affinity

- For those with affinity towards some programming languages - Pulumi, Ansible, Powershell would be a better fit.
- For those without any such affinity - Terraform, Bicep, Azure CLI or ARM templates would be better.

## Example scenarios

Here we take some use cases and suggest options which are well suited for it.

- .NET dev, Microsoft cloud(Azure, O365) and/or Prem support :
  - Powershell
  - ARM templates
  - Pulumi
- DevOps engineer working with multiple clouds, many teams and a full pipeline :
  - Terraform
  - Ansible
  - Pulumi
- IT Engineer :
  - Bash scripts with Azure CLI

## Final thoughts

- I have worked extensively with ARM templates (simple json structure, bleeding edge updates but complex if data transformation is desired) and Terraform (declarative syntax, easy to understand, good tooling ecosystem but takes some time for supporting the newer features in Azure cloud).
- Every tool has some pros and cons. Additionally the tool of choice for one org might not be as suitable for another due to difference in consideration factors.
- The factors given here should help you create your own decision matrix and pick a suitable IaC tool for your Azure deployments :thumbsup:

<br/>Feel free to share your thoughts. Every bit of knowledge helps :blush:.
