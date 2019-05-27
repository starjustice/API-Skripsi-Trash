var Sampah = require("../Model/sampahmodel.js");

exports.getsampahpoint = function(req, res) {
  Sampah.getsampahByName(new Sampah(req.body), function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};
