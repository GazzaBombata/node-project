import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const Interaction = sequelize.define('Interaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.ENUM('like', 'comment'),
        allowNull: false,
    },
    interaction_body: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time_of_interaction: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Post',
          key: 'id', 
      },
    },
    creator_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User', 
          key: 'id',
      },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Interaction',
    timestamps: true,
});


Interaction.createInteraction = async (interactionData) => {
  try {

    const interaction = await Interaction.create(interactionData);
    const retrievedInteraction = await Interaction.findByPk(interaction.id);
    if (!retrievedInteraction) throw new Error('Failed to create interaction');

    return interaction;
  } catch (error) {
    throw error;
  }
};


Interaction.getInteraction = async (id) => {
    try {
        if (isNaN(id)) throw new Error('nteraction ID is NaN');
        
        const interaction = await Interaction.findByPk(id);
        if (!interaction) throw new Error('Interaction not found');
        return interaction;
    } catch (error) {
        throw error;
    }
};

Interaction.updateInteraction = async (id, interactionData) => {
    try {
        if (isNaN(id)) throw new Error('nteraction ID is NaN');

        const interaction = await Interaction.findByPk(id);
        if (!interaction) throw new Error('Interaction not found');

        await Interaction.update(interactionData, { where: { id: id } });
        const updatedInteraction = await Interaction.findByPk(id);

        for (let key in interactionData) {
            if (interactionData[key] !== updatedInteraction[key]) {
                throw new Error('Failed to update interaction in key: ' + key + '');
            }
        }

        return updatedInteraction;
    } catch (error) {
        throw error;
    }
};

Interaction.deleteInteraction = async (id) => {
    try {
        if (isNaN(id)) throw new Error('Interaction ID NaN');
        const interaction = await Interaction.findByPk(id);
        if (!interaction) throw new Error('Interaction not found');
        await Interaction.destroy({ where: { id: id } });
        return { message: 'Interaction deleted successfully' };
    } catch (error) {
        throw error;
    }
};

export default Interaction;