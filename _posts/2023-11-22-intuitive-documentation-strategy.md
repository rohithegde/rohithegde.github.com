---
layout: post
title: "An intuitive documentation strategy"
#category: general
tags: [cloud, documentation, guide, strategy]
comments: true
---

I wrote this blog post to share some of my learnings on creating intuitive documentation for products and projects over the past decade or so. This post is for those of you looking to make your documentation interesting enough for the audience to keep coming back for more.

<!-- TOC -->

- [The current state of documentation](#the-current-state-of-documentation)
- [Benefits of good documentation](#benefits-of-good-documentation)
- [How to create intuitive documentation](#how-to-create-intuitive-documentation)
  - [Manifesto](#manifesto)
  - [Folder structure](#folder-structure)
    - [Eg - Cloud product](#eg---cloud-product)
    - [Eg - Process](#eg---process)
  - [Important documents](#important-documents)
    - [README.md](#readmemd)
    - [Onboarding sessions guide](#onboarding-sessions-guide)
    - [Working on the first story guide](#working-on-the-first-story-guide)
    - [Architecture](#architecture)
    - [Features watch list](#features-watch-list)
    - [Specialist path guides](#specialist-path-guides)
  - [Automation](#automation)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->

> “I have some paperwork to catch up. If I am not back in two days, organize a search and rescue team!" - Stanley Parker from The Better Half comic.

This blog post is focused on creating an intuitive documentation which can scale for a large product. So it focuses on the balanced approach - between the low and high documentation levels below.

!["Documentation zones"](/assets/images/documentation/documentation-zones.drawio.png "Documentation zones")

## The current state of documentation

- The quality of documentation of a product can be considered as a barometer of the developer's empathy. However it remains one of the most ignored parts of the software world.
- As the famous line in the Matrix movie series goes “There is a difference in knowing the path and walking the path”. A lot of people merely preach about good documentation while creating a lacklustre README.md file in the repo.
- Projects done by a lot of consultancies add documentation at the fag end of the work as an afterthought ensuring not much time is given to developing it.

## Benefits of good documentation

Good intuitive documentation can be helpful in many ways. It can:

- Enable faster handover of projects to client tech teams.
- Reduce dependency on core team members.
- Enable easier maintenance of documentation.
- Simplify onboarding for new team members.
- Provide better estimation of the time needed for onboarding a new team member.
- Achieve easier compliance of a product's vision.
- Guide engineers in their day to day work.

## How to create intuitive documentation

My playbook for creating intuitive documentation consists of 4 steps :

1. Creating a simple manifesto/vision.
2. Creating a intuitive folder structure.
3. Creating specific documents to aid onboarding.
4. Automating creation of documentation where it adds value.

### Manifesto

Translating the vision of the core engineers for the rest of the team is easier with a simple manifesto. Here is an example:

- Engineers should update the technical documentation.
  - Good documentation comes from empathy ie the desire to share the knowledge and enable a smooth onboarding experience.
  - Involve technical writers and analysts only if the audience are not engineers.
- New documentation should ALWAYS be reviewed.
  - Pull Request(PR) if its a code repo, [Automated review process](https://confluence.atlassian.com/confeval/confluence-evaluator-resources/confluence-workflows-approval){:target="\_blank" rel="nofollow"} if Atlassian's Confluence or a simple people process to ensure engineers always tag reviewers on their documentation.
- Simplify learning experience for engineers.
  - Keep it as visual as possible. Use the [4+1 architectural view model](https://en.wikipedia.org/wiki/4%2B1_architectural_view_model){:target="\_blank" rel="nofollow"} OR [C4 model](https://c4model.com/){:target="\_blank" rel="nofollow"} to show different perspectives.
  - Use a layered approach to explain complex concepts and avoid overwhelming the audience. Use pre-read or post-read sections in a document to recommend a user journey.
  - Use draw.io to store the diagrams in the VCS to access the diagrams without a license.

### Folder structure

Having an intuitive folder structure or hierarchy is extremely essential for navigating through the documentation with ease. Dont worry about the documents given in them. I have explained that in the documents section next. Lets go through couple of examples below.

Note : I have considered a documentation repo consisting of markdown files. You can assume similar structure for other tools like Confluence or Google drive or Sharepoint.

#### Eg - Cloud product

```bash
📁 aws
   ├ 📁 architecture
   │    ├ 📁 architecture-decision-records
   │    │    ├ 📁 2023
   │    │    │  ├ 📄 1-adr-some-feature.md
   │    │    │  ├ 📄 2-adr-some-feature-again.md
   │    │    ├ 📁 2024
   │    ├ 📁 latest
   │    │    ├ 📄 integrations.md
   │    │    ├ 📄 automations.md
   │    │    ├ 📄 org-hierarchy.md
   │    │    ├ 📄 network-traffic.md
   │    │    ├ 📄 tech-stack.md
   │    │    ├ 📄 well-architected-framework.md
   ├ 📁 guides
   │    ├ 📄 1-onboarding-sessions.md
   │    ├ 📄 2-working-on-the-first-story.md
   │    ├ 📄 3-troubleshooting.md
   │    ├ 📁 specialized
   │    │    ├ 📄 1-k8s-engineer-path.md
   │    │    ├ 📄 2-cloud-engineer-path.md
   ├ 📁 development
   │    ├ 📁 ai
   │    ├ 📁 compute
   │    ├ 📁 data
   │    ├ 📁 devops
   │    │    ├ 📁 iac
   │    │    │    ├ 📁 styleguide
   │    │    │    │    ├ 📄 resource-naming-conventions.md
   │    │    │    │    ├ 📄 variable-naming-conventions.md
   │    │    │    ├ 📁 testing
   │    │    │    │    ├ 📄 conventions.md
   │    │    │    ├ 📁 features-watch-list
   │    │    │    │    ├ 📄 2023-01-10.md
   │    │    │    │    ├ 📄 yy-mm-dd.md
   │    │    ├ 📄 versioning.md
   │    ├ 📁 monitoring
   │    ├ 📁 networking
   │    ├ 📁 security
   │    │    ├ 📄 k8s-security-matrix.md
   │    │    ├ 📄 personas.md
   │    │    ├ 📄 security.md
   ├ 📁 rfc
   │    ├ 📁 ai
   │    ├ 📁 compute
   │    │    ├ 📄 k8s-production-best-practices.md
   │    ├ 📁 data
   │    ├ 📁 devops
   │    ├ 📁 monitoring
   │    ├ 📁 networking
   │    ├ 📁 security
   ├ 📄 README.md
   ├ 📄 .gitignore

```

- Above folder structure is for AWS cloud but it can be extended for multi-cloud. Have a folder for each cloud and a common folder for documentation which is cloud agnostic.
- Important to have year based folders for easier segregation of ADR like documents which will keep getting created for the lifetime of a product.
- Essential to have the latest state of the architecture in one place as it provides a high level technical overview of the entire product.
- The guides folder has onboarding journeys which have to be seen by every new team member.
- The development folder contains implementation details.
- The rfc folder is optional. I used it to seperate research documentation from actual implementation. It helped me easily transfer implementation documentation to clients.

#### Eg - Process

```bash
├ 📁 process
|   ├ 📁 agile
|   |   ├ 📄 ceremonies.doc
|   |   ├ 📄 definition-of-ready.doc
|   |   ├ 📄 definition-of-done.doc
|   |   ├ 📁 sprints
|   |   |   ├ 📁 2023
|   |   |   |   ├ 📁 sprint1
|   |   |   |       ├ 📄 sprint1-review.doc
|   |   |   |       ├ 📄 sprint1-retro.doc
|   |   |   ├ 📁 2024
|   ├ 📁 releases
|   |   ├ 📁 2023
|   |   |   ├ 📄 release-2023-01-19.doc
|   |   |   ├ 📄 release-2023-02-02.doc
|   |   ├ 📁 2024
```

The files above represent word or txt files in a file storage tool. This is useful as :

- It makes it easy for the non-devs (Product Owners, Scrum masters etc) to update it directly.
- The files here do not necesarily need a review.

You can have them in a repo as markdown too if you need a consistent user experience though its probably overkill.

### Important documents

There are some documents which can immensely help the overall team. Let me share few of them.

#### README.md

The `README.md` file should contain the highlights of the app and absolute basics needed to use it. Anything more and you lose the audience. Keep the other important stuff in some sort of documentation repo or wiki.

#### Onboarding sessions guide

- This doc helps to estimate the onboarding experience if it involves live or recorded video sessions.
- It also helps to highlight the main topics in a sequential flow needed for a successful onboarding.

Eg:

<img src="/assets/images/documentation/onboarding-sessions.png" style="border: 1px solid  gray;" height="60%" width="60%">

#### Working on the first story guide

This doc jots down the exact steps to implement a story and have it deployed to prod. It involves issue tracking process, team review process, git changes, release process etc. It helps to remove ambiguity from the whole process.

Eg:

<img src="/assets/images/documentation/first-story.png" style="border: 1px solid  gray;" height="60%" width="60%">

#### Architecture

- `integrations.md` - Lists all the 3rd party integrations in place with links to further details.
- `automations.md` - Lists all the automations in place with links to further details. Eg: Resource cleaning cron for sandbox cloud accuounts.
- `tech-stack.md` - Lists all the technologies in place with details on why they are used. Also lists best external or internal resources to learn more about them.
- `well-architected-framework.md` - An extremely important document which views the entire product from the prism of an industry recognized framework. This makes it easy to pitch the product to potential clients or internal tech leadership.

Eg:

<img src="/assets/images/documentation/well-architected-framework.png" style="border: 1px solid  gray;" height="60%" width="60%">

#### Features watch list

- This document aids product maintenance. Taking the example of a cloud based product, you can visit the new features or updates made by the specific cloud provider(eg: Azure) for the last one year(depending on the frequency of the exercise) and prioritise specific ones which you want to bring into your product. Same applies for any tech - whether its a cloud or a frontend framework.
- It can have different sections of "General Availability" and "Public preview" with top 10 features in each that you want to add to your product. The ones in "Public Preview" are prioritised ONLY if its absolutely needed.

Eg:

<img src="/assets/images/documentation/features-watch-list.png" style="border: 1px solid  gray;" height="60%" width="60%">

#### Specialist path guides

Last but not least - this set of documents define the personas which are needed for the team. It can contain a list of certifications or custom list of skills/tech or some combo of the two so that it sets up the new team member for success in the team and maybe even his/her career.

Eg of certifications for an Azure cloud engineer :

<img src="/assets/images/documentation/cloud-engineer.png" style="border: 1px solid  gray;" height="60%" width="60%">

Eg of knowledge needed to master a specific k8s cluster setup :

<img src="/assets/images/documentation/k8s-engineer.png" style="border: 1px solid  gray;" height="60%" width="60%">

### Automation

Some of the documentation can be auto generated as long as they follow specific conventions or templates.
Examples include API docs, Change logs, Release docs etc.
You can even automate generation of the tech aspects of the README.md of a repo as also tag creation using simple bash.

- There are some tools out there like [Docusaurus](https://docusaurus.io/docs/playground){:target="\_blank" rel="nofollow"} which offer an easy to use opinionated documentation structure and website. Do note that they merely focus on the high level folder structure and setup aspects.
- Tools like [Slate](https://github.com/slatedocs/slate?utm_source=abstraction.blog){:target="\_blank" rel="nofollow"} provides beautiful static documentation for your API.
- Tools like Spotify's [Backstage](https://backstage.io/){:target="\_blank" rel="nofollow"} help you create a developer portal and catalog of your services. Plenty of addons allow you to add a great number of automations and customisations.

## Final thoughts

While automation can help offboard some of the document generation, an interesting document will still need imagination and ingenuity from a human who cares (or generative AI?).

<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
