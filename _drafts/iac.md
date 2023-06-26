---
marp: true
backgroundColor: #cbc1c1
color: black
title: Crash course on Infrastructure as Code
---

<h1>Crash Course on Infrastructure as Code</h1>

<h4>by Rohit Hegde</h4>

---

Agenda

<!-- TOC -->

    - [About Infrastructure as Code](#about-infrastructure-as-code)
    - [Pros of IaC](#pros-of-iac)
    - [Cons of IaC](#cons-of-iac)
    - [IaC Tech](#iac-tech)
    - [Factors to select the right IaC for you](#factors-to-select-the-right-iac-for-you)
    - [Demo](#demo)
    - [References](#references)

<!-- /TOC -->

---

## About Infrastructure as Code

- Infrastructure as code (IaC) is the process of managing and provisioning computer data centers through machine-readable definition files.
- Drivers
  - Launch of AWS Ec2 in 2006 created scaling problems.
  - The DevOps movement started between 2008 and 2012. It envisioned bringing together the best developer practices (code, reviews, versioning, peer programming, automation, testing etc) into the operations part to ensure high quality of software and reduce turnaround time.
- The popular [CNCF Landscape](https://landscape.cncf.io/) lists various IaC options in the Infrastructure provisioning section.

---

## Pros of IaC

1. Cost reduction
2. Speed at scale
3. Lower risk of human errors
4. Improved consistency
5. Improved security strategies
6. Accountability
7. Stable and scalable environment
8. Self-documentation

---

## Cons of IaC

1. Team has to be always focused on best DevSecOps practices.
2. Code Maintenance.
3. Learning curve (Tech diversity, Conventions etc).

---

## IaC Tech

- Azure/AWS/GCP CLI
- ARM templates / CloudFormation
- Terraform
- Ansible/Chef/Puppet
- Bicep
- AWS Cloud Development Kit (CDK) - Python, TypeScript, Java, .NET.
- Pulumi - Python, JavaScript, TypeScript, Go, Java, .NET, Yaml.

---

## Factors to select the right IaC for you

---

**Cloud strategy**

- To support Hybrid or Multi cloud setup, Terraform, Ansible or Pulumi would be good options.

---

**DevOps maturity**

- The tool you select can depend on which stage of DevOps evolution your team is in. Going from lesser DevOps maturity to higher, the tools are usually : CLI cmds < (Powershell, Ansible) < (Terraform, ARM, Bicep, Pulumi, CDK).
- Learning and maintenance cost are additional factors.
- Community support and the ecosystem around the tools are important factors too.

---

**Bleeding edge**

- The speed at which innovation is adopted at an org is an important factor.
- Usually support for newer cloud resources and features is in the descending order : ARM, Bicep > Powershell, CLI cmd > Terraform, Ansible, Pulumi, CDK.

---

**Programming paradigm**

- Terraform, Bicep, ARM templates and Ansible are declarative in nature while Azure CLI, CDK and Pulumi are imperative.
- Its better to go imperative if you want to add plenty of custom validations or dynamic changes.
- Extensibility, customisation are important factors too though simplicity and ease of use triumphs most.
- You have to consider native tooling for each option that provides the best experience for you.

---

**Language affinity**

- For those with affinity towards some programming languages - Pulumi, Ansible, Powershell would be a good fit.
- For those without any such affinity - Terraform, Bicep, Azure CLI or ARM templates would be better.

---

## Demo

---

## References

- <https://abstraction.blog/2021/03/19/azure-infrastructure-as-code>
- <https://en.wikipedia.org/wiki/Infrastructure_as_code>

---
