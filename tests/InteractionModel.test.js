import { expect as _expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sinon  from 'sinon';
import { User, Interaction, Post } from '../models/index.js';

const expect = _expect;
use(chaiHttp);

describe('Interaction Model sequelize methods test', () => {
    let newUser;
    let newInteraction;
    let newPost;
    let createStub;
  
    beforeEach(async () => {
      newUser = await User.create({
        nickname: 'test',
        age: 20,
        city: 'Paris',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      newPost = await Post.create({ 
        title: 'test',
        creator_id: newUser.id,
        creation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
       });
      newInteraction = await Interaction.create({ 
        type: 'comment',
        creator_id: newUser.id,
        post_id: newPost.id,
        interaction_body: 'test',
        time_of_interaction: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
       });
    });
  
    afterEach(async () => {
      // Cleanup: delete the interaction created in each test
      if (newInteraction) {
        await Interaction.destroy({ where: { id: newInteraction.id } });
      };
      if (newPost) {
        await Post.destroy({ where: { id: newPost.id } });
      };
      if (newUser) {
        await User.destroy({ where: { id: newUser.id } });
      };
      if (createStub) {
        createStub.restore();
      };
      
    });
  
    
    it('should create a new interaction', async () => {
      const interactionPlain = newInteraction.toJSON();

      // Assert: check createdInteraction
      expect(interactionPlain).to.have.property('id').that.is.a('number');
      expect(interactionPlain).to.have.property('type', newInteraction.type);
      expect(interactionPlain).to.have.property('interaction_body', newInteraction.interaction_body);
      expect(interactionPlain).to.have.property('creator_id', newInteraction.creator_id);
      expect(interactionPlain).to.have.property('post_id', newInteraction.post_id);
      expect(interactionPlain).to.have.property('time_of_interaction').that.is.a('date');
      expect(interactionPlain).to.have.property('createdAt').that.is.a('date');
      expect(interactionPlain).to.have.property('updatedAt').that.is.a('date');
    });
  
    it('should retrieve a interaction', async () => {
      const retrievedInteraction = await Interaction.findByPk(newInteraction.id);
      const interactionPlain = retrievedInteraction.toJSON();
      

      // Assert: check retrievedInteraction
      expect(interactionPlain).to.have.property('id').that.is.a('number');
      expect(interactionPlain).to.have.property('type', newInteraction.type);
      expect(interactionPlain).to.have.property('interaction_body', newInteraction.interaction_body);
      expect(interactionPlain).to.have.property('creator_id', newInteraction.creator_id);
      expect(interactionPlain).to.have.property('post_id', newInteraction.post_id);
      expect(interactionPlain).to.have.property('time_of_interaction').that.is.a('date');
      expect(interactionPlain).to.have.property('createdAt').that.is.a('date');
      expect(interactionPlain).to.have.property('updatedAt').that.is.a('date');
    });
  
    it('should update a interaction', async () => {
      const updatedData = { interaction_body: 'newTest' };
      await Interaction.update(updatedData, { where: { id: newInteraction.id } });
      const updatedInteraction = await Interaction.findByPk(newInteraction.id);
      const interactionPlain = updatedInteraction.toJSON();

      // Assert: check updatedInteraction
      expect(interactionPlain).to.have.property('id').that.is.a('number');
      expect(interactionPlain).to.have.property('type', newInteraction.type);
      expect(interactionPlain).to.have.property('interaction_body', updatedData.interaction_body);
      expect(interactionPlain).to.have.property('creator_id', newInteraction.creator_id);
      expect(interactionPlain).to.have.property('post_id', newInteraction.post_id);
      expect(interactionPlain).to.have.property('time_of_interaction').that.is.a('date');
      expect(interactionPlain).to.have.property('createdAt').that.is.a('date');
      expect(interactionPlain).to.have.property('updatedAt').that.is.a('date');
    });
  
    it('should delete a interaction', async () => {
      await Interaction.destroy({ where: { id: newInteraction.id } });
      const retrievedInteraction = await Interaction.findByPk(newInteraction.id);

      // Assert: check that retrievedInteraction is null
      expect(retrievedInteraction).to.be.null;
    });
  });


describe('Interaction Model custom methods test', () => {
    let newInteraction;
    let createStub;
    let retrieveStub;
    let updateStub;
    let destroyStub;

    beforeEach(async () => {
      newInteraction = { 
        id: 1,
        type: 'comment',
        creator_id: 20,
        post_id: 200,
        interaction_body: 'test',
        time_of_interaction: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
       };
        createStub = sinon.stub(Interaction, 'create').returns(newInteraction);
        retrieveStub = sinon.stub(Interaction, 'findByPk').returns(newInteraction);
        
    });

    afterEach(async () => {
        // Cleanup: delete the interaction created in each test
        if (createStub) {
            createStub.restore();
        }
        if (retrieveStub) {
          retrieveStub.restore();
        }
        if (updateStub) {
          updateStub.restore();
        }
        if (destroyStub) {
          destroyStub.restore();
      }
    });

    it('creates interaction successfully', async () => {
        const interaction = await Interaction.createInteraction(newInteraction);
        expect(interaction).deep.equal(newInteraction);
    });

    it('throws error when creating interaction fails', async () => {
        createStub.throws(new Error('Failed to create interaction'));
        try {
          await Interaction.createInteraction(newInteraction);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to create interaction');
      }
    });

    it('gets interaction successfully', async () => {
        const interaction = await Interaction.getInteraction(newInteraction.id);
        expect(interaction).deep.equal(newInteraction);
    });

    it('throws error when getting interaction fails', async () => {
       createStub.throws(new Error('Failed to get interaction'));
        try {
          await Interaction.getInteraction(newInteraction.id);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to get interaction');
      }
    });

    it('updates interaction successfully', async () => {
      retrieveStub.restore();  
      const updatedInteraction = { ...newInteraction, title: 'updated' };
      retrieveStub = sinon.stub(Interaction, 'findByPk').returns(updatedInteraction);
      await Interaction.updateInteraction(newInteraction.id, { title: 'updated' });
      const interaction = await Interaction.getInteraction(newInteraction.id);
      expect(interaction).deep.equal(updatedInteraction);
    });

    it('throws error when updating interaction fails', async () => {
        const updatedInteraction = { ...newInteraction, title: 'updated' };
        updateStub = sinon.stub(Interaction, 'update').returns(updatedInteraction);
        updateStub.throws(new Error('Failed to update interaction'));
        try {
          await Interaction.updateInteraction(newInteraction.id, { title: 'updated' });
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to update interaction');
      }
    });

    it('deletes interaction successfully', async () => {
        await Interaction.deleteInteraction(newInteraction.id);
        try {
          await Interaction.getInteraction(newInteraction.id);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Interaction not found');
      }
    });

    it('throws error when deleting interaction fails', async () => {
        destroyStub = sinon.stub(Interaction, 'destroy').returns(' ');
        destroyStub.throws(new Error('Interaction ID must be a number'));
        try {
          await Interaction.deleteInteraction(newInteraction.id);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Interaction ID must be a number');
      }
    });
});
  
    

