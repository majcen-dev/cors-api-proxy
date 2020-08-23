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

//  app.use(limiter);
//  app.use(speedLimiter);

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/proxy/:dataType/*', rateLimiter, speedLimiter, async (req, res, next) => {

    const dataType = req.params['dataType'];

    const conditions = ['xml', 'json'];
    if (conditions.indexOf(dataType) === -1)
        next(new Error('Error: Specify correct data type [xml,json]'));

    try {
        const TARGET_URL = req.originalUrl.replace(`/proxy/${dataType}/`, "");
        const axiosData = await axios(TARGET_URL);

        if (dataType === 'xml') {
            res.set('Content-Type', 'text/xml');
            res.send(axiosData.data);
        } else if (dataType === 'json') {
            res.json(axiosData.data);
        } else {
            next(new Error('Impossibru!'));
        }

    } catch (error) {
        next(error);
    }

});

app.get('*', (req, res) => {
    res.send(`Are you lost?`)
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});