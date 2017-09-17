var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 3000;
var todoModule = require("./routes/todoModule");
var morgan = require("morgan");
var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("tiny"));

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/todo", todoModule);

app.get("/", function(req, res) {
  res.sendFile("/index.html");
});

app.listen(port, function() {
  console.log("listening on port", port);
});

// app.get('/tasks', function(req,res) {

//   pool.connect(function(connectionError, client, done) {
//     if (connectionError){
//       res.sendStatus(500);
//     } else {
//       client.query(SELECT * FROM todo, function(queryError, resultsObj) {
//         if (queryError) {
//           res.sendStatus(500);
//         }else {
//           res.send(resultsObj.rows);
//         }
//         }
//     )
//   }
//   })
