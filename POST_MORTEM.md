# Post Mortem

### Database

* The users table was filled with entries containing varying phone number formats. This can be easily cleaned up with a migration. Then to prevent poorly formatted numbers getting in, I'd add validations on the phone field in the model.
* In the reviews table, some reviews did not have any user_id assigned. Again, a simple model validation to make sure that a user_id is assigned would solve this problem easily.
* In the products table, categories should really be its own table. The short term win is apparent, but long-term it could get hairy creating RESTful paths for categories without needless complexity. Categories are as much a resource as reviews or products. Not to mention you have more flexibility than you would on single field. Also, none of the products had users assigned.
* Another perculiar thing in the products table is the missing user_id value on all the products. I imagine that is left empty for admin assignes to be associated. At least that would be my recommendation.

### Manually testing the endpoints

* Every endpoint had something wrong with it. All of them had some combination incorrect response status and bodies. (resolved)
* Several endpoints were returning 500 status despite actually returning results. (resolved)
* I added endpoints to some of the endpoints. Users should list reviews and products should list reviews. (enhancement)
* There seems to be a disparity between the fields in models and those returned their relative endpoints. Not sure if this is an issue or not, but I'd air on the side of carefully curating which fields to expose on an endpoint.
* I felt building out the remainder of CRUD endpoints was out of scope for this project. But lord, it needs it. POST/UPDATE/DELETE endpoints are where the real fun happens.


### Test Framework

Admittedly its a basic setup. I went with Supertest (API testing library), MochaJS (test runner), and ChaiJS (assertions). I really like Mocha + Chai and I've got a lot of experience in those particular libraries. I chose Supertest because it was simple to get started and allowed me some flexibility in terms of test runner and assertion library. That despite it providing its own assertion tools.


### The Tests

Due to the simplicity of the application itself, I wanted to keep the suite light. Because there is no real functionality in terms of adding content, I validated response data. I added a couple failing tests for possible fixes in the future.

Of course, there is a lot mroe I'd want to add like fake endpoints for testing different error states, basic load tests, and unit tests.


### Conclusion

I had a lot of fun finding all the issues in this project and I'm sure I missed a couple things. But believe I left the app in a much better state than received. There are many ways to evolve the test approach here, but for now this is a good start.

