const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const teacherDashRoutes = require('./teacherDashboard-routes')
const studentDashRoutes = require('./studentDashboard-routes')


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/teacherhome', teacherDashRoutes);
router.use('/studenthome', studentDashRoutes);



module.exports = router;