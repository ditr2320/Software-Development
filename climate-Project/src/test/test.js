/**
* API testing for ClimaTrak.
* Author: Qi Wang
* Module: mocha, chai
* Object: server.js
*/


/*------Load module.------*/
const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;


/*-----------------------------------API Testing.------------------------------------*/


/*
 Group testing home page "/", "/home".
*/
describe("Home pages!", () => {

  // Testing get request "/".
  it("Home page OK!", (done) => {
    chai
    .request(server)
    .get("/")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });

  // Testing get request "/home".
  it("Home page OK!", (done) => {
    chai
    .request(server)
    .get("/")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });

});


/*
 Group testing "/home_login, "/home_user", "/home_register".
*/
describe("Login, user and register pages!", () => {

  // Testing get request "/home_login".
  it("Login Page!", (done) => {
    chai
    .request(server)
    .get("/home_login")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });

  // Testing get request "/home_user".
  it("User page OK!", (done) => {
    chai
    .request(server)
    .get("/home_user")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });

  // Testing get request "/home_register".
  it("Register page OK!", (done) => {
    chai
    .request(server)
    .get("/home_register")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });

});


/*
 Group testing "/monthly", "/weekly", "current_reccomendations".
*/
describe("Home pages!", () => {

  // Testing get request "/monthly".
  it("Monthly page OK!", (done) => {
    chai
    .request(server)
    .get("/monthly")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });

  // Testing get request "/weekly".
  it("Weekly page OK!", (done) => {
    chai
    .request(server)
    .get("/weekly")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });

  // Testing get request "/current_reccomendations".
  it("Recommendations page OK!", (done) => {
    chai
    .request(server)
    .get("/current_reccomendations")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });

});
