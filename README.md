![Docker Build & Push](https://github.com/iamtito/weatherApp/workflows/Docker%20Build%20&%20Push/badge.svg)

## Weather App

Enter the city and the weather report will get generated
## Deployment
This uses github actions for the push, it listes on push request to the repository and triggers a docker build. Once build is completed, it pushes it to docker hub to be used by the kubernetes' deployment.

We use ansible to run the kubenetes deployment. cd into the `deploy` folder and 
```
$(which ansible-playbook) playbook.yml -i ec2.py -l "tag_Name_deployer" -u ubuntu
```
 Using tag_Name_deployer as oppose to the general host list maintenance is ideal as we can dynamically target the specific instance
`tag_Name_deployer` - this represent the Name = deloyer tag in my aws ec2
##
[Click To learn more about dynamic inventory](https://docs.ansible.com/ansible/latest/user_guide/intro_dynamic_inventory.html)

A kubernetes cluster can be setup for this project if you wish to setup your own higly scalable fault tolerant k8s cluster.
run the `deploy/create-k8s-cluster.sh`
KOPS Cluster Customizable Script
Setting up a scalability and fault tolerance Kubernetes Cluster in AWS Ubuntu Instance
A Master Node will be setup
3 Auto scalable Nodes Will be created an attached to the Master Node(A new node will get created if destroyed)
Assuming a role with the below policy has been attached to the instance where this script runs.
 - AmazonRoute53FullAccess
 - AmazonEC2FullAccess 
 - AmazonVPCFullAccess
 - AmazonS3FullAccess
 - IAMFullAccess 

For stronger ssh security we are using 4096 bit secure key

The deploy folder also has a file called `ssh-key-deploy.yml` which deploy specified ssh key to the inteded instance,also using dynamic ansible inventory for this as oppose to maintaining an hostlist.

The deploy folder also has a file called `ldap-server.yml` which creates an ldap server and associated security group along side with an optional key creation,also using dynamic ansible inventory for this as oppose to maintaining an hostlist.

----
#### Improvement
This readme will be improved to include how to dynamically create infrastrututre using Terraform and Github Action CI/CD

Add more feature to the weatherApp such as news feature
