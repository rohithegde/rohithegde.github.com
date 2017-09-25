---
layout: post
title: Blogging on Github!
#category: general
tags: [github]
comments: true
---
 
I have wanted a technical blog for a long time now but couldn't modify my existing blogs (a non technical one + a work related one) since its a bad practise to have multiple themes for a blog as that would alienate the followers of the blog.
I could have created another blog on Blogspot or Wordpress but Github had 1 advantage which the others didnt - an implicit connection to one's code repository which is truly invaluable. 

Instead of the traditional "Hello World", I decided to have my first post as a mini **"How to setup your Github Blog"** guide :smile: .

### Background Know-how
- A normal blog like Wordpress requires a database from which the code base extracts the data to be shown
- Jekkyl is a open source static site generator written in Ruby by Github's founder. Jekyll takes content, renders Markdown or Textile and Liquid templates, and produces a complete, static website ready to be served without using databases. 

### Creating your Github Blog
- The simplest way to setup your own Github user blog would be :
    - Fork an existing github blog repo (eg : The template blog at [Jekkyl Now](https://github.com/barryclark/jekyll-now){:target="_blank" rel="nofollow"})
    - Rename the forked blog to your username.github.com
    - Customize the _config.yml file
    - **Advantages** 
        - Hassle free way to have your blog setup with necessary plugins (commenting, gravatar profile etc)  
- The other way :
    - Fork the [Jekky Bootstrap repo](https://github.com/plusjade/jekyll-bootstrap.git){:target="_blank" rel="nofollow"}
    - Rename the forked blog to your username.github.com
    - **Advantages**
        - Clean blog which you get to build from scratch
    - **Disadvantages**
        - Have to find & install all necessary plugins to support user comments, social network sharing (facebook, linkedin etc), likes/dislikes, Google Analytics, tags etc 

The blog should now be visible at your username.github.io

### Things to do ahead
- Publish your 1st post by adding an entry into the existing posts folder
- Brush up your markdown language with this [guide](http://www.jekyllnow.com/Markdown-Style-Guide/){:target="_blank" rel="nofollow"}
- Examine how beautiful your github blog can be by examining the themes templates [here](http://jekyllthemes.org/){:target="_blank" rel="nofollow"} & use them if you like them
- Start adding more plugins like [tags](http://www.minddust.com/post/tags-and-categories-on-github-pages/){:target="_blank" rel="nofollow"}
- Setup the blog in your local if needed using the section 2 of this [guide](http://jekyllbootstrap.com/usage/jekyll-quick-start.html){:target="_blank" rel="nofollow"}


### PENDING FOR ME
- Create my own blog with the best plugins & share them on github !



## References 
* <http://jekyllbootstrap.com/usage/jekyll-quick-start.html>{:target="_blank" rel="nofollow"}
* <http://www.smashingmagazine.com/2014/08/01/build-blog-jekyll-github-pages/>{:target="_blank" rel="nofollow"}
* <http://www.jekyllnow.com/Markdown-Style-Guide/>{:target="_blank" rel="nofollow"}
* <http://www.minddust.com/post/tags-and-categories-on-github-pages/>{:target="_blank" rel="nofollow"}