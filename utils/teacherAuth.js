const teacherAuth = (req, res, next) => {
    if (!req.session.teacher_id) {
      res.redirect('/studenthome');
    } else {
      next();
    }
  };
  
  
  module.exports = teacherAuth;