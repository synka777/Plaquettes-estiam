const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = express.Router();
const db = require('./kernel/db');

const tokenMgmtRoutes = require("./routes/tokenRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const rolesRoutes = require('./routes/rolesRoutes.js');
const cursusRoutes = require('./routes/cursusesRoutes.js')
const partnersRoutes = require('./routes/partnersRoutes.js');
const permissionsRoutes = require('./routes/permissionsRoutes')
const technologiesRoutes = require('./routes/technologiesRoutes.js');
const certificationsRoutes = require('./routes/certificationsRoutes.js');
const campusesRoutes = require('./routes/campusesRoutes.js');
const committeeMembersRoutes = require('./routes/committeeMembersRoutes');

db.connect();

router.get('/', (req, res) => {
    res.write('ROOT');
    res.write(`
        Available endpoints:
        /users
        /roles
        /token
        /campuses
        /cursuses
        /partners
        /permissions
        /technologies
        /certifications
        /committee-members
    `);
    res.send();
})

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/', router);
app.use('/users', usersRoutes);
app.use('/roles', rolesRoutes);
app.use('/token', tokenMgmtRoutes);
app.use('/cursuses', cursusRoutes);
app.use('/campuses', campusesRoutes);
app.use('/partners', partnersRoutes);
app.use('/permissions', permissionsRoutes);
app.use('/technologies', technologiesRoutes);
app.use('/certifications', certificationsRoutes);
app.use('/committee-members', committeeMembersRoutes);

module.exports = app;