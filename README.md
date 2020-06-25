![Docker Build & Push](https://github.com/iamtito/weatherApp/workflows/Docker%20Build%20&%20Push/badge.svg)

## Weather App
A small react weather application that gives the weather update on a city. 

Local setup

```
git clone https://github.com/iamtito/weatherApp.git
cd weatherApp
docker build -t weatherapp:latest .
docker run -it --rm -p 8080:80 weatherapp:latest
```
On your browser, navigate to [localhost:8080](http://localhost:8080)

Note: After cloning update the `.env` file with your `X-RapidAPI-Key` value before building the image. Signup and obtain your api key at https://rapidapi.com/community/api/open-weather-map

Enter the city and the weather report will get generated.

## Deployment
This uses github actions for the build process. The Github Action event listen on push request to the repository and triggers a docker build. Once build is completed, it pushes it to docker hub to be used by the kubernetes' deployment.
The github action can be found in this location: https://github.com/iamtito/weatherApp/actions

We use ansible to run the kubenetes deployment. 
The cluster can be setup using this script: [create-k8s-cluster.sh](https://github.com/iamtito/weatherApp/blob/master/deploy/create-k8s-cluster.sh)
Read through the script and update it to your preference.

cd into the `deploy` folder and 
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
