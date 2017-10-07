---
layout: post
title:  Do I need an ORM ? 
#category: architecture
tags: [database, orm]
comments: true
---

## Problem Statement
- Many popular database products such as structured query language database management systems (SQL DBMS) can only store and manipulate scalar values such as integers and strings organized within tables. 
- The programmer must either : 
    1. Convert the object values into groups of simpler values for storage in the database (and convert them back upon retrieval) (ORM !!!) 
    - Only use simple scalar values within the program :
        - Via Procedural Code
        - Via OO Code with DAO Design Pattern 
    - Use an Object Oriented Database (subset of NoSQL)   

## About
- Object-relational mapping is a programming technique for converting data between incompatible type systems in object-oriented programming languages.
- This creates, in effect, a "virtual object database" that can be used from within the programming language.

## Advantages / Pros
- Reduction in code

    ```bash
    /* Eg in Normal Code */
    String sql = "SELECT * FROM persons WHERE id = 10";
    DbCommand cmd = new DbCommand(connection, sql);
    Result res = cmd.Execute();
    String name = res[0]["FIRST_NAME"];
    ```
    
    ```bash
    /* Eg in ORM Code */
    Person p = Person.Get(10); 
    String name = p.getFirstName();
    ```
    
- Easy development in most cases

## Dis-advantages / Cons
- Exponential Complexity
    - ORM tends to be useful for 70-80% of requirements which are generally simple but  the rest requires you to hack around some limitations of the  ORM or use raw queries instead (not cacheable !)
- Performance
    - It is due to the fact that they use wildcard * for selecting data. 
    - Compiling queries from ORM code is slow (eg : Doctrine ORM compiler is written in PHP)
    - Slower than traditional queries though it can be offset to a large extent by using opcode caching.
- High level of abstraction obscuring what is actually happening in the implementation code. 
- Heavy reliance on ORM software has been cited as a major factor in producing poorly designed databases

## Recommendation
- A good ORM can definitely reduce development time & encourage use of OOP concepts.
- Usually 70% of the requirements tend to be simple & can easily be implemented via ORM within a short time (relative to a non ORM solution).
- For the rest, a good ORM provides for means to execute complex queries directly. 
- For a good performance, you will have to use an opcode cache layer + a data cache layer (memcache, varnish etc) so as to offset the speed issue. If you don't want to do this, then ORM solution is not for you. 

## References 
- <http://martinfowler.com/bliki/OrmHate.html>{:target="_blank" rel="nofollow"}
- <http://blog.codinghorror.com/object-relational-mapping-is-the-vietnam-of-computer-science/>{:target="_blank" rel="nofollow"}
- <http://stackoverflow.com/questions/108699/good-php-orm-library>{:target="_blank" rel="nofollow"}
- <http://stackoverflow.com/questions/7765070/redbean-orm-performance>{:target="_blank" rel="nofollow"}
- <https://philsturgeon.uk/blog/2011/06/misconceptions-about-orms/>{:target="_blank" rel="nofollow"}

