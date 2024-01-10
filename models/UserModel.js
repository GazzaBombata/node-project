import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    city: {
        type: DataTypes.STRING,
    },
    },{
    tableName: 'User'
});


User.createUser = async (userData) => {
    try {
        if (isNaN(userData.id)) throw new Error('User ID must be a number');
        
        const user = await User.create(userData);
        const retrievedUser = await User.findByPk(userData.id);
        if (!retrievedUser) throw new Error('Failed to create user');

        return user;
    } catch (error) {
        throw error;
    }
};

User.getUser = async (id) => {
    try {
        if (isNaN(id)) throw new Error('User ID must be a number');
        
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        return user;
    } catch (error) {
        throw error;
    }
};

User.updateUser = async (id, userData) => {
    try {
        if (isNaN(id)) throw new Error('User ID must be a number');

        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');

        await User.update(userData, { where: { id: id } });
        const updatedUser = await User.findByPk(id);

        for (let key in userData) {
            if (userData[key] !== updatedUser[key]) {
                throw new Error('Failed to update user in key: ' + key + '');
            }
        }

        return updatedUser;
    } catch (error) {
        throw error;
    }
};

User.deleteUser = async (id) => {
    try {
        if (isNaN(id)) throw new Error('User ID must be a number');
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        await User.destroy({ where: { id: id } });
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw error;
    }
};

export default User;