const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const companyRoutes = require('./company-routes.js');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/companies', companyRoutes);
router.use('/comments', commentRoutes);

module.exports = router;