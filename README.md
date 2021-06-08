# API Proxy
One of the problems today in the technology world is how to control and measure interconnections, or API calls.
For this, I implemented (coded) an "apis proxy" with the following requirements (in
order of importance):
## Requirements
- [x] Perform the proxy function on the domain of the machine, that is, it must act as
an intermediary for customer requests.
- [x] It should allow the control of the maximum number of requisitions by:
  - [x] Source IP
  - [x] Destination path 
  - [x] Combinations of both
- [x] It should store (and also allow to consult) the proxy usage statistics.
## Additional
- [x] The interface for statistics and control should provide Rest APIs.
- [x] A simple architectural design of the solution counts a lot.
- [x] Cache
    

# Understanding the problem

An API proxy is an interface for developers who want to use their backend services. Instead of making them consume these services directly, they access a created API proxy. With a proxy, you can provide resources to increase added value, such as:
 - Safety
 - Analysis
 - Fault handling
 - Cache and persistence
 - Quotas
 - Transformations
 - Monetize

The API proxy isolates the application developer from its back-end service. Therefore, you are free to change the implementation of the service, as long as the public API remains consistent. For example, you can change the implementation of a database, move your services to a new host, or make any other changes to the service's implementation. By maintaining a consistent front-end API, existing client applications will continue to function regardless of changes to the back-end.

You can use policies in the API proxy to add functionality to a service without having to make changes to the backend service. For example, you can add policies to your proxy to perform data transformation and filtering, add security, perform conditional logic or custom code, and many other actions. The important thing to remember is that you implement policies on the Edge, not on your back-end server.

# Solution proposal
To solve the problem, remembering that the need to code is explicit in the text, a structure was created, in JavaScript, that will act as a Proxy in the entire domain `/`, that is, all requests that pass through the machine, in the application in the path `/ *` all middlewares work, to complete the challenge the following middlewares were coded.
 - Logs
    - It will save in a mongodb database in * proxy.logs * a document for each request made that passes through path * / *, saving information such as, `time`,` ip`, and `path` data. Some data from the LOGs can be extracted via the REST API
- Limiters
   - You will be responsible for performing a search in the mongodb database at * proxy.logs * if there are a certain number of calls to a given * path * or * ip * (or the * two *) in a given period of time, if you have exceeded you will receive a return with http status at `429 Too Many Requests`, you will receive a body, with` `` {message: "error", reason: "Too Many Requests", stack: "...}` ` Each call made after this limit will receive a 100ms delay in responses, incremental according to the number of new calls, with the purpose of discouraging attacks.
   - Example of configuration in .env: `LIMMITER_WINDOWMS = 1` /` LIMMITER_MAX = 10000` / `LIMMITER_TYPE = ippath; `, or it can also be done via the REST API, this configuration will validate if, in the last hour, more than 10,000 requests were made using the combination of path + ip, so if a given IP makes more than 10,000 requests in less than one hour for a given endpoint, it will be blocked, while at another endpoint. Do not.
 - Cache
    - It will provide a layer of cache to improve the response time of requests, with the premise that apis that wish to use the cache, should import the cache function and perform a Set of the response obtained. In order for the cache middleware to analyze whether for the requested path, there is a document in the monogdb database at * proxy.cache * where the ** time ** attribute is within the last minute, if it is, it will return to response as the bank document, not making a new call to the endpoint and improving the response time.

All middlewares are executed in the order presented after this, the request is sent to the code inside `api / index.js` where it will evaluate the rest of` path` and if it is one of the configured ones, such as `/ emojis` or` / faqs` or `/ mars-weather`, among others, will forward to the respective api file of each of them. They will perform the necessary actions and make the return in JSON. If it is necessary to add a new API, just add a file with the name of the API and the respective code, as well as its path in `/ api / index.js`.

In addition to the presented middlwares, there are two others that deal with errors and exceptions, and in any middleware if the next (error) function is passed with an error parameter that may be the message that will appear for the clinete at the tip, it will arrive in these middlwares and will be treated and given the answer to the customer. There are only two treatments, for cases of 404, not found and of unshielded exception 500, other codes / treatments must be implemented yet.

A middleware with a very simple concept of security has also been added. The implementation of security in individual APIs or in all of them when applied in the `/ *` path can be evolved, thus it is also possible to perform a limitation by application, creating the concept where a application would receive a token and an application could subscribe to several APIs, and the rules of limitation would be up in the use of the application and not the APIs.
 
### APIs created
 
[project.postman_collection.zip](https://github.com/alrtas/api-proxy/files/6218628/Meli.postman_collection.zip)

### Technologies used

* Node JS (Express API)
* Mongo DB

# Other solutions

* [Apigee](https://cloud.google.com/apigee?hl=en)
* [NGINX Plus](https://www.nginx.com/solutions/api-management-gateway/)
* [Amazon API Gateway](https://aws.amazon.com/en/api-gateway/)


# Example architecture
![image](https://user-images.githubusercontent.com/32065208/112071293-3a7e5580-8b4e-11eb-8729-343668e8c357.png)

# Middlewares
![log_mediator](https://user-images.githubusercontent.com/32065208/112524630-d098c280-8d7e-11eb-84e7-8f82bebf3a95.PNG)
![limiter_mediator](https://user-images.githubusercontent.com/32065208/112525070-469d2980-8d7f-11eb-9c5f-4d1469d692bc.PNG)
![cache_mediator](https://user-images.githubusercontent.com/32065208/112524671-d7273a00-8d7e-11eb-85e5-94ab82721dfc.PNG)


# Improvements
  1. Changing the cache system to use `Redis` instead of` MongoDB`, since Redis is an application that works * in memory * will deliver a performance superior to monogoDB when acting in Cache.
  2. Decouple `/ usage /`, `/ config /`, `/ emojis /` and `faqs / *` in other projects, since the purpose of this script is to generate APIs to verify the use of the proxy api and provide data for the dashboard front-end, it could be running in a separate container, since all usage data is stored in a bank and not in memory.
  3. Perform the rate limit per application, for that it would be necessary to create the application concept, where the developer would create it and receive a token for that application, and then he would subscribe to the APIs that he would like to use in this application, so it would be possible do the monitoring, in addition to the one presented, by ip, path, ip + path but also by the entire application, creating governance rules more focused on the general business and not the api itself.
  4. Create another database to monitor all errors that occur, especially in the try catch blocks.

# Project dependencies
    "axios": "^0.21.1",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "helmet": "^4.4.1",
    "mongodb": "^3.6.5",
    "mongoose": "^5.12.2",
    "morgan": "^1.10.0",
