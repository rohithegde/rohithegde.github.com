---
layout: post
title: "The Prompt Resurrection - 5 personal projects reborn with GenAI"
#category: general
tags: [genai, cursor, llm, python]
comments: true
---

> "If I'm not back in five minutes, just wait longer." — Ace Ventura: Pet Detective

I am writing this blog after a break of two years due to milestones on the personal front which kept me busy.

The arrival of GenAI has lead to an unending stream of predictions for the future. From job loss to universal basic income...from SaaSpocalypse to having opensource projects overrun by agents...from getting cures for all diseases to getting wiped out by the Terminators.

Its important not to lose track of the present for an uncertain future. I chose to focus on the now and use GenAI to improve myself.

<!--

A lot has happened since then. GenAI has swept into almost every tech discussion. Every blog and social media post seems to be AI generated. Its hard to scroll LinkedIn now.
Am using the #NoAIUsed tag to indicate that I wrote this post. It took me a few hours but its worth it. A creative outlet of sorts which I am proud to truly call my own.
-->

<!-- TOC -->

- [The projects](#the-projects)
  - [Coin club](#coin-club)
  - [Care club](#care-club)
  - [Campfire club](#campfire-club)
  - [Career club](#career-club)
  - [Core club](#core-club)
- [Tech stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Architecture](#architecture)
- [Lessons learnt using GenAI for coding](#lessons-learnt-using-genai-for-coding)
- [Final thoughts](#final-thoughts)

<!-- /TOC -->

## The projects

Those who know me well often refer to me as the spreadsheet guy since I have been documenting my plans, comparing products, daily diary etc on Google spreadsheets for more than a decade. I wanted to try to consolidate some of them into my own apps which I could customise.

I originally had 2 apps in mind to organize my life a bit - a finance management app and another for a daily diary. As my idea grew to cover [Maslow's hierarchy of needs](https://en.wikipedia.org/wiki/Maslow%27s_hierarchy_of_needs){:target="\_blank" rel="nofollow"}, it became 5 apps to address different facets of life.
But I lacked the frontend skills to develop them as it was atleast a decade since i worked on the UI (AngularJS days). I found it hard to find time to learn a new framework. Working with the Cursor IDE on a React project at work gave me the confidence that I needn't hold back anymore.

I wanted to have a suite of apps. The word "Club" sounded like a good idea to keep them together. Keeping the tradition of old super hero names(Clark Kent, Bruce Banner, Peter Parker, Wonder Woman etc), I decided to follow alliteration while naming each club.

<div style="text-align: center;">
<img src="/assets/images/prompt-resurrection/club-suite.drawio.png" alt="Club suites" title="Club suite">
</div>

### Coin club

A finance management app. Some of the features it includes are:

- Recurring bills with reminders
- Transactions (independent as well as those linked to bills)
- Investment (eg: mutual funds)
- Networth
- Finance advisor (business rules and potentially GenAI agent based)
- Analytics

### Care club

A health care app focused on physical and mental well being. I really needed this after my kid started to fall sick regularly for a couple of months. Some of the features it includes are:

- Recurring medicine consumption list for reminders (similar to bills above)
- Medicines consumed (similar to transactions above)
- Historical tracking of medicines consumption(similar to transactions in Coin club)
- Daily diary for tracking my daily progress and encouraging mental wellness
- Analytics

### Campfire club

A social connections app to help keep track family and friends. I need it especially to stary connected with my large extended family. Some of the features it includes are:

- Multiple social trees (Family tree, Friends tree etc)
- Profiles for each family and friend with reminders (birth, anniversaries etc)
- Conversation tracker for each person
- Reminders to connect with specific people
- Analytics

### Career club

A career tracking app for those working as well as those searching for jobs. Some of the features it includes are:

- Career tracking of past and present jobs with goals for the future
- Certifications
- Daily work log
- "To do" list for work
- Job hunting which works with some popular sites for analysis
- Analytics

### Core club

An app which brings the previous apps together. Some of the features it includes are:

- Weather reporting
- Reminders across all apps
- Motivation quotes (random)
- (More to come)

## Tech stack

### Frontend

| Tech    | Purpose                   | Comments                                                                                        |
| ------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| Vue     | UI framework              | Went with Vue.js it extends HTML similar to my first frontend framework AngularJS unlike React. |
| Vite    | Build and dev server      |                                                                                                 |
| Pinia   | State management          |                                                                                                 |
| Vuetify | The Vue component library | Helps give the UI a beautiful polished look.                                                    |

### Backend

| Tech       | Purpose                      | Comments                                                                           |
| ---------- | ---------------------------- | ---------------------------------------------------------------------------------- |
| Python     | Backend programming language | My goto programming language.                                                      |
| FastAPI    | Web API framework            | Lightweight backend framework which I worked with in my past few projects at work. |
| Postgres   | Relational database          | The most versatile opensource relational database out there.                       |
| Podman     | Container runtime            | A drop-in replacement for Docker and Docker compose                                |
| SQLAlchemy | ORM and DB access            |                                                                                    |
| Alembic    | DB migrations                |                                                                                    |

### Architecture

Its a simple client-server architecture with each app accessing two Postgres databases:

1. A shared database to store data like user login credentials for a SSO like experience across apps.
2. A database to store app specific data like app settings, transactions etc.

I have used business rules based high level insights in some places followed by local LLM calls for providing some deep insights. Details of this to come up in app specific blog posts.

No vector database as of now since the LLM calls are considerably lightweight with no expected context issues.

<div style="text-align: center;">
<img src="/assets/images/prompt-resurrection/clubs-architecture.drawio.png" title="Archictecture">
</div>

## Lessons learnt using GenAI for coding

While I began developing the apps over weekends sometime in May 2025, it took me quite a while to get them into a state which I was happy with.
Since it was easy to create prototypes, my initial 1.0 version of Coin Club was light weight with just a frontend and a Google spreadsheet as database. It worked well initially but Google Drive API limits forced me to adopt caching techniques and the frontend started to become complex. Eventually I decided to move to a container based setup and have a standard SQL database. I thus had my 2.0 version sometime in October 2025.

Plenty of lessons learnt in this journey till now.

<div style="overflow-x: auto;">
<table>
<colgroup>
<col style="width: 10%;">
<col style="width: 65%;">
<col style="width: 25%;">
</colgroup>
<thead>
<tr>
<th>Topic</th>
<th>Details</th>
<th>Screenshots</th>
</tr>
</thead>
<tbody>
<tr>
<td>Mere prototypes</td>
<td>The initial versions worked but could never be deemed as production grade. I had to use multiple prompts to get the code refactored into an organized form (eg: Controller -> Service -> Model, all configurations in a central location etc). I didnt want to use agents.md or cursor.md files back then.</td>
<td></td>
</tr>
<tr>
<td>Code Hallucination</td>
<td>I had asked for frontend visualisation libraries to show my connections in a tree form. The LLM suggested a few options but some of them simply didnt exist.</td>
<td><a href="/assets/images/prompt-resurrection/code-hallucination.png" target="_blank" rel="noopener noreferrer"><img src="/assets/images/prompt-resurrection/code-hallucination.png" style="border: 1px solid  gray;" height="30%" width="30%"></a></td>
</tr>
<tr>
<td>Suggesting the most complex option</td>
<td>I had asked for options to integrate the different apps together. Module Federation was overkill for my scenario but I tested the LLM by asking if it would be a good option for me. The LLM was eager to please and agreed with my suggestion 😅.</td>
<td><a href="/assets/images/prompt-resurrection/module-federation.png" target="_blank" rel="noopener noreferrer"><img src="/assets/images/prompt-resurrection/module-federation.png" style="border: 1px solid  gray;" height="30%" width="30%"></a></td>
</tr>
<tr>
<td>Migration not following conventions</td>
<td>I had asked for some changes in the database table. The LLM went with direct python scripts with SQL DDL statements instead of creating ORM migration files.</td>
<td><a href="/assets/images/prompt-resurrection/migration.png" target="_blank" rel="noopener noreferrer"><img src="/assets/images/prompt-resurrection/migration.png" style="border: 1px solid  gray;" height="30%" width="30%"></a></td>
</tr>
</tbody>
</table>
</div>

## Final thoughts

The apps are not fully ready yet. Some of the dashboards and some of the analytics pages are pending. Coin club is at the highest maturity since it was the first app in this suite. Core club is barely started since it was the last one taken up. I will be creating a blog post for each app once its ready along with opensourcing the app on Github.com. Expect Coin club to be released in the next few weeks.
Its been fun to develop the apps using GenAI though I miss not having written major chunks of it. Its a bit like sliding down a slope at a high speed enjoying the breeze but missing out on the scenary. I did hit the brakes a few times to review the code but its not the same...

I miss the old days of development but can't help remembering that **change is the only thing thats constant in our line of work**.
