import { Interaction } from '../models/index';

const InteractionController = {

createInteraction : async (req, res) => {
  try {
    const interaction = await Interaction.createInteraction(req.body);
    res.status(201).json(interaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
},

getInteraction : async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const interaction = await Interaction.getInteraction(id);
    res.json(interaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
},

updateInteraction : async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const interaction = await Interaction.updateInteraction(id, req.body);
    res.json(interaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
},

deleteInteraction : async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const message = await Interaction.deleteInteraction(id);
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
},

};

export default InteractionController;
