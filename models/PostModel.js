import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Op } from 'sequelize';
import { User, Interaction } from './index.js';


const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  creator_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
  },
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Post'
});


Post.createPost = async (postData) => {
  try {
    if (isNaN(postData.id)) throw new Error('Post ID must be a number');
    
    const post = await Post.create(postData);
    const retrievedPost = await Post.findByPk(post.id);
    if (!retrievedPost) throw new Error('Failed to create post');

    return post;
  } catch (error) {
    throw error;
  }
};


Post.getPost = async (id) => {
    try {
        if (isNaN(id)) throw new Error('Post ID must be a number');
        
        const post = await Post.findByPk(id);
        if (!post) throw new Error('Post not found');
        return post;
    } catch (error) {
        throw error;
    }
};

Post.updatePost = async (id, postData) => {
    try {
        if (isNaN(id)) throw new Error('Post ID must be a number');

        const post = await Post.findByPk(id);
        if (!post) throw new Error('Post not found');

        await Post.update(postData, { where: { id: id } });
        const updatedPost = await Post.findByPk(id);

        for (let key in postData) {
            if (postData[key] !== updatedPost[key]) {
                throw new Error('Failed to update post in key: ' + key + '');
            }
        }

        return updatedPost;
    } catch (error) {
        throw error;
    }
};

Post.deletePost = async (id) => {
    try {
        if (isNaN(id)) throw new Error('Post ID must be a number');
        const post = await Post.findByPk(id);
        if (!post) throw new Error('Post not found');
        await Post.destroy({ where: { id: id } });
        return { message: 'Post deleted successfully' };
    } catch (error) {
        throw error;
    }
};

Post.getAllPosts = async (from, to, interaction_date, cities) => {
  try {
      const where = {};
      if (from && to) {
          const fromDate = new Date(from);
          const toDate = new Date(to);
          if (isNaN(fromDate) || isNaN(toDate)) {
              throw new Error('Invalid date format for "from" or "to" parameter');
          }
          where.creation_date = { [Op.between]: [fromDate, toDate] };
      }

      if (from && !to) {
        const fromDate = new Date(from);
        const toDate = new Date();
        if (isNaN(fromDate)) {
            throw new Error('Invalid date format for "from" parameter');
        }
        where.creation_date = { [Op.between]: [fromDate, toDate] };
    }

      const include = [{
          model: Interaction,
          as: 'interactions',
          where: {},
          required: false,
          include: [{
              model: User,
              as: 'user',
              where: {},
          }],
      }];

      if (interaction_date) {
          const interactionDate = new Date(interaction_date);
          if (isNaN(interactionDate)) {
              throw new Error('Invalid date format for "interaction_date" parameter');
          }
          include[0].where.time_of_interaction = interactionDate;
      }

      if (cities) {
          if (typeof cities !== 'string') {
              throw new Error('Invalid format for "cities" parameter. It should be a string');
          }
          include[0].include[0].where.city = { [Op.in]: cities.split(',') };
      }

      const posts = await Post.findAll({ where, include });
      return posts;
  } catch (error) {
      throw error;
  }
};

export default Post;