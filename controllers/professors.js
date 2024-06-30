const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Professors']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("professors")
    .find();
  result
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((professors) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(professors);
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Professors']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid professors id to update the professors details.");
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("professors")
    .find({ _id: userId });
  result
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((professors) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(professors[0]);
    });
};

const createProfessor = async (req, res) => {
  //#swagger.tags=['Professors']
  const professor = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    socialSecurityNumber: req.body.socialSecurityNumber,
    isActive: req.body.isActive,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("professors")
    .insertOne(professor);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user.");
  }
};

const updateProfessor = async (req, res) => {
  //#swagger.tags=['Professors']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid professors id to update the professors details.");
  }
  const userId = new ObjectId(req.params.id);
  const professors = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    socialSecurityNumber: req.body.socialSecurityNumber,
    isActive: req.body.isActive,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("professors")
    .replaceOne({ _id: userId }, professors);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user.");
  }
};

const deleteProfessor = async (req, res) => {
  //#swagger.tags=['Professors']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid professors id to update the professors details.");
  }
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("professors")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("professors not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json("Some error occurred while deleting the professors.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createProfessor,
  updateProfessor,
  deleteProfessor,
};