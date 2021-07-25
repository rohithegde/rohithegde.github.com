---
layout: post
title: "CKAD : Preparing for the Kubernetes Application Developer Exam"
#category: general
tags: [kubernetes, certification]
comments: true
---

A brand new guide to prepare for the CKAD exam in 2021.

<!-- TOC -->

- [Background](#background)
- [What makes CKAD different from other exams?](#what-makes-ckad-different-from-other-exams)
- [Three focus areas for successful time management in the exam](#three-focus-areas-for-successful-time-management-in-the-exam)
    - [Linux commands](#linux-commands)
    - [Handson k8s expertise](#handson-k8s-expertise)
    - [kubernetes.io documentation](#kubernetesio-documentation)
- [The CKAD exam](#the-ckad-exam)
- [Tips for the exam](#tips-for-the-exam)

<!-- /TOC -->
## Background

> “Its the job thats never started as takes longest to finish.” - Samwise Gamgee, The Lord of the Rings

I started working with Kubernetes(k8s) around 3 yrs ago. But I never went for the CKAD certificate till now.
I started going for cloud certifications only from last year. You can read about my journey [here]({{ site.url }}/#certification). 

The k8s exams are famous for being different and more difficult than the rest.

!["k8s"](/assets/images/k8s/k8s-certs.png "k8s")

## What makes CKAD different from other exams?

Cloud certs usually involve objective questions. But the k8s based certs is based on practical labs which is why its supposed to be tougher to prepare for them compared to other cloud certs. You are given problems which you are expected to solve by executing cli commands. **You do have access to the official documentation of k8s for reference during the exam but the exam time constraint makes things difficult.**

Its a **2 hour exam with 19 questions involving 4 clusters**. Details on it can be accessed [here](https://docs.linuxfoundation.org/tc-docs/certification/tips-cka-and-ckad){:target="_blank" rel="nofollow"} and [here](https://www.cncf.io/certification/ckad/){:target="_blank" rel="nofollow"}. The time constraint is the most crucial factor here. 2 hours can go away in a jiffy if you are not well versed with the necessary skills or get careless.

## Three focus areas for successful time management in the exam

### 1. Linux commands

- You have to be very comfortable with the Linux terminal and CLI commands since the exam is given on your browser with terminal access to an Ubuntu machine. I have been using Ubuntu and Mac for many years now so this was an easy thing to revise.
- The commands usually needed are those involving piping output to a file or another cmd, search (ie grep) and using aliases to type lesser.
- Knowing the vi or vim tool helps a lot in editing k8s yaml files. Some of the useful vim commands are :
  - `:PAGE_NUMBER` to go to a line number.
  - `/SEARCHTERM` to search for a case sensitive word in the file.
  - `shift key + g` to go to end of file.
  - `gg` to go to start of file.
  - `dd` to delete a line.
  - `u` to undo a change.
  - `:wq!` to save the file after making changes in it.
  - `:q!` to quit the file without saving your changes.
- Recommend going through a linux commands basics video course on YouTube or Udemy as also for Vim if you arent comfortable with CLI.
- **This skill is an absolute must have to navigate your way through the exam**.

### 2. Handson k8s expertise

- I am very comfortable with k8s but i wasnt very quick in using the `kubectl` commands. The [Udemy course by Mumshad](https://mckinsey.udemy.com/course/certified-kubernetes-application-developer/){:target="_blank" rel="nofollow"} helped me a lot in revising my concepts as also know which commands are important.
- Your k8s concepts have to be strong and your handson k8s skills must be be swift in order to utilize the 2 hrs exam time well.
- Giving practice tests help a lot in sharpening your handson k8s skills. Mumshad's Udemy course has multiple labs which help here.
- **Additionally from this year, you get free access to a [killer.sh](https://killer.sh/){:target="_blank" rel="nofollow"} practice test when you schedule a CKAD exam**. This is the best resource for practicing. You get 2 hours to give a single practice test which is tougher than the real exam. You get 2 sessions of 36 hours each during which the cluster environment will remain alive. In these 72 hours, you can retake the same practice test multiple times.
- Another famous resource to practice can be found at [https://github.com/dgkanatsios/CKAD-exercises](https://github.com/dgkanatsios/CKAD-exercises){:target="_blank" rel="nofollow"}. I did not take this as Udemy and killer.sh was all the help I needed.
- My scores for various practices tests :

| Practice test   | Score | Notes                                                                                                                   |
|-----------------|-------|-------------------------------------------------------------------------------------------------------------------------|
| Lightning test 1| 60%   | 30 min test. Took this test after studying to give me a short preview of the nature of questions. |
| Lightning test 2 | 62%   | 30 min test. Timer continues to haunt me. Need to improve on Volumes and CronJobs.  |
| Mock Test 1 | 100%   | 60 min test. Revised a bit to get it right. I nailed it ! |
| Mock Test 2 | 75%   | 60 min test. Happy with the marks since I hadnt revised at all.                                                              |
| Killer.sh practice test 1 | 75%   | 120 min. Tougher than real exam. Happy with the score since I passed without any special prep. But I struggled in prioritising the questions to manage time better. Got careless during the 2nd half.    |

- **NOTE**:
- **You dont have to remember the yaml structure of all resources nor all the CLI commands.** Just knowing the `kubectl` commands to create a pod, deployment, service are enough. Rest can be copied from the documentation pages in short time.

ps : Mumshad's **Game of Pods** section in the Udemy course is a good way to practice the daily routine of a k8s admin. Won't help you directly in the exam but its useful for those looking to manage k8s at work in the future.

### 3. kubernetes.io documentation

- Your knowledge of the k8s official documentation saves you a lot of time during the exams.
- I became very comfortable with the documentation during the above practice tests.
- Eg : For getting the yaml structure of a Persistent Volume, I knew that the 2nd link (using Persistent Volume with a pod) was more useful than the first one (Persistent Volume) since it had lesser text and related yamls close together (PersistentVolumeClaim and Pod).
- I read through the [kubectl cheatsheet document](https://kubernetes.io/docs/reference/kubectl/cheatsheet/){:target="_blank" rel="nofollow"} many times since it had most of the important commands in a single page. This was my main reference page during the exams. I even copied the yaml for Pod and secret from here.

## The CKAD exam

- I logged in 15 min before the exam time as the 'Take exam' button gets enabled only then.
- It took me 30 min to get the proctor's approval for my environment(live chat popup). Somethings which took time were : getting rid of an opaque water bottle, a small unused table to my right, scan under the laptop table I used, 360 degree scan around me, close all the Chrome browser tabs etc.
- **I got a scare at the start of the exam.** The first popup had instructions to read through...but the timer UI was not working for me ie I could see the ‘time left’ label but no timer. I mentioned it to the proctor who said he/she would inform me abt time updates later. The proctor regularly did so but only during the last 15 min or so.
- So it was difficult to pace myself as I didnt know if the initial time taken to read instructions led to a loss of time or not. I relied on my laptop timer (smartwatch not allowed!) to give me some sort of reference time.
- Also note that you cannot mouth words too ie read only in your mind...its given in the rules as also reinforced by the proctor.
- As I solved each question, I executed commands to check if the resources were running as expected.
- I used the "Flag questions" button to flag 4 questions which I wanted to check out later. I got stuck with one of them and the other 3 had too many requirements for a low weightage.
- I was able to wrap up around 14 questions at 60 minute mark(including the flagged 4 which I didnt work on for now). At the 100 min mark I was done with the rest. So I had 20 min to go back to the flagged questions. I was able to resolve 2 of them and partially resolve 1 more. At the end of the exam, I had attempted 98% weightage worth of questions.
- I had to fill a survey on myself and nature of the exam after this (no impact on the exam results).
- At the end of the exam, I felt a bit disoriented since there was no pass/fail status. The results would be sent out in 24 hrs or so.
- At the 24 hour mark, I got my results - I had cleared it. Going through the portal I discovered I had got 82%. Happy with the score though I was wondering why I didnt reach the 90% mark. Probably got a bit careless with the spelling of some given resource names.

## Tips for the exam

1. Practice a lot if you arent quick in typing and executing Linux and kubectl commands.
2. **Partial marking exists. So don’t worry abt not completing the big questions. Partial solutions add to the score !**
3. Familiarize yourself with the help page of specific resources (eg: PersistentVolume, NetworkPolicy etc).
4. Familiarize yourself with the [kubectl cheatsheet document](https://kubernetes.io/docs/reference/kubectl/cheatsheet/){:target="_blank" rel="nofollow"}. It is a gold mine of useful commands in one place !
5. Setup your aliases at the start of the exam. You can even install bash completion using `sudo apt-get install bash-completion` (I didnt do this since I wasnt sure of the seconds needed to install this). Get them from the cheatsheet itself. Don't try to setup all the aliases given though. I only setup two :

    ```bash
    alias k='kubectl'
    export $do='--dry-run=client -o yaml' # useful for creating yaml from various commands without executing it.
    ```

6. **Prioritise your time well.** 120 min exam. So try to solve each problem within 5 min which should help you to get most things done in 100 min. Last 15-20 min can be used for checking results one final time.
7. Follow the convention of outputting yaml into file names based on question number. It saves time for easy reference. Eg: For question 10, I put my resource yaml in 10.yml so that I could come back to it later if needed.
8. If a question needs you to create multiple resources then a single yaml file would lead to a single kubectl cmd to execute. Eg: IF question 10 needed me to create a pv, pvc and a pod then I would have the yaml for all of them in 10.yml each resource sepearated by a line of `---`.
9. **Prioritise your questions well.** A quick read of the question and the % weightage for it will help you decide whether you should answer it now or later. Eg : A lot of resources needed to be created for a question with weightage 3%. I skipped it and went to the next one since it had similar requirements but weightage of 7%.
10. Each proper noun in the question(eg: resource name) gets copied on your clipboard on clicking it. Very useful feature - saves time and prevents spelling mistakes !

I loved studying for CKAD exam. It was so different and practical compared to the other certifications.
It helped me in improving my k8s CLI skills + was a good practice env since I intend to give CKA exam next.

I wish you the best of luck if you plan on giving this exam :thumbsup:.
<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
