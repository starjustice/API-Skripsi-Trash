var User = require("../Model/usermodel.js");

exports.list_all_user = function(req, res) {
  User.getAllUser(function(err, task) {
    console.log("controller");
    if (err) res.send(err);
    // console.log("res", task);
    var nama = [];
    for (i in task) {
      nama.push(task[i]["Nama"]);
    }
    res.send({ data: task, namalist: nama });
  });
};
exports.read_user_id = function(req, res) {
  User.getUserByID(req.params.userId, function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};
exports.checkuser = function(req, res) {
  User.getUserByNameAndPassword(new User(req.body), function(err, task) {
    // console.log(task[0]["Nama"]);
    if (err) res.send(err);
    if (task.length > 0)
      res.send({
        error: false,
        login: true,
        message: "username sama",
        data: task
      });
    else {
      res.json({ error: false, login: false, message: "belum ada" });
    }
  });
};

exports.create_a_user = function(req, res) {
  var new_task = new User(req.body);
  new_task.point = 0;
  //handles null error
  if (!new_task.nama) {
    res.status(400).send({ error: true, message: "Please provide name" });
  } else {
    User.getUserByName(new_task, function(err, task) {
      if (err) res.send(err);
      if (task.length > 0) {
        res.send({ error: true, message: "Name already take" });
      } else {
        User.createUser(new_task, function(err, task1) {
          if (err) res.send(err);
          res.json({ error: false, message: task1 });
        });
      }
    });
  }
};

exports.update_a_point = function(req, res) {
  User.updatePointById(new User(req.body), function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};
