const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const companyRoutes = require('./company-routes.js');

router.use('/users', userRoutes);
router.use('/companies', companyRoutes);

module.exports = router;