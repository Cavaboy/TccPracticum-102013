import User from "../models/UserModel.js";

// GET
async function getNotes(req, res) {
  try {
    // Only fetch notes for the logged-in user
    const response = await User.findAll({ where: { userId: req.user.id } });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// CREATE
async function createNotes(req, res) {
  try {
    const inputResult = req.body;
    // Bind note to the logged-in user
    inputResult.userId = req.user.id;
    await User.create(inputResult);
    res.status(201).json({ msg: "Note Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateNotes(req, res) {
  try {
    const inputResult = req.body;
    await User.update(inputResult, {
      where: { id: req.params.id },
    });
    res.status(201).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteNotes(req, res) {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(201).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

async function getNoteById(req, res) {
  try {
    const note = await User.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

export { getNotes, createNotes, updateNotes, deleteNotes, getNoteById };
