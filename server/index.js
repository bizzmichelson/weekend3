var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 3000;
var todoModule = require("./routes/todoModule");
var morgan = require("morgan");
var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("short"));

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile("/index.html");
});

app.use("/todo", todoModule);

app.listen(port, function() {
  console.log("listening on port", port);
});
