var sql = require("./db.js");

var Voucher = function(voucher) {
  this.idvoucher = voucher.ID_voucher;
  this.nama = voucher.Nama;
  this.harga = voucher.harga;
};

Voucher.getvoucherbyId = function getvoucher(idvoucher, result) {
  sql.query("SELECT * FROM voucher WHERE ID_voucher= ?", idvoucher, function(
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Voucher.getvoucherbyuserID = function getvoucheruser(iduser, result) {
  sql.query(
    "SELECT voucher.ID_voucher,voucher.Nama_voucher,voucher.Harga,pembelianvoucher.ID_User,pembelianvoucher.Code_aktivasi FROM voucher INNER JOIN pembelianvoucher ON voucher.ID_voucher = pembelianvoucher.ID_voucher WHERE  pembelianvoucher.ID_User = ? ",
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

module.exports = Voucher;
