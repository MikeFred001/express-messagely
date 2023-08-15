"use strict";

const Router = require("express").Router;
const { UnauthorizedError, BadRequestError } = require("../expressError");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../config");

const router = new Router();

/** POST /login: {username, password} => {token} */

router.post('/login', async function (req, res, next) {

  if (req.body === undefined) throw new BadRequestError();
  const { username, password } = req.body;

  // TODO: Pass authentication boolean to a variable
  // TODO: Change logic to check for failure first
  // TODO: Update login timestamp
  if (await User.authenticate(username, password) === true) {
    const token = jwt.sign({ username }, SECRET_KEY);

    return res.json({ token });

  }

  throw new UnauthorizedError("Invalid user/password");
});


/** POST /register: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
*/
router.post('/register', async function(req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  const { username, password, first_name, last_name, phone } = req.body;

  try{
    await User.register({ username, password, first_name, last_name, phone });

    const token = jwt.sign({ username }, SECRET_KEY);
    // TODO: Use username returned from User.register

    return res.json({ token });

  } catch(err) {
    throw new BadRequestError("Invalid Username");
    // TODO: Broaden error message
  }
})
// TODO: Also update login timer here




module.exports = router;