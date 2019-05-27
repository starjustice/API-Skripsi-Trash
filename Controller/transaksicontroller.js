var Transaksi = require("../Model/transaksimodel.js");
var User = require("../Model/usermodel.js");
var Dailytask = require("../Model/dailytaskmodel.js");
var Dailytasklist = require("../Model/dailytasklistmodel.js");
var currentDate = new Date();

exports.checktransaksi = function(req, res) {
  Transaksi.gettransaksibyId(new Transaksi(req.body), function(err, task) {
    if (err) res.send(err);
    console.log("res", task);
    if (task.length > 0) {
      res.json({
        error: false,
        transaksi: true,
        message: "transaksi ada",
        data: task
      });
    } else {
      res.json({
        error: false,
        transaksi: false,
        message: "transaksi tidak ditemukan",
        data: task
      });
    }
  });
};

exports.update_a_transaksi = function(req, res) {
  var data = new Transaksi(req.body);
  console.log(data);
  var sampahlist = [];
  var id = data.iduser;
  var datauser = new User((iduser = id));
  // var datauser2 = new User((iduser = id));
  // datauser2.iduser = id;
  // console.log(id);
  datauser.iduser = id;
  var z = 0;
  Transaksi.updateBybarcode(data, function(err, task) {
    if (err) res.send({ error: true, data: err });
    else {
      Transaksi.gettransaksibybarcode(data, function(err, trans) {
        if (err) res.send({ error: true, data: err });
        else {
          for (i in trans) {
            sampahlist.push(trans[i]["Nama_sampah"]);
          }

          var datanew = new Transaksi((idtransaksi = trans[0]["ID_transaksi"]));
          Transaksi.GettotalSampahPoint(trans[0]["ID_transaksi"], function(
            err,
            task1
          ) {
            if (err) res.send({ error: true, data: err });
            else {
              point = task1[0]["Jumlah"];
              datauser.point = point;
              User.updatePointById(datauser, function(err, task2) {
                if (err) res.send({ error: true, data: err });
                else {
                  console.log("ada");
                  Dailytask.getdailytaskbyuserIDandStatus(id, function(
                    err,
                    dailyresult
                  ) {
                    if (err) res.send({ error: true, data: err });
                    else {
                      console.log("masuk");
                      for (i in dailyresult) {
                        var iddaily = dailyresult[z]["ID_Dailytask"];
                        Transaksi.gettransaksitodaybyidsampah(
                          data,
                          dailyresult[i]["ID_sampah"],
                          function(err, transaksitoday) {
                            if (err) res.send({ error: true, data: err });
                            else {
                              // // console.log(transaksitoday[0]["Jumlah"]);
                              // console.log(dailyresult[z]["ID_Dailytask"]);
                              if (
                                parseInt(transaksitoday[0]["Jumlah"]) >=
                                parseInt(dailyresult[z]["Jumlah"])
                              ) {
                                var datauser2 = new User((iduser = id));
                                datauser2.iduser = id;
                                datauser2.point = dailyresult[z]["Point"];
                                User.updatePointById(datauser2, function(
                                  err,
                                  updatepoint2
                                ) {
                                  if (err) res.send({ error: true, data: err });
                                  else {
                                    Dailytasklisttmp = new Dailytasklist(
                                      (iduser = id)
                                    );
                                    console.log(dailyresult[z]);
                                    Dailytasklisttmp.iduser = id;
                                    Dailytasklisttmp.iddailytask = iddaily;
                                    console.log(Dailytasklisttmp);
                                    Dailytasklist.updatestatus(
                                      Dailytasklisttmp,
                                      function(err, updatestatusresult) {
                                        if (err)
                                          res.send({ error: true, data: err });
                                          console.log("berubah")
                                      }
                                    );
                                  }
                                });
                              } else {
                                console.log("tidak ada");
                              }
                              z = z + 1;
                            }
                          }
                        );
                      }
                      res.json({
                        error: false,
                        data: task2,
                        point: point,
                        sampahlist: sampahlist
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.create_transaksi = function(req, res) {
  var new_task = new Transaksi(req.body);
  //handles null error
  if (!new_task.idtransaksi) {
    res
      .status(400)
      .send({ error: true, message: "Please provide transaksi id" });
  } else {
    Transaksi.gettransaksibyId(new_task, function(err, task) {
      if (err) res.send(err);
      if (task.length > 0) {
        res.send({ error: true, message: "Same ID" });
      } else {
        Transaksi.createTransaksi(new_task, function(err, task) {
          if (err) res.send(err);
          res.json({ error: false, data: task });
        });
      }
    });
  }
};

exports.read_transaksi_byuser = function(req, res) {
  Transaksi.gettransaksibyuserID(new Transaksi(req.body), function(err, task) {
    if (err) res.send({error:true, data:err});
    if (task.length > 0) {
      res.json({
        error: false,
        message: "transaksi ada",
        data: task
      });
    } else {
      res.json({
        error: false,
        message: "transaksi tidak ditemukan",
        data: task
      });
    }
  });
};

exports.update_date = function(req, res) {
  Transaksi.updatedate(new Transaksi(req.body), function(err, task) {
    if (err) res.send({error:true, data:err});
    res.json({error:false, data:task});
  });
};

