"use strict";

const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../db");

/** User of the site. */

class User {

  /** Register new user. Returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const result = await db.query(`
      INSERT INTO users (username, password, first_name, last_name, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING username, password, first_name, last_name, phone
    `, [username, hashedPassword, first_name, last_name, phone]
    );

    return res.json(result.rows[0]);
  }

  /** Authenticate: is username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const result = await db.query(`
      SELECT password
        FROM users
        WHERE username = $1
    `, [username])

    const user = result.rows[0];

    return user && await bcrypt.compare(password, user.password) === true;
  }


  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    await db.query(`
      UPDATE users
        SET last_login_at = TIMESTAMP WITH TIME ZONE
        WHERE username = $1
    `, [username]);
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name}, ...] */

  static async all() {
    const result = await db.query(`
      SELECT username, first_name, last_name
        FROM users
    `);

    return result.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
  }
}


module.exports = User;