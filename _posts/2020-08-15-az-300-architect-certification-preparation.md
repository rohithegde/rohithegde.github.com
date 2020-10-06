---
layout: post
title: "AZ-300 : Preparing for the Microsoft Azure Architect Technologies Exam"
#category: general
tags: [microsoft, azure, cloud, architect, exam, certification]
comments: true
---
In a hurry ? Please skip to the part you want with the index below.
<!-- TOC -->

- [Background](#background)
- [Preparation](#preparation)
  - [PluralSight](#pluralsight)
  - [Exam Ref AZ-300 - O'Reilly ebook](#exam-ref-az-300---oreilly-ebook)
  - [Whizlabs practice tests](#whizlabs-practice-tests)
  - [Udemy practice tests](#udemy-practice-tests)
- [Scheduling the exam](#scheduling-the-exam)
- [Pre-exam process](#pre-exam-process)
- [The AZ-300 exam](#the-az-300-exam)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->
## Background

> “I am not telling you it is going to be easy. I am telling you it is going to be worth it” - Art Williams

I have around a year's experience as an Architect and Sr DevOps engineer with Azure. I also have prior experience with GCP and AWS. As such, I thought of going for the Azure Architect certification on August 3, 2020.

AZ-300 is the Azure Architect Technologies exam. Its equivalent to its famous counterpart - the `AWS Certified Solutions Architect - Associate` exam.
If you clear AZ-300 along with AZ-301, you will become an **Azure Solutions Architect Expert**.
You can read about my prep for AZ-301 [here]({{ site.url }}/#certification).

You can visit the [official website](https://docs.microsoft.com/en-us/learn/certifications/exams/az-300){:target="_blank" rel="nofollow"} for more details.

!["ERD"](/assets/images/azure-architect-path.jpg "ERD")

**Note** :

- The AZ-300 and AZ-301 exams are set to retire in September 2020. Their newer versions are AZ-303 and AZ-304.
- The newer exams are still similar to the original ones with a more focused syllabus ie some topics have been added/removed.
- I chose to give the original exams since most of the courses out there are for them. It will take some time for newer courses to arrive.

## Preparation

While the syllabus given [here](https://docs.microsoft.com/en-us/learn/certifications/exams/az-300){:target="_blank" rel="nofollow"} looks quite straightforward, after you go through the topics and the practice tests - you will realize that there is a LOT to cover.
The websites which helped me prepare :

### PluralSight

- [This course](https://app.pluralsight.com/paths/skills/microsoft-azure-architect-technologies-az-300){:target="_blank" rel="nofollow"} is recommended for those who are new to Azure.
- The Azure courses on it are free due to their tieup with Microsoft.
- However the duration is quite long (50+ hours) since it covers everything in the topic - basic to advanced.
- Its probably overkill for those preparing specifically for the exam.
- A smaller 10-20 hour focused course on Udemy might help more here (eg: the ones from Skylines Academy or Scot Duffy).

### Exam Ref AZ-300 - O'Reilly ebook

- [This ebook](https://learning.oreilly.com/library/view/exam-ref-az-300/9780135881477/){:target="_blank" rel="nofollow"} was like a crash course focused on the exam.
- I used it to revise concepts before giving the practice tests.
- One of the authors is Timothy L. Warner. He is a Microsoft MVP and has many video courses on Azure out there.

### Whizlabs practice tests

- [This offering](https://www.whizlabs.com/microsoft-azure-certification-az-300/practice-tests/){:target="_blank" rel="nofollow"} helped me a lot.
- The 5 practice tests (+ 1 free test [here](https://www.whizlabs.com/microsoft-azure-certification-az-300/free-test/){:target="_blank" rel="nofollow"}) really take you the cleaners. They are actually tougher than the actual exam.
- **The passing scored needed is 80% here**.
- The duration of each test was around 2.5 hours though I completed each test within an hour.
- My scores :

| Practice test   | Score | Notes                                                                                                                                                  |
|-----------------|-------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| Free test       | 47%   | Was surprised with the level of detail expected. The review of the answers told me my weak areas. I revised them and then gave the next test.          |
| Practice test 1 | 69%   | Not happy with the marks. Immediately went for the next test.                                                                                          |
| Practice test 2 | 65%   | Revised the new weak areas discovered.                                                                                                                 |
| Practice test 3 | 73%   | Not happy with my progress. Decided to revise my notes one more time and then give the earlier exams again. Scored around 90% or more in each of them. |
| Practice test 4 | 84%   | Revised the new weak areas discovered.                                                                                                                 |
| Practice test 5 | 80%   | Revised the new weak areas discovered.                                                                                                                 |

- I was confident enough to give the exam now.
- Smaller topics which I focused on more due to the tests :
  - App Service (specially the difference in features in each of the plans)
  - Migration from onprem to Azure (Backup, Migrate, disaster recovery)
  - [Site to Site networking](<https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-site-to-site-resource-manager-portal>){:target="_blank" rel="nofollow"}.
  - [Different SLAs](https://azure.microsoft.com/en-us/support/legal/sla/){:target="_blank" rel="nofollow"}.
  - [Cosmos DB consistency levels](https://docs.microsoft.com/en-us/azure/cosmos-db/consistency-levels){:target="_blank" rel="nofollow"}.
  - [VM availability](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/manage-availability){:target="_blank" rel="nofollow"}. (Availability sets, Availabilty zones, Scalesets, Fault domain, Update doman etc)

### Udemy practice tests

- [This course](https://mckinsey.udemy.com/course/exam-az-300/learn/quiz/4644874){:target="_blank" rel="nofollow"} has 2 practice tests.
- Unlike the Whizlabs tests, these 2 tests werent independent ie each exam focused on specific areas rather than have a variety of topics like in the real exam.
- So marks obtained here weren't reflective of how much I would get in the original exam (didnt do too well here. Got around 65-70% with 70% being the passing score).
- But the tests here do well to know any remaining weak areas in your knowledge.

## Scheduling the exam

You can schedule the exam through the [Microsoft Certification Dashboard page](https://www.microsoft.com/en-us/learning/dashboard.aspx){:target="_blank" rel="nofollow"}.
I prefer this way since it gives you visibility into any discounts of vouchers you can avail of.
Alternatively you can schedule it directly through the [exam link](https://docs.microsoft.com/en-us/learn/certifications/exams/az-300){:target="_blank" rel="nofollow"} too.
You can reschedule the exam free of charge only if its not within 1 week of the exam date.

## Pre-exam process

This was quite a pleasant experience. The email you get after registering for the exam explains the whole process.

I did the pre-exam prep below around 30 min before the exam :

- I had to download a software which tested my machine for compatibility.
- Send pics from 4 directions of my surroundings (closed room).
- After a live 360 degrees scan from the Proctor, I could start the exam.

## The AZ-300 exam

- **It was an exam of 3 hours with 45 questions and passing score of 70%**.
- Since I had completed the practice tests well in advance, I knew that time wasnt an issue for me.
- The practice test experience helped. I found the exam to be a lot easier than the practice tests. By the time I crossed 35 questions, I felt that I had got more than 90% of it correct.
- At this point I made a few mistakes with the next 10 questions :
  - I forgot that the weightage of each question is different. So doing well in 35 questions before didnt actually mean that I had a good score already.
  - There were a few case scenarios with 3 'yes/no' answer type questions (a multi step answer like steps involved in migration). After clicking on 'yes' for the 1st question, the 2nd question made me realize that my 1st answer was wrong. But unlike the practice tests, the exam has few sections in which you CANNOT go back. To be fair, the instructions in the begining proactively inform you of this rule but you only realize the impact later.
  - I answered the above type questions a bit hastily. This led me to make mistakes in around 4 questions. I realize this in hindsight.
- I flagged the answers which I wanted to revise (not applicable to the above) and spent around 20 min on it.
- I submitted the exam in 2 hours.
- I had to fill a survey on myself and nature of the exam after this (no impact on the exam results).
- I immediately received the congratulatory message page for clearing the exam.

The exam report with certification id arrived in 30 minutes.
I had mixed feelings. I felt that I shouldn't have made those mistakes. At the same time, I was relieved that it was over and that I was on the right side of the fence.

## Final thoughts

- Memory is an important factor here. Important topics from the exam :
  - The practice tests didnt focus on AAD premium features as much. I didnt too. Its important to go into the details here.
  - Onprem to Azure migration is very important.
  - Pay attention to the small details (eg: SLAs, plans, tiers etc).
- Read the Azure docs. Especially those linked in the practice test answers.
- Practice tests help a lot to identify chinks in your armour. Give as many as possible.
- Read each question and possible answers slowly and well. Its easy to make mistakes in haste.

The journey was tiring but I learned a lot from it. Will be studying for AZ-301 now.

I wish you the best of luck if you plan on giving this exam :thumbsup:.
<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
