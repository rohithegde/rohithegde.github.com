---
layout: post
title: Creating your Github blog from scratch
#category: general
tags: [github, jekyll, comment, analytics, search, google]
comments: true
---

## Background story
- In this post, I create my github blog from scratch using [Jekkyl](https://jekyllrb.com/docs/quickstart/){:target="_blank" rel="nofollow"}. I prefer this approach compared to my [earlier post]({{ site.url }}/2015/03/14/creating-your-github-blog) in which I had created my github blog from [Jekkyl Now](https://github.com/barryclark/jekyll-now){:target="_blank" rel="nofollow"}.
- I wanted my blog on Github since it gives me the most flexibility of modifying my blog format without the need to host the code on my own server.

## Basic setup
- Ensure [Ruby](https://www.ruby-lang.org/en/downloads/){:target="_blank" rel="nofollow"} & [Gems](https://rubygems.org/pages/download){:target="_blank" rel="nofollow"} are installed on your system.
- Follow the basic blog setup instructions on [Github Pages](https://pages.github.com/){:target="_blank" rel="nofollow"} & then use [Jekyll](https://jekyllrb.com/docs/quickstart/){:target="_blank" rel="nofollow"} for local setup & customizations.

## Jekyll blog know-how
- A normal blog like Wordpress requires a database from which the code base extracts the data to be shown
- Jekkyl is a open source static site generator written in Ruby by Github's founder. Jekyll takes content, renders Markdown or Textile and Liquid templates, and produces a complete, static website ready to be served without using databases. 
- Understand the [Jekyll directory structure](https://jekyllrb.com/docs/structure/){:target="_blank" rel="nofollow"} so that you can customize your blog further.
- Don't ever modify the contents of _site folder since it is regenerated with every build.
- All posts go inside the _posts folder in the convention of year-month-day-name (eg : 2015-08-17-vim-editor.md).
- All other links which need to be accessible from the main page, can be placed either in the root directory (Eg : [the index file ie index.md](https://github.com/rohithegde/rohithegde.github.com/blob/master/index.md){:target="_blank" rel="nofollow"}) or in a custom folder of your choice. It can contain the markdown code as also html code OR it can contain just the layout which is a html file in the _layouts folder.
- Global variables can be set in the [_config.yml](https://github.com/rohithegde/rohithegde.github.com/blob/master/_config.yml){:target="_blank" rel="nofollow"} file & can be accessed using the site variable. Eg :
    ```ruby
    {% raw %}
    {{ site.url }}
    {% endraw %}
    ```
- All pages can have their own custom layout. In my case, the [the home page ie index.md](https://github.com/rohithegde/rohithegde.github.com/blob/master/index.md){:target="_blank" rel="nofollow"} has the layout as 'home' while the [home layout](https://github.com/rohithegde/rohithegde.github.com/blob/master/_layouts/home.html){:target="_blank" rel="nofollow"} itself has the [the default layout](https://github.com/rohithegde/rohithegde.github.com/blob/master/_layouts/default.html){:target="_blank" rel="nofollow"}. This ensures that each page has its own formatting along with some common format (ie header, footer etc).

## Adding features
- Since the Github pages runs the gems in safe mode, only [certain whitelisted plugins](https://pages.github.com/versions/){:target="_blank" rel="nofollow"} are allowed. Visiting the github page of each plugin provides you instructions needed to use them.
- In case you want to add in your own [custom plugins](https://jekyllrb.com/docs/plugins/#available-plugins){:target="_blank" rel="nofollow"}, you can tweak the simple workflow into a slightly complex one using either [your own deployment mechanism](https://www.drinkingcaffeine.com/deploying-jekyll-to-github-pages-without-using-githubs-jekyll/){:target="_blank" rel="nofollow"} OR [seperating the generated static pages from the jekyll code](http://charliepark.org/jekyll-with-plugins/){:target="_blank" rel="nofollow"}. 
- I chose to follow the simple default workflow since my requirements were fulfilled with the whitelisted plugins as also some  custom code I added to support additional features.
- The features I wanted : 
    - User Comments
    - Tags
    - Social media sharing
    - Analytics
    - Search
    - Estimated reading time for each post
    - Github forking ribbon

### User Comments
- The github way to have user comments would be to create a ticket/issue where user can add comments & then link it to the post. But this would take the user away from the post & it looks to be a round-about way.
- I decided to use **Disqus** to support user comments since it was simple to setup though it is a bit heavy (too many requests). Setup steps :
    - [Register your site with Disqus](https://disqus.com/admin/create/){:target="_blank" rel="nofollow"} 
    - Get the [universal embed code from Disqus](https://disqus.com/admin/universalcode/){:target="_blank" rel="nofollow"} & add it to a new file [_includes/disqus.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_includes/disqus.html){:target="_blank" rel="nofollow"}.
    - The page.comments variable is used above to give you the ability to enable/disable comments in each post. You will have to set the comments variable at the top of each post (ie Jekyll Front matter) for this to work. Eg :
        ```ruby
        {% raw %}                
        ---
        layout: post
        title: Some Title
        tags: [tag1, tag2]
        comments: true
        ---
        {% endraw %}
        ```
    - Include disqus.html at the end of your posts.html with 
        ```ruby
        {% raw %}
            {% include disqus.html %}
        {% endraw %}
        ```
        
### Tags
- It is extremely easy to setup tags using custom plugins. However, no such plugin has been whitelisted for Github pages. So we have to add some custom code to support this feature.
- Add tags to the front matter yaml (as given in eg given above)
- Add code to show the tags for each post in [_layouts/post.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_layouts/post.html){:target="_blank" rel="nofollow"} 
    ```ruby
        {% raw %}
        Tags : {% for tag in page.tags %}
              <a href="{{ site.url }}#{{ tag | slugify: 'pretty' }}">{{ tag }}</a>
        {% endfor %}
        {% endraw %}
    ```
- Now we need to have a page which lists the posts for each tag. Most tutorials out there suggest using site.tags & then having a page with all tags listed with their respective posts below them. They are then linked with anchors so that the hash in the url can link to them. However, I went for a slightly different approach which builds on this idea.
- I liked the home page of another github blog [perfectionkills.com](http://perfectionkills.com/){:target="_blank" rel="nofollow"}. It had clickable tags which depended on javascript to show specific posts on the same home page. I decided to extend this approach so that this could be re-used for tags in any post.
- You can try clicking on the tag at the top of this page & see how it works.
- You can view the code for the [home page](https://github.com/rohithegde/rohithegde.github.com/blob/master/_layouts/home.html#L10-L27){:target="_blank" rel="nofollow"} & the [js code](https://github.com/rohithegde/rohithegde.github.com/blob/master/assets/js/main.js#L1-L58){:target="_blank" rel="nofollow"} to understand it better.

### Social media sharing
- Instead of relying on sites like addthis, I decided to go with the traditional way of copying the share buttons from each popular social media & using them here.
- You can view the code snippet for [_includes/social_media_share.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_includes/social_media_share.html){:target="_blank" rel="nofollow"} to get the whole list.
- Including this file at the end of [_layouts/post.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_layouts/post.html#L31){:target="_blank" rel="nofollow"} will ensure your audience will be able to share your post.
    ```ruby
    {% raw %}
    {% include social_media_share.html %}
    {% endraw %}
    ```

### Analytics
- [Google Analytics](https://analytics.google.com){:target="_blank" rel="nofollow"} is the best way to track the popularity & stats around your blog.
- Get your Universal Analytics tracking code at its website at : Admin > Property > Tracking Info > Tracking Code
- Set the variable google_analytics in [_config.yml](https://github.com/rohithegde/rohithegde.github.com/blob/master/_config.yml#L37){:target="_blank" rel="nofollow"} to your Google analytics id : 
    ```yaml
    google_analytics: UA-1234567-8
    ```
- Create the new file [_includes/analytics.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_includes/analytics.html){:target="_blank" rel="nofollow"}
- Include the file at the end of the HEAD section of [_layouts/default.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_layouts/default.html#L13){:target="_blank" rel="nofollow"} as :
    ```ruby
    {% raw %}
    {% include analytics.html %}
    {% endraw %}
    ```

### Search
- I used [Google custom search](http://www.google.com/cse/){:target="_blank" rel="nofollow"} to enable search for my blog. It is very easy to setup. You can also easily configure it so that the results are seen in an overlay OR on google search itself OR next to your search box OR even in another page (I chose this option).
- Since I only wanted the search results code, I added the custom Google code to [_layouts/search.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_layouts/search.html){:target="_blank" rel="nofollow"}.
- I added a search box to the [_includes/header.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_includes/header.html#L21){:target="_blank" rel="nofollow"} :
    ```
    <input type="text" id="search" placeholder="search" class="search-text-box" onkeypress="return processSearchInput(event)">
    ```
- I then created [assets/js/main.js](https://github.com/rohithegde/rohithegde.github.com/blob/master/assets/js/main.js#L61-L66){:target="_blank" rel="nofollow"} with custom javascript code to redirect the user to the results page with the search term typed : 
    ```javascript
    function processSearchInput(e) {
        let search = document.getElementById('search');
        if (search.value && 13 == e.keyCode) {
            window.location = "/search?q=" + search.value;
        }
    }
    ```
- You can checkout my search page by typing into the search box at the top right corner of this page & hitting enter.
- The other alternative is to do a purely frontend search solution using [jQuery, Lunr.js & Jekyll](https://medium.com/@kurtiskemple/setting-up-client-side-search-for-a-jekyll-github-pages-site-with-lunr-and-backbone-d644541d7260){:target="_blank" rel="nofollow"}.

### Estimated reading time
- Using Jekyll, we can write a simple html file which we can include in our site for calculating reading time based on the word count.
- I created a [_includes/read_time.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_includes/read_time.html){:target="_blank" rel="nofollow"}  :
    ```ruby
    {% raw %}
    <span class="reading-time" title="Estimated read time">
    {% assign words = page.content | number_of_words %}
    {% if words < 200 %}
        1 min
    {% else %}
        {{ words | divided_by:200 }} mins
    {% endif %}
    </span>
    {% endraw %}
    ```
- I included the file at the required place in my [home page](https://github.com/rohithegde/rohithegde.github.com/blob/master/_layouts/home.html#L29){:target="_blank" rel="nofollow"} to get the reading time :
    ```ruby
    {% raw %}
    {% include read_time.html %}
    {% endraw %}
    ```
### Github forking ribbon
- I got the suitable code from [Github Ribbons](https://github.com/blog/273-github-ribbons){:target="_blank" rel="nofollow"} & pasted it into [_includes/header.html](https://github.com/rohithegde/rohithegde.github.com/blob/master/_includes/header.html#L23){:target="_blank" rel="nofollow"} :
    ```ruby
    {% raw %}
    <a href="https://github.com/{{ site.github_username}}"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/121cd7cbdc3e4855075ea8b558508b91ac463ac2/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png"></a>
    {% endraw %}
    ```
- I set the github_username variable in [_config.yml](https://github.com/rohithegde/rohithegde.github.com/blob/master/_config.yml#L23){:target="_blank" rel="nofollow"} : 
    ```yaml
    github_username:  rohithegde
    ```

### Other configurations
- [_config.yml](https://github.com/rohithegde/rohithegde.github.com/blob/master/_config.yml#L23){:target="_blank" rel="nofollow"} needs to have some variables set to take advantage of certain features :
    ```yaml
    title: Some title
    description: Some description
    url: "http://abstraction.blog"
    author: Rohit Hegde
    # an excellent upgrade to normal markdown
    markdown: kramdown 
    kramdown:
        input: GFM
        syntax_highlighter: rouge
        smart_quotes:   lsquo,rsquo,ldquo,rdquo
    # format of post url
    permalink: /:year/:month/:day/:title
    theme: jekyll-theme-cayman
    ```
- Other themes supported on Github pages : <https://pages.github.com/themes/>{:target="_blank" rel="nofollow"}

This is how I created my technical blog on Github. I really like its current simplistic look though it is replete with a lot of features. It encourages me to blog more :simple_smile:

Feel free to add your thoughts, questions, doubts, suggestions as comments below.



