const router = require("express").Router();

const professorController = require("../controllers/professors");
const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", professorController.getAll);

router.get("/:id", professorController.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.saveProfessorDetails,
  professorController.createProfessor
);

router.put(
  "/:id",
  isAuthenticated,
  validation.saveProfessorDetails,
  professorController.updateProfessor
);

router.delete("/:id", isAuthenticated, professorController.deleteProfessor);

module.exports = router;