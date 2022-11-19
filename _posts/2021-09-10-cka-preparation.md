---
layout: post
title: "CKA : Preparing for the Kubernetes Administrator Exam"
#category: general
tags: [kubernetes, certification]
comments: true
---

A brand new guide to prepare for the CKA exam in 2021.

<!-- TOC -->

- [Background](#background)
- [CKAD before or after CKA ?](#ckad-before-or-after-cka-)
    - [REASON 1 ie Syllabus overlap](#reason-1-ie-syllabus-overlap)
    - [REASON 2 ie Natural transition](#reason-2-ie-natural-transition)
- [Preparation](#preparation)
- [The CKA exam](#the-cka-exam)
- [Ending thoughts](#ending-thoughts)

<!-- /TOC -->
## Background

> “An investment in knowledge always pays the best interest” - Benjamin Franklin

After giving the Certified Kubernetes Application Developer (CKAD) exam recently, I went for the Certified Kubernetes Administrator(CKA) exam yesterday.
You can read my blog on preparing for CKAD [here]({{ site.url }}/2021/07/25/ckad-preparation).

## CKAD before or after CKA ?

I definitely recommend giving CKAD before CKA exam even though its not a pre-requisite.

### REASON 1 ie Syllabus overlap

The CKA syllabus can be seen [here](https://www.cncf.io/certification/cka/) but it can be generalized into 2 parts :

1. Cluster setup
   - This includes creating the cluster(control plane, workder nodes) and its maintenance (etcd backup and restore, working of kubelet etc)
2. Operations within the cluster.
   - This includes the various resources within the cluster and using it to support applications.
   - Its basically the syllabus of CKAD + few additions like Daemonsets and Statefulsets.
   - This is around 70% of the CKA syllabus.

So if you prepare for CKAD you broadly cover the 2nd part and become very quick at practically solving the problems. You can build on this skill and study the cluster setup part to be ready for CKA.
I would also encourage to give CKA within a few weeks of clearing the CKAD since you are already "battle ready" !

### REASON 2 ie Natural transition

A lot of times we use a software, like it and then try to figure out what makes it tick. This is a natural pattern we see in our line of work. CKAD helps an application developer deploy their apps to k8s. The App dev need not understand how it works. But if he/she gets mightly interested into its working, then CKA will be the right step forward as the k8s admin needs to know the internals of k8s.

Its a **2 hour exam with 17 questions involving 6 clusters with atleast 66% needed to clear it**. Details on it can be accessed [here](https://docs.linuxfoundation.org/tc-docs/certification/tips-cka-and-ckad){:target="_blank" rel="nofollow"}, [here](https://www.cncf.io/certification/cka/){:target="_blank" rel="nofollow"} and [here](https://docs.linuxfoundation.org/tc-docs/certification/faq-cka-ckad-cks#what-score-is-needed-to-pass-the-exam){:target="_blank" rel="nofollow"}. The time constraint is the most crucial factor here. 2 hours can go away in a jiffy if you are not well versed with the necessary skills or get careless.

## Preparation

Please read my blog post on [preparing for CKAD]({{ site.url }}/2021/07/25/ckad-preparation) before going ahead.

- Training session
  - The excellent Learning team of my employer (McKinsey & Company) had organized a 5 day bootcamp for the CKA exam. [Michael Bright](https://www.linkedin.com/in/mjbright/){:target="_blank" rel="nofollow"} was the trainer and he did a great job at preparing the audience for the CKA exam. 
  - The great thing about attending a live bootcamp is the to and fro Q&A which is not possible while attending an online course.
  - Additionally since it was an official Linux Foundation training, the LF notes provided were quite well detailed and easy to understand.
- Another alternative is to attend the [popular Udemy course](https://mckinsey.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/){:target="_blank" rel="nofollow"} though I didnt go for it.
- Practice test
  - I was comfortable with the CKAD part ie the k8s resources part. But not as much with the k8s setup part since I wasnt sure of what kind of questions can come up in the exam. To fix this, I gave the practice test at [killer.sh](https://killer.sh){:target="_blank" rel="nofollow"} which you get free access to when you sign up for the CKA exam.
  - I didnt do well in this test(55%) but I got what I wanted. I was expecting 17 questions but the practices test had 25 questions within the 2 hrs duration....something I realized only towards the end of the exam :sweat_smile: . I got most of the CKAD part correct but had to skip the cluster setup part due to time constraints.
  - I spent quite a few hours playing with the killer.sh environment for the cluster maintenance questions.
- As I strengthened my knowledge on the cluster setup and maintenance part, my confidence to ace the CKA exam grew.

## The CKA exam

- While going for the exam, I kind of felt like the hitman Vincent(played really well by Tom Cruise) at the [famous club shootout scene in the movie Collateral](https://www.youtube.com/watch?v=d9_n6wwkIHM){:target="_blank" rel="nofollow"} with the background 'Ready Steady Go' score. Confident and ready for the kill !
- I logged in 15 min before the exam time as the 'Take exam' button gets enabled only then.
- It took me 15 min to get the proctor's approval for my environment(live chat popup).
- The old UI bug in the exam still existed - the timer UI was not working for me ie I could see the ‘time left’ label but no timer. I mentioned it to the proctor who said he/she would inform me abt time updates later. The proctor regularly did so but only during the last 15 min or so.
- My goal was to solve each question in 5 min...ie around 5 questions per 30 min. This would allow me to solve all 17 questions in 100 min or so and I can then use the last 15-20 min for double checking the answers.
- I was a bit slow in the first couple of questions...getting a feel for the exam. But with each question, I picked up pace and was able to solve 5 questions in 30 min.
- I skipped any cluster setup/maintenance questions I encountered since they take more time and "flagged" them for later.
- I was able to wrap up around 15 questions at the 90 minute mark and had 2 flagged questions. It took me 15 min to solve them and I was done with 100% of the questions !
- So I had 15 min to double check things. But I was in a hurry. I had to drive for 7 hrs after this to attend a far away event. Since I was confident that I had cleared the exam I decided to end the exam right there and then by clicking on the "Request to end exam" option.
- I had to fill a survey on myself and nature of the exam after this (no impact on the exam results).
- At the end of the exam, I felt confident about the result. The CKA exam was easier than the CKAD exam for me. The result would be sent only at the end of 24 hours...so here comes the wait.
- At the 24 hour mark, I got my results - I had cleared it. Going through the portal I discovered I had got 84%. Happy with the score though I was wondering how I didnt reach the 95% mark. Will make sure to make use the last 15 min better next time :sweat_smile: .

## Ending thoughts

I think I would prefer it if CKAD becomes a pre-req for CKA(just like CKA is pre-req for CKS) and CKA syllabus is changed to focus on the cluster setup and maintenance more. Lot of those new to k8s are going for CKA right at the begining which really doesn't make sense since CKAD is a much better introduction to the world of k8s.

CKA got me even more interested into the internals of k8s and I am looking forward to preparing for CKS next.

I wish you the best of luck if you plan on giving this exam :thumbsup:.
<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
