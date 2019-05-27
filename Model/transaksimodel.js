var sql = require("./db.js");

var Transaksi = function(transaksi) {
  this.idtransaksi = transaksi.ID_transaksi;
  this.tgltransaksi = transaksi.Tanggal_transaksi;
  this.iduser = transaksi.ID_user;
  this.barcode = transaksi.Barcode;
};

Transaksi.gettransaksibyId = function gettransaksi(Transaksi, result) {
  sql.query(
    "SELECT transaksi.ID_transaksi, transaksi.ID_User, transaksi.Tanggal, transaksi.Barcode, sampah.Nama_sampah FROM transaksi INNER JOIN transaksi_list ON transaksi.ID_transaksi = transaksi_list.ID_transaksi INNER JOIN sampah ON transaksi_list.ID_sampah = sampah.ID_sampah WHERE transaksi.ID_transaksi = ? ORDER BY transaksi.Tanggal",
    Transaksi.idtransaksi,
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

Transaksi.GettotalSampahPoint = function getsampahpoint(id, result) {
  sql.query(
    "SELECT SUM(sampah.Point) AS Jumlah FROM transaksi INNER JOIN transaksi_list ON transaksi.ID_transaksi = transaksi_list.ID_transaksi INNER JOIN sampah ON transaksi_list.ID_sampah = sampah.ID_sampah WHERE transaksi.ID_transaksi = ?",
    id,
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

Transaksi.gettransaksibyuserID = function gettransaksiuser(Transaksi, result) {
  sql.query(
    "SELECT transaksi.ID_transaksi, transaksi.ID_User, transaksi.Tanggal, transaksi.Barcode, sampah.Nama_sampah FROM transaksi INNER JOIN transaksi_list ON transaksi.ID_transaksi = transaksi_list.ID_transaksi INNER JOIN sampah ON transaksi_list.ID_sampah = sampah.ID_sampah WHERE  transaksi.ID_user = ? ORDER BY transaksi.Tanggal",
    Transaksi.iduser,
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

Transaksi.gettransaksitodaybyidsampah = function gettransaksitoday(
  Transaksi,
  idsampah,
  result
) {
  sql.query(
    "SELECT transaksi.Tanggal,sampah.Nama_sampah, COUNT(*) AS Jumlah FROM transaksi INNER JOIN transaksi_list ON transaksi.ID_transaksi = transaksi_list.ID_transaksi INNER JOIN sampah ON transaksi_list.ID_sampah = sampah.ID_sampah WHERE  transaksi.ID_user = ? AND (transaksi.Tanggal  >= CURDATE() AND transaksi.Tanggal < (CURDATE() + INTERVAL 1 DAY)) AND transaksi_list.ID_sampah = ?",
    [Transaksi.iduser, idsampah],
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

Transaksi.gettransaksibydateanduser = function gettransaksidate(
  Transaksi,
  result
) {
  sql.query(
    "SELECT transaksi.ID_transaksi, transaksi.ID_User, transaksi.Tanggal, transaksi.Barcode, sampah.Nama_sampah FROM transaksi INNER JOIN transaksi_list ON transaksi.ID_transaksi = transaksi_list.ID_transaksi INNER JOIN sampah ON transaksi_list.ID_sampah = sampah.ID_sampah WHERE transaksi.tanggal = ? AND transaksi.ID_User = ? ORDER BY transaksi.Tanggal",
    [Transaksi.tanggal, Transaksi.iduser],
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

Transaksi.gettransaksibybarcode = function gettransaksi(Transaksi, result) {
  sql.query(
    "SELECT transaksi.ID_transaksi, transaksi.ID_User, transaksi.Tanggal, transaksi.Barcode, sampah.Nama_sampah FROM transaksi INNER JOIN transaksi_list ON transaksi.ID_transaksi = transaksi_list.ID_transaksi INNER JOIN sampah ON transaksi_list.ID_sampah = sampah.ID_sampah WHERE transaksi.Barcode = ? ORDER BY transaksi.Tanggal",
    Transaksi.barcode,
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

Transaksi.createTransaksi = function createTransaksi(Transaksi, result) {
  sql.query(
    "Insert into transaksi (ID_transaksi,ID_User, Tanggal, Barcode) values(?,?,?,?)",
    [
      Transaksi.idtransaksi,
      Transaksi.iduser,
      Transaksi.tgltransaksi,
      Transaksi.barcode
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

Transaksi.updateBybarcode = function(Transaksi, result) {
  sql.query(
    "UPDATE transaksi set ID_User=? where Barcode=?",
    [Transaksi.iduser, Transaksi.barcode],
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

Transaksi.updatedate = function(Transaksi, result) {
  sql.query(
    "UPDATE transaksi set Tanggal=? where ID_transaksi=?",
    [Transaksi.tgltransaksi, Transaksi.idtransaksi],
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

module.exports = Transaksi;
