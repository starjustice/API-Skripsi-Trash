var Transaksi_list = require("../Model/transaksilistmodel.js");

exports.create_transaksi_list = function(req, res) {
  var new_transaksi = new Transaksi_list(req.body);

  Transaksi_list.createTransaksiList(new_transaksi, function(err, task) {
    if (err) res.send(err);
    res.json({ error: false, data: task });
  });
};
