const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Students']
  const result = await mongodb.getDatabase().db().collection("students").find();
  result
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((students) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(students);
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Students']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must us a valid student id to update the student details.");
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("students")
    .find({ _id: userId });
  result
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((students) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(students[0]);
    });
};

const createStudent = async (req, res) => {
  //#swagger.tags=['Students']
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    schoolId: req.body.schoolId,
    birthday: req.body.birthday,
    gradeLevel: req.body.gradeLevel,
    gradeSection: req.body.gradeSection,
    teacherAdviser: req.body.teacherAdviser,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("students")
    .insertOne(student);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user.");
  }
};

const updateStudent = async (req, res) => {
  console.log("Lusot sa authentication");
  //#swagger.tags=['Students']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must us a valid student id to update the student details.");
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    schoolId: req.body.schoolId,
    birthday: req.body.birthday,
    gradeLevel: req.body.gradeLevel,
    gradeSection: req.body.gradeSection,
    teacherAdviser: req.body.teacherAdviser,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("students")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user.");
  }
};

const deleteStudent = async (req, res) => {
  //#swagger.tags=['Students']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid student id to update the student details.");
  }
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("students")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json("Some error occurred while deleting the user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent,
};