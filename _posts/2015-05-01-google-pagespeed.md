---
layout: post
title: Looking at Google PageSpeed 
category: software
tags: [performance,server]
---

## Why was I interested in PageSpeed
- I wanted an easy way to optimize my website - namely js & css minification & combining, keeping track of modifications on those files & cachremoval with it, increasing page load time etc.
- I had heard some good things about Google Pagespeed & I set out to explore it.

## About Google PageSpeed
- Introduced by Google at its Google I/O conference back in 2010.
- Set of Tools to Analyze and optimize your website :
    1. **Pagespeed Service**
        - Currently looks to be defunct since Google is not accepting new signups.
        - Google optimizes your web site and serves it from Google infrastructure for maximum performance
        - Expected to have a price in the future (if it goes live)
    2. **Pagespeed Insight API**
        - Gives a PageSpeed score to the provided url + suggestions to improve
        - URL : <https://developers.google.com/speed/pagespeed/insights/>
        - Rules for grading your page : <https://developers.google.com/speed/docs/insights/rules>
    3. **Pagespeed Module**
        - Open source module which runs on an Apache or Nginx server to automatically rewrite and optimize resources.

In this blog, I will primarily concentrate on the Pagespeed module since its the true heart of the Google Pagespeed tool set.

## Pagespeed Module
    
- **Release Activity**
    - First internal version came out in Nov 2010
    - Latest version in Jan, 2015
    - Very active releases with atleast one every 3-5 months
    
