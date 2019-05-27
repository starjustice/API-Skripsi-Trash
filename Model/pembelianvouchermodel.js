var sql = require("./db.js");

var Pembelianvoucher = function(pembelianvoucher) {
  this.iduser = pembelianvoucher.ID_User;
  this.idvoucher = pembelianvoucher.ID_voucher;
  this.codeaktivasi = pembelianvoucher.Code_aktivasi;
};

Pembelianvoucher.buyvoucher = function buy(Pembelianvoucher, result) {
  sql.query(
    "Insert into pembelianvoucher (ID_User,ID_voucher,Code_aktivasi) values(?,?,?)",
    [
      Pembelianvoucher.iduser,
      Pembelianvoucher.idvoucher,
      Pembelianvoucher.codeaktivasi
    ],
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

module.exports = Pembelianvoucher;
