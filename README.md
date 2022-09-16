## Create a service with NodeJS and Typescript:

Requirements:
* Use **NestJS** as application framework
* **CRUD API** for 2 entities(e.g. Toolbox and Tool)
* Those 2 entities should have **OneToMany** relation between them
* Service should be containerised and have development environment with **Docker** ready to use
* Service/Application should feature one of more commonly known **software architecture pattern**(such as Domain-Driven Design, Clean Code, Hexagon architecture, etc.)
* **Relational** database driver of your choice
* Implement **static analysis** tool(-s) of your choice
* Make **one** endpoint(in addition to CRUD) to modify relation between entities and reassign it to different entity. (e.g. Toolbox has many Tools, so you need to have an endpoint to change Toolbox for singular Tool)
* Write **one test** example. Could be on from any of testing patterns
* Write **minimal instruction** to launch your app 
* Write pseudo code or implement what would **production version** of your application would look like and how it be different from existing version
* *Optional*: Postman or Swagger docs would be a bonus, but not necessary

## Summary

Use **NodeJS** and **Typescript** to create a small service that would feature 2 entity **CRUD API**. Would have connection to **database**. Could be launched from **Docker image**. Would feature one of more known software **architecture patterns**. Would have some **static analysis** tools implemented to keep project tidy. Should have instructions on how to start the service in dev environment and what would be different if it’s ran on production. The goal of the task is to have clear vision on developers experience implementing small scale and horizontally scalable applications.

# Tech stack
  - nestjs
  - postgresql
  - sqitch
  - typeorm
  - jest
  - static analysis/formatter

# Architecture design
  - domain driven design
  - patterns
  - hexogonal architecture
  - Clean code
  - Grasp

# Local application launch
* run docker-compose.postgres.yaml with database and migrations.
  * docker-compose -f ./docker-compose.postgres.yml up -d
* install dependencies
  * yarn --frozen-lockfile
* set .env variables
  * printf "APPLICATION_TOOLBOX_PORT=5000 \nAPPLICATION_TOOLBOX_DATABASE_URL=postgres://postgres:postgres@0.0.0.0:5433/toolbox\nNODE_ENV=development" >> .env
* run app
  * yarn start:dev
  * local app started on http://localhost:5000/ 
* request healthcheck
  * curl localhost:5000/health
* run tests
 * yarn test:e2e

# Containerised application lauch
* run docker-compose file
  * docker-compose up -d
  * containerised app started on http://localhost:3000/ 

# Swagger
* swagger url => /api

## Summary
* Made .gitkeep in order to show exactly how the code structure will look like if events, handlers appear in the application.
