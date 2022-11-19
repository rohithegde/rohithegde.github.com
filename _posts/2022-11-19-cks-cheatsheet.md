---
layout: post
title: "CKS Cheatsheet"
#category: general
tags: [kubernetes, certification]
comments: true
---

A cheatsheet to prepare for the final exam of the k8s triad - CKS in 2022. Helped me a lot in nailing the CKS exam as there are a lot of tools involved here. This post helps in summarizing all of them. You can read my blog on preparing for CKS [here]({{ site.url }}/2022/11/20/cks-preparation).

<!-- TOC -->

- [Techniques](#techniques)
    - [Ways to get secret](#ways-to-get-secret)
        - [From inside a pod](#from-inside-a-pod)
        - [From worker node](#from-worker-node)
        - [From master node](#from-master-node)
- [Linux Commands](#linux-commands)
    - [crictl](#crictl)
    - [strace](#strace)
    - [proc folder](#proc-folder)
    - [Search](#search)
    - [netstat](#netstat)
    - [lsof](#lsof)
    - [systemctl](#systemctl)
- [Tools](#tools)
    - [kube-bench](#kube-bench)
    - [gVisor](#gvisor)
    - [OPA Gatekeeper](#opa-gatekeeper)
    - [Kubesec.io](#kubesecio)
    - [OPA ConfTest](#opa-conftest)
    - [Clair](#clair)
    - [Trivy](#trivy)
    - [Falco](#falco)
    - [AppArmor](#apparmor)
    - [seccomp](#seccomp)
- [API Server Manifest changes](#api-server-manifest-changes)
    - [RBAC](#rbac)
    - [PodSecurityPolicy](#podsecuritypolicy)
    - [ImagePolicyWebHook](#imagepolicywebhook)
    - [Audit Policy Logging](#audit-policy-logging)
    - [Secret encryption](#secret-encryption)

<!-- /TOC -->

## Techniques

### Ways to get secret

#### From inside a pod

- Exec into the pod and look into env cmd for secrets as env var.
- Exec into the pod and look into mount cmd for mounted secrets.

#### From worker node

- `crictl ps` to get containers and pods.
- `crictl inspect CONTAINERID` to get secrets as env vars OR mounted paths from host. 
- Can also get pid from above cmd and then search in the `/proc/PID_NUMBER/environ` file OR `/proc/PID_NUMBER/fd/SOME_NUMBER`.

#### From master node

- Get certs from `/etc/kubernetes/pki` folder.
- Use `ETCDCTL` cmd to get secret.

## Linux Commands

### crictl

- CLI for CRI-compatible container runtimes which can be used to inspect and debug container runtimes and applications on a Kubernetes node.
- Works well with logs and tools like Falco which log container id.
- Cmd
  - `crictl ps` - Gives pod name, pod id and container id.
  - `crictl ps | grep CONTAINER_ID`
  - `crictl ps -id CONTAINER_ID` - Similar to crictl ps output but with headers.
  - `crictl pods -id POD_ID` - Gives pod name, pod id and k8s namespace.
  - `crictl inspect CONTAINER_ID`

### strace

- Chapter - Runtime Security
- Intercepts and logs system calls and signals.
- Cmd
  - `strace ls`
  - `strace -cw ls` - count and summarise cmd outputs
  - `strace -p 3502`
  - `strace -p 1234 -cw -f`
    - `-f` is very important here. Allows for fork processed...else it will show blank for lots of api calls made from process being examined (k8s API server). Ctrl c to stop and see.

### proc folder

- Chapter - Runtime Security
- Storage of processes and communications with kernel.
- Cmd
  - `cd /proc/3502/exe`
  - `cd /proc/3502/fd && cat 7 | strings | grep SECRETVALUE -C10`
    - Eg of cmd to find secret value stored recently in ETCD.
  - `cat /proc/28696/environ`
    - View env values including secrets of pod. PID can also be obtained via `pstree -p`.

### Search

- Cmd
  - `find FOLDER_PATH | grep FILE_NAME`
  - `grep -r “NEEDLE”`
  - `grep -E “NEEDLE1|NEEDLE2”`

### netstat

- Chapter - System hardening
- Cmd
  - `netstat -plnt | grep 22`

### lsof

- Chapter - System hardening
- Cmd
  - `lsof -i :22`

### systemctl

- Chapter - System hardening
- Similar to `service` cmd but format is different with action as 2nd word and noun as 3rd word.
- Cmd
  - `systemctl status falco`
  - `systemctl stop falco`
  - `systemctl start falco`
  - `systemctl restart falco`
  - `systemctl disable snapd`
  - `systemctl list-units`

## Tools

### kube-bench

- Cluster setup
- Open source cluster scanner.
- Can scan specific parts of the cluster.
- Cmd
  - `kube-bench run --targets=master`
  - `kube-bench run --targets=master –check=1.2.20`
- Ideal for IaC CI (post deployment or embedded inside integration test).

### gVisor

- Chapter - Microservice vulnerabilities.
- User space sandbox for containers.
- RuntimeClass resource for setting it up and linking to pod.
- Runtime : runsc
- Alternative : Kata containers (VM based).

### OPA Gatekeeper

- Chapter - Open Policy Agent
- Open source policy engine.
- 2 CRDs - ConstraintTemplate and the CRD on the name of the ConstraintTemplate.
- Requires Rego code to be embedded inside ConstraintTemplate.

### Kubesec.io

- Chapter - Supply chain Security
- Open source static code scanner.
- Cmd
  - `kubesec scan pod.yaml`

### OPA ConfTest

- Chapter - Supply chain Security
- Open source code scanner.
- Need to write Rego code for tests.

### Clair

- Chapter - Supply chain Security
- Container scanner (not image !)

### Trivy

- Chapter - Supply chain Security
- Image scanner.
- Cmd
  - `trivy image nginx`

### Falco

- Kernel tracing.
- Add security rules to detect unwanted calls and automate response.
- Built-in vars which can be used in security rules : Supported Fields for Conditions and Outputs | Falco. - Might help in remembering commonly used vars like `evt.time`, `container.id`, `k8s.pod.name` etc.
- Important files
  - /etc/falco/falco.yml` - config and log path (eg : `/var/log/syslog`).
  - `/etc/falco/falco_rules.yaml`
- Cmd
  - `tail -f /var/log/syslog | grep falco`

### AppArmor

- Chapter - System hardening
- Kernel hardening tool.
- Kernel space sandbox for containers.
- Can be used for containers.
- For containers inside k8s pods, use annotation at pod metadata for each container and link to AA profile name.
- Important files
  - `/etc/apparmor.d`
- Cmd
  - `aa-status`
  - `aa-genprof curl`
  - `aa-complain`
  - `aa-enforce`
  - `aa-logprof`
  - `apparmor_parser PATH_TO_AA_CONFIG`
  - `docker container run --security-opt apparmor=AA_PROFILE_NAME -d nginx`

### seccomp

- Chapter - System hardening
- Kernel hardening tool.
- Kernel space sandbox for containers.
- Moved away from pod annotation to SecurityContext for linking workloads.
- Config json file kept in folder and linked to pod SecurityContext.
- Important folders
  - `/var/lib/kubelet/` - storage of config json file to be referenced in pod.

## API Server Manifest changes

Note - Changes in the manifest will not delete services. You will have to delete them manually so that they can be automatically recreated by the kubelet monitoring the manifests.

### RBAC

- Chapter - Cluster hardening
- Authorization mode.
- Linked to api server manifest
  - `--authorization-mode=Node,RBAC`

### PodSecurityPolicy

- Chapter - Microservice vulnerabilities
- Admission Controller for ensuring pods follow specific rules.
- Linked to api server manifest 
  - `--enable-admission-plugins=PodSecurityPolicy`
- **Deprecated**. So wont find any document on it except the API ref doc which might help. Better to use an existing psp in the cluster.

### ImagePolicyWebHook

- Chapter - Supply chain Security
- Admission Controller for ensuring rules on images downloaded.
- Linked to api server manifest 
  - `--enable-admission-plugins=NodeRestriction,ImagePolicyWebHook`
  - `--admission-control-config-file=PATH_TO_JSON_OR_YAML_FILE`
- Add the directory to the host and mount attributes of yaml.
- The yaml or json should reference a kubeconfig file.
- Ensure the above kubeconfig file has the right remote server for checking image and k8s cluster info.

### Audit Policy Logging

- Chapter - Runtime Security
- Linked to api server manifest 
  - `–audit-policy-file=/etc/kubernetes/audit/policy.yaml`
  - `--audit-log-path=/etc/kubernetes/audit/logs/audit.log`
  - `--audit-log-maxage=1`
  - `--audit-log-maxbackup=5`
  - `--audit-log-maxsize=500`
- Add the policy file to the host and mount attributes of yaml.
- Add the logs directory to the host and mount attributes of yaml.

### Secret encryption

- Chapter - Microservice vulnerabilities
- Config Linked to api server manifest
  - `--encryption-provider-config=/etc/kubernetes/enc/enc.yaml`
- Add the EncryptionConfiguration folder to the host and mount attributes of yaml.
