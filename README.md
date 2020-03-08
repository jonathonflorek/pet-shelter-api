# Pet Shelter API

Implementation of the Pet Shelter Api for the Pet Weather Programming Take Home Challenge.

An API spec is defined at `pet-shelter.openapi.yaml`.

Express + TypeORM + Postgres

## How to develop

When running locally, the server is launched with environment variables provided in the `/.env` file. A sample is provided in `/examples`. Tests are run with environment variables in `/test.env` - make sure these point to different databases or the test runner will truncate your debugging database.

Since this application uses geographic queries, you will have to enable postgis on your test and main database. The query `CREATE EXTENSION postgis;` will do this for you if you have installed postgis (use StackBuilder to install postgis if you have not done so). On databases created after postgis was installed this query ay not be necessary. Use `SELECT postgis_full_version();` to verify that postgis is installed.

Key NPM scripts:
- `npm start`: starts the built app without any fuss (or environment variables)
- `npm run build`: builds the project
- `npm run start:dev`: builds and starts with environment variables from `/.env`
- `npm run test`: runs tests with environment variables from `/test.env`
- `npm run migration:revert`: reverts the most recently applied TypeORM migration.
- `npm run migration:generate <name>`: builds the application, runs all existing migrations, and then generates a new migration to apply changes to the schema in `src/models`.
- `npm run migration:run`: builds the application and runs all migrations

TypeORM is configured to use the same environment variables in `/.env` as the running application uses.

## Deploying Locally

- clone the repository
- ensure `/.env` exists and defines the environment variables described in `/examples/.env`
- run `npm install`
- run `npm run start:dev` to build and run

## Deploying to Heroku

```
heroku create
heroku addons:create heroku-postgresql:hobby-dev --version=12
git push heroku master
```
