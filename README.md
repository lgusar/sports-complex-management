# Assessment

Simple sports management application

## Features

- User authentication
- User authorization (admin and user roles)
- Management of sports classes for administrators (CRUD)
- Sports class filtering for users
- Applying on sports classes
- Documentation with Swagger on `http://localhost:3000`

## Starting the application

Two files are required:

- .env
- .dockerenv

Both of them are supposed to be in the root folder of the app.

.dockerenv requires defining

- POSTGRES_PASSWORD
- PGADMIN_USER_EMAIL
- PGADMIN_USER_PASSWORD

.env requires defining

- DATABASE_HOST - this should be set to db, unless `docker-compose.yml` is changed
- DATABASE_PORT - this should be set to 5432, unless `docker-compose.yml` is changed
- DATABASE_PASSWORD
- JWT_SECRET

```docker compose --env-file .dockerenv up -d```

## Additional info

The backend application and the database are dockerized.

API documentation available through Swagger after starting the application on `http://localhost:3000/swagger`.

Database management available through PGAdmin running on `http://localhost:8888`