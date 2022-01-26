const app = require("express");
const router = app.Router();
const {
  getExamples,
  createExample,
  updateExample,
  deleteExample,
} = require("../controllers/example");

//get all examples
router.get("/", getExamples);

//get single example
router.get("/:id", getExamples);

//create new example
router.post("/create", createExample);

//update example
router.post("/update/:id", updateExample);

//delete example
router.delete("/delete/:id", deleteExample);

module.exports = router;
