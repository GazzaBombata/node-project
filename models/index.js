import User from './UserModel.js';
import Interaction from './InteractionModel.js';
import Post from './PostModel.js';

// Set up associations
User.hasMany(Interaction, {
  foreignKey: 'creator_id',
  as: 'interactions',
});

User.hasMany(Post, {
  foreignKey: 'creator_id',
  as: 'posts',
});

Post.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'user',
});

Post.hasMany(Interaction, {
  foreignKey: 'post_id',
  as: 'interactions',
});

Interaction.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post',
});

Interaction.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'user',
});

export { User, Interaction, Post };