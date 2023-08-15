"use strict";

const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");

let token;
describe("Users Routes Test", function () {

  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");

    // let u1 = await User.register({
    //   username: "test1",
    //   password: "password",
    //   first_name: "Test1",
    //   last_name: "Testy1",
    //   phone: "+14155550000",
    // });

    let response = await request(app)
      .post("/auth/register")
      .send({
        username: "bob",
        password: "secret",
        first_name: "Bob",
        last_name: "Smith",
        phone: "+14150000000"
      });

    token = response.body.token;
  });

  /** GET / - get list of users. */
  describe("GET /", function () {
    test("can get list of users", async function () {
      let users = await request(app)
        .get("/users")
        .send({ _token: token });
      console.log(users);
      expect(users).toEqual({
        users: [{
          username: "bob",
          first_name: "Bob",
          last_name: "Smith"
        }]
      });
    });
  });

});

/** GET /:username - get detail of users.

/** GET /:username/to - get messages to user

/** GET /:username/from - get messages from user







// /** POST /auth/register => token  */

    // describe("POST /auth/register", function () {
    //   test("can register", async function () {
    //     let response = await request(app)
    //       .post("/auth/register")
    //       .send({
    //         username: "bob",
    //         password: "secret",
    //         first_name: "Bob",
    //         last_name: "Smith",
    //         phone: "+14150000000"
    //       });

    //     let token = response.body.token;
    //     expect(jwt.decode(token)).toEqual({
    //       username: "bob",
    //       iat: expect.any(Number)
    //     });
    //   });
    // });

  //   /** POST /auth/login => token  */

  //   describe("POST /auth/login", function () {
  //     test("can login", async function () {
  //       let response = await request(app)
  //         .post("/auth/login")
  //         .send({ username: "test1", password: "password" });

  //       let token = response.body.token;
  //       expect(jwt.decode(token)).toEqual({
  //         username: "test1",
  //         iat: expect.any(Number)
  //       });
  //     });

  //     test("won't login w/wrong password", async function () {
  //       let response = await request(app)
  //         .post("/auth/login")
  //         .send({ username: "test1", password: "WRONG" });
  //       expect(response.statusCode).toEqual(401);
  //     });

  //     test("won't login w/wrong password", async function () {
  //       let response = await request(app)
  //         .post("/auth/login")
  //         .send({ username: "not-user", password: "password" });
  //       expect(response.statusCode).toEqual(401);
  //     });
  //   });
  // });

  // afterAll(async function () {
  //   await db.end();
  // })