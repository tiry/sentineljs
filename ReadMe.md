
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

...

### WorkLod

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

#### Step4






