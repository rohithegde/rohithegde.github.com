---
layout: post
title: The Vim Editor
#category: editor
tags: [shell, vim]
---

A long time back, I had conducted an interview in which I had asked "What tool do you use to edit PHP files ?". 
The candidate had replied "vim".
I was impressed with his answer.
However at that point in time, I didn't know how powerful vim actually could be. This research is dedicated to vim. 

## About
- The Vim editor started as "Vi IMitation" on the Amiga family of computers in 1988, but was later relabeled "Vi IMproved"
- Since its first release for Unix systems in 1992, Vim has effectively eclipsed the original Vi, having won several awards and has been referred to as one of the most popular text editors.

## Basics : Modes

![Vim Modes]({{ site.baseurl }}/assets/images/vim_modes.png "Vim Modes")

## Basics : Commands
- Mode Switching :
    - Esc
    - i
- Search :
    - / & ? & \c
    - n - Search as per cmd order
    - N - Seach Backward as per cmd order
- Search & Replace :
    - %s/old/new/gc
- Delete
    - d


## Some Popular Plugins
- <b>Plugin Manager</b>
    - Plugin managers have evolved as : Pathogen -> [Vundle](http://gmarik.info/blog/2014/02/04/why-i-stopped-contributing-to-vundle){:target="_blank" rel="nofollow"} -> NeoBundle
    - The plugin managers listed above are all active & have legions of followers. For my part - I adopted the one which I found to be most active : Neobundle.    
    - Not necessary to install it but makes things easier to manage.
    - Creates the directory ~/.vim/bundle, with a separate subdirectory for all the files of each extension. This structure allows users to easily and thoroughly delete extensions, either manually or via a file manager, and helps minimize potential conflicts when you have a couple of dozen extensions.
    - Installation : 
        - Follow steps here : <https://github.com/Shougo/neobundle.vim>{:target="_blank" rel="nofollow"}

- <b>Themes</b>
    - Gives themes to the Vim Editer & makes it more easy on the eye
    - Installation via NeoBundle : 

    ```bash
    /* save below line in .vimrc file */
    NeoBundle 'bling/vim-airline'
    /* Enter vim via the shell */
    vim 
    /* Install desired bundles*/
    :NeoBundleInstall
    ```

    - Install [powerline-fonts](https://github.com/Lokaltog/powerline-fonts){:target="_blank" rel="nofollow"} repository
    - For more details : <https://github.com/bling/vim-airline>{:target="_blank" rel="nofollow"}

- <b>Syntastic</b>
    - Syntax Checking after saving the file via the Vim Editor
    - Installation via NeoBundle :
     
    ```bash  
    /* save below line in .vimrc file*/  
    NeoBundle 'scrooloose/syntastic'
    /* Enter vim via shell */
    vim
    /* Install desired bundles */
    :NeoBundleInstall
    ```
    
    - For more details : <https://github.com/scrooloose/syntastic>{:target="_blank" rel="nofollow"}

- <b>Fugitive</b>
    - Ability to execute git commands on the file via the Vim Editor
    - Installation via NeoBundle : 
    
    ```bash
    /* save below line in .vimrc file*/
    NeoBundle 'tpope/vim-fugitive'
    /* Enter vim via shell */
    vim
    /* Install desired bundles */
    :NeoBundleInstall
    ```
    - For more details : <https://github.com/tpope/vim-fugitive>{:target="_blank" rel="nofollow"}
    
- <b>Nerd Tree</b>
    - Allows parallel browsing of folders from inside the Vim Editor
    - Installation via NeoBundle : 
    
    ```bash
    /* save below line in .vimrc file*/
    NeoBundle 'scrooloose/nerdtree'
    /* Enter vim via shell */
    vim
    /* Install desired bundles */
    :NeoBundleInstall
    ```
    
    - For more details : <https://github.com/scrooloose/nerdtree>{:target="_blank" rel="nofollow"}


## References 
- Learn Vim : 
    - Interactive Tutorial
<http://blog.interlinked.org/tutorials/vim_tutorial.html>{:target="_blank" rel="nofollow"}
    - <http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html>{:target="_blank" rel="nofollow"}
    - Tips & Shortkeys : <http://nvie.com/posts/how-i-boosted-my-vim/>{:target="_blank" rel="nofollow"}
    - <http://stevelosh.com/blog/2010/09/coming-home-to-vim/>{:target="_blank" rel="nofollow"}
- Plugins :
    - Installing Plugins manually : <http://superuser.com/questions/404686/installing-plugins-in-vim>{:target="_blank" rel="nofollow"}
    - Themes : 
        - Fly with vim airline - A Coding Monkey's Blog <http://www.banquise.org/software/bye-bye-vim-powerline-hello-airline/>{:target="_blank" rel="nofollow"}
    - Syntax Checking : 
        - <http://thechefprogrammer.blogspot.in/2014/05/syntax-check-for-php-and-javascript.html>{:target="_blank" rel="nofollow"}
        - <http://michaelthessel.com/syntastic-syntax-checker-for-vim/>{:target="_blank" rel="nofollow"}
        - <http://powerman.name/download/vim/latest.vim/bundle/syntastic/doc/syntastic.txt>{:target="_blank" rel="nofollow"}
        - Git : 
            - <https://github.com/tpope/vim-fugitive>{:target="_blank" rel="nofollow"}
            - <http://vimcasts.org/episodes/fugitive-vim---a-complement-to-command-line-git/>{:target="_blank" rel="nofollow"}
        - Popular Plugins Listing : 
            - <http://spf13.com/post/the-15-best-vim-plugins>{:target="_blank" rel="nofollow"}
            - <http://www.vim.org/scripts/script_search_results.php?order_by=rating>{:target="_blank" rel="nofollow"}

