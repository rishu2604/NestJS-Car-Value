<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Creating an entity
1. Create an entity file and create a class in it that lists all the properties that your entity will have.
2. Connect the entity to its parent module. This creates a repository.
3. Connect the entity to the root connection (in app module).


## Custom data serialization
### NestJs recommendation
- use `@Exclude()` from `class-transformer`
- use `@UseInterceptors(ClassSerializerInterceptor)` from `'@nestjs/common'`
- #### Downside to this approach
  - Cannot customize the exclude directive i.e. sending data based on who is the user or from which route handler the incoming requests is coming from.

- #### Solution to serialization
  - Make custom interceptors.
  - And wire them up with the DTOs.

    ```
      class CustomerInterceptor{
        intercept(context: ExecutionContext, next: CallHandler)
      }
    ```

    `intercept` method is called automatically anytime our interceptor needs to run. So handle some incoming request or outgoing response. 
    `context: ExecutionContext` : Information on the incoming request.
    `next: CallHandler` : Kind of a reference to the request handler in our controller.


## implements vs extends
- `implements` is not the same as `extends`.
- We make use of `extends` whenever we are subclassing an existing class.
- We make use of `implements` anytime we want to create a new class that satisfies all the requirements of either an abstract class or an interface.