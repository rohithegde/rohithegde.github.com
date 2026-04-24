---
layout: post
title: "One CI to rule them all: a guide for pragmatic pipelines"
#category: general
tags: [pipline, genai, container, iac, terraform, app]
comments: true
---

```code
Three SLOs for the Product Team under the sky,
Seven Tags for the SREs in their halls of stone,
Nine Pull Requests for Developers doomed to try,
One for the Architect on his proud throne
In the Land of Production where the clusters lie.

One CI to rule them all, One CI to find them,
One CI to build them all, and with GenAI bind them,
In the Land of Production where the clusters lie.

- GenAI the Grey
```

!["Gemini LOTR CI pipeline"](/assets/images/ci-pipeline/gemini-ci-pipeline-lotr.jpg "Gemini LOTR CI pipeline")

A long time ago, my team was tasked with creating couple of robust CI pipelines for applications which would serve as references for different clients. A lot of learnings came out of it - the variety of tools out there, the pros and cons of each, whats suitable for enterprise clients and what works for startups etc. It was an interesting experiment which I look back on with pride. Callout to @Jayne for it.

While interviewing few younglings recently, I felt that they knew very little about whats in their pipelines or what should be there. This blog post is an attempt at sharing my knowledge on CI pipelines.

<!-- TOC -->

