# Pet Shelter API

Implementation of the Pet Shelter Api for the Pet Weather Programming Take Home Challenge.

An API spec is defined at `pet-shelter.openapi.yaml`.

Express + TypeORM + Postgres

## How to develop

When running locally, the server is launched with environment variables provided in the `/.env` file. A sample is provided in `/examples`. Tests are run with environment variables in `/test.env` - make sure these point to different databases or the test runner will truncate your debugging database.

Key NPM scripts:
- `npm start`: builds and starts
- `npm run migration:revert`: reverts the most recently applied TypeORM migration.
- `npm run migration:generate <name>`: builds the application, runs all existing migrations, and then generates a new migration to apply changes to the schema in `src/models`.
- `npm run migration:run`: builds the application and runs all migrations
