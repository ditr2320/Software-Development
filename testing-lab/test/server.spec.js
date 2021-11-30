// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
  // Sample test case given to test / endpoint.
  it("Returns the default welcome message", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        assert.strictEqual(res.body.message, "Welcome!");
        done();
      });
  });

  // ===========================================================================
  // TODO: Please add your test cases for part A here.

  it('It should be of type array and has a length greater than 0', (done) => {
    chai
    .request(server)
    .get('/operations')
    .end((err,res) =>{
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length.above(0);
      done();
    });
  });

  it("It has an id equal to 1, name equal to 'add' and sign equal to '+' ", (done) => {
    chai
      .request(server)
      .get("/operations/1")
      .end((err, res) => {
          assert.equal(res.body.id,1);
          assert.strictEqual(res.body.name, "Add");
          assert.strictEqual(res.body.sign, "+")
        done();
      });
  });

  it("It has an id equal to 4, newly added name, and newly added sign ", (done) => {
    chai
      .request(server)
      .post("/operations")
      .send({name: "Divide", sign: "/"})
      .end((err, res) => {
          assert.equal(res.body.id,4);
          assert.strictEqual(res.body.name, "Divide");
          assert.strictEqual(res.body.sign, "/");
        done();
      });
  });

  // ===========================================================================
  // TODO: Please add your test cases for part B here.

  it("It should add two numbers of type float ", (done) => {
    chai
      .request(server)
      .post("/add")
      .send({num1: 1.5, num2: 4.1})
      .end((err, res) => {
          assert.equal(res.body.add,5.6);
        done();
      });
  });

  it("It should divide two numbers of type float ", (done) => {
    chai
      .request(server)
      .post("/divide")
      .send({num1: 30.5, num2: 2.5})
      .end((err, res) => {
          assert.equal(res.body.divide,12.2);
        done();
      });
  });

  it('It should error for null entries', (done) => {
      chai
        .request(server)
        .post('/add')
        .send({num1: 30.5})
        .end((err, res) => {
            expect(res).to.have.status(400);
          done();
        });
    });

    it('It should error when dividing by 0', (done) => {
        chai
          .request(server)
          .post('/divide')
          .send({num1: 30.5, num2: 0})
          .end((err, res) => {
              expect(res).to.have.status(400);
            done();
          });
      });

});
