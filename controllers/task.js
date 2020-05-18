const Tasks = require("../models/tasks");
const _ = require("lodash");
const moment = require("moment");

const today = moment().startOf("day");

exports.taskById = (req, res, next) => {
  const { taskId } = req.params;
  Tasks.findById(taskId).exec((err, tasks) => {
    if (err || !tasks) {
      return res.status(400).json({
        error: err,
      });
    }
    req.task = tasks;
    next();
  });
};

exports.createTask = (req, res, next) => {
  const fields = req.body;

  console.log(fields);

  let task = new Tasks(fields);
  task.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ result });
  });
};

exports.getTasks = (req, res) => {
  const query = req.query;

  if (query.today === "true") {
    console.log(new Date());
    Tasks.find({
      remind_date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    })
      .then((tasks) => {
        res.json({
          tasks: tasks,
        });
      })
      .catch((err) => console.log(err));
    return;
  }

  const tasks = Tasks.find()
    .then((tasks) => {
      res.json({
        tasks: tasks,
      });
    })
    .catch((err) => console.log(err));
};

exports.getTaskById = (req, res) => {
  let task = req.task;
  Tasks.findById(task)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => console.log(err));
};
exports.updateTask = (req, res) => {
  let task = req.task;
  task = _.extend(task, req.body);
  task.save((err, task) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(task);
  });
};
exports.deleteTask = (req, res) => {
  let task = req.task;
  task.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Task deleted successfully",
    });
  });
};