- **Entire set of features**
    - Optimize Catching
        - [Canonicalize JavaScript Libraries](https://developers.google.com/speed/pagespeed/module/filter-canonicalize-js)
        - [Extend Cache](https://developers.google.com/speed/pagespeed/module/filter-cache-extend)
        - [Extend Cache PDFs](https://developers.google.com/speed/pagespeed/module/filter-cache-extend-pdfs)
        - [Local Storage Cache](https://developers.google.com/speed/pagespeed/module/filter-local-storage-cache)
        - [Outline CSS](https://developers.google.com/speed/pagespeed/module/filter-css-outline)
        - [Outline JavaScript](https://developers.google.com/speed/pagespeed/module/filter-js-outline)
    - Minimize Round Trip Times
        - [Combine CSS](https://developers.google.com/speed/pagespeed/module/filter-css-combine)
        - [Flatten CSS @imports](https://developers.google.com/speed/pagespeed/module/filter-flatten-css-imports)
        - [Inline CSS](https://developers.google.com/speed/pagespeed/module/filter-css-inline)
        - [Inline Google Fonts API CSS](https://developers.google.com/speed/pagespeed/module/filter-css-inline-google-fonts)
        - [Combine JavaScript](https://developers.google.com/speed/pagespeed/module/filter-js-combine)
        - [Inline JavaScript](https://developers.google.com/speed/pagespeed/module/filter-js-inline)
        - [Move CSS Above Scripts](https://developers.google.com/speed/pagespeed/module/filter-css-above-scripts)
        - [Configuration file directive to shard domains](https://developers.google.com/speed/pagespeed/module/domains#shard)
        - [Sprite Images](https://developers.google.com/speed/pagespeed/module/filter-image-sprite)
        - [Pre-Resolve DNS](https://developers.google.com/speed/pagespeed/module/filter-insert-dns-prefetch)
    - Minimize Request Overhead
        - [Rewrite Domains](https://developers.google.com/speed/pagespeed/module/filter-domain-rewrite)
        - [Configuration file directive to map domains](https://developers.google.com/speed/pagespeed/module/domains#mapping_rewrite)
    - Minimize Payload Size
        - [Collapse Whitespace](https://developers.google.com/speed/pagespeed/module/filter-whitespace-collapse)
        - [Combine Heads](https://developers.google.com/speed/pagespeed/module/filter-head-combine)
        - [Elide Attributes](https://developers.google.com/speed/pagespeed/module/filter-attribute-elide)
        - [Minify JavaScript](https://developers.google.com/speed/pagespeed/module/filter-js-minify)
        - [Optimize Images](https://developers.google.com/speed/pagespeed/module/filter-image-optimize)
        - [Prioritize Critical CSS](https://developers.google.com/speed/pagespeed/module/filter-prioritize-critical-css)
        - [Deduplicate Inlined Images](https://developers.google.com/speed/pagespeed/module/filter-dedup-inlined-images)
        - [Remove Comments](https://developers.google.com/speed/pagespeed/module/filter-comment-remove)
        - [Remove Quotes](https://developers.google.com/speed/pagespeed/module/filter-quote-remove)
        - [Rewrite CSS](https://developers.google.com/speed/pagespeed/module/filter-css-rewrite)
        - [Rewrite Style Attributes](https://developers.google.com/speed/pagespeed/module/filter-rewrite-style-attributes)
        - [Trim URLs](https://developers.google.com/speed/pagespeed/module/filter-trim-urls)
    - Optimize Browser Rendering
        - [Convert Meta Tags](https://developers.google.com/speed/pagespeed/module/filter-convert-meta-tags)
        - [Defer Javascript](https://developers.google.com/speed/pagespeed/module/filter-js-defer)
        - [Inline Preview Images](https://developers.google.com/speed/pagespeed/module/filter-inline-preview-images)
        - [Lazily Load Images](https://developers.google.com/speed/pagespeed/module/filter-lazyload-images)
        - [Move CSS to Head](https://developers.google.com/speed/pagespeed/module/filter-css-to-head)
        - [Optimize Images](https://developers.google.com/speed/pagespeed/module/filter-image-optimize)
        - [Convert JPEG to Progressive](https://developers.google.com/speed/pagespeed/module/filter-image-optimize#progressive)
        - [Rewrite Style Attributes](https://developers.google.com/speed/pagespeed/module/filter-rewrite-style-attributes)
    - Other
        - [Add Head](https://developers.google.com/speed/pagespeed/module/filter-head-add)
        - [Add Instrumentation](https://developers.google.com/speed/pagespeed/module/filter-instrumentation-add)
        - [Include JavaScript Source Maps](https://developers.google.com/speed/pagespeed/module/filter-source-maps-include)
        - [Inline @import to Link](https://developers.google.com/speed/pagespeed/module/filter-css-inline-import)
        - [Insert Google Analytics Snippet](https://developers.google.com/speed/pagespeed/module/filter-insert-ga)
        - [Make Google Analytics Async](https://developers.google.com/speed/pagespeed/module/filter-make-google-analytics-async)
        - [Pedantic](https://developers.google.com/speed/pagespeed/module/filter-pedantic)
        
- **Configuration & Filter Customization**
    - PageSpeed offers three "levels" (or modes)  to simplify configuration :
        - **CoreFilters**
            -   Contains filters that the PageSpeed team believes are safe for most web sites : 
                - add_head
                - combine_css
                - combine_javascript
                - convert_meta_tags
                - extend_cache
                - fallback_rewrite_css_urls
                - flatten_css_imports
                - inline_css
                - inline_import_to_link
                - inline_javascript
                - rewrite_css
                - rewrite_images
                - rewrite_javascript
                - rewrite_style_attributes_with_url
        - **OptimizeForBandwidth**
            - Every filter has some degree of risk involved with its usage. The risk of breaking some site's functionality is possible especially in cases where coding standards are not followed & for the filters which rewrite html.
            - Degree of risk is given at the end of each filter description - check Google's excellent documentation on Pagespeed.
            - In this mode, PageSpeed does not alter HTML at all. It compresses and transcodes images in place, and minifies JavaScript and CSS.
        - **PassThrough** 
            - In this mode, you will have to enable specific filters as you see fit for your website.
    - **Selection of best filters**
        - Google provides the [Run Experiment](https://developers.google.com/speed/pagespeed/module/module-run-experiment) which can be configured. 
        - Once the results of the experiments over the past 24 hours are ready, the report (in Google Analytics) can be used to determine which filters are best for your website.
- **Installation**    
    - <https://developers.google.com/speed/pagespeed/module/download>
    - If nginx is your web server, then you will have to build it from source to integrate Pagespeed with it. Here is how I did it : <https://docs.google.com/document/d/19I7RRQqeD0xgoC8IGudnhL2R8yZF3ZNZHc5tIQMEptw/edit?usp=sharing>
    - Here is the basic setup I used :
        
    ```bash
    ########################## 
    # nginx.conf : Google Pagespeed Settings 
    ###########################

     # Enable PageSpeed (can do in vhost file too)
     pagespeed on;
                                                                                                                                                                                                                                                         
     # Needs to exist and be writable by nginx.  Use tmpfs for best performance.                     
     pagespeed FileCachePath /var/ngx_pagespeed_cache;                                               
                                                                                                         
     # Filter Config                                                                                 
     pagespeed RewriteLevel PassThrough;                                                                                                                                                                  
     
     # Enable specific filters                                                                       
     pagespeed EnableFilters lazyload_images;                                                        
     pagespeed EnableFilters combine_css;                                                            
     pagespeed EnableFilters rewrite_css;                                                            
     pagespeed EnableFilters rewrite_javascript_external;                                            
     pagespeed EnableFilters combine_javascript;                                                     
     pagespeed EnableFilters remove_comments;                                                        
                                                                                                                        
     # Additional Config                                                                             
     pagespeed MaxCombinedJsBytes 500000;                                                            
     pagespeed LazyloadImagesAfterOnload on;                                                        
     pagespeed PreserveUrlRelativity on;                                                             
     pagespeed XHeaderValue "Powered By PageSpeed :)"; 
     
     # Admin Config
     # Access Admin console : http://yourwebsite/pagespeed_admin/console
     pagespeed MessageBufferSize 100000;
     pagespeed StatisticsPath /ngx_pagespeed_statistics;                                             
     pagespeed GlobalStatisticsPath /ngx_pagespeed_global_statistics;                                
     pagespeed MessagesPath /ngx_pagespeed_message;                                                  
     pagespeed ConsolePath /pagespeed_console;                                                       
     pagespeed AdminPath /pagespeed_admin;                                                           
     pagespeed GlobalAdminPath /pagespeed_global_admin;
   
    ```
   
    ```bash
    
    ########################## 
    # vhost conf : Google Pagespeed Settings  
    ##########################

    # Enable PageSpeed
    pagespeed on;
    
    # Support for https & self signed cert
    pagespeed FetchHttps enable,allow_self_signed;

    # Admin access rules    
    location /ngx_pagespeed_statistics { allow all; }
    location /ngx_pagespeed_global_statistics { allow all; }
    location /ngx_pagespeed_message { allow all; }
    location /pagespeed_console { allow all; }
    location ~ ^/pagespeed_admin { allow all; }
    location ~ ^/pagespeed_global_admin { allow all; }
    
    # Ensure requests for pagespeed optimized resources go to the pagespeed handler
    # and no extraneous headers get set.
    location ~ "\.pagespeed\.([a-z]\.)?[a-z]{2}\.[^.]{10}\.[^.]+" {
        add_header "" "";
    }
    location ~ "^/pagespeed_static/" { }
    location ~ "^/ngx_pagespeed_beacon$" { }
    ``` 


## Recommendation
- I configured my pagespeed setup since I knew which settings would work best for my website.
- PageSpeed brings together several capabilities like lazy loading images, image sprites, extend cache life, remove render blocking js, combine & minify js/css, move inline js/css to external files etc which are usually achievable via various plugin & adding extra code
- The performance increase was pretty good - it reduced pageload time by 1-2 sec.
- However I was able to achieve the same by optimizing the code myself - in a lot of places !
- So I think Google Pagespeed is extremely useful for websites where you cannot optimize the code yourself due to lack of full knowledge on the possible impacts (eg : legacy sites).
 

## References 
- <https://developers.google.com/speed/pagespeed/module/filters>
