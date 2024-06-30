const validator = require("../helpers/validate");

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    schoolId: "required|integer",
    birthday: "required|string",
    gradeLevel: "required|integer",
    gradeSection: "required|integer",
    teacherAdviser: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation Failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveProfessorDetails = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    middleName: "required|string",
    lastName: "required|string",
    email: "required|email",
    birthday: "required|string",
    socialSecurityNumber: "required|integer",
    isActive: "required|boolean",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation Failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact,
  saveProfessorDetails,
};