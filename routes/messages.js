"use strict";

const Router = require("express").Router;
const Message = require("../models/message");
const {
  UnauthorizedError,
  BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require('../middleware/auth');

const router = new Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Makes sure that the currently-logged-in users is either the to or from user.
 *
 * Checks that user is logged in.
 **/
router.get("/:id", ensureLoggedIn, async function (req, res, next) {

  const message = await Message.get(req.params.id);

  const currUser = res.locals.user;
  if (currUser.username !== message.from_user?.username &&
    currUser.username !== message.to_user?.username) {
      throw new UnauthorizedError();
  }

  return res.json({ message });
});


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', ensureLoggedIn, async function(req, res, next) {
  if(req.body === undefined) throw new BadRequestError();

  const from_username = res.locals.user.username;
  const { to_username, body } = req.body;

  const message = await Message.create({ from_username, to_username, body });

  return res.json({ message });
})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Makes sure that the only the intended recipient can mark as read.
 *
 **/
router.post('/:id/read', ensureLoggedIn, async function(req, res, next) {
  const msg = await Message.get(req.params.id);

  const currUser = res.locals.user;

  if (currUser.username !== msg.to_user.username) {
    throw new UnauthorizedError();
  }

  const message = await Message.markRead(req.params.id);
  return res.json({ message });
})


module.exports = router;