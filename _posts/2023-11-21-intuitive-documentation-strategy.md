---
layout: post
title: "An intuitive documentation strategy"
#category: general
tags: [cloud, documentation, guide]
comments: true
---

I wrote this blog post to share some of my learnings on creating intuitive documentation for products and projects over the past decade or so. This post is for those of you looking to make your documentation interesting enough for the audience to keep coming back for more.

<!-- TOC -->

- [The sorry state of documentation](#the-sorry-state-of-documentation)
- [Benefits of good documentation](#benefits-of-good-documentation)
- [How to create intuitive documentation](#how-to-create-intuitive-documentation)
  - [Manifesto](#manifesto)
  - [Folder structure](#folder-structure)
    - [Cloud product](#cloud-product)
    - [Application](#application)
    - [Process](#process)
  - [Documents to aid onboarding](#documents-to-aid-onboarding)
    - [Working on the first story](#working-on-the-first-story)
    - [Creating specialists](#creating-specialists)
  - [Automation](#automation)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->

> “I have some paperwork to catch up. If I am not back in two days, organize a search and rescue team!" - Stanley Parker from The Better Half comic.

This blog post is focused on creating an intuitive documentation which can scale for a large product. So it focuses on the balanced approach - between the low and high documentation levels below.

!["Documentation zones"](/assets/images/documentation/documentation-zones.drawio.png "Documentation zones")

## The sorry state of documentation

The quality of documentation can be considered as a barometer of the developer's empathy.
However it remains one of the most detested and ignored parts of the software world.

- Searching for documentation strategies or best practices didnt give me much useful results.
- As the famous line in the Matrix movie series goes “There is a difference in knowing the path and walking the path”. A lot of people merely preach about good documentation while creating a lacklustre README.md file in the repo.
- Projects done by a lot of consultancies add documentation at the fag end of the work ensuring not much time is given to developing it.

Open source projects have a better quality of documentation due to the power of the crowd. However they arent consistent on it.

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
- Simplify documenting experience for engineers.
  - Keep it as visual as possible. Use the [4+1 architectural view model](https://en.wikipedia.org/wiki/4%2B1_architectural_view_model){:target="\_blank" rel="nofollow"} OR [C4 model](https://c4model.com/){:target="\_blank" rel="nofollow"} to show different perspectives.

The point on reviewing has multiple options:

- Having documentation in a code repo can be a good option to use existing PR flow.
- Tools like [Atlassian's Confluence also have support for a review process](https://confluence.atlassian.com/confeval/confluence-evaluator-resources/confluence-workflows-approval){:target="\_blank" rel="nofollow"}.
- Alternatively, you can rely on a people process to ensure engineers always tag reviewers on their documentation.

### Folder structure

- Have the document in an easy to use language like Markdown.
- Use draw.io like tools to store the diagrams in the VCS to access your files without a license.
- You can have the documentation in source control similar to code reviews to make it intuitive.

Use layers to ensure a sequential flow for engineers rather than overwhelm them.

#### Cloud product

```bash
📁 aws
   ├ 📁 architecture
       ├ 📁 architecture-decision-records
            ├ 📁 2023
                ├ 📄 1-adr-ci.md
                ├ 📄 2-adr-cd.md
            ├ 📁 2024
       ├ 📁 current
            ├ 📄 org-hierarchy.md
            ├ 📄 network-traffic.md
   ├ 📁 guides
       ├ 📁 general
            ├ 📄 1-onboarding-kt-sessions.md
            ├ 📄 2-onboarding-kt-sessions-infra.md
            ├ 📄 3-onboarding-kt-sessions-app-dev.md
            ├ 📄 4-working-on-the-first-story.md
            ├ 📄 5-troubleshooting-guide.md
        ├ 📁 specialized
            ├ 📄 1-k8s-engineer-path.md
            ├ 📄 2-cloud-engineer-path.md
   ├ 📁 development
   │   ├ 📁 compute
   │   ├ 📁 data
   │   ├ 📁 devops
   │   ├ 📁 monitoring
   │   ├ 📁 networking
   │   ├ 📁 security
   ├ 📁 rfc
   │   ├ 📁 compute
   │   ├ 📁 data
   │   ├ 📁 devops
   │   ├ 📁 monitoring
   │   ├ 📁 networking
   │   ├ 📁 security
   ├ 📄 README.md
   ├ 📄 .gitignore

```

#### Application

```bash
📁 apps
    ├ 📁 app1-monolith
    │   ├ 📁 frontend
    │   ├ 📁 backend
    ├ 📁 app2-python-microservice
    ├ 📁 architecture
    ├ 📁 guides
    ├ 📁 development
    │   ├ 📁 compute
    │   ├ 📁 data
    │   ├ 📁 devops
    │   ├ 📁 monitoring
    │   ├ 📁 networking
    │   ├ 📁 security
    ├ 📁 rfc
    │   ├ 📁 compute
    │   ├ 📁 data
    │   ├ 📁 devops
    │   ├ 📁 monitoring
    │   ├ 📁 networking
    │   ├ 📁 security
    ├ 📄 README.md
    ├ 📄 .gitignore

```

#### Process

```bash
├ 📁 process
    ├ 📁 agile
        ├ 📄 ceremonies.md
        ├ 📄 definition-of-ready.md
        ├ 📄 definition-of-done.md
        ├ 📁 sprints
            ├ 📁 2023
                ├ 📁 sprint1
                    ├ 📄 sprint1-review.md
                    ├ 📄 sprint1-retro.md
            ├ 📁 2024
    ├ 📁 releases
        ├ 📁 2023
            ├ 📄 release-2023-01-19.md
            ├ 📄 release-2023-02-02.md
        ├ 📁 2024
```

### Documents to aid onboarding

#### Working on the first story

#### Creating specialists

### Automation

## Final thoughts

<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
