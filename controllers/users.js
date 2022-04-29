const user = require("../model/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports.userRegistration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const data = req.body;
  try {
    const userData = user({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    const encryptedPwd = await bcrypt.hash(data.password, 10);
    userData.password = encryptedPwd;
    await userData.save();
    res.json(userData);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in registration");
  }
};

module.exports.userLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;
    let userExists = await user.findOne({
      email,
    });
    const validPwd = await bcrypt.compare(password, userExists.password);
    if (validPwd) {
      return res.json({ status: true });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in login");
  }
};
