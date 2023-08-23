# Strava
This is a lightweight strava client as a playground for learning tech like `react-query`, `vite`, and others.

The back end is `vite-express` over https. It handles user auth and proxies requests to the strava API with the auth token.

The front end is `react`, `react-query`.

# Live
This is deployed at 

# Deploy
To run this yourself you will need 

1. Get a Strava API key. Create a `.env` file containing:
```
CLIENT_ID=XXXXXX
CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

2. HTTPS certificatess, in `/certs/`

# TODOS
- more network erorr handling
- refresh tokens on strava

# Bugs
- login auth refresh loop
