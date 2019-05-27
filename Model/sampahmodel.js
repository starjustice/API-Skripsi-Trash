var sql = require("./db.js");

var Sampah = function(sampah) {
  this.idsampah = sampah.ID_sampah;
  this.namasampah = sampah.Nama_sampah;
  this.point = sampah.Point;
};

Sampah.getsampahByName = function getsampah(Sampah, result) {
  sql.query(
    "Select * from sampah where Nama_sampah = ?",
    Sampah.namasampah,
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

module.exports = Sampah;
