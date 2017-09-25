---
layout: post
title:  PHP ORM Comparison 
#category: architecture
tags: [database, ooad, orm]
---  
  
## About
- In my [previous post]({{ site.url }}/do-i-need-an-orm/), I had talked about some of the pros, cons of working with an ORM & when it can be useful.
- In this post, I take a look at some prominent PHP based ORMs & compare them. 

## Features of a Good ORM
- Community support
- Comprehensive support for various relational databases (enables easier migration)
- Auto Generation of Entity Classes
- Support for Dirty-checking
- Support for a powerful query language (SQL / HQL / DQL etc)
- Cascading actions
- Support for event triggering
- Good Documentation

## Different PHP based ORMs
- [Doctrine](http://www.doctrine-project.org/){:target="_blank" rel="nofollow"} (DataMapper pattern)
- [Propel](http://propelorm.org/){:target="_blank" rel="nofollow"} (ActiveRecord pattern)
- [Redbean](https://github.com/gabordemooij/redbean/tree/RedBeanPHP4KS){:target="_blank" rel="nofollow"} (DataMapper pattern)
- [Idiorm](https://github.com/j4mie/idiorm){:target="_blank" rel="nofollow"} (ActiveRecord pattern but oriented towards Query Language) 
- [Paris](https://github.com/j4mie/paris){:target="_blank" rel="nofollow"} (ActiveRecord pattern & dependent on Idiorm)
- [Spot ORM](https://github.com/vlucas/spot2){:target="_blank" rel="nofollow"} (DataMapper pattern built on top of Doctrine DBAL)
- [Outlet](https://github.com/fgrehm/outlet-orm){:target="_blank" rel="nofollow"} (DataMapper pattern)
- [Xyster](http://xyster.libreworks.com/){:target="_blank" rel="nofollow"} (DataMapper pattern)
- [Leap](https://github.com/spadefoot/kohana-orm-leap){:target="_blank" rel="nofollow"} (Kohana FW)
- [Eloquent](http://laravel.com/docs/5.0/eloquent){:target="_blank" rel="nofollow"} (Laravel FW)
- [MicroMVC](https://github.com/Xeoncross/micromvc){:target="_blank" rel="nofollow"}
- [Gacela](https://github.com/energylab/gacela){:target="_blank" rel="nofollow"}
- [NotORM](https://github.com/vrana/notorm){:target="_blank" rel="nofollow"}

+ some more which have fallen into the cracks of the internet now due to lack of maintenance.

## Comparison
- We can ignore most of the entries in the list above since they suffer from atleast one of the following :
    - Lack of community support (GitHub contributors list is very low)
    - Authors have stopped maintenance
    - ORM is tightly coupled with a non enterprise level PHP Framework
    - ORM depends on another ORM DBAL for its functionality
- I am keeping Idiorm & Paris out of the comparison too since they are quite lightweight compared to the others + they aren’t adding any more features now. Their notice on Github - “Please do not submit feature requests or pull requests adding new features as they will be closed without ceremony.”
- So the comparison will be between Doctrine, Propel & Redbeans.

### Initial release date
- Doctrine
    - September 1, 2008
- Propel
    - August 2003
- Redbeans
    - 2009

### Community Support
- Doctrine
    - [Github](https://github.com/doctrine/doctrine2){:target="_blank" rel="nofollow"} Stats : 389 contributors (as of 2015-05-09)
- Propel
    - [Github](https://github.com/propelorm/Propel){:target="_blank" rel="nofollow"} Stats : 96 contributors (as of 2015-05-09)
- Redbeans
    - [Github](https://github.com/gabordemooij/redbean){:target="_blank" rel="nofollow"} Stats : 31 contributors (as of 2015-05-09)
        
### Configuration file format
- Doctrine
    - PHP
    - YML
    - XML
- Propel
    - XML
    - YML
    - PHP (only for schemas)
    - JSON (only for schemas)
    - INI (only for schemas)
- Redbeans
    - NO CONFIG ! 
 
### Generation of Classes from database tables
- Doctrine
    - Entity classes are generated via command line
- Propel
    - XML Schema generated via command line which leads to around 7 PHP model classes
- Redbeans
    - Beans created automatically during code execution

    
### Generation of database tables from Classes
- Doctrine
    - Tables are generated via command line
- Propel
    - Tables are generated via command line
- Redbeans
    - Tables created automatically during code execution    

### Support for Dirty-checking
- Doctrine
    - Yes
- Propel
    - Yes
- Redbeans
    - No
    
### Support for query language for complex operations
- Doctrine
    - Yes (SQL, DQL)
- Propel
    - Yes (SQL in object form)
- Redbeans
    - Yes (SQL)
    
### Cascading actions
- Doctrine
    - Yes
- Propel
    - Yes
- Redbeans
    - Yes
    
### Support for event triggering
- Doctrine
    - Yes
- Propel
    - Yes
- Redbeans
    - Yes

### Good Documentation
- Doctrine
    - Comprehensive
- Propel
    - Yes
- Redbeans
    - User friendly & concise


### Comprehensive support for various relational databases
- Doctrine
    - MySQL
    - Postgres
    - SQLite
    - Oracle
    - MSSQL
    - IBM DB2 
    - Interfaces to extend support to other databases
- Propel
    - MySQL
    - Postgres
    - SQLite
    - Oracle
    - MSSQL
- Redbeans
    - MySQL
    - Postgres
    - SQLite
                  
### Code Examples
- Doctrine

    ```php
    
    $author = new Author();
    $author->setFirstName("Leo");
    $author->setLastName("Tolstoy");
    // no need to save the author yet
    
    $book = new Book();
    $book->setTitle("War & Peace");
    $book->setIsbn("0140444173");
    $book->setAuthor($author);
    
    $entityManager()->persist($book);
    $entityManager()->flush();
    // saves both objects!

    ```
- Propel

    ```php
    
    $author = new Author();
    $author->setFirstName("Leo");
    $author->setLastName("Tolstoy");
    // no need to save the author yet

    $book = new Book();
    $book->setTitle("War & Peace");
    $book->setIsbn("0140444173");
    $book->setAuthor($author);
    $book->save(); 
    // saves both objects

    ```    
- Redbeans

    ```php
    
    R::setup();
    $movie = R::dispense('movie');
    $movie->title = 'Beans in space';
    $character = R::dispense('character');
    $character->name = 'hero';
    $movie->ownActorList[] = $character;
    $id = R::store($movie);
    // stores both objects

    ``` 

### Pros
- Doctrine
    - Since it is adapted from Hibernate, it supports various functionalities & scenarios
- Propel
    - XML config which is easy to read
    - Recommendation of where to place business logic
    - IDE friendly
    - Easier migration
    - Core library supports a lot of features.
    - Fast
- Redbeans
    - Ease of use with zero config

### Cons
- Doctrine
    - Documentation is limited to database activity & its upto the user to decide where to place business logic
    - Requires extensions for using out of the box functionality like soft delete
    - Requires opcode cache layer to be somewhat fast
    - Higher learning curve

- Propel
    - Requires an extra build step
    - ActiveRecord pattern (sometimes called an anti pattern)

- Redbeans
    - Limitations in abilities compared to Doctrine
    - For existing database, the schema has to be as per RedBeans conventions
    - Enterprise level usage cases are less


## Recommendation
- Your choice of an ORM should be based on which design pattern suits your application.
- Doctrine follows Datamapper pattern while Propel follows an Active Record design pattern.
- Both are well supported in enterprise level frameworks like Symfony
- I would prefer using Redbeans on my personal side projects since its pretty neat to work with. But I would definitely hesitate to use it with a client's project. 

## References & study material links
- <http://stackoverflow.com/questions/2062473/php-orms-doctrine-vs-propel>{:target="_blank" rel="nofollow"}
- <http://programmers.stackexchange.com/questions/48760/should-i-choose-doctrine-2-or-propel-1-5-1-6-and-why>{:target="_blank" rel="nofollow"}
- <http://www.vertabelo.com/blog/technical-articles/side-by-side-doctrine2-and-propel-2-comparison>{:target="_blank" rel="nofollow"}
- Cheatsheets :
    - Doctrine Cheatsheet
        - <http://www.cheat-sheets.org/saved-copy/Doctrine-Cheat-Sheet-1.1.pdf>{:target="_blank" rel="nofollow"}
    - Propel Cheatsheet 
        - <http://www.cheat-sheets.org/saved-copy/sfmodelfirstpartrefcard.pdf>{:target="_blank" rel="nofollow"} 
        - <http://ormcheatsheet.com/propel/>{:target="_blank" rel="nofollow"}
    - Redbeans Cheatsheet
        - <http://www.redbeanphp.com/manual3_0/cheatsheet>{:target="_blank" rel="nofollow"}
- Using Readbeans with ZF1 : <http://richardjh.org/blog/using-redbeanphp-orm-zend-framework.php>{:target="_blank" rel="nofollow"}
- Propel business logic : <http://www.codeitive.com/0HzgPWWgqj/mvc-and-orm-which-model-logic-goes-where.html>{:target="_blank" rel="nofollow"}



