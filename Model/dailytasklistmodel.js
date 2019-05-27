var sql = require("./db.js");

var Dailytasklist = function(dailytasklist) {
  this.iduser = dailytasklist.ID_User;
  this.iddailytask = dailytasklist.ID_Dailytask;
  this.status = dailytasklist.Status;
};

Dailytasklist.updatestatus = function(Dailytasklist, result) {
  sql.query(
    "UPDATE dailytasklist SET Status=1 WHERE ID_User = ? AND ID_Dailytask = ?",
    [Dailytasklist.iduser, Dailytasklist.iddailytask],
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

module.exports = Dailytasklist;
