######################################################################################################
## Kabir Bolatito
##
## KOPS Cluster Customizable Script
## Setting up a scalability and fault tolerance Kubernetes Cluster in AWS Ubuntu Instance
## A Master Node will be setup
## 3 Auto scalable Nodes Will be created an attached to the Master Node(A new node will get created if destroyed)
## Assuming a role with the below policy has been attached to the instance where this script runs.
##  - AmazonRoute53FullAccess
##  - AmazonEC2FullAccess 
##	- AmazonVPCFullAccess
##	- AmazonS3FullAccess
##	- IAMFullAccess 
##
## For stronger ssh security we are using 4096 bit secure key
######################################################################################################
export CLUSTER_NAME=iamtito
export BUCKET_NAME=iamtito.bucket
export NAME=${CLUSTER_NAME}.k8s.local
export KOPS_STATE_STORE=s3://${BUCKET_NAME}
export MASTER_SIZE=t2.micro
export NODE_SIZE=t2.medium
sudo apt update -y
sudo apt install wget -y
sudo curl https://s3.amazonaws.com/aws-cli/awscli-bundle.zip -o awscli-bundle.zip
sudo curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
sudo chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
aws s3 mb s3://${BUCKET_NAME}
ssh-keygen -t rsa -q -f "$HOME/.ssh/id_rsa" -N "" -b 4096
source .bashrc
kops create cluster --zones us-east-1a --networking weave --master-size ${MASTER_SIZE} --master-count 1 --node-size ${NODE_SIZE} --node-count=3 ${NAME}
kops create secret --name ${NAME} sshpublickey admin -i ~/.ssh/id_rsa.pub
kops update cluster ${NAME} --yes
kubectl get nodes
kubectl get svc