
### Principles & Initial Design

#### Components

 - API Server: will expose a rest API
 - Services: encapsulate logic 
    - OpenCV BoundingBox managemnt
    - Storage of JSON and Blobs

#### Implementation 

This project will use JavaScript.
Although I had the opportunity to write a lot of javascript for several years, I have never started a backend project in NodeJS: seemed like a good opportunity to test and see how it goes.

This way, whatever the outcome, I will have learned something.

In terms of framework, not sure what the latest hipster framework is, but I will go for something simple with Express.

It seems (for now) like a good choice because:

 - I do not need to do complex stuffs : express shoule be enough
 - I expect the framework to be lighweight enough to not get in the way

### Build & Run

Install dependencies

    npm install

Starting the server:

    npm start

Running tests

    npm test

### WorkLog

#### Step1 - Bootstrap

Initialize the app skeleton.

Use `express-generator` for that and cleanup everything that is not needed.

Only expose 2 endpoints:

 - API endpoint
 - healthcheck endpoint

Both  implementations are for now empty.

#### Step2 - Enable file upload

Added a few modulees to help handling file upload ( [ref](https://attacomsian.com/blog/uploading-files-nodejs-express)):

 - express-fileupload
 - cors (not I will need this, but likely to make testing easier)

Upload seems to work.
Did not add any specific security check (like type or size): should be ideally handled at the WAF/API Gateway level.

#### Step3 - Add services

 - Implementing a dummy version of the storage service 
    - basically just define the "interface" and the flow
 - Implement the fake opencv service
    - just returns randomized hard-coded data
 - Add some unit tests
    - Add Mocha and Chai to have minimal support for unit tests.

For now, everything is synchronous, but it will probably need to change.
 
May want to take a look at [opencv-express](https://github.com/justadudewhohacks/opencv-express), but for now, the fake impl should be enough.

#### Step4 - Add Persistence Layer - Blob

For Blob storage, S3 sounds like a no-brainer:

 - ubikuous in the cloud (all cloud providers have S3 compliand API)
 - can scale massively 
 - safe and durable
 - multiple pricing tiers
 - most AWS Services will use S3 as input/output

S3 is clearly not cheap, but compare to the equivalent storage on EBS or worst on a database, this is clearly much better.

For this project, because I do not want direct dependencies on AWS infrastructure, I will use the AWS S3 client but with a fake S3 provided by [Minio](https://docs.min.io/docs/how-to-use-aws-sdk-for-javascript-with-minio-server.html).

To start minio locally:

    docker-compose -f minio-stack.yaml up

Minio Console will be available at http://127.0.0.1:9001/login (minioadmin/minioadmin)

NB: Everything was tested under Linux with native Docker - on other systems using a VM to run docker you may need to do some network bridging.

I initially tried to use `@aws-sdk/client-s3` but falled back to `aws-sdk`: it seems "faking" the security context is easieer with the previous version of the sdk ...

Need to add support for configuration: just used a `config.js` file.

NB: the target bucket is consigured to be called "cassettes" and it needs to be created although the unit test will attempt to create it.

NB2: XXX - Minio tests are not super stables and will sometimes fails, I think because of async behavior - will fix later.

### Step5 - Add Meta-data persistence

For meta-data persistence I will use MongoDB:

 - native JSON store
   - flexible schemas : can easily add new data after-the-fact
 - scales
    - scales up (memory/cpu)
    - scales out via Sharding
 - supports complex queries and aggregates (although not really needed at this point)

The only drawback is that a producting ready MongoDB cluster is not that cheap especially when using Atlas or AWS DocumentDB.

For dev, I will use a simple container deployment, basically using a single node MongoDB.

Added `mongodb` package to the npm dependencies list.

For testing, I use the default public MongoDB image and mongoexpress to do the initial setup:

To start mongodb/mongo-express/minio locally:

    docker-compose -f storage-stack.yaml up

mongo-express Console will be available at http://127.0.0.1:8081 (root/secret)

In terms of storage layout, the code uses:

 - database: sentinel
 - collection: cassettes

The DB and the Collections need to be created using mongo-express.

For now, the cassette data is stored as a single BSON object inside the `cassettes` collection.
We use the "cassette picture"'s digest as a key for the object `_id`: this way the picture digest is the primary uniq key for both the blobstore and the db.

MongoDB js client is async, so services need to be async too: will use the async/await pattern as much as posssible to avoid mixing models.













