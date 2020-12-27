const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const companyRoutes = require('./company-routes.js');
const commentRoutes = require('./comment-routes');
const studentRoutes = require('./student-routes');
const teacherRoutes = require('./teacher-routes');
const uploadRoutes = require('./image-upload-routes');


router.use('/users', userRoutes);
router.use('/companies', companyRoutes);
router.use('/comments', commentRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/imgupload', uploadRoutes);

module.exports = router;