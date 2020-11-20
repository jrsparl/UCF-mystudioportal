const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const teacherDashRoutes = require('./teacherDashboard-routes')
const studentDashRoutes = require('./studentDashboard-routes')
const lessonRoutes = require('./lessonroom-routes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/teacherlessonroom', lessonRoutes)
router.use('/teacherhome', teacherDashRoutes);
router.use('/studenthome', studentDashRoutes);



module.exports = router;