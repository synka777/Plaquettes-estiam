const express = require("express");
const app = express();
const router = express.Router();
const db = require('./kernel/db');

const partnersRoutes = require('./routes/partners.js');
const technologiesRoutes = require('./routes/technologies.js');
const certificationsRoutes = require('./routes/certifications.js');

db.connect();

router.get('/', (req, res) => {
    res.write('Partenaires');
    res.write(`
        Available endpoints:
        /partners
        /technologies
        /certifications
    `);
    res.send();
})

app.use(express.json());

app.use('/', router);
app.use('/partners', partnersRoutes);
app.use('/technologies', technologiesRoutes);
app.use('/certifications', certificationsRoutes);
module.exports = app;