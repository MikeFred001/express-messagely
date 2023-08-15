"use strict";

const Router = require("express").Router;
const { NotFoundError, UnauthorizedError, BadRequestError } = require("../expressError");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../config");

const router = new Router();

/** POST /login: {username, password} => {token} */

router.post('/login', async function (req, res, next) {

  if (req.body === undefined) throw new BadRequestError();
  const { username, password } = req.body;


  if (await User.authenticate(username, password) === true) {
    const token = jwt.sign({ username }, SECRET_KEY);
    // Should this functionality be inside the authenticate function?

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

    return res.json({ token });

  } catch(err) {
    throw new BadRequestError(err.message);
  }
  // Should the error handling be here or in the method?
  // Should the register method return a token?
})



module.exports = router;