var sql = require("./db.js");

var User = function(user) {
  this.iduser = user.ID_User;
  this.nama = user.Nama;
  this.password = user.Password;
  this.point = user.Point;
};

User.getUserByID = function getuser(id, result) {
  sql.query("Select * from user where ID_User = ?", id, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.getUserByName = function getusername(User, result) {
  sql.query("Select * from user where Nama = ?", User.nama, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.getUserByNameAndPassword = function getusernameandpassword(User, result) {
  sql.query(
    "Select * from user where Nama = ? AND Password = ?",
    [User.nama, User.password],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.getAllUser = function getAllUser(result) {
  sql.query("SELECT * FROM user", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("user : ", res);

      result(null, res);
    }
  });
};

User.createUser = function createUser(User, result) {
  sql.query(
    "Insert into user (Nama,Password,Point) values(?,?,?)",
    [User.nama, User.password, User.point],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, "success");
      }
    }
  );
};

User.updatePointById = function(User, result) {
  sql.query(
    "UPDATE user set user.Point=(user.Point + ?) where ID_User=?",
    [User.point, User.iduser],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

User.decreasePointById = function(User, result) {
  sql.query(
    "UPDATE user set user.Point=(user.Point - ?) where ID_User=?",
    [User.point, User.iduser],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = User;
