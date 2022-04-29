const express = require("express");
const router = express.Router();
const user = require("../controllers/users");
const { check } = require("express-validator");

router.post(
  "/register",
  [
    check("username").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  user.userRegistration
);
router.post(
  "/login",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  user.userLogin
);

module.exports = router;
