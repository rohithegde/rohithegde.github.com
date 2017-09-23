---
layout: post
title: The best shell for Linux
category: environment
tags: [shell, zsh, bash]
---
 
I had done this research a few years back. Adding to the blog now.

## Objective
To compare various shells & recommend one.

## Problem Statement
I want to use a best shell on my local workstation for Linux OS

## Background Info

- In this whitepaper, we are concentrating only on Unix shells (CLI).
- For our comparison, we are not considering c-shells (csh, tcsh) since their conformity to C programming standards make them a bit different from the shells we are used to (bash).
- Additionally the csh is not favoured as much as sh (check the ref section for more)

## Solution

### Solution 1 - Zsh
Has all the features of Bash & other shells + offers numerous more.

![Zsh Auto Help]({{ site.baseurl }}/images/zsh.png "Zsh Auto Help")

#### Pros
- Provides context based command line completions (case insensitive by default)
- Very customizable
- The oh-my-zsh or prezto community framework provides various custom libraries, themes & plugins which integrate well with other applications like git, svn, ruby etc to provide the user with a lot of helpful info without the need to execute multiple commands for it.
- Sharing of command history among terminals
- Ability to search(file globbing)  without need of external programs like find
- Spell correction
- Various compatibility modes wherein zsh can pretend to be like other shells
- Active community support

#### Cons
NA

### Solution 2 - Bash (Default)
- It is the  default interactive shell for users on most Linux and Mac OS X systems.
- The auto completion part comes in built with Ubuntu now unlike earlier times where we had to install it. 

![Bash]({{ site.baseurl }}/images/bash.png "Bash")

#### Pros
- Default installation in the popular Ubuntu OS
- Trying to catch up with Zsh with new versions having some features like auto complete as default in it. 
- Some configuration frameworks like Bash-It inspired by oh-my-zsh have emerged but not as feature friendly as Zsh.
- Bash has paid more attention to standards compliancy (i.e. POSIX) for longer, and has so far avoided the more abstruse interactive features (programmable completion, etc.) that zsh has.

#### Cons
- No where near Zsh as far as features go. 
- Limited context based support.

## Comparison
- Zsh has Better completion handling
- Zsh has better spelling correction
- Zsh has right hand prompts
- Zsh has more active community support

## Recommendation
- Zsh
    - Extremely rich in functionality & useful for every developer. 
    - Unlikely for someone working with zsh to go back to bash.


## References 
- <http://en.wikipedia.org/wiki/Unix_shell>
- Top 10 reasons not to use the C Shell : <http://www.grymoire.com/unix/CshTop10.txt>
<http://zsh.sourceforge.net/FAQ/zshfaq02.html#l14>
- <http://www.interworx.com/community/alternative-shells-for-linux/>
- <http://friedcpu.wordpress.com/2007/07/24/zsh-the-last-shell-youll-ever-need/>
- <https://www.ibm.com/developerworks/community/blogs/58e72888-6340-46ac-b488-d31aa4058e9c/entry/zsh_the_new_unix_shell_everyone_s_talking_about9?lang=en>
- <https://github.com/sorin-ionescu/prezto>
- <http://stackoverflow.com/questions/43321/worth-switching-to-zsh-for-casual-use>
