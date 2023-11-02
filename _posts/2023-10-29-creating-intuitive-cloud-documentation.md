---
layout: post
title: "Creating intuitive documentation for a cloud product"
#category: general
tags: [aws, cloud, certification]
comments: true
---

I wrote this blog post to share some of my learnings on creating intuitive documentation for products and projects. You will like this post if you are someone looking to make your documentation interesting enough for an audience to keep coming back for more.

<!-- TOC -->

- [Need](#need)
- [Guidelines](#guidelines)
- [Structure](#structure)
  - [Examples](#examples)
    - [Cloud product](#cloud-product)
    - [Application](#application)
    - [Process](#process)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->

> “I have some paperwork to catch up. If I am not back in two days, organize a search and rescue team!" - Stanley Parker from The Better Half comic.

Documentation is one of the most detested and ignored parts of the software world.

!["Lost in paperwork"](/assets/images/lost-in-paperwork.jpeg "Lost in paperwork"){:height="50%" width="50%"}

Source : <https://www.flickr.com/photos/64204416@N02/5847087749>{:target="\_blank" rel="nofollow"}.

## Need

## Guidelines

- Engineers should update the documentation.
  - Good documentation comes from empathy ie the desire to share the knowledge and enable a smooth onboarding experience.
  - Involve technical writers and analysts only if the audience are not engineers.
- Enforce regular reviews of new documentation.
  - Having documentation in a code repo can be a good option to use existing PR flow.
  - Tools like [Atlassian's Confluence also have support for a review process](https://confluence.atlassian.com/confeval/confluence-evaluator-resources/confluence-workflows-approval){:target="\_blank" rel="nofollow"}.
- Simplify documenting experience for engineers.
  - Keep it as visual as possible. Use the [4+1 architectural view model](https://en.wikipedia.org/wiki/4%2B1_architectural_view_model){:target="\_blank" rel="nofollow"} OR [C4 model](https://c4model.com/){:target="\_blank" rel="nofollow"} to show different perspectives.
  - Have the document in an easy to use language like Markdown.
  - You can have the documentation in source control similar to code reviews to make it intuitive.
  - Use layers to ensure a sequential flow for engineers rather than overwhelm them.
  - Use draw.io like tools to store the diagrams in the VCS to access your files without a license.

## Structure

### Examples

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
            ├ 📄 4-deployment-guide.md
            ├ 📄 5-troubleshooting-guide.md
        ├ 📁 specialized
            ├ 📄 1-k8s-engineer.md
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
        ├ 📄 ceremonies.doc
        ├ 📄 definition-of-ready.doc
        ├ 📄 definition-of-done.doc
        ├ 📁 sprints
            ├ 📁 2023
                ├ 📁 sprint1
                    ├ 📄 sprint1-review.doc
                    ├ 📄 sprint1-retro.doc
            ├ 📁 2024
    ├ 📁 releases
        ├ 📁 2023
            ├ 📄 release-2023-01-19.doc
            ├ 📄 release-2023-02-02.doc
        ├ 📁 2024
```

## Final thoughts

- Its a fun exam to study for.

I wish you the best of luck if you plan on giving this exam :thumbsup:.
<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
