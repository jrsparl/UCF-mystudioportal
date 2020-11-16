const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const teacherDashRoutes = require('./teacherDashboard-routes')
const studentDashRoutes = require('./studentDashboard-routes')
// const dashboardRoutes = require('./dashboard-routes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/dashboard', dashboardRoutes)
router.use('/teacherhome', teacherDashRoutes);
router.use('/studenthome', studentDashRoutes);



module.exports = router;