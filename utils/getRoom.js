const getRoom = (req, res, next) => {
  req.session.student_id = req.params.id;
  res.redirect("/teacherlessonroom");
  next();
};

module.exports = getRoom;
