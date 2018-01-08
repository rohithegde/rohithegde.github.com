---
layout: post
title: "Checklist for Onboarding Developers to a Project"
#category: general
tags: [career]
comments: true
---

## Background story
- The quest to carry out [greenfield development](https://en.wikipedia.org/wiki/Greenfield_project){:target="_blank" rel="nofollow"} - the dream of a lot of developers...especially the newcomers. I can't fault them. Most legacy applications have a bad name.
[!["Dilbert - Legacy code"](/assets/images/dilbert_legacy_dt061208.gif "Dilbert - Legacy code")](http://dilbert.com/strip/2006-12-08){:target="_blank" rel="nofollow"}
- However, the history of the application matters. Its life time, the quality of refactoring if any, the quality of the people who have worked on it, the type of management supporting it  - all play a role in its maintenability.
-  Working on an existing application need not be that bad. Opportunities to refactor code for optimization, performance improvement often come up in such applications leading to a lot of learning.
- But it helps to have a smooth & structured transition. I created a checklist which I use whenever I move into a project.

## Checklist
1. **Meeting with the Project manager(PM) / Scrum Master(SM) / Team Lead(TL)**
    - Inititior : PM or SM or TL.
    - A friendly introduction followed by a walkthrough of the agenda to be followed (ie the rest of the checklist !)
2. **Introduction to the team**
    - Inititior : PM or SM or TL.
    - The people working on an application are the most important part of it. Hence this meeting is high up on this list.
    - A friendly introduction to everyone in the team with a summary of their roles.
3. **Application walkthrough**
    - Inititior : Product Owner(PO) or PM or SM or TL
    - The SM or the TL can give a summary about the why & what part - ie the need of this application & what it does.
    - It would be great if the Product Owner is present to explain the impact on the business.
4. **Architecture walkthrough**
    - Inititior : The TL or Architect or a Senior Developer
    - Assuming it is a standard web application, the walkthrough can cover :
        - Application Architecture (eg : Microservices or Monolithic structure)
        - Supporting software (eg: Docker)
        - Web server (eg: nginx)
        - Programming language(s) (eg : Node.js)
        - Database(s) (eg: PostgreSQL)
        - Backend framework(s) (eg: Hapi.js)
        - Frontend framework(s) (eg: Angular, Bootstrap)
        - Versioning (eg : Git via Github)
        - Cloud Infrastructure (eg: AWS)
    - Based on the role of the developer (eg : frontend developer), more details can be provided on the related technology.
5. **Process walkthrough**
    - Inititior : The PM or SM or TL or a Senior Developer
    - Framework followed (Eg : SCRUM)
    - Schedule of team meetings (eg : Daily SCRUM, Planning, Sprint Demo etc)
    - Ticket resolution (eg : who picks what, initial implementation plan to be shared, definition of done etc)
    - Code repo branching strategy (eg : )
    - Testing strategy
6. **Grant Permissions**
    - Initiator : PM or SM or TL
    - Code repo access (Eg: Github)
    - Wiki access (Share Project related codes, metrics) (eg: Confluence)
    - Issue tracker (eg: JIRA)
7. **Application setup**
    - Initiator : TL or a Senior Developer
    - Usually, this should be a simple step thanks to a well configured Docker setup but it can be complex in some legacy projects. So some handholding can get things up & running fast.
8. **Self Study : Understand the application**
    - Initiator : The new member !
    - Understand the tech stack & fill gaps (if any).
    - Understand the application code base
    - Q&A round with a Senior Developer would be a good way to end this step.
9. **Pair with a developer for a story**
    - It is a good idea to pair the new member with another member of the team.
    - A story or feature which gives a good idea about the application or the type of work to be taken up by the new developer is ideal for this. 
    - The new developer also gets a taste of the whole workflow (ticket start to finish).
10. **Audit**
    - This is a step which adds a lot of value to the application. Especially if the developer has some experience & the application is a legacy application.
    - A number of good practicies, good conventions, potential performance optimizations have come out in such audits since the new developer brings a fresh perspective into the team.
    - A discussion of the points with tickets created & prioritized would be a good output for this step.

This checklist has helped me & others a lot as it brings some form of structure into the knowledge transfer.
To some extent, it also makes you organized (or atleast appear to be !).

**Feel free to suggest improvements in it !**

ps : The reality remains that most developers will be involved in [brownfield development](https://en.wikipedia.org/wiki/Brownfield_(software_development)){:target="_blank" rel="nofollow"} for most of their careers (probably a 80:20 ratio). 
Make your peace with it. 
Hence the need for all of us to have side projects :smile:

[!["Dilbert - Code mocking"](/assets/images/dilbert_code_mocking_dt130224.jpg "Dilbert - Code mocking")](http://dilbert.com/strip/2013-02-24){:target="_blank" rel="nofollow"}
