module.exports = function(app) {
  var userList = require("../Controller/usercontroller");
  var sampahList = require("../Controller/sampahcontroller");
  var transaksi = require("../Controller/transaksicontroller");
  var transaksilist = require("../Controller/transaksilistcontroller");
  var dailytask = require("../Controller/dailytaskcontroller");
  var voucherlist = require("../Controller/vouchercontroller");
  var pembelianvoucherlist = require("../Controller/pembelianvouchercontroller");
  // todoList Routes
  app.route("/user").get(userList.list_all_user);
  app.route("/insertuser").post(userList.create_a_user);

  app.route("/user/:userId").get(userList.read_user_id);
  // app.route("/updatepoint").post(userList.update_a_point);
  app.route("/checkuser").post(userList.checkuser);

  app.route("/sampah").post(sampahList.getsampahpoint);

  app.route("/createtransaksi").post(transaksi.create_transaksi);
  app.route("/checktransaksi").post(transaksi.checktransaksi);
  app.route("/transaksi/updatetransaksi").post(transaksi.update_a_transaksi);

  app.route("/transaksi/checkbyuser").post(transaksi.read_transaksi_byuser);

  app.route("/transaksi/updatedate").post(transaksi.update_date);

  app.route("/createtransaksilist").post(transaksilist.create_transaksi_list);

  app.route("/voucheruser/:userId").get(voucherlist.GetVoucherbyuserid);
  app.route("/buyvoucher").post(pembelianvoucherlist.buy_voucher);

  app
    .route("/dailytask/getdailytaskuser/:userId")
    .get(dailytask.getdailytaskbyuserid);
};
