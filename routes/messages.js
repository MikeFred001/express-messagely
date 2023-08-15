"use strict";

const Router = require("express").Router;
const Message = require("../models/message");
const { NotFoundError } = require("../expressError");

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
 **/
router.get("/:id", async function(req, res, next) {
  const message = await Message.get(req.params.id);

  if(message === undefined) throw new NotFoundError();
  const currUser = res.locals.user;

  // if currUser in User.messagesTo || currUser in User.messagesFrom

  if(currUser.username === message.from_user?.username ||
      currUser.username === message.to_user?.username) {
     return res.json({ message });
  }

  return res.json({ message });
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Makes sure that the only the intended recipient can mark as read.
 *
 **/


module.exports = router;