- [Application CI pipelines](#application-ci-pipelines)
  - [Application CI pipeline - starter kit](#application-ci-pipeline---starter-kit)
  - [Sequential Application CI pipeline - fully loaded](#sequential-application-ci-pipeline---fully-loaded)
  - [Parallel Application CI pipeline for Pull requests with a GenAI upgrade](#parallel-application-ci-pipeline-for-pull-requests-with-a-genai-upgrade)
  - [Post deployment Application pipeline](#post-deployment-application-pipeline)
- [Bonus - an IaC CI pipeline](#bonus---an-iac-ci-pipeline)
- [Metrics to track](#metrics-to-track)
  - [DORA metrics](#dora-metrics)
  - [Health metrics](#health-metrics)
  - [Operational metrics](#operational-metrics)
- [Recommendations for a solid CI pipeline](#recommendations-for-a-solid-ci-pipeline)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->

## Application CI pipelines

A Continuous Integration(CI) pipeline is an automated approach to ensure quality of the code.
You can read about the basics on [the GitLab blog](https://about.gitlab.com/topics/ci-cd/){:target="\_blank" rel="nofollow"}. Rest of the post will be practical walkthroughs of different types of CI pipelines which can be useful to your setup.

Note:

- **The tools shown below are just illustrative of whats possible**. Most of them are tools I worked with. Feel free to replace them with tools of your choice when you implement your own CI.
- The CI pipelines shown below are for containerised apps. For scenarios involving non-containerised apps or k8s, there will be further customisations needed.

### Application CI pipeline - starter kit

!["App CI pipeline starter kit"](/assets/images/ci-pipeline/app-ci-starter.drawio.png "App CI pipeline  starter kit")

This is an absolute basic CI pipeline. Ok not as basic as some of the answers I got while taking interviews. There are some startups whose pipeline consists of just linting and building images since their main priority is to ship software asap. Everything else takes a backseat.

But I recommend having atleast a security scan and a license scan. This will safeguard the app from a security and legal lens. Also cost. There are [cases](https://www.reddit.com/r/googlecloud/comments/1reqtvi/82000_in_48_hours_from_stolen_gemini_api_key_my/){:target="\_blank" rel="nofollow"} out there where startups have gone bankrupt due to leaked API keys.

### Sequential Application CI pipeline - fully loaded

!["App CI pipeline sequential"](/assets/images/ci-pipeline/app-ci.drawio.png "App CI pipeline sequential")

This is an example of a comprehensive CI pipeline. Some things to focus on:

- Depending on the code size, it can take significant time to execute.
- You can parallelize tool invocation to reduce the time though it can be costier as each tool will likely be invoked even if something fails.
- SBOM
  - SBOM (Software Bill of Materials) is a comprehensive inventory of components, libraries, and modules in software to manage security risks and compliance. It is extremely useful in providing visibility to all the software dependencies and is used as an input for security checks.
  - You can see an example of [SBOM (CycloneDX format) here](https://raw.githubusercontent.com/CycloneDX/bom-examples/refs/heads/master/SBOM/keycloak-10.0.2/bom.json){:target="\_blank" rel="nofollow"}.
- License check
  - Important step for legal reasons. With the popularity of opensource among developers, it can be difficult to ensure compliance. Enterprises will usually avoid using tools with GPL, AGPL licenses due to their copyleft constraints.
- Update documentation
  - Useful step for improving developer experience. You can have auto-generation of diagrams using tools like [Mermaid](https://github.com/mermaid-js/mermaid){:target="\_blank" rel="nofollow"} or [PlantUML](https://plantuml.com/){:target="\_blank" rel="nofollow"} as also generate textual content like specs.

### Parallel Application CI pipeline for Pull requests with a GenAI upgrade

!["App CI pipeline parallel with GenAI"](/assets/images/ci-pipeline/app-ci-parallel-genai.drawio.png "App CI pipeline parallel with GenAI")

This is a parallelized version of the earlier pipeline. This is ideal for quick PRs. Some things to focus on:

- Parallel execution saves time for the engineer working on the PR.
- Individual pipeline cost will be higher since there will be multiple parallel jobs executed no matter what though you could in theory offset it with time saved for engineers.
- I have replaced most of the tools with Trivy to reduce the number of tools to maintain in the pipeline (optional step). Also reduces learning curve.
- Having a LLM in the pipeline ensures automatic patching/fixing with a new code commit. This is an optional step but can speed up the PR resolution.

### Post deployment Application pipeline

!["App CI post deployment pipeline](/assets/images/ci-pipeline/app-post-deployment-testing.drawio.png "App CI  post deployment pipeline")

This pipeline detects environment specific integration issues, bigger architecture problems or deeper security challenges. Placing it as a post deployment step ensures it doesnt hold up PRs blocking a developer's time. Some highlights:

- Smoke testing
  - This will contain API tests for sanity to ensure API endpoints(internal or external) are working as expected in the environment. Its different from the integration tests in a CI pipeline since they focus on ensuring the code works as expected.
- Dynamic scanning
  - Dynamic Application Security Testing(DAST) involves scanning a running container of the app for security vulnerabilities. This simulates real world attacks like SQL injections, XSS attacks etc.
  - This is different from Static Application Security Testing(SAST) scanning which we saw in the CI pipeline earlier which scans static code.
- Load testing
  - You should know the load your app can take to validate your proposed production setup. Especially if there are chances of the app having a large audience.
  - Tools like [Apache Jmeter](https://github.com/apache/jmeter){:target="\_blank" rel="nofollow"}, [Gatling](https://github.com/gatling/gatling){:target="\_blank" rel="nofollow"} and [k6](https://github.com/grafana/k6){:target="\_blank" rel="nofollow"} are popular for load testing.
- Regression testing
  - [Playwright](https://github.com/microsoft/playwright){:target="\_blank" rel="nofollow"} and [Selenium](https://github.com/seleniumhq/selenium){:target="\_blank" rel="nofollow"} are popular tools for testing the UI from the user's perspective.
  - But its hard to maintain such test cases as UIs tend to change. Additionally it takes time to execute such tests.
  - Keeping the Test pyramid from [Martin Fowler's blog](https://martinfowler.com/bliki/TestPyramid.html){:target="\_blank" rel="nofollow"} in mind, its best to reserve regression tests for ensuring stability of the core features which are most essential to the users.
    !["Test pyramid"](/assets/images/ci-pipeline/test-pyramid.png "Test pyramid")

## Bonus - an IaC CI pipeline

!["Terraform CI pipeline"](/assets/images/ci-pipeline/iac-ci.drawio.png "Terraform CI pipeline")

## Metrics to track

### DORA metrics

DORA metrics represents the [4-5 metrics highlighted](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance){:target="\_blank" rel="nofollow"} by the DevOps Research and Assessment (DORA) team of Google Cloud. They are key metrics that indicate the performance of a software development team.

!["Dora metrics"](/assets/images/ci-pipeline/dora.jpg "Dora metrics")

### Health metrics

- Pipeline Availability
- Time-to-Feedback (P95)
- Runner Queue Time

### Operational metrics

- Random failure
- Branch Age
- Cache Hit Ratio
- Cost per Build

## Recommendations for a solid CI pipeline

**Pipeline as code**

- Various online tools like ADO support multiple ways to define your pipeline - as yaml or via ui ie drag-n-drop.
- Pipeline as code (eg: yaml) allow versioning, reusability, sharing of knowledge and promote easier deployment.

**Smart execution based on change set**

**Ensure consistency of the pipeline**

**Ensure a simple traceable tagging strategy**

- Github git branching flow which is similar to trunk based strategy. User passes git commit message which is used to determine semver based increment. Then git tag is created based on it. Then container image is created using git tag as a part of the name. then the k8s manifest is modified either manually or automated way to this container image.

## Final thoughts
