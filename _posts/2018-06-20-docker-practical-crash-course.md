---
layout: post
title: "Docker : Part 2 - a practical crash course"
#category: general
tags: [docker, container, tutorial, guide]
comments: true
---

## Background story
- This is part 2 of a [2 part series]({{ site.url }}/#docker) to understand Docker & work with it.

## Agenda
1. [Docker management commands](#management-cmds)
2. [Basic commands to setup a single service](#basic-cmds)
3. [Artifacts](#artifacts)
    1. [Dockerfile](#Dockerfile)
    2. [.dockerignore](#dockerignore)
    3. [docker-compose.yaml](#docker-compose.yaml)
    4. [.env](#env)
4. [Other useful commands](#other-commands)
    1. [Image](#Image)
    2. [Container](#Container)
    3. [Volume](#Volume)
    4. [Network](#Network)
    5. [System](#System)
    6. [Logs](#Logs)
5. [Tips](#tips)

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

## <a id="basic-cmds">2.</a>Basic commands to setup a single service
Lets go through the basic commands which we will use for setting up & working on our first Docker based service.

- The Redis cache is one of the simplest services to activate : 
  - `docker container run redis`

    !["Redis"](/assets/images/docker-run-redis.png "Redis")
  - The cmd does 2 things :
    1. Pulls the `redis:latest` image from the registry (if it doesn't exist).
    2. Creates the container from the image.
- An improved variation of the above cmd : 
  - **`docker container run -it --rm redis /bin/sh`**

    !["Redis"](/assets/images/docker-run-it-redis.png "Redis")
  - Docker's `-i` flag allows you to send commands to the container via standard input ("STDIN"), which means you can "interactively" type commands to the pseudo-tty/terminal created by the `-t` switch.
  - The `/bin/sh` at the end allows us to use the Bourne shell to type.
  - The `--rm` flag tells Docker to automatically clean up the container and remove the file system when the container exits.
- We can view the images present with :
  - `docker image ls`
    !["image"](/assets/images/docker-image-ls.png "image")
- We can view the containers present with :
  - `docker container ls`
    !["container"](/assets/images/docker-container-ls.png "container")
  - As we see above, Docker has given the container a random name.
  - Additionally no port on the host is mapped to the redis service in the container which is why no app can connect to it.
  - Also if the container is brought down, we will lose the redis cache data.
- An improved variation of the above cmd : 
  - **`docker container run -it --rm -p 6379:6379 -v redis-dir:/data  --name app-redis redis /bin/sh`**
    !["image"](/assets/images/docker-container-ls-port.png "image")

  
  - Here we have mapped the host port 6379 to the port within the container 6379 (HOST_PORT:CONTAINER_PORT).
  - We have also given the container a name as app-redis. 
  - NOTE : Avoid giving names to containers if you wish to scale his setup to more machines.
  - We have mounted a volume mapping the directory redis-dir on the host to the /data container directory so as to persist redis data.
- A daemonized variation of the above cmd so that it runs in the background : 
  - **`docker container run -d -p 6379:6379 -v redis-dir:/data  --name app-redis redis`**
    !["image"](/assets/images/docker-container-run-d.png "image")
  - Here the container id (full format) is output to indicate the success in creating it.
- We can remove the container with :
  - Either 
    - `docker container stop app-redis`
    - `docker container rm app-redis`
    !["container"](/assets/images/docker-container-rm.png "container")
  - OR
    - `docker container rm app-redis -f`
  - You can either use the container name 'app-redis' or the container id.
- Final cmd of this section would be to remove the image.
  - `docker image rm redis`
    !["image"](/assets/images/docker-image-rm.png "image")

  - We get an error since we still seem to have containers attached to this image.
  - `docker container ls -a`
    !["container"](/assets/images/docker-container-ls-a.png "container")

  - We see some intermediate containers still attached to this image. We can remove them using the `docker container rm` cmd. But since we plan on removing the redis image too, its easier to use the `docker image rm redis -f` cmd.

    !["image"](/assets/images/docker-image-rm-f.png "image")

## <a id="artifacts">3.</a>Artifacts
The above commands are enough to setup basic apps from existing images. But for custom apps which are more complex to setup, we need to depend on some Docker artifacts. 

Lets take a look at the 4 artifacts of Docker.

### <a id="Dockerfile">1.</a>Dockerfile

- The Dockerfile is used to build an image.
- The Dockerfile contains a number of instructions with arguments. 
- Each instruction should be in UPPERCASE followed by an argument.
- The instructions are processed from top to the bottom leading to a new layer in the image with every instruction.
- Note : most of these instructions can be over-riden at run time via the command line.
- The folder in which the Dockerfile exists is the default 'build context' for Docker.
- We use 2 commands to set up the application from this Dockerfile :
  - **`docker image build -t test-image-name .`**
    - This will build the image from the Dockerfile & `-t` flag will give it the name 'test-image-name'.
  - **`docker container run -it -p 80:80 test-image-name`**
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

### <a id="dockerignore">2.</a>.dockerignore

<pre><code>
node_modules/*
bower_components/*
.git
</code></pre>
- The .dockerignore is similar to the .gitignore file of the Git versioning system.
- It is newline-separated list of exclusion patterns which is placed into the build context.
- The .dockerignore file is very useful for reducing the size of the built image.

### <a id="docker-compose.yaml">3.</a>docker-compose.yaml
- Docker compose is a tool for composing multiple docker containers.
- Originally called fig which was eventually merged into the official docker package.
- The Dockerfile is usually used to bring up a service while the Docker compose file is used to bring up an application comprising of multiple services.
- You can use either a .yml or .yaml extension for this file. They both work.
- To set up the entire application from this Dockerfile :
  - `docker-compose up`
- To set up only 2 services(& any dependent services) from this Dockerfile :
  - `docker-compose up backend frontend`
- To shut down the application :
  - `docker-compose down`
- Let us look at an example docker-compose.yaml file :
<pre><code>
version: '3'

services:
  backend:
    build:
      context: .
      #image: backend:1.2
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

Let us walk through each instruction given in the file.

<pre><code>
version: '3'
</code></pre>
- The first instruction usually is the version number. 
- There are currently three versions of the Compose file format:
  1. Version 1, the legacy format. **This is specified by omitting a version key at the root of the YAML**.
  2. Version 2.x. This is specified with a version: '2' or version: '2.1', etc., entry at the root of the YAML.
  3. Version 3.x, the latest and recommended version, designed to be cross-compatible between Compose and the Docker Engine’s swarm mode. This is specified with a version: '3' or version: '3.1', etc., entry at the root of the YAML.
- You will see different tutorials online using different syntax/cmds in their examples. Be aware of which Docker Compose file version they are referring. More details on upgrading here : <https://docs.docker.com/compose/compose-file/compose-versioning/#upgrading>{:target="_blank" rel="nofollow"}.

<pre><code>
services:
</code></pre>
- This is part of the new Docker Compose version 3 file format.
- Every service of the app should be listed in this section.
- A service definition contains configuration that is applied to each container started for that service, much like passing command-line parameters to the docker container creation command.

<pre><code>
  backend:
    build:
      context: .
      #image: backend:1.2
      dockerfile: Dockerfile-local
</code></pre>
- We begin with the service definition of the backend service.
- The build section specifies the configuration options that are applied at build time.
- build can be specified either as a string containing a path to the build context or as an object (given above).
- The context is either a path to a directory containing a Dockerfile, or a url to a git repository. When the value supplied is a relative path(eg : ./dir), it is interpreted as relative to the location of the Compose file.
- The other optional instruction is for image (commented). If you specify image as well as build, then Compose names the built image with the 'backend' and optional tag as 1.2 built from the current directory. 
- If the Dockerfile has a different name then we can mention the name here. In this case, I have created an environment specific Dockerfile for my local env called Dockerfile-local.

<pre><code>
    ports:
        - "1337:1337"
</code></pre>
- This is the short syntax to expose ports.
- You can specify both ports (HOST:CONTAINER as given above), or just the container port (only referenced internally within the network).
- Note : If the port is already mapped to some other application then you might not get any error.

<pre><code>
    #network_mode: "bridge"
    networks:
      - my-app
</code></pre>
- The network mode can be specified if you want to use the default bridge network. It is commented here.
- It is recommended to use a custom network (my-app in this case) so that we control which services interact with each other.
- The definition of custom networks can be found towards the end of the yaml file.

<pre><code>
    environment:
      - DB_HOST=postgres
      #- DB_HOST=docker.for.mac.localhost # For connecting to host db
      - DB_NAME=test
      - DB_USER=test
      - DB_PASSWORD=test
      - DB_PORT=5432
      - NODE_ENV=development
</code></pre>
- This section is used to define environment variables for the service.
- Any boolean values; true, false, yes no, need to be enclosed in quotes to ensure they are not converted to True or False by the YML parser.
- For using the local IP, you can use an alias. Depending on your OS, it can be either docker.for.mac.host.internal, docker.for.mac.localhost, docker.for.win.host.internal or docker.for.win.localhost. 
- Environment variables given with only a key are resolved to their values on the machine Compose is running on, which can be helpful for secret or host-specific values.

<pre><code>
    volumes:
      - .:/srv/app/
      - backend-node-modules:/srv/app/node_modules/
      - ${PWD}/config/local.js.sample:/srv/app/config/local.js
      - file-uploads:/srv/app/uploads/
</code></pre>
- As you see, I have mounted various types of volumes in this section.
- `.:/srv/app/` : The current host directory has been mounted onto the container app directory as an anonymous volume.
- `backend-node-modules:/srv/app/node_modules/` : A named volume has been mounted here. This has been done so as to reuse the node modules installed during the build stage.
- `${PWD}/config/local.js.sample:/srv/app/config/local.js` : A local config sample file present in the code repository has been mounted as a config file for the local env.
- `file-uploads:/srv/app/uploads/` : A named volume has been mounted here. The file-uploads directory can be used for sharing with other containers as needed.
- The volumes will be defined towards the end of the yaml file.


<pre><code>
    command: ["npm", "run", "nodemon", "--redis"]
</code></pre>
- This is used to vverride the default command of the Dockerfile.

<pre><code>
    depends_on:
      - postgres
</code></pre>
- This is used to state the dependencies of the different services.
- This ensures that the backend service is started only AFTER the postgres service is started.
- NOTE : This does NOT mean that the backend service will wait till the postgres service is 'ready'. Its recommended to use some other custom logic to achieve this (eg : polling mechanism). More details here : <https://docs.docker.com/compose/startup-order/>{:target="_blank" rel="nofollow"}. 

<pre><code>
    #external_links:
    #  - postgres
    #extra_hosts:
    # - "postgres:${DB_IP}"
</code></pre>
- The `external_links` commented section when enabled would allow me to Link to containers started outside this docker-compose.yml.
- You can also specify it in the form postgres:db ie CONTAINER:ALIAS
- Note : For compatibility with version 2 of the compose file, you might have to ensure the external container is part of the same network.
- The `extra_hosts` commented section when enabled would allow me to add an entry to the `/etc/hosts` file.
- Here I have used variable substitution (`${DB_IP}`) which allows me to use a variable defined in the shell directly in the compose file.

<pre><code>
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
</code></pre>
- The Postgres database service is defined here. Most of the settings are similar to that explained before.
- The `restart` instruction set the conditions on which the container will restart. It can be any value from the list of no, always, on-failure, unless-stopped.
- Since this container is formed from an existing image listed in the Docker hub, the environment variables are set in line with the information provided in Docker hub.
- The volumes defined here are a varied lot.
  - `/usr/local/var/postgres:/var/lib/postgresql/data` : This line when enabled, mounts the directory of the Postgres installation on the host as that in the container. This can be useful if you want to use the locally installed database within the container.
  - `db-data:/var/lib/postgresql/data` : This allows us to mount the directory of the Postgres service as a data volume which persists even if the container isn't up (as per the nature of a volume),
  - `./scripts/:/docker-entrypoint-initdb.d/` : This line when enabled, allows us to mount the 'scripts' folder in the host directory as the initialization script folder of Postgres service.

<pre><code>
volumes:
  db-data:
  file-uploads:
  backend-node-modules:
  frontend-node-modules:
</code></pre>
- In this section, we define the various named volumes which we have used in the file which causes them to be created by Compose.
- We can also define 'external' volumes here which have been created externally as well as other volume specific configuration.

<pre><code>
networks:
  my-app:
</code></pre>
- In this section, we define the various networks which we have used in the file which causes them to be created by Compose.
- We can also define 'external' networks here which have been created externally as well as other network specific configuration.

### <a id="env">4.</a>.env

<pre><code>
# Postgres env
POSTGRES_USER=test
POSTGRES_PASSWORD=test
POSTGRES_DB=test
</code></pre>

- This optional file can be used to store default environment variables for the Compose file.
- Compose expects each line in an env file to be in VAR=VAL format.
- Lines beginning with # are processed as comments and ignored.
- Blank lines are ignored.
- There is no special handling of quotation marks. This means that they are part of the VAL.

## <a id="other-commands">4.</a>Other useful commands
Thanks to the mamagement commands, most of the commands for a image are similar to that for a container/volume/network.

### <a id="Image">1.</a>Image
- `docker image --help` 
  - Gives you a list of all possible options.
- `docker image ls`
  - Lists all the images present in the host machine.
- `docker image pull test-image-name`
  - Pulls the docker image from the registry.  
- `docker image build -t test-image-name .`
  - Builds the image using the instructions given in the Dockerfile present in the current folder.
- `docker image test-image-name history`
  - Shows the history of the image.
  !["Image history"](/assets/images/docker-image-history.png "Image history")
- `docker image inspect test-image-name `
  - Display detailed information on one or more images (separated by a space).
  !["Image inspect"](/assets/images/docker-image-inspect.png "Image inspect")

### <a id="Container">2.</a>Container
- `docker container --help`
  - Gives you a list of all possible options.
- `docker container ls`
  - Lists all the running containers present in the host machine.
- `docker container ls -a`
  - Lists all the containers present in the host machine.
- `docker container create test-image-name`
  - Creates the container but doesnt run it yet (ie it exists in 'Created' status).
- `docker container start test-container-name`
  - Starts the container.
- `docker container stop test-container-name`
  - Stops the running container.
- `docker container run test-image-name`
  - Pulls the image from the registry if it doesn't exist + creates the container + starts it.  
- `docker container exec app-redis touch test.txt`
  - Executes the command `touch test.txt` in the running container.
- `docker container cp app-redis:/data/test.txt ./`
  - Copies content from the source to the destination. 
  - You can copy content from a container as well as to a container.
  - Here we have copied the text file from the container to the host.
- `docker image inspect test-image-name`
  - Display detailed information on one or more images (separated by a space).
- `docker container rm test-container-name`
  - Deletes the container.
  - Throws an error if the container is still running.
- `docker container rm test-container-name -f`
  - Deletes the container even if it is running.
- `docker container ls --filter=volume=test-volume-name`
  - The filter argument used above lets you view all containers who have mounted the given volume.

### <a id="Volume">3.</a>Volume
- `docker volume --help`
  - Gives you a list of all possible options.
- `docker volume ls`
  - Lists all the volumes present in the host machine.
- `docker volume inspect test-volume-name`
  - Display detailed information on one or more volumes (separated by a space).
- `docker volume rm test-volume-name`
  - Deletes the volume.
  - Throws an error if the volume is linked to a container.
  - NOTE : You can use `-f` to force removal but be careful using it. 

### <a id="Network">4.</a>Network
- `docker network --help`
  - Gives you a list of all possible options.
- `docker network ls`
  - Lists all the volumes present in the host machine.
- `docker network inspect test-network-name`
  - Display detailed information on one or more volumes (separated by a space).
- `docker network rm test-network-name`
  - Deletes the network.
  - Throws an error if the network is linked to a container.
  - NOTE : You can use `-f` to force removal. 

### <a id="System">5.</a>System
- `docker system --help`
  - Gives you a list of all possible options.
- `docker system df`
  - Gives the memory utilization of Docker.
  !["System df"](/assets/images/docker-system-df.png "System df")
- `docker system info`
  - Gives detailed information about the Docker setup on the host machine. 

### <a id="Logs">5.</a>Logs
- `docker container logs app-redis`
  - View logs of an existing container.

## <a id="tips">5.</a>Tips

- Log everything to STDOUT since Docker will pipe it to its logs.
- Customize application behaviour with environment variables. Have separate env files for each env. You can even use different docker-compose.yaml files for each env if needed.
- Make apps stateless ie don’t store in memory(eg: web server session) since it isn’t a scalable approach. Use fast access data stores like Redis instead
- For your 1st experiment with Docker, setup the app on your own without involving Docker. Then dockerize it. Helps to understand the differences better.

## <a id="references">5.</a>Further reading / references
- <https://en.wikipedia.org/wiki/Docker_(software)>{:target="_blank" rel="nofollow"}
- Docker compose file versioning : <https://docs.docker.com/compose/compose-file/compose-versioning/#compatibility-matrix>{:target="_blank" rel="nofollow"}
- Docker plugins : <https://www.inovex.de/blog/docker-plugins/>{:target="_blank" rel="nofollow"}
- Docker build cache : <https://docs.docker.com/v17.09/engine/userguide/eng-image/dockerfile_best-practices/#build-cache>{:target="_blank" rel="nofollow"}
- Optimizing .dockerignore : <https://blog.codeship.com/leveraging-the-dockerignore-file-to-create-smaller-images/>{:target="_blank" rel="nofollow"}

