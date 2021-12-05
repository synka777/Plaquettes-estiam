const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = express.Router();
const db = require('./kernel/db');

// User management
const permissionsRoutes = require('./routes/user-management/permissionsRoutes')
const tokenMgmtRoutes = require("./routes/user-management/tokenRoutes.js");
const usersRoutes = require("./routes/user-management/usersRoutes.js");
const rolesRoutes = require('./routes/user-management/rolesRoutes.js');

// Programs
const cursusRoutes = require('./routes/programs/cursusesRoutes.js')
const commonBasesRoutes = require('./routes/programs/commonBasesRoutes');
const baseCoursesRoutes = require('./routes/programs/baseCoursesRoutes');
const specialtiesRoutes = require('./routes/programs/specialtiesRoutes');

// Misc
const technologiesRoutes = require('./routes/misc/technologiesRoutes.js');
const certificationsRoutes = require('./routes/misc/certificationsRoutes.js');
const campusesRoutes = require('./routes/misc/campusesRoutes.js');

// Enterprises
const committeeMembersRoutes = require('./routes/enterprises/committeeMembersRoutes');
const partnersRoutes = require('./routes/enterprises/partnersRoutes.js');



db.connect();

router.get('/', (req, res) => {
    res.write('ROOT');
    res.write(`
        Available routes:
        /users
        /roles
        /token
        /campuses
        /cursuses
        /partners
        /permissions
        /technologies
        /certifications
        /specialty-elems
        /common-base-elems
        /committee-members
        /base-program-elems

        Each route includes basic CRUD endpoints.

        To test this API, you can use the Insomnia REST client (similar to Postman):
        https://updates.insomnia.rest/downloads/windows/latest?app=com.insomnia.app&source=website


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
app.use('/base-course-elems', baseCoursesRoutes);
app.use('/specialty-elems', specialtiesRoutes);
app.use('/certifications', certificationsRoutes);
app.use('/common-base-elems', commonBasesRoutes);
app.use('/committee-members', committeeMembersRoutes);

module.exports = app;