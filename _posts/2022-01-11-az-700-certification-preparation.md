---
layout: post
title: "AZ-700 : Preparing for the Microsoft Azure Network Engineer certification"
#category: general
tags: [azure, cloud, certification]
comments: true
---
A brand new guide to prepare for the Microsoft Azure Network Engineer certification(AZ-700) in 2022 - my toughest Azure exam as of this date.
<!-- TOC -->

- [Background](#background)
- [Preparation](#preparation)
  - [Udemy course by Scott Duffy](#udemy-course-by-scott-duffy)
  - [Udemy course by Alan Rodrigues](#udemy-course-by-alan-rodrigues)
  - [YouTube course by John Savill](#youtube-course-by-john-savill)
- [Practice tests](#practice-tests)
- [Scheduling the exam](#scheduling-the-exam)
- [Pre-exam process](#pre-exam-process)
- [The AZ-700 exam](#the-az-700-exam)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->
## Background

> “Smooth seas do not make skillful sailors.” - African proverb

[AZ-700](https://docs.microsoft.com/en-us/learn/certifications/exams/az-700){:target="_blank" rel="nofollow"} is the Azure Network Engineer exam. I cleared the exam today ie Jan 11, 2022.
This is my 4th Azure certification. You can read about the others [here]({{ site.url }}/#certification).

My experience as an Azure Cloud Architect gave me the confidence to go for this certification.
But it definitely wasnt a piece of cake :sweat_smile:.

!["Azure Network Engineer"](/assets/images/certifications/az-700.png "Azure Network Engineer")

## Preparation

[Skills measured](https://docs.microsoft.com/en-us/learn/certifications/exams/az-700){:target="_blank" rel="nofollow"} :

- Design, implement, and manage hybrid networking (10-15%)
- Design and implement core networking infrastructure (20-25%)
- Design and implement routing (25-30%)
- Secure and monitor networks (15-20%)
- Design and implement Private access to Azure Services (10-15%)

Another way to look at the syllabus would be by Azure resources :

- On prem connectivity
  - VPN
  - ExpressRoute
  - WAN
- Load Balancer services
  - Azure Load balancer
  - FrontDoor
  - Application Gateway
  - Traffic Manager
- Security
  - Azure Firewall
  - NSG
  - Private link
- Others
  - Virtual network
  - DNS (Public and Private)
  - Network Watcher tools
  - Route tables
  - Vnet integration with Azure PaaS offerings.
  - ...

AZ-700 came out last year ie July 2021 but has excellent support via video courses. I have highlighted some of the prominent ones below.
Important to know that no matter which course you go for, you will have to rely on practice tests and Azure documentation to some extent.

### Udemy course by Scott Duffy

- I relied on [this course](https://mckinsey.udemy.com/course/az700-azure/){:target="_blank" rel="nofollow"}.
- Its well focused and short (5.5 hours).
- It also has a tiny practice test of 20 or so questions at the end.
- Its ideal for those with experience in Azure and who just want a quick summary of the content.

### Udemy course by Alan Rodrigues

- [This offering](https://mckinsey.udemy.com/course/azure-exam-700/){:target="_blank" rel="nofollow"} surprised me a lot. I didnt go through all of it but just through some sections which I wanted further details on.
- It has a duration of 18.5 hours and is well detailed with focus on edge cases too.
- Additionally two practice tests are given here of 50 questions each.
- I would recommend this for most of the folks who want to give the AZ-700 exam - especially for those who want to learn more to gain confidence for the exam.

### YouTube course by John Savill

- John Savill's [AZ-700 playlist](https://www.youtube.com/playlist?list=PLlVtbbG169nGeFODKRZhjqdSxFpSPXVOa) is excellent. Most Azure enthusiasts would have gone through some of them to learn about an Azure resource.
- Its **free** !
- The playlist consists of around 20 videos with a total duration of almost 16 hours.
- I would recommend this playlist for those of you who want to understand the concepts really well while gaining the ammunition to clear the AZ-700 exam.

## Practice tests

- Practice Test in Scott Duffy's course
  - Around 19 questions. Completed it in 15 min.
  - I got 64%.
  - Found out significant gaps in my theoretical knowledge (eg: SKUs of virtual network gateway) which I needed to plug. Studied them before going to the next test.
- Practice Test 1 in Alan Rodrigues's course
  - Around 50 questions. Completed it in 45 min.
  - I got 82%.
  - Found out that I needed to study more about resources which I haven't worked on before (Eg: Azure ExpressRoute, WAN, Traffic Manager etc). Spent some time studying them before giving the next practice test.
- Practice Test 2 in Alan Rodrigues's course
  - Around 50 questions. Completed it in 45 min.
  - I got 73%.
  - Found out that I needed to study the details even more about resources which I haven't worked on before :sweat_smile: (eg: Corresponding speed for a ExpressRoute scale unit).

I was confident of doing well in the exams now.

## Scheduling the exam

I scheduled the exam through the [Microsoft Certification Dashboard page](https://www.microsoft.com/en-us/learning/dashboard.aspx){:target="_blank" rel="nofollow"}.

## Pre-exam process

I did the pre-exam prep below around 30 min before the exam :

- I had to download a software which tested my machine for compatibility.
- Send pics from 4 directions of my surroundings (closed room).
- After a live 360 degrees scan from the Proctor, The exam was supposed to begin.
- The pre exam profile questionaire wrapped up quickly.

## The AZ-700 exam

- **It was an exam of 1 hour 50 min with 51 questions and I needed 70% to pass**.
- I felt a bit stressed cause the length of the questions were a lot and it took me a while to understand the context before answering the questions. 51 questions in 110 minutes ie around 2 min for each question isnt easy !
- It took me 55 minutes to complete 25 questions. Very different from the above practice tests.
- There werent many theoretical questions. The exam had a lot of practical questions in which I was given a scenario and expected to recommend a solution or answer a point to show that I understood it well. So definitely not something I could complete in a jiffy.
- The final 10 questions involved 2 case studies which had a lot of content to read. I had 30 min left. It took me 15 min to complete each case study. The questions were such that I had to re-visit multiple tabs to understand the chain of details around the specific resource.
- I submitted the exam with a few seconds to spare.
- I had flagged around 7 questions whose answer I wasnt sure of. Needed bit more time to read the question better. But wasnt able to review them again due to time constraints.
- I had to fill a survey on myself and nature of the exam after this (no impact on the exam results).
- I immediately received the congratulatory message page for clearing the exam along with the details of my performance. **I got 80%.**

The certificate and transcript section of the Microsoft Learning dashboard were updated in 30 minutes while the certificate was added to [Credly](https://www.credly.com/earner/earned){:target="_blank" rel="nofollow"} in 24 hours.
## Final thoughts

- I loved studying for AZ-700. It really improves your knowledge of various network resources on Azure cloud.
- This was easily the toughest Azure exam I have given. What made it difficult :
  - Time constraint of 110 minutes to tackle 51 questions. Long questions meant I had to understand the situation quickly and skim through the noise to reply.
  - Focus on practical scenarios rather than standard theory. Very few questions on the theoretical part. But thankfully they did exist to give you some breathing space among the other time consuming questions :laughing:.
  - Tricky data. Some of the data resembled each other and I really had to re-look at the diagram/details to confirm. Eg : Vnet address space of 172.10.20.3 and NSG rule on 172.10.23.0 IP.
- My knowledge and preparation for On-prem connectivity and hub spoke helped me a lot here.
- AZ-700 is one of the newer exams which came out last year. Not sure if the tight time constraint will be the trend going forward for other exams too. I am giving the exams for a bit of adrenaline rush during these WFH times due to the pandemic....but this one was a bit much even for me :sweat_smile:.

I wish you the best of luck if you plan on giving this exam :thumbsup:.
<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
