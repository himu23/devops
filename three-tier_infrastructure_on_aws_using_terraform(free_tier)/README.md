layer1: networking layer
-vpc
-subnets(public and private)
-internet gateway and nat gateway
-route tables
layer2: application layer
-ec2 instances in private subnet(backend)
-ec2(or load balancer) in public subnet(frontend)
layer3: data layer
-rds(mysql/postgresql) in private subnet
