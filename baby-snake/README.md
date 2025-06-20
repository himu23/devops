# devops
entire devops pipeline locally on my ubuntu 24.04 system. using: github, jenkins, docker, kubernets, prometheus + grafana.

steps: installed docker, jenkins locally
jenkins port: http://localhost:8080
to get initial password: sudo cat /var/lib/jenkins/secrets/initialAdminPassword

install minikube(local K8s)
install kubectl (K8s CLI)
 linking docker and kinikube
 🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
himu23@ideapad3:~/Desktop/projects/devops$ kubectl get nodes
NAME       STATUS   ROLES           AGE     VERSION
minikube   Ready    control-plane   5m27s   v1.33.1

add a project to this folder. i have added my snake game (https://himu23.github.io/babysanke/)


himu23@ideapad3:~/Desktop/projects/devops/baby-snake$ docker images | grep baby-snake
baby-snake                                latest     6f4c3d6c81a4   About a minute ago   1.1GB

himu23@ideapad3:~/Desktop/projects/devops/baby-snake$ kubectl get pods
NAME                          READY   STATUS             RESTARTS   AGE
baby-snake-79f544ffc4-rrlz4   0/1     ImagePullBackOff   0          109s
// wait for few seconds, the cactual problem was this line was missing from k8s/deployment.yaml/conatiner  "imagePullPolicy: Never"

himu23@ideapad3:~/Desktop/projects/devops/baby-snake$ kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
baby-snake-55bf987859-529vp   1/1     Running   0          5s

minikube service baby-snake-service is running on http://192.168.49.2:30082/ locally

key things done:
-docker build(inside minikube)
-kubernetes deplyment & service
-load-balanced access using minikube service

next i will do
- ci/cd with jenkins(local)
-monitoring with prometheus + grafana
-github integration

to see whats running on a port
sudo lsof -i :8080
