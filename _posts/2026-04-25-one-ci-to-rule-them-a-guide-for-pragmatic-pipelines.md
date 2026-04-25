---
layout: post
title: "One CI to rule them all: a guide for pragmatic pipelines"
#category: general
tags: [pipline, genai, container, iac, terraform, app, devops]
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

I have been talking to few young app developers on quality gates. Felt that their CI pipelines were like black boxes which they didnt know much about. Writing this blog post to give a practical walkthrough while keeping it interesting - thats my hope :wink:.

<!-- TOC -->

- [Application CI pipelines](#application-ci-pipelines)
  - [Application CI pipeline - starter kit](#application-ci-pipeline---starter-kit)
  - [Sequential Application CI pipeline - fully loaded](#sequential-application-ci-pipeline---fully-loaded)
  - [Parallel Application CI pipeline for Pull requests with a GenAI upgrade](#parallel-application-ci-pipeline-for-pull-requests-with-a-genai-upgrade)
  - [Post deployment Application pipeline](#post-deployment-application-pipeline)
- [IaC CI pipelines](#iac-ci-pipelines)
  - [IaC CI pipeline - fully loaded](#iac-ci-pipeline---fully-loaded)
  - [Post deployment IaC pipeline](#post-deployment-iac-pipeline)
- [Metrics to track](#metrics-to-track)
  - [DORA metrics](#dora-metrics)
  - [Health metrics](#health-metrics)
  - [Operational metrics](#operational-metrics)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->

## Application CI pipelines

A Continuous Integration(CI) pipeline is an automated approach to ensure quality of the code.
For those new to CI, you can read about the basics on [the GitLab blog](https://about.gitlab.com/topics/ci-cd/){:target="\_blank" rel="nofollow"}. Rest of the blog focuses on visual examples with a tiny bit of supporting theory.

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
- Having a LLM code fixing step in the pipeline ensures automatic patching/fixing with a new code commit. This is an optional step but can speed up the PR resolution. I recommend failing the pipeline once the code if fixed by GenAI as its good to review the code rather than blindly trusting the LLM.

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

## IaC CI pipelines

Creating IaC involves some upfront effort and needs a high degree of maintenance. Something that startups are unlikely to invest in atleast in their initial stages. So I havent shared a starter kit for IaC CI pipelines here.

### IaC CI pipeline - fully loaded

!["Terraform CI pipeline"](/assets/images/ci-pipeline/iac-ci.drawio.png "Terraform CI pipeline")

This is a CI pipeline for a Terraform based infrastructure as code repo. The tools will change based on the programming language used. You can read my past posts on [IaC options and Terraform testing tools]({{ site.url }}/#terraform){:target="\_blank"} for more info.
Highlghts of this pipeline:

- Terraform validate
  - An absolutely basic step which validates the code syntax.
- TF Lint
  - This examines practical constraints. Eg: Trying to provision a resource in a region where its not available.
- Testing
  - Go based [Terratest](https://github.com/gruntwork-io/terratest){:target="\_blank" rel="nofollow"} is a popular tool for testing Terraform. You can write unit as well as integration tests with it. You can also execute cli commands like `terraform validate` with it.
- Security policies scan
  - A tool like [Checkov](https://github.com/bridgecrewio/checkov){:target="\_blank" rel="nofollow"} comes with over 1000 built-in policies for the major public clouds saving a lot of initial effort.
  - Additionally built in support for frameworks like CIS and SOC2 ensure compliance.
  - You can also add custom policies configured with yaml or Python with Checkov.
- Secrets scan
  - A lightweight tool like [GitLeaks](https://github.com/gitleaks/gitleaks){:target="\_blank" rel="nofollow"} would be good for secret scanning here.
- Terraform plan and store
  - The Terraform plan is needed for accurate cost estimation (see below).
  - The plan is also stored to be used for CD pipeline in the future.
- FinOps
  - The cost estimation step is a relatively new addition compared to the others. A tool like [Infracost](https://github.com/infracost/infracost){:target="\_blank" rel="nofollow"}(free CLI version) can help you estimate costs using which you can add additional cost controls.
- Update documentation)
  - A tool like [Terraform docs](https://github.com/terraform-docs/terraform-docs){:target="\_blank" rel="nofollow"} can generate specific documentation based on the code which we can append to the README.md file.

### Post deployment IaC pipeline

!["Terraform post deployment pipeline"](/assets/images/ci-pipeline/iac-post-deployment-testing.drawio.png "Terraform post deployment pipeline")

The post deployment pipeline here isnt as essential as its counterpart on the app side. But we can have some small checks here to confirm the stability of the environment.

- Policy scan
  - A tool like [Checkov](https://github.com/bridgecrewio/checkov){:target="\_blank" rel="nofollow"} can be used here to confirm that the environment has the expected gurdrails. You can also rely on the built-in security centers present on the cloud to flag security issues.
- Smoke testing
  - [Terratest](https://github.com/gruntwork-io/terratest){:target="\_blank" rel="nofollow"} can help in verifying the Terraform state to ensure no manual actions have been performed on the infrastructure. There are some tools like [driftctl](https://github.com/snyk/driftctl){:target="\_blank" rel="nofollow"} which can be used for drift detection but many of them arent maintained anymore or are paid. Its not difficult to compare states anyway.
- FinOps
  - Verifying the actual cost per hour with the estimated cost from our earlier pipeline can be a good way to control the costs. [Opencost](https://github.com/opencost/opencost){:target="\_blank" rel="nofollow"} is a popular tool to get the actual costs for your cloud or k8s environment. Alternatively, you can continue with [Infracost](https://github.com/infracost/infracost){:target="\_blank" rel="nofollow"} for getting the actual costs if you go for its paid version.

## Metrics to track

For someone starting with a greenfield setup, KPIs or metrics can help guide your pipeline architecture by providing you the north star to follow.
Even for brownfield setups, such KPIs can be a great way to maintain a dashboard of your pipelines - whether its for your team or for presenting to C-suites of your organisation.
You can find some of the popular KPIs below that can be used to indicate the efficiency of your pipeline setup as well as the teams using it.

### DORA metrics

DORA metrics represents the [4-5 metrics highlighted](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance){:target="\_blank" rel="nofollow"} by the DevOps Research and Assessment (DORA) team of Google Cloud. They are key metrics that indicate the performance of a software development team.

!["Dora metrics"](/assets/images/ci-pipeline/dora.jpg "Dora metrics")

### Health metrics

- Pipeline Availability
  - Ensuring a resilient pipeline setup is essential for keeping the dev team motivated as well as reducing a feature's time to market.
  - Three 9s or higher can be a good number to aim for here. 99.9% availability would mean a downtime of almost 9 hrs/year.
- Time-to-Feedback (P95)
  - Getting a success or failure status from your CI pipeline within 10-15 min would be good for ensuring developer productivity.
- Runner Queue Time
  - Ensuring a healthy runner pool to execute your CI within a minute aids developer productivity too.

### Operational metrics

- Random failure
  - Random un-explained behaviour from the pipeline (aka ghost in the machine) should be minimal. Try to keep it limited within 5% of your pipelines.
  - Having regular health checks, locking every tool by its tag or version, factoring in redundancy in the setup are some approaches by which you can control it.
- Cache Hit Ratio
  - Having a well oiled caching strategy helps in reducing Time-to-Feedback (P95). Ideally 70% or higher hits should be the norm here.
- Cost per Build
  - This is a difficult metric to nail down but its important. Dependencies include infrastructure cost, tooling cost, measures taken to reduce Time-to-Feedback (eg: parallel pipelines) as also organisation budget and priorities.
  - So rather than locking it down to a figure, I would recommend tracking it along with the factors tied to it.

## Final thoughts

Each one of us has a fixed amount of energy to spend per day. Automating the regular trivial parts of our daily life allows us to spend our energy on things that actually matter.
A well built CI pipeline enables software engineers to deliver consistent high quality applications while focusing on the core part of their work. No need of the good old line "It works on my machine".

Cheers to all the Platform/DevOps engineers out there :wine_glass:
