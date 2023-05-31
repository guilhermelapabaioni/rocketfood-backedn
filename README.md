# RocketFood Backend

> Status: Complete 🔓

### It is a API from RocketFood application, planned by RocketSeat and developed by me.

## User fields:

+ id
+ name
+ email
+ password
+ role

## Food Fields:

+ id
+ user_id
+ image
+ name
+ category
+ price
+ description

## Ingredients Fields:

+ id
+ food_id
+ name

## Technologies Used:

* NodeJS and libs (express and others)
* SQLite
* Knex
* JWT (jsonwebtoken)
* PM2
* Jest

How to run the application:

1) download the app;
2) create file .env (can copy from .env.example);
3) migrate tables food and ingredients with knex: "npm run migrate";
4) run the project "npm run dev" or "npm run start";
* Obs.: The table users is created when you running the project the first time.
