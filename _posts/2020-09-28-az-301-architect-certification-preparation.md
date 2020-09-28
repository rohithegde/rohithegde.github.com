---
layout: post
title: "AZ-301 : Preparing for the Microsoft Azure Architect Design Exam"
#category: general
tags: [microsoft, azure, cloud, architect, exam, certification]
comments: true
---
In a hurry ? Please skip to the part you want with the index below.
<!-- TOC -->

- [Background](#background)
- [Preparation](#preparation)
  - [Udemy](#udemy)
  - [Whizlabs practice tests](#whizlabs-practice-tests)
- [Scheduling the exam](#scheduling-the-exam)
- [Pre-exam process [Warning:Stress ahead!]](#pre-exam-process-warningstress-ahead)
- [The AZ-301 exam](#the-az-301-exam)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->
## Background

> “Learning is a treasure that will follow its owner everywhere.” - Chinese Proverb

I cleared the Azure Architect Technologies certification(AZ-300) on August 3, 2020.
You can read about it [here]({{ site.url }}/#certification).
It made a lot of sense to complete the Azure Architect series and become an **Azure Solutions Architect Expert**.
Its equivalent to its famous counterpart - the `AWS Certified Solutions Architect - Professional`.

AZ-301 is the Azure Architect Design exam. I cleared the exam today ie Sep 28, 2020.
You can visit the [official website](https://docs.microsoft.com/en-us/learn/certifications/exams/az-301){:target="_blank" rel="nofollow"} for more details.

!["ERD"](/assets/images/azure-architect-path.jpg "ERD")

**Note** :

- The AZ-300 and AZ-301 exams are set to retire in September 2020. Their newer versions are AZ-303 and AZ-304.
- The newer exams are still similar to the original ones with a more focused syllabus ie some topics have been added/removed.
- I chose to give the original exams since most of the courses out there are for them. It will take some time for newer courses to arrive.

## Preparation

While the syllabus given [here](https://docs.microsoft.com/en-us/learn/certifications/exams/az-301){:target="_blank" rel="nofollow"} looks different, the actual syllabus almost matches that of AZ-300.
It builds on the topics from AZ-300 and makes you think from the Design perspective - an essential skill for an Azure Architect.

Couple of  websites which helped me prepare :

### Udemy

- I recommend the [course from Skylines Academy's Nick Colyer](https://mckinsey.udemy.com/course/microsoft-az-301-certification-azure-architect-design)){:target="_blank" rel="nofollow"} for AZ-301.
- Its well focused and short (10 hrs or so). They also provide good course material with it.
- Note - Watch the videos really well. Some of the points made during the demos are very useful for the exam and don't always exist in the provided materials.

### Whizlabs practice tests

- [This offering](https://www.whizlabs.com/learn/course/microsoft-azure-az-301){:target="_blank" rel="nofollow"} helped me a lot.
- The 5 practice tests (+ 1 free test [here](https://www.whizlabs.com/learn/course/microsoft-azure-az-301/quiz/14947){:target="_blank" rel="nofollow"}) are really good and test your knowledge well.
- **The passing scored needed is 80% here**.
- The duration of each test was around 2.5 hours though I completed each test within an hour.
- My scores :

| Practice test   | Score | Notes                                                                                                                   |
|-----------------|-------|-------------------------------------------------------------------------------------------------------------------------|
| Free test       | 67%   | Took this test after studying to give me a short preview of the nature of questions.                                    |
| Practice test 1 | 62%   | Quite happy with the results. Much better than similar test for AZ-300. Created a list of weak areas and revised them.  |
| Practice test 2 | 71%   | Did better than the previous exam. Decided to tackle my weak area of API Management and Network Watcher after the exam. |
| Practice test 3 | 86%   | Extremely happy with the result. Went for the next exam.                                                                |
| Practice test 4 | 80%   | Did well again. Still need to do better in some topics like Cosmos DB and the different monitoring agents.              |
| Practice test 5 | 79%   | Wrapped up this exam 1 hour before the actual AZ-301 Microsoft exam. Final revision time !                              |

## Scheduling the exam

You can schedule the exam through the [Microsoft Certification Dashboard page](https://www.microsoft.com/en-us/learning/dashboard.aspx){:target="_blank" rel="nofollow"}.
You can reschedule the exam free of charge only if its not within 1 week of the exam date.

## Pre-exam process [Warning:Stress ahead!]

This was a bit of a stressful experience for me.
I did the pre-exam prep below around 30 min before the exam :

- I had to download a software which tested my machine for compatibility.
- Send pics from 4 directions of my surroundings (closed room).
- After a live 360 degrees scan from the Proctor, The exam was supposed to begin.
- STRESS :
  - **However here it got a bit stressful** :weary:. After waiting 15 min while being monitored by the Pearson Vue desktop app, the exam didnt begin. Instead a link came up to ask for help. The form asked for some details from me and then I had to wait for a chat to begin. Bit worried now cause the page had a Q&A which stated that if no Proctor shows up then you will have to reschedule the exam...and that it can take 5 business days. Really worried now cause AZ-301 ends in 2 days (to be replaced by AZ-304).
  - The chat window informed me that I was 92 in the queue...and I had to wait :persevere:. By mistake I closed the original Pearson Vue app which was monitoring me. It did give me a warning that closing it might disqualify me...but I managed to open it again.
  - I waited under observation for another 15 min and then suddenly the exam began. Guess I was blessed with the presence of a Proctor...really happy that it came out of nowhere ! :smiley:

## The AZ-301 exam

- **It was an exam of 3 hours with 45 questions and passing score of 70%**.
- Since I had completed the practice tests well in advance, I knew that time wasnt an issue for me.
- The practice test experience helped. Found some similar questions from the tests.
- **1 tip** : Whenever you encounter a difficult or confusing question, mark it for 'review'. This helps you to go back + can also tell you how much points you are likely to lose.
- I submitted the exam in 1 hour 45 min. Completed the questions in an hour. Spent 30 min on revision my answers and another 15 min for the final case study.
- I had to fill a survey on myself and nature of the exam after this (no impact on the exam results).
- I immediately received the congratulatory message page for clearing the exam.

The exam report with certification id arrived in 30 minutes.

## Final thoughts

- I loved studying for AZ-301. Improved on what I learnt during AZ-300 prep and refined it further.
- The questions focused on concepts and I loved placing myself in the role of a troubleshooter.
- Smaller topics which I focused on more and which helped :
  - Monitoring agents.
  - API Management.
  - Network Watcher.
  - Traffic Manager.
  - Certificate setup (for VPN, for CosmosDB etc).
  - ExpressRoute and BGP (from AZ-300).
- Practice tests help a lot to identify chinks in your armour. Give as many as possible.
- Plenty of tiny details hidden in the questions (eg: PIM might seem to be the best answer until you see that the user only has O365 plan!). So read each question really well.

I wish you the best of luck if you plan on giving this exam :thumbsup:.
<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
