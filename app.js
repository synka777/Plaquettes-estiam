const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = express.Router();
const db = require('./kernel/db');

const tokenMgmtRoutes = require("./routes/token.js")
const partnersRoutes = require('./routes/partners.js');
const technologiesRoutes = require('./routes/technologies.js');
const certificationsRoutes = require('./routes/certifications.js');

db.connect();

router.get('/', (req, res) => {
    res.write('Partenaires');
    res.write(`
        Available endpoints:
        /token
        /partners
        /technologies
        /certifications
    `);
    res.send();
})

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/', router);
app.use('/token', tokenMgmtRoutes);
app.use('/partners', partnersRoutes);
app.use('/technologies', technologiesRoutes);
app.use('/certifications', certificationsRoutes);

module.exports = app;