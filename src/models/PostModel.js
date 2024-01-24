import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { Op } from 'sequelize';
import { Interaction } from './index.js';


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

Post.getAllPosts = async ({from, to, interaction_date, cities, pageInt, pageSizeInt}) => {
  try {
      const where = {};

      if (!from) {
          throw new Error('Missing "from" parameter');
      }

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
      }];

      if (interaction_date) {
          const interactionDate = new Date(interaction_date);
          if (isNaN(interactionDate)) {
              throw new Error('Invalid date format for "interaction_date" parameter');
          }
          include[0].where.time_of_interaction = interactionDate;
      }

      if (cities) {
        include[0].required = true;
        include[0].where.creator_city = { [Op.in]: cities };
      }

      const offset = (pageInt - 1) * pageSizeInt;
      const limit = pageSizeInt;

    // Fetch the posts with pagination
    const posts = await Post.findAll({
      where,
      include,
      offset,
      limit,
    });

//     const posts = await sequelize.query(`
//   SELECT 
//     Post.title, 
//     Post.id, 
//     Post.creator_id, 
//     Post.creation_date, 
//     Post.createdAt, 
//     Post.updatedAt, 
//     interactions.id AS interactions.id, 
//     interactions.type AS interactions.type, 
//     interactions.interaction_body AS interactions.interaction_body, 
//     interactions.time_of_interaction AS interactions.time_of_interaction, 
//     interactions.post_id AS interactions.post_id, 
//     interactions.creator_id AS interactions.creator_id, 
//     interactions.createdAt AS interactions.createdAt, 
//     interactions.updatedAt AS interactions.updatedAt, 
//     user.id AS interactions.user.id, 
//     user.nickname AS interactions.user.nickname, 
//     user.age AS interactions.user.age, 
//     user.city AS interactions.user.city, 
//     user.createdAt AS interactions.user.createdAt, 
//     user.updatedAt AS interactions.user.updatedAt 
//   FROM 
//     Post 
//     INNER JOIN Interaction AS interactions ON Post.id = interactions.post_id 
//     INNER JOIN User AS user ON interactions.creator_id = user.id 
//   WHERE 
//     Post.creation_date BETWEEN :from AND :to 
//     AND user.city IN (:cities)
//   LIMIT :offset, :limit
// `, {
//   replacements: {
//     from: from,
//     to: to,
//     cities: cities,
//     offset: offset,
//     limit: limit
//   },
//   type: sequelize.QueryTypes.SELECT
// });


    return posts;
  } catch (error) {
      throw error;
  }
};

export default Post;

