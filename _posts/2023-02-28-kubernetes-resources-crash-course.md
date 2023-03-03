---
layout: post
title: "A crash course on Kubernetes resources"
#category: general
tags: [container, guide, kubernetes, software]
comments: true
---

I have been working on Kubernetes for 5+ years now. But started blogging on my fav tech topic only now. This post focuses on the basic resources of k8s. The target audience are those who just want to know enough k8s to deploy basic containerised apps/microservices to the k8s cluster. This allows me to focus on the basic k8s resources.

This is part of my [Kubernetes series]({{ site.url }}/#kubernetes) of posts.

<!-- TOC -->

- [Using a Kubernetes cluster](#using-a-kubernetes-cluster)
    - [Cluster setup](#cluster-setup)
    - [Kubectl](#kubectl)
    - [Imperative approach](#imperative-approach)
    - [Declarative approach](#declarative-approach)
- [Kubernetes Architecture](#kubernetes-architecture)
    - [Control Plane](#control-plane)
    - [Worker Nodes](#worker-nodes)
- [Kubernetes objects](#kubernetes-objects)
    - [Namespace](#namespace)
    - [Pod](#pod)
    - [Deployment](#deployment)
    - [Service](#service)
    - [Labels and selectors](#labels-and-selectors)
    - [ConfigMap](#configmap)
    - [Secret](#secret)
- [Related tools](#related-tools)
    - [Helm](#helm)
    - [k9s](#k9s)
- [Whats next ?](#whats-next-)

<!-- /TOC -->

## Using a Kubernetes cluster

### Cluster setup

Before going into the internal k8s objects, you will need a k8s cluster to try out commands given in the next section. Use any of the below options given in an ascending order of complexity:

1. Use a free online k8s cluster at [KillerCoda](https://killercoda.com/playgrounds/scenario/kubernetes){:target="_blank" rel="nofollow"}.
2. Use a free online k8s cluster at [Kubernetes.io](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-interactive/){:target="_blank" rel="nofollow"}.
3. Setup a k8s cluster on your local machine through one click by using [Docker Desktop](https://www.docker.com/products/docker-desktop/){:target="_blank" rel="nofollow"}.
4. Setup [MiniKube](https://minikube.sigs.k8s.io/docs/start/){:target="_blank" rel="nofollow"} on your local machine.
5. Provision a managed Kubernetes cluster on any of the cloud providers and use it. Eg: [Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli){:target="_blank" rel="nofollow"}.
6. Install k8s using a Platform as a Service (PaaS) offering like [OpenShift](https://docs.openshift.com/container-platform/latest/installing/installing-preparing.html){:target="_blank" rel="nofollow"}.
7. Install k8s on a barebones virtual machine by [installing KubeAdm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/){:target="_blank" rel="nofollow"} and [using KubeAdm to create the cluster](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/){:target="_blank" rel="nofollow"}.

### Kubectl

Install [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl){:target="_blank" rel="nofollow"} if you plan to run CLI commands from your local machine against the k8s cluster.
Add the below alias in your `~/.bashrc` file as you will be likely use kubectl a lot atleast in the initial days of trying out k8s.

```bash
alias k='kubectl'
```

Depending on the type of cluster you have installed above, there are different commands to setup a connection to the cluster. If you are connecting from your local terminal, the credentials will likely be stored in the `~/.kubeconfig` file. Read [this article for more details on kubeconfig](https://ahmet.im/blog/mastering-kubeconfig/){:target="_blank" rel="nofollow"}.

### Imperative approach

Kubernetes objects can quickly be created, updated, and deleted directly using imperative commands built into the kubectl command-line tool. For more details, you can visit [the official docs on it](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/imperative-command/){:target="_blank" rel="nofollow"}. Eg:

```bash
kubectl get nodes
```

### Declarative approach

- Kubernetes objects can be created, updated, and deleted by storing multiple object configuration files in a directory and using `kubectl apply` to recursively create and update those objects as needed. Such config files are called manifests.
- Kubernetes resources are usually created by posting a JSON or YAML manifest to the Kubernetes REST API endpoint.
- The yaml file usually consists of the following attributes:
  - `apiVersion` - This is the k8s API version which supports the specific resource. We can get the right api version using either the command `kubectl api-resources`. Alternatively you can always copy the right yaml from the official documentation.
  - `kind` - This indicates the resource to access.
  - `metadata` - This is an metadata object having attributes like name, labels, annotations etc.

ns.yaml:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: test1
```

```bash
kubectl apply -f ns.yaml
```

## Kubernetes Architecture

Read this section only if you are really curious on what makes k8s work. Not necessary if you just want to deploy your app on the cluster.

!["k8s-architecture"](/assets/images/k8s/k8s-architecture.drawio.png "k8s-architecture")

### Control Plane

- The Control Plane is what controls the cluster and makes it function.
- In a managed k8s cluster, you will not be able to access this part as its controlled by the clodu provider.
- You can remember the different parts of the control pane with the acronym **CASE**:
  - Controller
    - It replicates apps, keeping track of worker nodes, handling node failures, and so on.
  - API Server
    - This is the endpoint which every resource in k8s communicates with. You can see the mediator design pattern in play here.
    - The API server itself communicates on its own to some parts of the cluster too.
  - Scheduler
    - It schedules your apps by assigning thr suitable node to it.
  - etcd
    - This is the persistent data store which stores the cluster state.
    - Its a [popular open source tool](https://github.com/etcd-io/etcd){:target="_blank" rel="nofollow"}.

### Worker Nodes

- Nodes are the compute resources which power the cluster. But generally, when we talk about nodes, we consider them as worker nodes ie distinct from nodes which power the control plane.
- The worker nodes are the machines that run your containerized applications (right side of the diagram)
- The different parts of the worker node are :
  - Kubelet
    - This talks to the API server and manages containers on this node.
  - Kube proxy
    - This is the k8s service proxy which load balances network traffic between application components.
  - Container runtime
    - This runs the containers.
    - Towards the end of 2020, [Docker as an underlying runtime was deprecated](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/){:target="_blank" rel="nofollow"} in favor of runtimes like containerd that use the Container Runtime Interface (CRI). Don't worry if your app image was created via Docker though. It will continue to work in k8s as its an OCI (Open Container Initiative) image.

## Kubernetes objects

This is a basic list of k8s resources. There are plenty of resources not mentioned here (jobs, cronjobs, daemonsets, crd etc) but which are needed for advanced scenarios and thus out of scope of this guide.g

### Namespace

- Similar to namespaces in other programming languages - Namespaces are a way to divide cluster resources between multiple users or environments. However they don't provide any isolation for the running objects. For isolation, you will have to use more complex resources like [network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/){:target="_blank" rel="nofollow"}.
- The default namespaces in a k8s cluster are:
  - `default` - This is the default namespace. Not recommended for production.
  - `kube-node-lease` - It holds Lease objects associated with each node. It helps the control plane detect node failure.
  - `kube-public` - Its reserved for cluster usage in case that some resources should be visible and readable publicly throughout the whole cluster.
  - `kube-system` - For objects created by the Kubernetes system.
- Visit [this link](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/){:target="_blank" rel="nofollow"} for the official docs on namespaces.

Imperative cmds:

```bash
kubectl create namespace test1
kubectl create namespace test2
kubectl get namespace
kubectl get namespace test2
kubectl delete namespace test2
```

Yaml for declarative approach:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: test1
```

### Pod

- It is the basic building block in k8s.
- A pod is a group of one or more related application containers that will always run together on the same worker node and in the same Linux namespace.
- Visit [this link](https://kubernetes.io/docs/concepts/workloads/pods/){:target="_blank" rel="nofollow"} for the official docs on pods.

Imperative cmds:

```bash
# Single namespace cmds
kubectl get pods                              # List all pods in the namespace
kubectl get pods -o wide                      # List all pods with more details
kubectl get pods --namespace custom-namespace # List all pods of another namespace
kubectl get pods -n custom-namespace          # List all pods of another namespace
kubectl get pod pod1 -o yaml                  # Get a pod's YAML
kubectl explain pods                          # get the documentation for pod manifests
kubectl edit pod pod1                         # Edit a running pod
kubectl delete pod pod1 pod2                  # Delete 2 pods
# Commands on all namespaces
kubectl get pods --all-namespaces             # List all pods in all namespaces
kubectl delete pods --all-namespaces          # Delete all pods in all namespaces
```

Yaml for declarative approach:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

### Deployment

- It is a higher-level resource meant for deploying applications and updating them declaratively.
- A Deployment provides declarative updates for Pods. You can decide how many instances of a pod you want by setting the replicas. More on using this in the "Services" section.
- Visit [this link](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/){:target="_blank" rel="nofollow"} for the official docs on deployments.

Imperative cmds:

```bash
# Single namespace cmds
kubectl create deployment nginx-deployment --image=nginx
kubectl get deployments
kubectl get deployments --namespace custom-namespace
kubectl get deployments -n custom-namespace
kubectl get deployments nginx-deployment
kubectl get deployments nginx-deployment -o yaml
kubectl explain deployments
kubectl edit deployments nginx-deployment
kubectl delete deployments nginx-deployment nginx-deployment2
# Commands on all namespace cmds
kubectl get pods --all-namespaces             # List all pods in all namespaces
kubectl delete deployments —all
```

Yaml for declarative approach:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 8080 # Port on which nginx is exposed outside the container. Change it as you see fit
```

### Service

- A k8s service is a resource you create to make a single, constant point of entry to a group of pods providing the same functionality.
- Each service has an IP address and port that never change while the service exists.
- Connections to the service are load-balanced across all the backing pods.
- A simple way to make a service accessible externally is to set the service type to "LoadBalancer". This makes the service accessible through a dedicated load balancer usually provisioned from the cloud infrastructure k8s is running on.
- More details can be acessed [here].
- Visit [this link](https://kubernetes.io/docs/concepts/services-networking/service/){:target="_blank" rel="nofollow"} for the official docs on services.

Imperative cmds:

```bash
# Create a service for a deployment nginx, which serves on port 80 and connects to the containers on port 8000
kubectl expose deployment nginx --type=LoadBalancer --name=nginx --port=80 --target-port=8080
# Alternate way to creat a service but not as flexible as above cmd.
kubectl create service loadbalancer nginx --tcp=80:8080
kubectl get services nginx
kubectl describe services nginx
kubectl edit service nginx
kubectl delete service nginx
```

Yaml for declarative approach:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    app: nginx # Same label as the previous deployment to link it.
  ports:
  - name: nginx-tcp
    protocol: TCP
    port: 80 # port on which service is exposed
    targetPort: 8080 # Should map to the container port on the deployment or pod.
```

### Labels and selectors

- Labels are key/value pairs that are attached to objects, such as pods.
- The set of pods that a service targets is defined with a label selector (as seen in service yaml).
- Via a label selector, the client/user can identify a set of objects. **The label selector is the core grouping primitive in Kubernetes.**

Imperative cmds:

```bash
kubectl label pods nginx env=debug              # add label
kubectl label pods nginx env=debug —overwrite   # over write label
kubectl label pods nginx env-                   # Remove a label
kubectl delete pods,services -l name=myLabel    # Delete pods and services based on label.
kubectl get pods --show-labels                  # Show labels for all pods
```

### ConfigMap

- A ConfigMap is used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.
- A ConfigMap allows you to decouple environment-specific configuration from your container images, so that your applications are easily portable.
- Visit [this link](https://kubernetes.io/docs/concepts/configuration/configmap/){:target="_blank" rel="nofollow"} for the official docs on configmaps.

Imperative cmds:

```bash
kubectl create configmap test-config —from-literal=timer=25
kubectl get configmap test-config -o yaml
kubectl delete configmap test-config
```

Yaml for declarative approach:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: special-config
data:
  # property-like keys; each key maps to a simple value
  player_initial_lives: "3"
  ui_properties_file_name: "user-interface.properties"

---
apiVersion: v1
kind: Pod
metadata:
  name: dapi-test-pod
spec:
  containers:
    - name: test-container
      image: registry.k8s.io/busybox
      command: [ "/bin/sh", "-c", "env" ]
      envFrom: # Define all of the ConfigMap's data as container environment variables. 
      - configMapRef:
          name: special-config
```

### Secret

- Secrets are similar to ConfigMaps but are specifically intended to hold confidential data.
- The values for all keys in the `data` field have to be base64-encoded strings. If the conversion to base64 string is not desirable, you can choose to specify the `stringData` field instead, which accepts arbitrary strings as values.
- Kubernetes Secrets are, by default, stored unencrypted in the API server's underlying data store (etcd). Additionally, anyone who is authorized to create a Pod in a namespace can use that access to read any Secret in that namespace.
- In order to safely use Secrets, take at least the following steps:
  - [Enable Encryption at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/){:target="_blank" rel="nofollow"} for Secrets.
  - [Enable or configure RBAC rules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/){:target="_blank" rel="nofollow"} with least-privilege access to Secrets.
  - Restrict Secret access to specific containers.
  - [Consider using external Secret store providers](https://secrets-store-csi-driver.sigs.k8s.io/concepts.html#provider-for-the-secrets-store-csi-driver){:target="_blank" rel="nofollow"}.
- Visit [this link](https://kubernetes.io/docs/concepts/configuration/secret/){:target="_blank" rel="nofollow"} for the official docs on secrets.

Imperative cmds:

```bash
kubectl create secret generic test-secret —from-literal=username=testing
kubectl get secret test-secret
kubectl get secret test-secret -o yaml # Use `echo "value" | base64 -d` to get decoded secret. 
kubectl delete secret test-secret
```

Yaml for declarative approach:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  password: $(echo -n "s33msi4" | base64 -w0)
  username: $(echo -n "jane" | base64 -w0)

---
apiVersion: v1
kind: Pod
metadata:
  name: dapi-test-pod
spec:
  containers:
    - name: test-container
      image: registry.k8s.io/busybox
      command: [ "/bin/sh", "-c", "env" ]
      envFrom: # Define all of the Secret data as container environment variables. 
      - secretRef:
          name: mysecret

```

## Related tools

There are a [LOT of tools in the k8s ecosystem](https://github.com/topics/kubernetes){:target="_blank" rel="nofollow"}. But we will focus on 2 of them in the initial part of our k8s journey.

### Helm

- Helm is the package manager for Kubernetes.
- You can install various software into the k8s cluster with Helm. From infrastructure like databases(redis, mysql etc) to applications(cert-manager, grafana etc)
- Helm installs charts into Kubernetes, creating a new release for each installation. And to find new charts, you can search Helm chart repositories.
- You can search [the Artifact Hub](https://artifacthub.io/){:target="_blank" rel="nofollow"} to view the various helm charts available.
- While Helm templating is a popular option for configuration management, [Kustomize](https://kustomize.io/){:target="_blank" rel="nofollow"} is a better alternative for templating.

```bash
helm search hub wordpress # search software in the Artifact hub.
helm install happy-panda bitnami/wordpress 
helm status happy-panda
# upgrade helm chart with different values.
helm upgrade -f panda.yaml happy-panda bitnami/wordpress
helm get values happy-panda
helm  search repo -l
helm uninstall happy-panda
helm list # see all of your currently deployed releases
```

### k9s

- [k9s](https://k9scli.io/){:target="_blank" rel="nofollow"} is a terminal based UI to interact with your Kubernetes clusters.
- With k9s, you dont need to remember cli commands to navigate through your cluster.

## Whats next ?

This mindmap was created for Azure Kubernetes Service(AKS) which is a managed cloud service.
But many of the branches here are applicable for k8s in general. The k8s ecosystem is like the rabbit hole from "Alice in Wonderland". It goes on. It can be a long journey to master k8s but its fun !

!["aks-mindmap"](/assets/images/k8s/aks-mindmap.webp "aks-mindmap")
Image source : <https://stanislas.io/2021/09/08/mindmap-azure-kubernetes-service-september-21/>{:target="_blank" rel="nofollow"}
