const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
port = process.env.PORT || 8080;

app.listen(port);

console.log("API server started on: " + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

var routes = require("./Routes/approute"); //importing route
routes(app); //register the route
