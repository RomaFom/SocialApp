const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const connection = require("../../service/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const util = require("util");
const config = require("config");
// Wrap query in promise
const query = util.promisify(connection.query).bind(connection);
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check("password", "Password must be 6 or more chars").isLength({ min: 6 }),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //User fields
    const { name, email, password } = req.body;
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //Add user query
    const addUserQuery = `INSERT INTO users (name, email, password) VALUES (? , ? , ?);`;

    try {
      // Check if user exists
      const findUserQuery = `SELECT * FROM users WHERE email = ?;`;
      const isUser = await query(findUserQuery, [email]);
      if (isUser.length > 0) {
        return res.status(400).json({ msg: "User exists line 38" });
      }

      // If user doesn't exist, add user
      await query(addUserQuery, [name, email, hashPassword], (err, result) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        }
        if (result) {
          // Return jwt
          const payload = {
            user: {
              id: result.insertId,
            },
          };
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 3600000 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({ token });
            }
          );
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
