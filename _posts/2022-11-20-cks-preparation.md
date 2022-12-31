---
layout: post
title: "CKS : Preparing for the Kubernetes Security Specialist Exam"
#category: general
tags: [kubernetes, certification]
comments: true
---

A brand new guide to prepare for the final exam of the k8s triad - CKS in 2022. It took me 2.5x times to clear the certification exam - thats a first ! Read on to know more !

<!-- TOC -->

- [Background](#background)
- [How is CKS compared to the CKA and CKAD exams ?](#how-is-cks-compared-to-the-cka-and-ckad-exams-)
    - [Focus on 3rd party software](#focus-on-3rd-party-software)
    - [Lesser dependency on official k8s documentation](#lesser-dependency-on-official-k8s-documentation)
    - [Validity](#validity)
- [Preparation](#preparation)
- [Exams](#exams)
    - [Killer.sh practice test 1](#killersh-practice-test-1)
    - [CKS - Attempt 1](#cks---attempt-1)
        - [New Exam UI from June 2022](#new-exam-ui-from-june-2022)
        - [Exam experience](#exam-experience)
    - [Killer.sh practice test 2](#killersh-practice-test-2)
    - [CKS attempt 2](#cks-attempt-2)
    - [CKS attempt 3](#cks-attempt-3)
- [Tips for the exam](#tips-for-the-exam)

<!-- /TOC -->
## Background

> “I may not have gone where I intended to go, but I think I have ended up where I intended to be.” - Douglas Adams

I started working with Kubernetes(k8s) around 4 yrs ago. I got the CKAD and CKA certifications last year but wasnt able to spend time to prepare the CKS exam for the whole year.
Giving the 3 exams one after the other is ideal for those managing Kubernetes infrastructure. The exams require a lot of practice and preparing for one gets you in the "zone" to tackle the rest.
You can read about my k8s certification journey [here]({{ site.url }}/#certification){:target="_blank"}.

## How is CKS compared to the CKA and CKAD exams ?

!["k8s-certs-obtained"](/assets/images/k8s/k8s-certs-obtained.png "k8s-certs-obtained")

Like CKAD and CKA, CKS is a **2 hour exam with 15-20 tasks involving as many clusters with atleast 67% needed to clear it**. Details on it can be accessed [here](https://training.linuxfoundation.org/certification/certified-kubernetes-security-specialist/){:target="_blank" rel="nofollow"}.

Besides the focus on security, there are some differences between CKS and the other k8s certifications:

### Focus on 3rd party software

- K8s has always depended on multiple tools ([etcd](https://github.com/etcd-io/etcd){:target="_blank" rel="nofollow"}, [containerd](https://github.com/containerd/containerd){:target="_blank" rel="nofollow"}, [helm](https://github.com/helm/helm){:target="_blank" rel="nofollow"}) for its working. Barring etcd in the CKA exam, there wasnt much focus on the individual tools. That changes in this exam.
- Plenty of popular tools from the k8s ecosystem introduced here - [Kube-bench](https://github.com/aquasecurity/kube-bench){:target="_blank" rel="nofollow"}, [Kubesec](https://github.com/controlplaneio/kubectl-kubesec){:target="_blank" rel="nofollow"}, [gVisor](https://github.com/google/gvisor){:target="_blank" rel="nofollow"}, [AppArmor](https://apparmor.net/){:target="_blank" rel="nofollow"}, [Seccomp](https://github.com/seccomp/libseccomp){:target="_blank" rel="nofollow"}, [Trivy](https://github.com/aquasecurity/trivy){:target="_blank" rel="nofollow"}, [OPA Gatekeeper](https://github.com/open-policy-agent/gatekeeper){:target="_blank" rel="nofollow"}, [Falcon](https://www.crowdstrike.com/blog/tech-center/integrate-with-your-siem/){:target="_blank" rel="nofollow"}, [Sysdig](https://github.com/draios/sysdig){:target="_blank" rel="nofollow"} etc.
- Additionally unix based tools like [strace](https://github.com/strace/strace){:target="_blank" rel="nofollow"}, ps, lsof, netstat, systemctl are needed for troubleshooting quite a bit.

### Lesser dependency on official k8s documentation

- For CKAD and CKA exams, one can rely on kubernetes.io documentation to bail you out.
- For CKS, you need to visit documentation of the 3rd party tools.
- Additionally until the exam moves to k8s v1.25, the deprecated resource `PodSecurityPolicy` will continue to be in the syllabus while [not having much documentation support](https://kubernetes.io/docs/concepts/security/pod-security-policy/){:target="_blank" rel="nofollow"}. This is mitigated to some extent by using existing psp resources to create your own psp in the cluster.
- As of Nov 2022, [CKS exam is conducted with k8s v1.24](https://github.com/cncf/curriculum){:target="_blank" rel="nofollow"}. Expect this to be upgraded in a couple of months.

### Validity

While CKAD and CKA are valid for 3 years, CKS is valid for 2 years only.

## Preparation

- I enrolled into the [Udemy course by Kim Wüstkamp](https://www.udemy.com/course/certified-kubernetes-security-specialist/){:target="_blank" rel="nofollow"}.
- Kim is the founder of killer.sh and he did a great job at explaining the concepts. The best thing about it was the practical tests in each chapter on Killercoda.com.
- The free access to a [killer.sh](https://killer.sh/){:target="_blank" rel="nofollow"} practice test when you schedule a CKS exam is the best resource for practicing. You get 2 hours to give a single practice test which is tougher than the real exam. You get 2 sessions of 36 hours each during which the cluster environment will remain alive. In these 72 hours, you can retake the same practice test multiple times.

## Exams

### Killer.sh practice test 1

- I got the CKS exam voucher right after I cleared the CKAD and CKA exams last year around Sep 2021. However due to other commitments, I could not study for the CKS then. Due to this break in routine, it got delayed and I realised only in the last week that the CKS voucher would expire by Oct 17 2022. Didnt help that I ignored the reminder emails from the LinuxFoundation.
- I scrambled to study the CKS syllabus in 5 days and gave the Killer.sh practice test some 4 hrs before the actual exam.
- It didnt go well at all. I managed only 28% in it. I struggled a lot with time and only attempted some 50% of the exam. But not much time to learn from it.

### CKS - Attempt 1

#### New Exam UI from June 2022

!["k8s-exam-ui"](/assets/images/k8s/k8s-exam-new-ui.png "k8s-examui")

Refer to this [Killer.sh blog post](https://itnext.io/cks-cka-ckad-changed-terminal-to-remote-desktop-157a26c1d5e){:target="_blank" rel="nofollow"} and [this official post](https://docs.linuxfoundation.org/tc-docs/certification/lf-handbook2/exam-user-interface/examui-performance-based-exams){:target="_blank" rel="nofollow"} for more details on the changes.
You can count this as a extra thing to master.
The new user interface is tricky for those who havent experienced it. They have moved from the old browser based format to a Remote Desktop based UI via a custom exam browser tool. The practice test helps in getting used to this new UI but its far easier as its browser based compared to the Remote Desktop based new UI.

Some of the difficulties I faced while giving the CKS exam on it:

- Non responsive UI if a network lag is encountered.
  - More on this in the CKS exam attempt 2 section below.
- Copy pasting from the builtin Firefox browser to CLI.
  - Mouse right-click copy paste is the best way to mitigate this while ensuring a consistent approach.
  - Formating goes for a toss if you paste after using the "copy" button of a kubernetes.io code block. Use the direct drag copy to retain formatting after pasting into the CLI yaml file.
- Searching in the Firefox browser
  - Cannot ctrl-f search here.
  - Relied on the '/' quick search option of Firefox as also the Function F3 key for searching.
- Inconsistent copy option in the question.
  - Proper nouns ie names in the question can be copied merely by clicking on them but have to click on "copy" hover for the `kubectl config use-context NAMESPACE` cmd making it a bit clunky.

Some of the improvements I liked:

- Related documentation links given at top of the question which reduces having to search.
- Onboarding exam experience is faster as the remote desktop UI gives more control to the examiners.

#### Exam experience

- I was confident about the core parts of the exam but was a bit uncertain about the 3rd party tools and implementation of admission controllers as I hadnt worked on them before. Learning about all of them in a short while had made it fuzzy in my head.
- I installed the new custom browser tool and started it. The validation was done in 10 min and the exam started.
- I was surprised to see that the `kubectl` alias didnt work by default. Its supposed to exist as per the [official exam documentation](https://docs.linuxfoundation.org/tc-docs/certification/important-instructions-cks#cks-environment){:target="_blank" rel="nofollow"}. I had to add it manually.
- I started the exam. Was slowed down as I wasnt comfortable using the Firefox browser to search within the page. I was also used to the "ctrl-c" and "ctrl-v" ways to copy paste. Using mouse right click was a pain. With the limited space, you have to prioritise which window to view. Having the browser in a tab behind the terminal window made me forget for a few minutes that I could search the documentation.
- With a total of 15 questions to solve in 2 hours time, I had to take on 4 questions per 30 min to ensure I make it in time. It was a definite struggle with not much practice. I was able to solve around 75% of the questions in 2 hrs. The remaining 25% confused me a bit as they were on topics I wasnt strong on.
- The results came out around 23 hours after the start of the exam. I had got 59% ie 8 marks short of the passing score (67%). I wasnt surprised at the outcome. The silver lining was that I had got 59/75 with very short prep time.
- The troubling question - would I be allowed to re-take the exam as I had passed the voucher end-date ?

### Killer.sh practice test 2

- The end-date got extended with the results ! Initially it showed an extension of 1 week...which changed in couple of days to 2 weeks !!!
- I prepared really well this time. Spent quite a bit of time with the content. To ensure a speedy revision, I created a CKS cheatsheet with a summary of the various tools and the different commands. You can view it in my earlier blog post [here]({{ site.url }}/2022/11/19/cks-cheatsheet).
- I gave the 2nd practice test. Its the same set of questions as the first one but the gap of 10 days or so ensured it felt like a fresh test for me. I struggled with time again. I got around 60% this time...not as happy wiith the score but a LOT better than the first time. Also the practice test is supposed to be harder than the original exam. So 60% here probably translates to 75 or 80% in the actual exam.
- I focused on revising the answers to the test as also the CKS cheatsheet till I gave the actual exam.

### CKS attempt 2

- I gave the exam again at the end of the 2 week extension.
- 15 questions in 2 hrs ie around 4 questions per 30 min. I went in with full confidence. I skipped the big or complex questions for later and attacked the smaller ones. It was going very well. I felt I knew the answers to every question ! Later on, I had 35 minutes remaining with 5 questions to go. 
- I attempted a big question worth of 11%. I was about to hit "enter" on the final part of the answer ...and then disaster struck. The CLI stopped working. But the camera remained active as I could see myself in the video part of the UI. I tried to ping the supervisor and motioned to the camera but to no avail. The UI wasnt responding. I waited for 5 minutes but nothing changed. I couldn't even restart the app as everything on my screen had frozen. I called the US number. After a wait of 5 min, I got through to a person. He patiently heard me out and asked me follow up questions (exam code, my device type, my name etc). He said that the error logs indicate a network lag due to which the exam got stuck. But he couldn't say why the UI wasnt responsive enough to indicate the same. He asked me to restart the application. Suddenly the app became alive again and I could see things working again. The timer showed me that I had 8 min left.
- I asked for a re-take as I had a similar experience during a cloud certification a year ago. He said he will look into it and got me transferred to another executive after providing me the ticket number. After a wait of 10 min, the lady said that I would have to make this request to the LinuxFoundation organisation.
- Felt quite dejected. I didnt have much hope this time. It looked like I would have to shell out the fees again for a retake. As a final move, I created [a support ticket](https://jira.linuxfoundation.org/plugins/servlet/desk/portal/15){:target="_blank" rel="nofollow"} with LinuxFoundation explaning the situation and providing them the support ticket number from my earlier conversation.
- The exam results came out in 23 hours. I had got 62% out of the 75% questions or so I had attempted. There were chances that I could have reached the 67% cutoff if I had used the 8 min remaining time...but no guarantees. So some regret here.
- There was no response for 2 days. However on the 3rd day, I got a response...they had decided to provide me a one time exception to retake the CKS exam again within the next 1 month !!! I was overjoyed ! Finally a positive twist in the tale !

### CKS attempt 3

- I scheduled the exam afer a duration of one week. Same prep as last time. It was tiring to go through the same content again but had to do it. With my employer's support, I upgraded my laptop to a Mac Pro M1 this time. 14" screen but very fast.
- This time it was 16 questions in 2 hours ie 4 questions per 30 min. I attacked the questions swiftly again. I made a mistake on one complex question by modifying the main config file without keeping a backup. Left it for later.
- At the end of 90 min, I had solved 14 questions. 2 more to go. Solved 1 of them fast leaving me with 20 min to solve the complex question which I had left. It was worth 6%. Didnt go well. The exam ended. So I had attempted around 94% really well. I was confident of the outcome this time.
- At the end of the 23 hour mark, I got the result. I had got **83%** !!!
- It was a pain to study repeatedly but the outcome made it worth. I never had to struggle for an exam so much but it was a good reminder that you can only control your actions but you cannot control results in life.

## Tips for the exam

- Attempt some time-consuming topics only at the end so that they dont slow you down earlier in the exam. Some of them can be:
  - Falco
  - K8s upgrade.
- Double click on any cli output var name to get whole spaced value instead of dragging mouse to copy a name.
- Use `--now` to delete a pod as it will save a lot of seconds of waiting time.
- Be comfortable using Firefox as you need to use this for searching in the documentation.
- Be comfortable with the Kubernetes.io documentation as also that of 3rd party tools.
- Take a backup of the file before modifying the config file (Eg: Kube API Server yaml).

It feels good to complete the triad of k8s certs. Feels like the end of a memorable journey. I loved the syllabus of CKS. Lots of variety. CKA syllabus felt like a mere addon to CKAD but CKS stood on its own. Plenty of tools here which I will be integrating to processes and pipelines in my line of work.

I wish you the best of luck if you plan on giving this exam :thumbsup:.
<br/>Feel free to share your experiences. Every bit of knowledge helps :blush:.
