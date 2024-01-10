import { expect as _expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sinon  from 'sinon';
import { User } from '../models/index.js';

const expect = _expect;
use(chaiHttp);

describe('User Model sequelize methods test', () => {
    let newUser;
    let createStub;
  
    beforeEach(async () => {
      newUser = { 
        id: 1,
        nickname: 'test',
        age: 20,
        city: 'Paris',
        createdAt: new Date(),
        updatedAt: new Date(),
       };
    });
  
    afterEach(async () => {
      // Cleanup: delete the user created in each test
      const rUser = await User.findByPk(newUser.id)
      if (rUser) {
        await User.destroy({ where: { id: newUser.id } });
      };
      if (createStub) {
        createStub.restore();
      };
      
    });
  
    
    it('should create a new user', async () => {
      const createdUser = await User.create(newUser);
      const createdUserPlain = createdUser.toJSON();

      // Assert: check createdUser
      expect(createdUserPlain).to.have.property('id', 1);
      expect(createdUserPlain).to.have.property('nickname', 'test');
      expect(createdUserPlain).to.have.property('age', 20);
      expect(createdUserPlain).to.have.property('city', 'Paris');
      expect(createdUserPlain).to.have.property('createdAt').that.is.a('date');
      expect(createdUserPlain).to.have.property('updatedAt').that.is.a('date');
    });
  
    it('should retrieve a user', async () => {
      const createdUser = await User.create(newUser);
      const retrievedUser = await User.findByPk(createdUser.id);
      const retrievedUserPlain = retrievedUser.toJSON();

      // Assert: check retrievedUser
      expect(retrievedUserPlain).to.have.property('id', 1);
      expect(retrievedUserPlain).to.have.property('nickname', 'test');
      expect(retrievedUserPlain).to.have.property('age', 20);
      expect(retrievedUserPlain).to.have.property('city', 'Paris');
      expect(retrievedUserPlain).to.have.property('createdAt').that.is.a('date');
      expect(retrievedUserPlain).to.have.property('updatedAt').that.is.a('date');
    });
  
    it('should update a user', async () => {
      const createdUser = await User.create(newUser);
      const updatedData = { nickname: 'newTest' };
      await User.update(updatedData, { where: { id: createdUser.id } });
      const updatedUser = await User.findByPk(createdUser.id);
      const updatedUserPlain = updatedUser.toJSON();
      // Assert: check updatedUser
      expect(updatedUserPlain).to.have.property('id', 1);
      expect(updatedUserPlain).to.have.property('nickname', 'newTest');
      expect(updatedUserPlain).to.have.property('age', 20);
      expect(updatedUserPlain).to.have.property('city', 'Paris');
      expect(updatedUserPlain).to.have.property('createdAt').that.is.a('date');
      expect(updatedUserPlain).to.have.property('updatedAt').that.is.a('date');
    });
  
    it('should delete a user', async () => {
      const createdUser = await User.create(newUser);
      await User.destroy({ where: { id: createdUser.id } });
      const retrievedUser = await User.findByPk(createdUser.id);
      // Assert: check that retrievedUser is null
      expect(retrievedUser).to.be.null;
    });
  });


describe('User Model custom methods test', () => {
    let newUser;
    let createStub;
    let retrieveStub;

    beforeEach(async () => {
        newUser = {
            id: 1,
            nickname: 'test',
            age: 20,
            city: 'Paris',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        createStub = sinon.stub(User, 'create').returns(newUser);
        retrieveStub = sinon.stub(User, 'findByPk').returns(newUser);
        
    });

    afterEach(async () => {
        // Cleanup: delete the user created in each test
        if (createStub) {
            createStub.restore();
        }
        if (retrieveStub) {
          retrieveStub.restore();
      }
    });

    it('creates user successfully', async () => {
        const user = await User.createUser(newUser);
        expect(user).deep.equal(newUser);
    });

    it('throws error when creating user fails', async () => {
        createStub.throws(new Error('Failed to create user'));
        try {
          await User.createUser(newUser);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to create user');
      }
    });

    it('gets user successfully', async () => {
        const user = await User.getUser(newUser.id);
        expect(user).deep.equal(newUser);
    });

    it('throws error when getting user fails', async () => {
       createStub.throws(new Error('Failed to get user'));
        try {
          await User.getUser(newUser.id);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to get user');
      }
    });

    it('updates user successfully', async () => {
      retrieveStub.restore();  
      const updatedUser = { ...newUser, nickname: 'updated' };
      retrieveStub = sinon.stub(User, 'findByPk').returns(updatedUser);
      await User.updateUser(newUser.id, { nickname: 'updated' });
      const user = await User.getUser(newUser.id);
      expect(user).deep.equal(updatedUser);
    });

    it('throws error when updating user fails', async () => {
        const updatedUser = { ...newUser, nickname: 'updated' };
        let updateStub = sinon.stub(User, 'update').returns(updatedUser);
        updateStub.throws(new Error('Failed to update user'));
        try {
          await User.updateUser(newUser.id, { nickname: 'updated' });
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to update user');
      }
    });

    it('deletes user successfully', async () => {
        await User.deleteUser(newUser.id);
        try {
          await User.getUser(newUser.id);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('User not found');
      }
    });

    it('throws error when deleting user fails', async () => {
        let destroyStub = sinon.stub(User, 'destroy').returns(' ');
        destroyStub.throws(new Error('User ID must be a number'));
        try {
          await User.deleteUser(newUser.id);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('User ID must be a number');
      }
    });
});
  
    

