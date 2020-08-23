const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const axios = require('axios');

const app = express();

const rateLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 10
});

const speedLimiter = slowDown({
    windowMs: 2 * 60 * 1000,
    delayAfter: 2,
    delayMs: 500
});

const corsOptions = {
    origin: '*'
}

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/proxy/:dataType/*', rateLimiter, speedLimiter, async (req, res, next) => {

    const dataType = req.params['dataType'];

    const conditions = ['xml', 'json', 'html'];
    if (conditions.indexOf(dataType) === -1)
        next(new Error('Specify correct data type [xml,json,html]'));

    try {
        const TARGET_URL = req.originalUrl.replace(`/proxy/${dataType}/`, "");
        if (TARGET_URL.length < 4) next(new Error('Url too short!'));

        const axiosData = await axios(TARGET_URL);
        switch (dataType) {
            case 'xml':
                res.set('Content-Type', 'text/xml');
                res.send(axiosData.data);
                break;
            case 'json':
                res.json(axiosData.data);
                break;
            case 'html':
                res.set('Content-Type', 'text/plain');
                res.send(axiosData.data);
                break;
            default:
                next(new Error('Impossibru!'));
        }

    } catch (error) {
        next(error);
    }
});

app.get('*', (req, res) => {
    res.send(`<a href="javascript:window.location=window.location.origin">Are you lost?</a>`);
});

app.use((err, req, res, next) => {
    res.status(400).send({
        error: err.message
    });
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Port: ${PORT}/`);
});