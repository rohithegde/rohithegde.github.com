---
layout: post
title: "Azure Pipelines - a crash course"
#category: general
tags: [microsoft, azure, cloud, pipeline, ci, cd, guide, tutorial]
comments: true
---
In a hurry ? Please skip to the part you want with the index below.
<!-- TOC -->

- [Context](#context)
- [Introduction](#introduction)
- [Pre-requisities](#pre-requisities)
- [Using Pipelines](#using-pipelines)
  - [Approach 1 : YAML syntax - RECOMMENDED](#approach-1--yaml-syntax---recommended)
  - [Approach 2 : Classic interface](#approach-2--classic-interface)
- [Concepts](#concepts)
  - [Sections of a pipeline](#sections-of-a-pipeline)
  - [Tasks](#tasks)
  - [Pipeline Template files](#pipeline-template-files)
  - [Library](#library)
  - [Service connections](#service-connections)
  - [Pipeline runs](#pipeline-runs)
- [Implementation](#implementation)
- [References](#references)

<!-- /TOC -->
## Context

> “Code reuse is the Holy Grail of Software Engineering”
> \- Douglas Crockford

**Problem** : Dealing with a maintenance nightmare when we have multiple applications or repositories having similar pipelines in Azure DevOps.

**Solution** : Code reuse through 'Infrastructure as Code'.

In various programming languages, we have inheritence or functions to reuse code.
True to the principle of DevOps, Infrastructure as Code (IaC) supports this ability too.
For the problem at hand : Azure pipelines is the solution.

## Introduction

![Azure DevOps](/assets/images/azure-pipelines/azure-devops.png)

- Azure DevOps is a project management tool from Microsoft(similar to the Atlassian suite of tools) in which you can host code repositories, create pipelines, plan sprints, manage your team etc.
- Azure Pipelines is a cloud service in Azure DevOps that you can use to automatically build and test your code project and make it available to other users. It works with just about any language or project type.
- Azure Pipelines combines continuous integration (CI) and continuous delivery (CD) to constantly and consistently test and build your code and ship it to any target.

## Pre-requisities

To use Azure Pipelines, you need:

- An organization in Azure DevOps.
- To have your source code stored in a version control system (eg: Azure DevOps, GitHub, BitBucket etc).

## Using Pipelines

### Approach 1 : YAML syntax - RECOMMENDED

![YAML](/assets/images/azure-pipelines/pipelines-image-yaml.png)

- You define your pipeline in any YAML file (eg : azure-pipelines.yml) with the rest of your app.
- The pipeline is versioned with your code. It follows the same branching structure. You get validation of your changes through code reviews in pull requests and branch build policies.
  Every branch you use can modify the build policy by modifying the azure-pipelines.yml file.
- You can use the [Microsoft Learn module for multi-stage pipelines](https://docs.microsoft.com/en-us/learn/modules/create-multi-stage-pipeline/){:target="_blank" rel="nofollow"} to understand it in an intuitive manner.

### Approach 2 : Classic interface

![Classic](/assets/images/azure-pipelines/pipelines-image-designer.png)

- In this approach , we create and configure pipelines in the Azure DevOps web portal with the Classic user interface editor.
- **This is the older way to configure a pipeline.** At Microsoft Ignite 2019, they recommended using the above yaml approach though the classic interface will not go away any time soon.
- You define a build pipeline to build and test your code, and then to publish artifacts.
- You also define a release pipeline to consume and deploy those artifacts to deployment targets.

Feature differences between the two approaches given above can be seen [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/get-started/pipelines-get-started?view=azure-devops#feature-availability){:target="_blank" rel="nofollow"}.
**This blog focuses on the yaml approach.**

## Concepts

### Sections of a pipeline

![Concepts](/assets/images/azure-pipelines/pipeline-concepts.png)

- A **trigger** tells a Pipeline to run.
- A **pipeline** is made up of one or more stages. A pipeline can deploy to one or more environments.
- A **stage** is a way of organizing jobs in a pipeline and each stage can have one or more jobs.
- Each **job** runs on one agent. A job can also be agentless.
- Each **agent** runs a job that contains one or more steps.
- A **step** can be a task or script and is the smallest building block of a pipeline.
- A **task** is a pre-packaged script that performs an action, such as invoking a REST API or publishing a build artifact.
- An **artifact** is a collection of files or packages published by a run.

Additional details can be seen [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/get-started/key-pipelines-concepts?view=azure-devops){:target="_blank" rel="nofollow"}.

### Tasks

- Tasks allow you to abstract away quite a bit of code. Eg: The GitVersion task gets you the next suitable tag number without writing custom code.
- Azure Pipelines has various built-in tasks. See the list [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/?view=azure-devops){:target="_blank" rel="nofollow"}.
- Additionally you can create [custom tasks](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/tasks?view=azure-devops&tabs=yaml#custom-tasks){:target="_blank" rel="nofollow"} or install a task extension from the [marketplace](https://marketplace.visualstudio.com/azuredevops){:target="_blank" rel="nofollow"}.

![Task](/assets/images/azure-pipelines/pwsh-task.png)

### Pipeline Template files

- Templates let you define reusable content, logic, and parameters.
- You can extend from a template or insert content from a template. This saves you from having to manually include the same logic in multiple places.
- You can insert content into stages, jobs, steps as well as variables of a pipeline.
- You can use pipeline templates from the existing repo or from other repos.

Additional details can be seen [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops){:target="_blank" rel="nofollow"}.

### Library

- Library is a collection of includes\_ build and release assets for a project. Assets defined in a library can be used in multiple build and release pipelines of the project. The Library tab can be accessed directly in Azure Pipelines and Team Foundation Server (TFS).
- At present, the library contains two types of assets: variable groups and secure files.
- You store secrets or common variables in variable groups which will be used by the yaml files.
- Secure files can contain file containing secrets like certificates or ssh keys which can also be used by the yaml files.

![Variable group](/assets/images/azure-pipelines/save-variable-group.png)

Additional details can be seen [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/?view=azure-devops){:target="_blank" rel="nofollow"}.

### Service connections

- You will typically need to connect to external and remote services to execute tasks in a job. For example, you may need to connect to your Microsoft Azure subscription, to a different build server or file server, to an online continuous integration environment, or to services you install on remote computers.
- You define and manage service connections from the Admin settings of your project in Azure DevOps: <https://dev.azure.com/{organization}/{project}/_admin/_services>{:target="_blank" rel="nofollow"}.
- **Service connections are created at project scope.** A service connection created in one project is not visible in another project.

Additional details can be seen [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops&tabs=yaml){:target="_blank" rel="nofollow"}.

### Pipeline runs

- Runs represent one execution of a pipeline.
- During a run, the pipeline is processed, and agents process one or more job.
- A pipeline run includes stages, jobs, steps, and tasks.
- Runs power both continuous integration (CI) and continuous delivery (CD) pipelines.

![YAML](/assets/images/azure-pipelines/run.png)

Additional details can be seen [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/runs?view=azure-devops){:target="_blank" rel="nofollow"}.

## Implementation

On implementation, your sample pipeline in your app code repo can be as simple as given below.
It reuses the pipeline templates defined in a common repo.

```yml
trigger:
  - master

resources:
  repositories:
    - repository: common
      type: git
      name: ado-org-name/azure-pipeline-templates-skeleton
      ref: refs/heads/master # Better to use some tag ie ref: refs/tags/v1.0

variables:
  - template: ci-pipeline-templates/variables/vars.yml@common # Template reference

stages:
  - template: ci-pipeline-templates/stages/sample.yml@common # Template reference

```

To use it, you will have to create a pipeline in Azure DevOps and link it to a pipeline yaml file(like the one above).

You can view my Azure pipeline templates skeleton repo [here](https://github.com/rohithegde/azure-pipeline-templates-skeleton){:target="_blank" rel="nofollow"}.
Going through it, you can see a lot of advanced features implemented in it.

That covers the concepts + implementation of Azure Pipelines.

I kept the scope of this blog post limited to concepts and the implementation given in the GitHub repo.
I might add additional explanation of the implemented concepts if I get a few requests to do so.

## References

- <https://docs.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines?view=azure-devops>{:target="_blank" rel="nofollow"}
