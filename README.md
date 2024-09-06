# Assessment

Simple sports management application

## Features

- User authentication
- User authorization (admin and user roles)
- Management of sports classes for administrators (CRUD)
- Sports class filtering for users
- Users applying to sports classes
- API documentation with Swagger on http://localhost:3000/swagger

## Starting the application

Two files are required:

- .env
- .dockerenv

Create both of them in the root folder of the app.

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
## Notes

### Postman

Because this app uses JWT for authentication and authorization, I recommend that you test the endpoints using Postman in order to save the JWT token for further requests.

### Using the app

A user needs to be created first. There are two endpoints for this purpose. One is `/api/auth/signup` for creating normal users. The other is for testing purposes to create an admin account `/api/auth/admin`

## Additional info

The backend application and the database are dockerized.

API documentation available through Swagger after starting the application on http://localhost:3000/swagger

Database management available through PGAdmin running on http://localhost:8888
