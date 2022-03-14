const express = require("express");
const router = express.Router();
const auth = require("../../service/auth");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connection = require("../../service/db");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

// @route GET api/auth
// @desc  test route just to test auth
// @acess Private
router.get("/", auth, async (req, res) => {
  try {
    const findUserQuery = `SELECT id,name,email FROM users WHERE id = ?;`;
    const isUser = await query(findUserQuery, req.user.id);
    res.json(isUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/auth
// @desc  Auth user & get token
// @acess Public
router.post(
  "/",
  [
    check("email", "Please include valid email").isEmail(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const findUserQuery = `SELECT * FROM users WHERE email = ?;`;
      const isUser = await query(findUserQuery, [email]);
      if (isUser.length == 0) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, isUser[0].password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: isUser[0].id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
