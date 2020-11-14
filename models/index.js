// import all models
const Company = require("./Company");
const User = require("./User");
const Teacher = require("./Teacher");
const Student = require("./Student");
const Comment = require("./Comment");

// create associations
Company.hasMany(User, {
  foreignKey: "company_id",
});
User.belongsTo(Company, {
  foreignKey: "company_id",
});

User.hasOne(Teacher, {
  foreignKey: "user_id",
});
Teacher.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasOne(Student, {
  foreignKey: "user_id",
});
Student.belongsTo(User, {
  foreignKey: "user_id",
});

Student.hasMany(Comment, {
  foreignKey: "student_id",
});
Comment.belongsTo(Student, {
  foreignKey: "student_id",
});

Teacher.hasMany(Comment, {
  foreignKey: "teacher_id",
});
Comment.belongsTo(Teacher, {
  foreignKey: "teacher_id",
});

// User.hasMany(Comment, {
//   foreignKey: "id",
// });
// Comment.belongsTo(User, {
//   foreignKey: "id",
// });

module.exports = { User, Teacher, Student, Company, Comment };
