"use strict";

const Router = require("express").Router;
const { UnauthorizedError, BadRequestError } = require("../expressError");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../config");

const router = new Router();

/** POST /login: {username, password} => {token}
 * Updates login timestamp
*/

router.post('/login', async function (req, res, next) {

  if (req.body === undefined) throw new BadRequestError();
  const { username, password } = req.body;

  const isAuthenticated = await User.authenticate(username, password);

  if (isAuthenticated !== true) {
    throw new UnauthorizedError("Invalid user/password");
  }

  await User.updateLoginTimestamp();

  const token = jwt.sign({ username }, SECRET_KEY);
  return res.json({ token });
});


/** POST /register: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
*/
router.post('/register', async function(req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  const { username, password, first_name, last_name, phone } = req.body;

  try{
    const user = await User.register({
      username,
      password,
      first_name,
      last_name,
      phone
    });

    const token = jwt.sign({ username: user.username }, SECRET_KEY);

    return res.json({ token });

  } catch(err) {
    throw new BadRequestError("Invalid Credentials");
  }
});




module.exports = router;