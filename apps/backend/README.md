# DatAtlas API

## Getting started

```
nx serve backend
```

## Open API documentation (formerly known as **Swagger**)

The documentation is reachable at http://localhost:3333/api/

Please note that most routes require an authentication.
Reach it out via this route `/api/auth/login` and sending the following payload :

```json
{
  "email": "admin@example.org",
  "password": "admin"
}
```

> _Credentials are the one in your `.env` file._
