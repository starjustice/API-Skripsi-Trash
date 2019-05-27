var sql = require("./db.js");

var Transaksi_list = function(transaksi_list) {
  this.idtransaksi = transaksi_list.ID_transaksi;
  this.idsampah = transaksi_list.ID_sampah;
};

Transaksi_list.createTransaksiList = function createTransaksiList(
  Transaksi_list,
  result
) {
  sql.query(
    "Insert into transaksi_list (ID_transaksi,ID_sampah) values(?,?)",
    [Transaksi_list.idtransaksi, Transaksi_list.idsampah],
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

module.exports = Transaksi_list;
