import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
// Import necessary modules

const expect = chai.expect;
chai.use(chaiHttp);

// Import your app and user model
const app = require('../app'); // Update with the correct path to your app
const UserModel = require('../models/user'); // Update with the correct path to your user model

import { createUser } from '../models/UserModel.js';
import { expect } from 'chai';

describe('UserModel.create', () => {
    it('should create a new user and return the user data using only user.create', async () => {
      // Arrange
      const newUser = {
        nickname: 'testUser',
        age: 30,
        city: 'TestCity'
      };
  
      // Act
      const result = await UserModel.create(newUser);
  
      // Assert
      expect(result).to.be.an('object');
      expect(result.nickname).to.equal(newUser.nickname);
      expect(result.age).to.equal(newUser.age);
      expect(result.city).to.equal(newUser.city);

      const userInDb = await UserModel.findOne({ nickname: 'testUser' });
        expect(userInDb).to.exist;
        expect(userInDb.age).to.equal(newUser.age);
        expect(userInDb.city).to.equal(newUser.city);
    });
  });

// Describe your test suite for user creation
describe('POST /users', () => {
    // Before each test, stub the UserModel.create method
    beforeEach(() => {
        sinon.stub(UserModel, 'create');
    });

    // After each test, restore the original UserModel.create method
    afterEach(() => {
        UserModel.create.restore();
    });

    // Test for successful user creation
 it('should create a new user resolving user.create and return the user data', (done) => {
        // Mock user data
        const newUser = {
            nickname: 'testUser',
            age: 30,
            city: 'TestCity'
        };

        // Set the UserModel.create method to resolve with the newUser data
        UserModel.create.resolves(newUser);

        // Make a POST request with the mock user data
        chai.request(app)
            .post('/users')
            .send(newUser)
            .end((err, res) => {
                // Assertions
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.nickname).to.equal(newUser.nickname);
                expect(res.body.age).to.equal(newUser.age);
                expect(res.body.city).to.equal(newUser.city);

                done();
            });
    });

    // Add more tests for error handling, invalid inputs, etc.
});

describe ('GET /users', () => {
    beforeEach(() => {
        sinon.stub(UserModel, 'findAll');
    });

    afterEach(() => {
        UserModel.findAll.restore();
    });
it('should return all users', (done) => {
    const users = [
        {
            nickname: 'testUser',
            age: 30,
            city: 'TestCity'
        },
        {
            nickname: 'testUser2',
            age: 30,
            city: 'TestCity'
        }
    ];
    users.findAll.resolves(users);
    chai.request(app)
        .get('/users')
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(users.length);
            done();
        });
    });
});


describe ('PUT /users/:id', () => {
    beforeEach(() => {
        sinon.stub(UserModel, 'update');
    });
    afterEach(() => {
        UserModel.update.restore();
    });

    const updatedUser = {
        nickname: 'testUser',
        age: 30,
        city: 'TestCity'
    };

    UserModel.update.resolves(updatedUser);

    chai.request(app)
        .put('/users/:id')
        .send(updatedUser)
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.nickname).to.equal(updatedUser.nickname);
            expect(res.body.age).to.equal(updatedUser.age);
            expect(res.body.city).to.equal(updatedUser.city);
            done();
        });
    });

describe ('DELETE /users/:id', () => {
    beforeEach(() => {
        sinon.stub(UserModel, 'destroy');
    });
    afterEach(() => {
        UserModel.destroy.restore();
    });

    const deletedUser = {
        nickname: 'testUser',
        age: 30,
        city: 'TestCity'
    };

    UserModel.destroy.resolves(deletedUser);

    chai.request(app)
        .delete('/users/:id')
        .send(deletedUser)
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });



