var Dailytask = require("../Model/dailytaskmodel.js");

exports.getdailytaskbyuserid = function(req, res) {
  console.log(req.params.userId);
  Dailytask.getdailytaskbyuserID(req.params.userId, function(err, task) {
    if (err) res.send({ error: true, data: err });
    console.log("res", task);
    if (task.length > 0) {
      res.json({
        error: false,
        data: task
      });
    } else {
      res.json({
        error: true,
        data: null
      });
    }
  });
};
