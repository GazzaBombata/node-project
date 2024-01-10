import { expect as _expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sinon  from 'sinon';
import { User, Interaction, Post } from '../models/index.js';
import { sequelize } from '../database.js';

const expect = _expect;
use(chaiHttp);

describe('Post Model sequelize methods test', () => {
    let newUser;
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
      if (!newUser) {
        throw new Error('User creation failed');
      }
      newPost = await Post.create({ 
        title: 'test',
        creator_id: newUser.id,
        creation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
       });
       if (!newPost) {
        throw new Error('Post creation failed');
      }
    });
  
    afterEach(async () => {
      // Cleanup: delete the post created in each test
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
  
    
    it('should create a new post', async () => {
      const createdPostPlain = newPost.toJSON();

      // Assert: check createdPost
      expect(createdPostPlain).to.have.property('id').that.is.a('number');
      expect(createdPostPlain).to.have.property('title', newPost.title);
      expect(createdPostPlain).to.have.property('creator_id', newPost.creator_id);
      expect(createdPostPlain).to.have.property('creation_date').that.is.a('date');
      expect(createdPostPlain).to.have.property('createdAt').that.is.a('date');
      expect(createdPostPlain).to.have.property('updatedAt').that.is.a('date');
    });
  
    it('should retrieve a post', async () => {
      const retrievedPost = await Post.findByPk(newPost.id);
      const retrievedPostPlain = retrievedPost.toJSON();
      

      // Assert: check retrievedPost
      expect(retrievedPostPlain).to.have.property('id', newPost.id);
      expect(retrievedPostPlain).to.have.property('title', newPost.title);
      expect(retrievedPostPlain).to.have.property('creator_id', newPost.creator_id);
      expect(retrievedPostPlain).to.have.property('creation_date').that.is.a('date');
      expect(retrievedPostPlain).to.have.property('createdAt').that.is.a('date');
      expect(retrievedPostPlain).to.have.property('updatedAt').that.is.a('date');
    });
  
    it('should update a post', async () => {
      const updatedData = { title: 'newTest' };
      await Post.update(updatedData, { where: { id: newPost.id } });
      const updatedPost = await Post.findByPk(newPost.id);
      const updatedPostPlain = updatedPost.toJSON();

      // Assert: check updatedPost
      expect(updatedPostPlain).to.have.property('id', newPost.id);
      expect(updatedPostPlain).to.have.property('title', updatedData.title);
      expect(updatedPostPlain).to.have.property('creator_id', newPost.creator_id);
      expect(updatedPostPlain).to.have.property('creation_date').that.is.a('date');
      expect(updatedPostPlain).to.have.property('createdAt').that.is.a('date');
      expect(updatedPostPlain).to.have.property('updatedAt').that.is.a('date');
    });
  
    it('should delete a post', async () => {

      await Post.destroy({ where: { id: newPost.id } });
      const retrievedPost = await Post.findByPk(newPost.id);

      // Assert: check that retrievedPost is null
      expect(retrievedPost).to.be.null;
    });
  });


describe('Post Model custom methods test', () => {
    let newPost;
    let createStub;
    let retrieveStub;
    let updateStub;
    let destroyStub;

    beforeEach(async () => {
        newPost = {
            id: 1,
            title: 'test',
            creator_id: 20,
            city: 'Paris',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        createStub = sinon.stub(Post, 'create').returns(newPost);
        retrieveStub = sinon.stub(Post, 'findByPk').returns(newPost);
        
    });

    afterEach(async () => {
        // Cleanup: delete the post created in each test
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

    it('creates post successfully', async () => {
        const post = await Post.createPost(newPost);
        expect(post).deep.equal(newPost);
    });

    it('throws error when creating post fails', async () => {
        createStub.throws(new Error('Failed to create post'));
        try {
          await Post.createPost(newPost);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to create post');
      }
    });

    it('gets post successfully', async () => {
        const post = await Post.getPost(newPost.id);
        expect(post).deep.equal(newPost);
    });

    it('throws error when getting post fails', async () => {
       createStub.throws(new Error('Failed to get post'));
        try {
          await Post.getPost(newPost.id);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to get post');
      }
    });

    it('updates post successfully', async () => {
      retrieveStub.restore();  
      const updatedPost = { ...newPost, title: 'updated' };
      retrieveStub = sinon.stub(Post, 'findByPk').returns(updatedPost);
      await Post.updatePost(newPost.id, { title: 'updated' });
      const post = await Post.getPost(newPost.id);
      expect(post).deep.equal(updatedPost);
    });

    it('throws error when updating post fails', async () => {
        const updatedPost = { ...newPost, title: 'updated' };
        updateStub = sinon.stub(Post, 'update').returns(updatedPost);
        updateStub.throws(new Error('Failed to update post'));
        try {
          await Post.updatePost(newPost.id, { title: 'updated' });
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to update post');
      }
    });

    it('deletes post successfully', async () => {
        await Post.deletePost(newPost.id);
        try {
          await Post.getPost(newPost.id);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Post not found');
      }
    });

    it('throws error when deleting post fails', async () => {
        destroyStub = sinon.stub(Post, 'destroy').returns(' ');
        destroyStub.throws(new Error('Post ID must be a number'));
        try {
          await Post.deletePost(newPost.id);
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Post ID must be a number');
      }
    });
});

describe('Post Model getAllPosts method test', () => {
  let newPost1, newPost2, newInteraction1, newInteraction2, newUser1, newUser2;
  let findAllStub;

  beforeEach(async () => {
      newUser1 = { id: 1, city: 'Paris', nickname: 'test1', age: 20};
      newUser2 = { id: 2, city: 'London', nickname: 'test2', age: 22 };

      newPost1 = {
          id: 1,
          title: 'test1',
          creator_id: newUser1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
      };

      newPost2 = {
          id: 2,
          title: 'test2',
          creator_id: newUser2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
      };

      newInteraction1 = { id: 1, type:'like',time_of_interaction: new Date(), creator_id: newUser1.id, post_id: newPost1.id };
      newInteraction2 = { id: 2, type: 'comment', time_of_interaction: new Date(), creator_id: newUser2.id, post_id: newPost2.id };

      findAllStub = sinon.stub(Post, 'findAll').returns([newPost1, newPost2]);
  });

  afterEach(async () => {
      // Cleanup: restore the stub
      if (findAllStub) {
          findAllStub.restore();
      }
  });

  it('gets all posts successfully', async () => {
      const posts = await Post.getAllPosts();
      expect(posts).to.be.an('array');
      expect(posts).to.deep.equal([newPost1, newPost2]);
  });

  it('throws error when getting all posts fails', async () => {
      findAllStub.throws(new Error('Failed to get posts'));
      try {
          await Post.getAllPosts();
      } catch (error) {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Failed to get posts');
      }
  });

  it('throws error when "from" or "to" parameters have invalid date format', async () => {
    try {
        await Post.getAllPosts('invalid date', '2022-01-01');
    } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Invalid date format for "from" or "to" parameter');
    }
});

it('throws error when "interaction_date" parameter has invalid date format', async () => {
    try {
        await Post.getAllPosts('2022-01-01', '2022-12-31', 'invalid date');
    } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Invalid date format for "interaction_date" parameter');
    }
});
});


describe('Post Model findAll sequelize method test', () => {
    let user1, user2, interaction1, interaction2, post1, post2;

    beforeEach(async () => {
        // Setup: create test data
        await Interaction.destroy({ where: {} });
        await Post.destroy({ where: {} });
        await User.destroy({ where: {} });

        user1 = await User.create({ nickname: 'test1', city: 'Paris' });
        user2 = await User.create({ nickname: 'test2', city: 'London' });

        post1 = await Post.create({ title: 'test1', creator_id: user1.id});
        post2 = await Post.create({ title: 'test2', creator_id: user2.id});

        interaction1 = await Interaction.create({ type: 'like', time_of_interaction: new Date(), creator_id: user1.id, post_id: post1.id });
        interaction2 = await Interaction.create({ type: 'like', time_of_interaction: new Date(), creator_id: user2.id, post_id: post2.id });
    });

    afterEach(async () => {
        // Cleanup: delete test data
        await Interaction.destroy({ where: {} });
        await Post.destroy({ where: {} });
        await User.destroy({ where: {} });
        await sequelize.query('ALTER TABLE Interaction AUTO_INCREMENT = 1');
        await sequelize.query('ALTER TABLE Post AUTO_INCREMENT = 1');
        await sequelize.query('ALTER TABLE User AUTO_INCREMENT = 1');
        
    });

    it('gets all posts successfully', async () => {
        const posts = await Post.getAllPosts();
        expect(posts).to.be.an('array');
        expect(posts.length).to.equal(2);
    });
});
  
    

