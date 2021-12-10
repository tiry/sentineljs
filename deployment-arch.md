
### Deploymemt architecture

#### WebApp

I would probably host the web-tier on a S3 bucket with static hosting:

 - cheap
 - leverage cloud-front for localized access point and caching 


#### API Server

The NodeJS Server could be deployed in a K8S pod:

 - we should already have the healthcheck available
 - we can use a simple HPA to scale-out dynamically based on CPU or RPS

#### Storage tier

I would use docker-compose for local dev.

For test/integration environments (and potentially preview envs attached to PullRequests) I would have a go for a fully K8S based deployment:
 - use MongoDB Helm Chart to deploy MongoDB in a Statefullset
 - use Minio 

For pre-prod and prod, I would probably to for the PaaS solutions:

 - use MongoDB Atlas or AWS DocumentDB
 - use S3

In addition of the "peace of mind" provided by PaaS:

 - backup/restore and DRP are basically built-in
 - we can leverage full encryption easily

#### Http Entry point

I would probably add an AWS API Gateway/WAF in front of the platform:

 - to add an additional control layer
 - to be able to act fast in case of security concerns


### Scalability

#### Processing

For the scalability of processing, we can start with a simple HPA on the nodejs server.

Not having extended experience with nodejs, I am not sure if the "native async" handling will be enough to handle a huge load and back-pressure or if introducing a real queuing/streaming infrastructure would be needed.

In real life, I would expect that the OpenCV would end up being the bottleneck and adding some queuing would allow to handle the load without having to super-scale the cluster.

#### Data

I suspect that S3 scalability does not need to be explained.

For MongoDB, I tested the database with multiple billions of records and multiple TB.

Scalability is not immediate, but we can easily adjust the cluster sizing and topology as needed.
One of the great point when using PaaS Services is that most of these changes can be done online without interrupting the service.

### Security

 - WAF to filter api endpoint
 - Deploy something like ThreadStack to monitor the nodes
 - Store all credentials in K8S Secret when direct IAM is not possible

At least for S3 access, we should be able to leverage instance roles.

We probably should also vet the base image used for building Docker containers to have a centralized control over the underlying software stack.

We should also add dependecies check inside CI to break if dependencies are wrong.

NB: my current dependencies are not clean.

### Maintaining parity between envs

Keep the principle of Immutable containers:

 - sign container before pushing to ECR
 - ensure signatures are consistent across envs

Ensure that everything is fully automated: pre-prod or prod deployments should be CI driven only.

### Things to improve

**Check Async**

Verify that we have a consistent manner to manage async (ie callback vs promises vs async/await).

Define if a real queuing system would be needed.

**Plug OpenCV for real**

Integrate [opencv-express](https://github.com/justadudewhohacks/opencv-express) ?

**Load & HA Testing**

Do a loadtesting to check system behavior (i.e. [Gatling](https://gatling.io/)).

Check how the system behaves if we kill services (i.e. Chaos Monkey style).

