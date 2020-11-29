const classroomAuth = (req, res, next) => {
    
    if (req.session.teacher_id !== req.session.user_id) {
      res.redirect('/teacherhome');
    } else {
      next();
    }
  };
  
  
  module.exports = classroomAuth;