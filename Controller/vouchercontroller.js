var Voucher = require("../Model/vouchermodel.js");

exports.GetVoucherbyuserid = function getvoucher(req, res) {
  Voucher.getvoucherbyuserID(req.params.userId, function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};
