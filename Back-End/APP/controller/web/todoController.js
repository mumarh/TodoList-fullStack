const todomodel = require("../../model/todo.model");


const Todoinsert = (req, res) => {
    const { task } = req.body;

    const todo = new todomodel({ task });

    todo.save()
        .then(savedTodo => {
            res.send({ status: 1, msg: "Task Added", todo: savedTodo });
        })
        .catch(err => {
            res.status(500).send({ status: 0, msg: "Failed to add task", error: err });
        });
};


let Todoread = (req, res) => {
    todomodel.find()
      .then((todos) => {
          res.send({ status: 1, data: todos });
      })
      .catch((err) => {
          res.status(500).send({ status: 0, msg: "Failed to get tasks", error: err });
      });
};

let Tododelete = (req, res) => {
  let todoId = req.params.id;

  todomodel.deleteOne({ _id: todoId })
    .then((result) => {
      res.send({ status: 1, msg: "Data Deleted successfully", data: result });
    })
    .catch((err) => {
      res.status(500).send({ status: 0, msg: "Failed to Delete task", error: err });
    });
};


let Todorow = (req, res) => {
  let todoId = req.params.id;

  todomodel.findOne({ _id: todoId })
    .then((result) => {
      res.send({ status: 1, msg: "Data Deleted successfully", data: result });
    })
    .catch((err) => {
      res.status(500).send({ status: 0, msg: "Failed to Delete task", error: err });
    });
};

let Todoupdate = (req, res) => {
  let todoId = req.params.id;
  let { task } = req.body;

  let obj = { task };

  todomodel.updateOne({ _id: todoId }, obj)
    .then((updateResult) => {
      res.send({
        status: 1,
        msg: "Task Updated Successfully",
        data: updateResult
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        msg: "Failed to update task",
        error: err
      });
    });
};



module.exports = { Todoinsert , Todoread , Tododelete , Todorow , Todoupdate};
