import express from "express";
import https from 'https';
import ViteExpress from "vite-express";
import fs from 'fs';
import axios from 'axios';
import cookieParser from 'cookie-parser';

const app = express();

const HTTPS_PORT = 4043;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
const API_BASE_URI = 'https://www.strava.com/api/v3';

console.log("client id is", CLIENT_ID)

const privateKey = fs.readFileSync(__dirname + '/../../certs/RSA-privkey.pem', 'utf8');
const certificate = fs.readFileSync(__dirname + '/../../certs/RSA-cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// TODO: can I reference / fallback to the vite.config.ts?
const server = https.createServer({ ...credentials, }, app).listen(HTTPS_PORT)
ViteExpress.bind(app, server);

app.use(cookieParser())
app.use(express.json()) // for parsing application/json

app.get('/stravaAuth', function (req, res) {
    res.redirect(`https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&scope=activity:write,activity:read&redirect_uri=https://pabonet.duckdns.org:4043/oauth_callback`)
})

app.get('/logout', function (req, res) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME)
    res.redirect('/');
})

app.put('/update_activity', function (req, res) {
    const accessToken = req?.cookies?.[ACCESS_TOKEN_COOKIE_NAME];

    if (!accessToken) {
        res.send(401);
    }
    
    // ditching `id` field in cloned object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, ...data} = req.body
    console.log("activity body: ", data);

    if (req.body.id) {
        axios.request({
            method: 'put',
            url: `${API_BASE_URI}/activities/${req.body.id}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data
        }).then((updateResponse)=> {
            console.log("success", updateResponse.data)
            res.json(updateResponse.data);
        }).catch(error => {
            console.log("update failed", error)
            res.send(JSON.stringify(error));
        })
    }
});

app.get('/activities/:id', function (req, res) {
    const accessToken = req?.cookies?.[ACCESS_TOKEN_COOKIE_NAME];

    if (!accessToken) {
        res.sendStatus(401);
        return;
    }

    axios.request({
        method: 'get',
        url: `${API_BASE_URI}/activities/${req.params.id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => {
        res.json(response.data);
    });
});


app.get('/last_activities', function (req, res) {
    const accessToken = req?.cookies?.[ACCESS_TOKEN_COOKIE_NAME];

    if (!accessToken) {
        res.sendStatus(401);
        return;
    }

    const HOURS_TO_LOOK_BACK = 500;

    const lastActivities = (Date.now() - (HOURS_TO_LOOK_BACK * 1000 * 60 * 60)) / 1000;

    axios.request({
        method: 'get',
        url: `${API_BASE_URI}/athlete/activities?after=${lastActivities}`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(activitiesResponse => {
        res.json(activitiesResponse.data);
    });
});

// https://pabonet.duckdns.org/oauth_callback?state=&code=dad0d4fb11f43c34c9366d1605a695b9ad90de1a&scope=read,activity:write
app.get('/oauth_callback', function (req, res) {
    console.log(req.query);

    axios.post('https://www.strava.com/oauth/token', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code'
    }).then(tokenResponse => {
        const accessToken = tokenResponse.data.access_token;

        res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
            maxAge: 900000,
            secure: true,
            sameSite: true,
            // this would prevent some xss but makes it harder to tell if you're logged in
            // httpOnly: true
        });

        res.redirect('/');
    }).catch(error => {
        console.log(`ERROR in token POST: ${error}`);
        res.send(JSON.stringify(error));
    })
});

// POST https://www.strava.com/oauth/token with its client ID and
//  client secret to exchange the authorization code for a refresh token and short-lived access token.
