---
layout: post
title: "AZ-500 : Preparing for the Azure Security Engineer certification"
#category: general
tags: [azure, cloud, certification]
comments: true
---
A brand new guide to prepare for the Microsoft Azure Security Engineer certification(AZ-500) in 2022.
<!-- TOC -->

- [Background](#background)
- [Preparation](#preparation)
  - [Udemy course by Alan Rodrigues](#udemy-course-by-alan-rodrigues)
  - [Practice tests](#practice-tests)
    - [Practice Test 1 from Alan's course](#practice-test-1-from-alans-course)
    - [Practice Test 2 from Alan's course](#practice-test-2-from-alans-course)
    - [Outdated Practice Tests in Udemy](#outdated-practice-tests-in-udemy)
    - [Official Practice test from Microsoft](#official-practice-test-from-microsoft)
- [Scheduling the exam](#scheduling-the-exam)
- [Pre-exam process](#pre-exam-process)
- [The AZ-500 exam](#the-az-500-exam)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->
## Background

> “If you spend more on coffee than on IT security, you will be hacked. What's more, you deserve to be hacked.” - Richard A. Clarke (former Cybersecurity Advisor for the White House)

[AZ-500](https://docs.microsoft.com/en-us/learn/certifications/exams/az-500){:target="_blank" rel="nofollow"} is the Azure Security Engineer exam. I cleared the exam today (Feb 6, 2022).
This is my 5th Azure certification. You can read about the others [here]({{ site.url }}/#certification).

Studying for this exam reminded me of the Azure Cloud Architect exams as the syllabus was similar and vast. A lot of tiny details made it difficult to be truly confident to ace the exam.
This was one preparation where I didnt give myself as much time to prepare and relied on my experience more.

!["Azure Security Engineer"](/assets/images/certifications/az-500.png "Azure Security Engineer")

## Preparation

[Skills measured](https://docs.microsoft.com/en-us/learn/certifications/exams/az-500){:target="_blank" rel="nofollow"} :

- Manage identity and access (30-35%)
- Implement platform protection (15-20%)
- Manage security operations (25-30%)
- Secure data and applications (25-30%)

Another way to look at the syllabus would be by Azure resources :

- Identity
  - PIM
  - Conditional Access
  - Case Reviews
  - MFA
  - AAD Groups
  - AD Connect
  - ...
- Data
  - Azure SQL
  - Storage Account
  - Key Vault
  - Types of logs, metrics and their retention
  - ...
- Compute
  - Virtual machine (JIT, Update mgmt, securing it etc)
  - On prem servers
  - Container solutions (ACI, App Service, AKS etc)
  - Resource Locks
  - Azure Automation
  - ACR
  - ...
- Network
  - Azure Firewall
  - NSG
  - VPN
  - Service endpoint
  - Private endpoint
  - ...
- Security Tools
  - Microsoft Defender for Cloud
  - Microsoft Sentinel
  - Monitor (Log Analytics)
  - Alerts
  - ...

AZ-500 has excellent support via video courses.
Important to know that no matter which course you go for, you will have to rely on practice tests and Azure documentation to some extent as no course can cover every tiny detail which can be asked in the exam.

### Udemy course by Alan Rodrigues

- I prepared with [Alan's course](https://mckinsey.udemy.com/course/exam-azure-2/){:target="_blank" rel="nofollow"}.
- It has a duration of 19 hours and is well detailed with focus on edge cases too. Alan walks the extra mile to demo every concept - even though which are not as easy to demo (eg: Replicating VPN S2S on the cloud).
- Additionally two practice tests are given here of 50 questions each.

### Practice tests

- After studying for the certification, I under estimated the vastness of the syllabus as I had worked with most of the Azure resources. Hence I dedicated only 1 day to give the various practice tests.
- Realized later about the huge list of tiny details which we can be asked (Eg: Log retention for SQL audit logs is 0 ie unlimited + Guest OS metrics sent to Azure Monitor Metrics is retained for 93 days + Guest OS metrics collected by the Log Analytics agent is 31 days). This is what makes the practice tests more difficult then the actual exam.

#### Practice Test 1 from Alan's course

- Around 50 questions. Completed it in 45 min.
- I got 69%.

#### Practice Test 2 from Alan's course

- Around 50 questions. Completed it in 45 min.
- I got 80%.

#### Outdated Practice Tests in Udemy

- [This set of practice tests](https://mckinsey.udemy.com/course/azure-az-500-security-technologies-practice-test/learn/quiz/4633778){:target="_blank" rel="nofollow"} was outdated ie it was last updated in Oct 2020 and probably linked to the old syllabus.
- Each test had around 50 questions. Completed each one of them in 45 min.
- I averaged around 55% in each of them :sweat_smile: but wasnt too concerned as it had questions out of the syllabus like security around HDInsights and AIP (Azure Information Protection).
- Looking back, I shouldnt have spent time on this and should have instead given the [WhizLabs practice tests](https://www.whizlabs.com/microsoft-azure-certification-az-500/){:target="_blank" rel="nofollow"}  instead.

#### Official Practice test from Microsoft

- [The official test](https://in.mindhub.com/az-500-microsoft-azure-security-technologies-microsoft-official-practice-test/p/MU-AZ-500?utm_source=microsoft&utm_medium=certpage&utm_campaign=msofficialpractice){:target="_blank" rel="nofollow"} from MeasureUp is really good but its costly ($99 for 30 days of access).
- My employer had a tieup with Microsoft due to which I could give this exam free of cost from [Microsoft's ESI portal](https://esi.microsoft.com/){:target="_blank" rel="nofollow"}.
- It gives you access to a question bank of 127 questions and you can either go with default settings (55 questions in 2 hrs like the actual exam) or you can customize it  (Eg: Give multiple tests and configure it such that each test contains new ones + questions you got wrong in earier tries).
- I made the mistake of starting this only a few hours before the exam due to which I could cover only 50% of it.

## Scheduling the exam

I scheduled the exam through the [Microsoft Certification Dashboard page](https://www.microsoft.com/en-us/learning/dashboard.aspx){:target="_blank" rel="nofollow"}.

## Pre-exam process

I did the pre-exam prep below around 30 min before the exam :

- I had to download the OnVue software which tested my machine for compatibility.
- Send pics from 4 directions of my surroundings (closed room).
- The pre exam profile questionaire wrapped up quickly.

## The AZ-500 exam

- **It was an exam of 2 hours with 51 questions and I needed 70% to pass**.
- I figured this exam wouldnt be as time intensive as the Azure Network Engineer exam (AZ-700) since the scope for long practical use case questions was much lesser here (leaving out case studies).
- I figured that I would be in a good position if I wrap up 25 questions in an hour.
- The first question was a case study with 4 questions which took me around 15 minutes to solve. This was a bit nerve wracking since my target of 25 questions per hour looked to be in jeopardy.
- However, the next questions werent case studies but individual questions. I was able to make good progress in tackling them and covered around 35/51 questions within the hour.
- The exam had a lot of practical questions in which I was given a scenario and expected to recommend a solution or answer a point to show that I understood it well. So definitely easier than the practice tests which were filled with tiny details from theory.
- Additionally there were a number of tricky edge cases covered in the questions.
  - Eg : Expected output if a user is added to multiple AAD groups which are assigned with opposite permissions.
  - Eg : Expected output with a mix of NSG rules which oppose each other(pay real close attention to the priority here).
- I went through the new few questions quickly since I knew a big case study would be there in the end which would take me a while to go through.
- I had 40 minutes to tackle the final case study which had 4-5 questions.
- As expected, the case study had a lot of information. I used the "whiteboard popup" to write down the question requirement and the summary of my understanding of the related resources so as to avoid having to re-visit the various tabs. This helped me a lot.
- I submitted the exam with 5 minutes to spare. Since we cannot re-visit questions from another section, I only reviewed the case study answers towards the end.
- I immediately received the congratulatory message page for clearing the exam along with the details of my performance. **I got 77%.**  I didnt do well in the Identity section which made sense as I had lesser experience on it (PIM, Conditional Access etc).

The certificate and transcript section of the Microsoft Learning dashboard were updated in 30 minutes while the certificate was added to [Credly](https://www.credly.com/earner/earned){:target="_blank" rel="nofollow"} in 24 hours.

## Final thoughts

- Studying for AZ-500 requires a lot of effort due to the vast syllabus.
- The exam wasnt as difficult as AZ-700 but I didnt prepare as well for this exam. I gave very less time to the practice tests and learnings from them.
- The case studies can be tough but using the whiteboard popup made it easier to navigate through.

I wish you the best of luck if you plan on giving this exam :thumbsup:.
<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
