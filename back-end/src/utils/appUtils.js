const validator = require("validator");

const formValidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!password) {
    throw new Error("Password is not strong");
  }
};

module.exports = {
  formValidation,
};
