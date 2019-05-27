var Pembelianvoucher = require("../Model/pembelianvouchermodel.js");
var User = require("../Model/usermodel.js");
var Voucher = require("../Model/vouchermodel.js");

exports.buy_voucher = function(req, res) {
  var pembelianvoucher = new Pembelianvoucher(req.body);
  pembelianvoucher.codeaktivasi = Math.random()
    .toString(36)
    .substring(2, 15);
  var id = pembelianvoucher.iduser;
  var datauser = new User((iduser = id));
  datauser.iduser = id;
  Voucher.getvoucherbyId(pembelianvoucher.idvoucher, function(
    err,
    voucherresult
  ) {
    if (err) res.send({ error: true, data: err });
    else {
      datauser.point = voucherresult[0]["Harga"];
      User.decreasePointById(datauser, function(err, userresult) {
        if (err) res.send({ error: true, data: err });
        else {
          Pembelianvoucher.buyvoucher(pembelianvoucher, function(err, task) {
            if (err) res.send(err);
            res.json({ error: false, data: task });
          });
        }
      });
    }
  });
};
