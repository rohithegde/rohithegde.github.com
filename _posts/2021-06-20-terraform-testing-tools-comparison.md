---
layout: post
title: "Comparing top 5 tools to test Terraform code"
#category: general
tags: [iac, devops, cloud, testing, terraform]
comments: true
---

<!-- TOC -->

- [Background](#background)
- [Top 5 Terraform Testing tools](#top-5-terraform-testing-tools)
- [Requirements](#requirements)
- [Comparison chart](#comparison-chart)
- [Decision](#decision)
- [References](#references)

<!-- /TOC -->
## Background

> “Quality means doing it right even when no one is looking.”— Henry Ford

It has been a couple of years since I have been working with Terraform as our go-to Infrastructure as Code tool for multiple clouds. You can read more on the reason behind chosing Terraform as our IaC [here]({{ site.url }}/#terraform).
It was also a collective decision in my team then to go for Terratest as our testing tool.
Since its been 2 years, I thought it was a good time to re-examine the decision and see if it still holds true.

## Top 5 Terraform Testing tools

!["Uchiha"](/assets/images/uchiha.jpeg "Contendors")

These were the top 5 tools based on community stats in GitHub. Each tool is better suited for specific use cases. Eg: If your org has plenty of Ruby devs then Serverspec or Terraform Kitchen might be easier for the DevOps initiative.
But we had specific requirements which are given below.

ps : Yes I just wanted a reason to put a pic of the "Uchihas" on my blog :stuck_out_tongue_closed_eyes:

## Requirements

**Modified Test Pyramid for IaC**:

<div style="text-align: center"><img src="/assets/images/iac-test-pyramid.png" /></div>

Our requirements were mainly :

- Unit testing (use `terraform plan` in some way).
- Integration testing (successfully deploy to a sandbox and assert against some properties).
- Try to have an "All in one" tool rather than too many integrations to avoid a steep learning curve.

Additionally we planned to use `terraform validate` cmd to test the code syntax (static analysis).

End to end testing (e2e) was something which we would keep manual for the test environment since it would require additional maintenance effort.

## Comparison chart

|                                                 | [Terratest](https://github.com/gruntwork-io/terratest){:target="_blank" rel="nofollow"}                                                                                                                | [Goss](https://github.com/aelsabbahy/goss){:target="_blank" rel="nofollow"}                  | [Serverspec](https://github.com/mizzy/serverspec){:target="_blank" rel="nofollow"}                                                                                                                                                                                                                                          | [Kitchen-Terraform](https://github.com/newcontext-oss/kitchen-terraform){:target="_blank" rel="nofollow"}             | [Terraform compliance](https://github.com/terraform-compliance/cli/){:target="_blank" rel="nofollow"} |
|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| **First commit**                                | Feb 28, 2016                                                                                                                                                                                           | Sep 27, 2015                                                                                 | Mar 24, 2013                                                                                                                                                                                                                                                                                                                | Jun 19, 2016                                                                                                          | Apr 2, 2017                                                                                           |
| **Community support** <br>(as of June 20, 2021) | 5300 stars, 819 forks, 138 contributors                                                                                                                                                                | 4400 stars, 388 forks, 85 contributors                                                       | 2400 stars, 375 forks, 128 contributors                                                                                                                                                                                                                                                                                     | 1000 stars, 133 forks, 27 contributors                                                                                | 988 stars, 114 forks, 33 contributors                                                                 |
| **License**                                     | Apache-2.0 license                                                                                                                                                                                     | Apache-2.0 license                                                                           | MIT license                                                                                                                                                                                                                                                                                                                 | Apache-2.0 license                                                                                                    | MIT license                                                                                           |
| **Tech stack**                                  | Go                                                                                                                                                                                                     | Go, Shell                                                                                    | Ruby                                                                                                                                                                                                                                                                                                                        | Ruby                                                                                                                  | Python, HCL, Gherkin                                                                                  |
| **Main idea**                                   | Automated end to end tests rather than just property matching.                                                                                                                                         | YAML based tool for validating a deployed server’s configuration.                            | RSpec tests for your servers configured by Puppet, Chef or anything else                                                                                                                                                                                                                                                    | Set of Kitchen plugins to test Terraform code and verify with InSpec controls.                                        | Mainly focuses on negative testing instead of having fully-fledged functional tests.                  |
| **X factor**                                    | Built specifically for Terraform.                                                                                                                                                                      | Lightweight health checking tool for IaC                                                     | Vastly used for IaC as it extends on the RSpec tool.                                                                                                                                                                                                                                                                        | Extends on the popular Kitchen framework.                                                                             | Lightweight tool which uses BDD syntax making it easy to code.                                        |
| **Learning curve**                              | Medium. Have to learn basics of Go.                                                                                                                                                                    | Easy. Its yaml!                                                                              | Medium. Have to learn basics of Ruby.                                                                                                                                                                                                                                                                                       | Medium. Have to understand the Kitchen framework which is configured via yaml + basics of Ruby helps to write tests . | Easy. Its BDD!                                                                                        |
| **Supports unit tests**                         | Yes                                                                                                                                                                                                    | No                                                                                           | Yes                                                                                                                                                                                                                                                                                                                         | No                                                                                                                    | Yes                                                                                                   |
| **Supports integration tests**                  | Yes                                                                                                                                                                                                    | Yes                                                                                          | Yes                                                                                                                                                                                                                                                                                                                         | Yes                                                                                                                   | Yes                                                                                                   |
| **Code examples**                               | [Eg 1](https://terratest.gruntwork.io/examples/){:target="_blank" rel="nofollow"} <br> [Eg 2](https://blog.octo.com/en/test-your-infrastructure-code-with-terratest/){:target="_blank" rel="nofollow"} | [Eg 1](https://www.unixdaemon.net/tools/testing-with-goss/){:target="_blank" rel="nofollow"} | [Eg 1](https://serverspec.org/){:target="_blank" rel="nofollow"} <br/> [Eg 2](https://gist.github.com/lusis/9c0fd50e0de51c3d80b2){:target="_blank" rel="nofollow"}<br>[Eg 3](https://www.contino.io/insights/top-3-terraform-testing-strategies-for-ultra-reliable-infrastructure-as-code){:target="_blank" rel="nofollow"} | [Tutorial Eg](https://newcontext-oss.github.io/kitchen-terraform/tutorials/){:target="_blank" rel="nofollow"}         | [Multiple eg](https://terraform-compliance.com/pages/Examples/){:target="_blank" rel="nofollow"}      |

## Decision

- Terratest continues to suit our requirements well. Unlike most other tools, it supports unit tests too ie testing without deploying of resources.
- Additionally we were able to merge `terraform validate` check into it since Terratest allows custom CLI cmds to be executed.
- By establishing our custom conventions on top of it, we were able to reduce the learning curve so that new devs don't have to know Go to use Terratest.
- I would pick a testing tool like ServerSpec if the org has multiple IaC tools used like Chef, Terraform as a uniform tooling experience helps in the onboarding journey.

## References

- <https://thepracticalsysadmin.com/terraform-testing-tools/>{:target="_blank" rel="nofollow"}
- <https://terratest.gruntwork.io/docs/testing-best-practices/alternative-testing-tools/>{:target="_blank" rel="nofollow"}
- <https://www.reddit.com/r/devops/comments/8rbcdo/how_many_of_you_practice_tdd_for_your_infra_code/>{:target="_blank" rel="nofollow"}
- <https://www.reddit.com/r/Terraform/comments/8nlob4/testing_in_terraform_what_do_you_use/>{:target="_blank" rel="nofollow"}
- <https://adinermie.com/the-good-the-bad-and-the-ugly-of-using-terraform-compliance//>{:target="_blank" rel="nofollow"}

<br/>Feel free to share your thoughts. There might be additional comparison points which need to be added to make this chart more useful for others.
