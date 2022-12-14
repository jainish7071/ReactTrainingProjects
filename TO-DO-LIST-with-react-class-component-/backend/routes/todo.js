const express = require("express");
const router = express.Router();
const Todo = require("../Models/Todo");
const { body, validationResult } = require("express-validator");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, async (req, res) => {
  let status = false;
  try {
    let todos = await Todo.find({ user: req.user });
    status = true;
    res.status(200).send({ status, data: todos });
  } catch (error) {
    res.status(500).send({ status, data: "Internal Server Error" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  let status = false;
  try {
    // finding is todo is present or not
    let todo = await Todo.findById(id);
    if (todo) {
      // checking is todo is owned by user or not
      if (todo.user.toString() === req.user) {
        // deleting user
        let result = await Todo.findByIdAndDelete(id);
        status = true;
        res.send({ status, data: "Todo Deleted Successfully" });
      } else {
        res.status(401).send({ status, data: "Access Denide" });
      }
    } else {
      res.status(400).send({ status, data: "Todo Not Found" });
    }
  } catch (error) {
    res.status(500).send({ status, data: "Internal Server Error" });
  }
});

router.put("/:id", [authenticate, body("title", "Enter A valid title").isLength({ min: 3 }), body("desc", "Enter a valid description.").isLength({ min: 5 })], async (req, res) => {
  let status = false;
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status, data: errors.errors[0].msg });
  }
  try {
    let todo = await Todo.findById(id);
    if (todo) {
      if(todo.user.toString() !== req.user){
        return res.status(401).send({status, data:"Access Denide"});
      }
      let result = await Todo.updateOne(
        { _id: id },
        {
          title: req.body.title,
          desc: req.body.desc,
        }
      );
      let updatedTodo = await Todo.findById(id);
      if (result.acknowledged) {
        status = true;
        res.status(200).send({ status, data: updatedTodo });
      } else {
        res.send({ status, data: "Something went wrong!!!" });
      }
    } else {
      res.status(400).send({ status, data: "Todo Not Found !!" });
    }
  } catch (error) {
    res.status(500).send({ status, data: "Internal Server Error" });
  }
});

router.post("/", [authenticate, body("title", "Enter A valid title").isLength({ min: 3 }), body("desc", "Enter a valid description.").isLength({ min: 5 })], async (req, res) => {
  let status = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status, data: errors.errors[0].msg });
  }
  try {
    let todo = new Todo({
      user: req.user,
      title: req.body.title,
      desc: req.body.desc,
    });
    let success = await Todo.create(todo);
    status = true;
    res.status(200).send({ status, data: todo });
  } catch (error) {
    res.status(500).send({ status, data: "Internal Server Error" });
  }
});


module.exports = router;
