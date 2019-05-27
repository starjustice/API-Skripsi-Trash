var sql = require("./db.js");

var Dailytask = function(dailytask) {
  this.iddailytask = dailytask.ID_Dailytask;
  this.namadailytask = dailytask.Nama_Dailytask;
  this.idsampah = dailytask.ID_sampah;
  this.jumlah = dailytask.Jumlah;
  this.point = dailytask.point;
};

Dailytask.getdailytaskbyId = function getdailytask(Dailytask, result) {
  sql.query(
    "SELECT * from dailytask where ID_Dailytask = ?",
    Dailytask.iddailytask,
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

Dailytask.getdailytaskbyuserID = function getdailytaskuser(iduser, result) {
  sql.query(
    "SELECT dailytask.ID_Dailytask, dailytask.Nama_Dailytask, dailytask.ID_sampah, dailytask.Jumlah, dailytask.Point, dailytasklist.ID_user, dailytasklist.Status FROM dailytask INNER JOIN dailytasklist ON dailytask.ID_Dailytask = dailytasklist.ID_Dailytask WHERE  dailytasklist.ID_User = ?",
    iduser,
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

Dailytask.getdailytaskbyuserIDandStatus = function getdailytaskuserstatus(
  iduser,
  result
) {
  sql.query(
    "SELECT dailytask.ID_Dailytask, dailytask.Nama_Dailytask, dailytask.ID_sampah, dailytask.Jumlah, dailytask.Point, dailytasklist.ID_user, dailytasklist.Status FROM dailytask INNER JOIN dailytasklist ON dailytask.ID_Dailytask = dailytasklist.ID_Dailytask WHERE  dailytasklist.ID_User = ? AND dailytasklist.Status = 0",
    iduser,
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

module.exports = Dailytask;
