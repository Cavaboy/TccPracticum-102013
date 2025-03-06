import User from "../models/UserModel.js";

// GET
async function getNotes(req, res) {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// CREATE
async function createNotes(req, res) {
  try {
    const inputResult = req.body;
    await User.create(inputResult);
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    console.log(error.message);
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

export { getNotes, createNotes, updateNotes, deleteNotes };
