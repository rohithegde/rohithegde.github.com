---
layout: post
title: "SAA-C03 : Preparing for the AWS Solutions Architect Associate certification"
#category: general
tags: [aws, cloud, certification]
comments: true
---

A brand new guide to prepare for the AWS Certified Solutions Architect Associate certification exam (SAA-C03) in 2023.

<!-- TOC -->

- [Background](#background)
- [Preparation](#preparation)
  - [Udemy course by Stephane Maarek](#udemy-course-by-stephane-maarek)
  - [Practice tests](#practice-tests)
- [Certification exam](#certification-exam)
  - [Online exam](#online-exam)
    - [Process before the online exam](#process-before-the-online-exam)
    - [Giving the online exam](#giving-the-online-exam)
  - [Test center exam](#test-center-exam)
    - [Process before the exam](#process-before-the-exam)
    - [Giving the exam](#giving-the-exam)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->

## Background

> “Surpass your limits. The path will open up for you" - Yami Sukehiro from the Black Clover anime.

I have been working on Azure cloud infrastructure for the past 3 years which enabled me to go really deep into it. Azure certs allowed me to explore further. I am now interested in refreshing my past experience with the other 2 major clouds. Certifications in them seems to be the logical next step of my journey :smile:.

The introductory cloud certs like [AWS Cloud Practioner](https://aws.amazon.com/certification/certified-cloud-practitioner/){:target="\_blank" rel="nofollow"}, [Azure Fundamentals](https://learn.microsoft.com/en-us/certifications/azure-fundamentals/){:target="\_blank" rel="nofollow"} [Cloud Digital Leader](https://cloud.google.com/certification/cloud-digital-leader){:target="\_blank" rel="nofollow"} are good for those new to the cloud. The advanced certs are better goals to pursue for others as they provide a practical depth of knowledge. Based on your current or upcoming work, you can chose to go for specialty certification paths like [AWS Advanced Networking](https://aws.amazon.com/certification/certified-advanced-networking-specialty/){:target="\_blank" rel="nofollow"} or a more generic one like [AWS Developer Associate](https://aws.amazon.com/certification/certified-developer-associate/){:target="\_blank" rel="nofollow"} depending on your current or upcoming work.

I decided to pursue the "Architect" cloud certification path as it matched my line of work and I had [already achieved this path for Azure cloud]({{ site.url }}/#certification){:target="\_blank"}. So here is my journey to get the [AWS Solutions Architect Associate cert](https://aws.amazon.com/certification/certified-solutions-architect-associate/){:target="\_blank" rel="nofollow"}.

!["AWS Solutions Architect Associate"](/assets/images/certifications/aws-aschitect-associate.png "AWS Solutions Architect Associate"){:height="30%" width="30%"}

## Preparation

- The [AWS exam guide for this cert](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf){:target="\_blank" rel="nofollow"} lists the weightage of the 5 main topics but that isnt very helpful as there can be overlap of resources between them. Eg : Design High-Performing Architectures vs Design Cost-Optimized Architectures.
- **The important part of this exam guide is the AWS Resources section at the end of the document**. It is a non-exhaustive list of which resources are in syllabus and which are not. So at the end of your preparation, its good to understand what each resource in the list does even if you dont see it in any exam course.

### Udemy course by Stephane Maarek

- I prepared with [Stephane Maarek's course](https://mckinsey.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/){:target="\_blank" rel="nofollow"} as it was the most popular course for this AWS cert.
- It has a duration of 27 hours and is well detailed with focus on edge cases too. Stephane has gone the extra mile to try to help us by covering plenty of topics from the exam point of view.
- Additionally one practice test is given here with 65 questions.
- I went through the course at 1.5x speed to save some time.
- I revised the syllabus by going through the excellent notes (PDF) provided in the course.
- Do note that the syllabus is HUGE ! There are a thousand things that can be asked and you will likely not be ready for it (Eg: Selecting the right EBS volume based on desired IOPS). So just doing this course will not be enough. You have to spend time on the practice tests as well as explore related AWS documentation to increase your coverage.

### Practice tests

- After studying for the certification, I decided to go for the single practice test given in the above course as well as enroll for the [6 practice tests by Stephane Maarek and Abhishek Singh](https://mckinsey.udemy.com/course/practice-exams-aws-certified-solutions-architect-associate/){:target="\_blank" rel="nofollow"}.
- As expected, the practice tests were tough. You dont remember the tiny details unless you see it in an exam :sweat_smile:. But the act of giving many practice tests allows you to memorize your studied content better to help when you give the actual exam.
- I didnt do well in my 1st attempt but it was near the 72% cutoff that is needed to pass the exam. So I decided to identify and improve on my gaps in knowledge after every exam. After giving 7 practice tests, I decided to go for round 2 of the same tests again. This time I crossed the 90s for most of them. I was able to complete each exam with 30 mins to spare.
- Something which helped me - I realized that **some of the answers given in "Review questions" section at the end of a practice test were outdated**. Eg: Kinesis Firehose output destinations. Clicking on the official AWS links helped me view the latest information.

| Test            | Attempt 1 | Attempt 2 |
| --------------- | --------- | --------- |
| Practice test 0 | 66%       | 95%       |
| Practice test 1 | 69%       | 90%       |
| Practice test 2 | 64%       | 93%       |
| Practice test 3 | 72%       | 81%       |
| Practice test 4 | 72%       | 96%       |
| Practice test 5 | 84%       | 96%       |
| Practice test 6 | 63%       | 78%       |

At this point in time I was confident of clearing the exam.

## Certification exam

### Online exam

#### Process before the online exam

- I scheduled the exam through the [AWS Certification page](https://www.aws.training/certification){:target="\_blank" rel="nofollow"} for Saturday 6:45 am.
- I checked in at 6:15 am and downloaded the OnVue software. I took the compatibility test and it passed. I took pics of my surroundings and uploaded it to the tool for verification.

#### Giving the online exam

- The online proctor then started the exam for me....and the tool crashed 😖. Guess the new version didnt agree with my Mac.
- I restarted my Mac and connected with another proctor who started the exam again...and it crashed again 😩.
- The proctor opened a ticket/case for me and gave me the ticket number. He then asked me to contact the Pearson Vue helpline for resolving this issue. I visited their website and started the live chat online option. I provided the ticket number to which the person said that the issue was in progress and I should try again after 2-3 days. In a couple of hours, I received an email stating that the exam was canceled and I would be getting the fees reimbursed this week.
- I had 2 options to give the exam
  1. Schedule the exam after 3-4 days and hope that they fix the issue with the next release of the online tool. I had chosen this option 2 yrs ago when the same issue happened during the lockdown days of the pandemic.
  2. Book the exam to be given at a Pearson Vue test center.
- I decided to try the offline test center option.

### Test center exam

#### Process before the exam

- I scheduled the exam through the [AWS Certification page](https://www.aws.training/certification){:target="\_blank" rel="nofollow"} for the next day ie Sunday 3:30 pm.
- The test center was at a drive of 30 min from my place. The checkin process was super smooth and barely took 5 min. I just had to deposit my stuff (mobile, wallet etc) in their locker and confirm my identity through an original id proof. So simple and quick compared to the 20-30 min online process.
- The desktop computer had an empty erasable page nearby with a pen to help me take notes if a complex question needs it. You don't get this option online :smile:.

#### Giving the exam

- **It was an exam of 140 min with 65 questions and I needed 72% to pass**.
- Similar to the practice tests, I paced myself to complete 20 questions every 30 min so that I wouldnt face the pressure of time.
- As expected, the exam was tough. Less overlap with the questions in the practice tests (some 5 questions I guess). Questions on disaster recovery were tough as I had to read a lot of content before examining the lengthy options. Spending too much time on them would definitely be disasterous for me 😅.
- I completed the whole set with 25 mins to spare. I used this time to review the 8 questions I had flagged. I ended the exam with 2 min left.
- The results of the exam are supposed to be given usually within 1-5 days. However I received the "pass" result in 2.5 hours via email. I visited the "Exam History" tab of the [AWS Certification page](https://www.aws.training/certification){:target="\_blank" rel="nofollow"} to view my score. I had got 79%.
- I was happy with the result though I bit dissapointed with the marks. I was expected something between 80-90%. I then remembered the fine print on the [AWS exam guide](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf){:target="\_blank" rel="nofollow"}:

  ```markdown
  The exam includes 15 unscored questions that do not affect your score. AWS collects
  information about candidate performance on these unscored questions to evaluate
  these questions for future use as scored questions. These unscored questions are
  not identified on the exam.
  ```

- Due to this, there was no way to predict my marks. I might have done well with those 15 questions and not so well in the ones that mattered. Oh well, atleast I got the shiny certification logo :smile:.

## Final thoughts

- Its a fun exam to study for. One of the tougher ones out there for sure.
- Like most other cloud certs, you will need a lot of memory + understanding + some logic to clear this exam.
- The exam is easier if you have worked a lot in AWS recently. A lot of the finer details automatically become embedded in your memory.
- Create your own notes on complex topics like data transfer (the difference between the various Kinesis tools, DMS, Glue etc) so that you have a clear understanding. Makes it easier to remember.
- Practice tests only help in time preparation and make you understand the type of questions which can be asked. Don't expect much overlap with the actual exam questions.

I wish you the best of luck if you plan on giving this exam :thumbsup:.
<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
