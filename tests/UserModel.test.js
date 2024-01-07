import { chai, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import User from '../models/UserModel.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('User Model', () => {
    let newUser;
    let createStub;
  
    beforeEach(async () => {
      newUser = { 
        id: 1,
        nickname: 'test',
        age: 20,
        city: 'Paris',
       };
       createStub = sinon.stub(User, 'create');
    });
  
    afterEach(async () => {
      // Cleanup: delete the user created in each test
      const rUser = await User.findByPk(newUser.id)
      if (rUser) {
        await User.destroy({ where: { id: newUser.id } });
      };
      createStub.restore();
      
    });
  
    it('should create a new user', async () => {
      const createdUser = await User.create(newUser);
      // Assert: check createdUser
      expect(createdUser).to.deep.equal({ 
        id: 1,
        nickname: 'Test',
        age: 20,
        city: 'Paris',
       });
    });
  
    it('should retrieve a user', async () => {
      createStub.resolves({newUser});
      const createdUser = await User.create(newUser);
      const retrievedUser = await User.findByPk(createdUser.id);
      // Assert: check retrievedUser
      expect(retrievedUser).to.deep.equal({ 
        id: 1,
        nickname: 'Test',
        age: 20,
        city: 'Paris',
       });
    });
  
    it('should update a user', async () => {
      createStub.resolves({newUser});
      const createdUser = await User.create(newUser);
      const updatedData = { nickname: 'newTest' };
      const updatedUser = await User.update(updatedData, { where: { id: createdUser.id } });
      // Assert: check updatedUser
      expect(updatedUser).to.deep.equal({ 
        id: 1,
        nickname: 'newTest',
        age: 20,
        city: 'Paris',
       });
    });
  
    it('should delete a user', async () => {
      const createdUser = await User.create(newUser);
      await User.destroy({ where: { id: createdUser.id } });
      const retrievedUser = await User.findByPk(createdUser.id);
      // Assert: check that retrievedUser is null
      expect(retrievedUser).to.be.null;
    });
  });
