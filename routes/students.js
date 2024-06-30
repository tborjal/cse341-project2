const router = require("express").Router();

const userController = require("../controllers/students");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");
router.get("/", userController.getAll);

router.get("/:id", userController.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.saveContact,
  userController.createStudent
);

router.put(
  "/:id",
  isAuthenticated,
  validation.saveContact,
  userController.updateStudent
);

router.delete("/:id", isAuthenticated, userController.deleteStudent);

module.exports = router;