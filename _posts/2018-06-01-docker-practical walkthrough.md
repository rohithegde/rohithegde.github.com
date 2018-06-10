---
layout: post
title: "Docker : a practical walkthrough"
#category: general
tags: [docker, container, tutorial, guide]
comments: true
---

## Background story
- This is part 2 of a [2 part series]({{ site.url }}/#docker) to understand Docker & work with it.

## Agenda
1. [Docker management commands](#management-)
2. [Artifacts](#artifacts)
3. [Other useful commands](#other-commands)
4. [Tips](#tips)
5. [Further reading](#references)

## <a id="management-commands">1.</a>Docker Management commands
- Before we move on the practical example, its important to talk about Docker management cmds.
- Earlier Docker commands were quite chaotic. Commands like `docker run`, `docker ps` existed without visible context on to what component they operated on. Additionally some of them were singular(`docker ps`) while some plural (`docker images`). They still exist & are still popular but with Docker v1.13, management commands were introduced which introduced some uniformity & organization.
- Executing `docker --help` gives you the list management commands : 

    !["Docker Management commands"](/assets/images/docker-management-cmds.png "Docker Management commands")
- We will be using management commands in all further examples.
- We will primarily concentrate on the management commands related to container, image, network, volume & system. 
- A summary of the other management commands :

|---
| cmd | description
|-|:-|
| checkpoint | Experimental feature of Docker to use Linux's CRIU (Checkpoint/Restore In Userspace) mechanism to generate a snapshot of a running container (filesystem + running processes).
| plugin | Allows you to extend core Docker capabilities(primarily Networking, Storage and Authorization) with 3rd party plugins.
| trust | Content trust provides the ability to use digital signatures for data sent to and received from remote Docker registries.
| swarm | Manage Swarm orchestrator.
| config | A swarm feature by which allows you to store non-sensitive information like config files outside an image or container.
| node | Manage Swarm nodes.
| secret | A swarm feature which allows you to manage any sensitive data which a container needs at runtime but you don’t want to store in the image or in source control (eg : credentials, SSK keys).
| service | A swarm feature which allows you to manage services.
|===

## <a id="artifacts">2.</a>Artifacts

### 1. Dockerfile
- The Dockerfile is used to build an image.
- The Dockerfile contains a number of instructions with arguments. 
- Each instruction should be in UPPERCASE followed by an argument.
- The instructions are processed from top to the bottom leading to a new layer in the image with every instruction.
- Note : most of these instructions can be over-riden at run time via the command line.
- The folder in which the Dockerfile exists is the default 'build context' for Docker.
- Let us look at a sample Dockerfile for a Node.js project.
<pre><code>
FROM node:6.9.1

# Create app directory
ENV APP_HOME /app/
ENV REFRESH_DATE '2018-06-10'

WORKDIR $APP_HOME
RUN apt-get update && apt-get install libpq-dev -y

COPY package.json $APP_HOME

RUN npm install --loglevel=warn

COPY . APP_HOME

EXPOSE 5000

CMD ["node", "app.js"]
</code></pre>

Let us walk through each instruction given in the file.

<pre><code>
FROM node:6.9.1
</code></pre>
- The first instruction in a Dockerfile must be FROM.
- It specifies an existing image (called the base image) on which the instructions will be executed.
- The image will be downloaded from the docker registry if it doesn't exist in the host machine.
<pre><code>
# Create app directory
ENV APP_HOME /app/
ENV REFRESH_DATE '2018-06-10'
</code></pre>
- Comments can be added to the Dockerfile using a hash(#).
- The ENV instruction is used to define an environment variable which can be re-used elsewhere in the Dockerfile.
- By changing the value of the REFRESH_DATE, we can ensure that when the image is rebuilt, it won't use the cached layer.
<pre><code>
WORKDIR $APP_HOME
</code></pre>
- The WORKDIR instruction is used to set the working directory for any commands executed after this instruction.
- It can be set multiple times so that the working directory can be changed for different commands (if needed).
<pre><code>
RUN apt-get update && apt-get install libpq-dev -y
</code></pre>
- We use the RUN instruction to execute commands.
- You can also use the exec format to execute the commands. Eg : RUN [ "apt-get", " install", "-y", "nginx" ]
- Here, we are using the && operator to execute multiple commnads so that a single layer is created instead of one layer for each command.
<pre><code>
COPY package.json $APP_HOME
RUN npm install --loglevel=warn
COPY . APP_HOME
</code></pre>
- The COPY instruction copies files from the build context on the host machine to the container.
- It is similar to the ADD instruction with the only difference being that the ADD instruction has automatic execution of extraction or de-compression when it deals with zip files. Better to use COPY since it has no such hidden abilities.
- It is similar to the command `mkdir -p` ie it creates any missing folders in the path.
- **One important thing to note** : We copy package.json + install dependencies before the other content copying to make better use of image caching. Details : 
    - As you know, each instruction in the Dockerfile leads to the creation of a new image layer.
    - For the ADD and COPY instructions, the contents of the file(s) in the image are examined and a checksum is calculated for each file. The last-modified and last-accessed times of the file(s) are not considered in these checksums.
    - A file like package.json lists the dependencies of the application. Installing dependencies can take a lot of time. As such, it should be done only when the dependencies in the file are updated. 
    - The chances of something changing in the app folder are high. To ensure reuse of existing cached layer (only when no dependency is updated), we add the instructions for package.json copy & dependency installation (npm install) before that of copying the other content of the app folder.
<pre><code>
EXPOSE 5000
</code></pre>
- We use the EXPOSE instruction to tell Docker that the app operates on the given port. 
- Note that Docker will expose the port only when the container is run. It will map a random port to this port through which the application can be accessed externally. The external port can be set at run time.
- Multiple ports can be exposed by adding them to the same EXPOSE instruction.
<pre><code>
CMD ["node", "app.js"]
</code></pre>
- We use the CMD instruction to set the default command execute when the container is run.
- Alternatively we can set the ENTRYPOINT instruction which then ensures that all arguments passed via command line will become arguments to the command provided.

### 2. .dockerignore
<pre><code>
node_modules/*
bower_components/*
.git
</code></pre>
- The .dockerignore is similar to the .gitignore file of the Git versioning system.
- It is newline-separated list of exclusion patterns which is placed into the build context.
- The .dockerignore file is very useful for reducing the size of the built image.

### 3. docker-compose.yaml
- Docker compose is a tool for composing multiple docker containers.
- Originally called fig which was eventually merged into the official docker package.
- Let us look at an example docker-compose.yaml file :
<pre><code>
version: '3'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile-local
    ports:
      - "1337:1337"
    #network_mode: "bridge"
    networks:
      - my-app
    environment:
      - DB_HOST=postgres
      #- DB_HOST=docker.for.mac.localhost # For connecting to host db
      - DB_NAME=test
      - DB_USER=test
      - DB_PASSWORD=test
      - DB_PORT=5432
      - NODE_ENV=development
    volumes:
      - .:/srv/app/
      - backend-node-modules:/srv/app/node_modules/
      - ${PWD}/config/local.js.sample:/srv/app/config/local.js
      - file-uploads:/srv/app/uploads/
    command: ["npm", "run", "nodemon", "--redis"]
    depends_on:
      - redis
      - postgres
    #external_links:
    #  - postgres
    #extra_hosts:
    # - "postgres:${DB_IP}"

  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile-local
    ports:
      - "3000:3000"
    #network_mode: "bridge"
    networks:
      - my-app
    environment:
      - NODE_ENV=development
    volumes:
      - frontend-node-modules:/srv/app/node_modules
  
  postgres:
    image: 'postgres:9.6.8'
    restart: always
    ports:
      - "5432:5432"
    networks:
      - my-app
    environment:
      POSTGRES_USER: test
      POSTGRES_PASSWORD: test
      POSTGRES_DB: test
    volumes:
      # For connecting to local db data
      #- /usr/local/var/postgres:/var/lib/postgresql/data
      - db-data:/var/lib/postgresql/data
      #- ./scripts/:/docker-entrypoint-initdb.d/ # initialization scripts

volumes:
  db-data:
  file-uploads:
  backend-node-modules:
  frontend-node-modules:

networks:
  my-app:
</code></pre>

### 4. .env

## <a id="other-commands">3.</a>Other useful commands

   
### 2. Image
- Typing `docker image --help` gives you a list of all possible options :
- Lets look at some cmds which you are likely to use regularly :
    - `docker image build -t test-image-name .`
        - Builds the image using the instructions given in the Dockerfile present in the current folder.
        - More details on other options : <https://docs.docker.com/engine/reference/commandline/build/#description>{:target="_blank" rel="nofollow"}
    - `docker image ls`
        - Lists all the images present in the host machine.
    - `docker image test-image-name history`
        - Lists all 

### 3. Container
### 4. Volume
### 5. Network
### 6. Logs
### 7. Entering the container
### 8. APIs

## <a id="tips">4.</a>Tips

- Log everything to STDOUT since Docker will pipe it to its logs.
- Customize application behaviour with environment variables. Have separate env files for each env. You can even use different docker-compose.yaml files for each env if needed.
- Make apps stateless ie don’t store in memory(eg: web server session) since it isn’t a scalable approach. Use fast access data stores like Redis instead
- For your 1st experiment with Docker, make app on your own without involving Docker. Then dockerize it.



## <a id="references">5.</a>Further reading / references
- <https://en.wikipedia.org/wiki/Docker_(software)>{:target="_blank" rel="nofollow"}
- Docker plugins : <https://www.inovex.de/blog/docker-plugins/>{:target="_blank" rel="nofollow"}
- Docker build cache : <https://docs.docker.com/v17.09/engine/userguide/eng-image/dockerfile_best-practices/#build-cache>{:target="_blank" rel="nofollow"}
- Optimizing .dockerignore : <https://blog.codeship.com/leveraging-the-dockerignore-file-to-create-smaller-images/>- Docker build cache : <https://docs.docker.com/v17.09/engine/userguide/eng-image/dockerfile_best-practices/#build-cache>{:target="_blank" rel="nofollow"}

