var express = require("express");
var router = express.Router();
var pool = require("../modules/pool");

router.get("/get", function(req, res) {
  console.log("inside todoModule GET function");
  pool.connect(function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    } else {
      client.query("SELECT * FROM todo", function(err, resObj) {
        // done();
        if (err) {
          res.sendStatus(500);
        } else {
          console.log(resObj.rows);
          res.send(resObj.rows);
        }
      });
    }
  });
});

router.delete("/delete/:id", function(req, res) {
  console.log("in delete inventory route");
  console.log("req.params.id ->", req.params.id);
  var dbId = req.params.id;

  // pool.connect
  pool.connect(function(connectionError, client, done) {
    // error handling for the connection
    if (connectionError) {
      console.log(connectionError);
      res.sendStatus(500);
    } else {
      // client.query
      // parameterized queries
      // DELETE FROM inventory WHERE id=$1, [dbId]
      client.query("DELETE FROM todo WHERE id=$1;", [dbId], function(
        queryError,
        result
      ) {
        done();
        // error handling for the query
        if (queryError) {
          console.log(queryError);
          res.sendStatus(500);
        } else {
          // if successful respond with a 200 level status code
          res.sendStatus(202);
        }
      });
    }
  });
});

router.post("/add", function(req, res) {
  console.log(req.body);
  console.log("post body", req.body.task);
  var post = req.body.task;

  // pool.connect
  pool.connect(function(connectionError, client, done) {
    // error handling for the connection
    if (connectionError) {
      console.log(connectionError);
      res.sendStatus(500);
    } else {
      // client.query
      // parameterized queries
      // DELETE FROM inventory WHERE id=$1, [dbId]
      client.query("INSERT INTO todo (task) VALUES ($1);", [post], function(
        queryError,
        result
      ) {
        done();
        // error handling for the query
        if (queryError) {
          console.log(queryError);
          res.sendStatus(500);
        } else {
          // if successful respond with a 200 level status code
          res.sendStatus(200);
        }
      });
    }
  });
});

router.put("/update", function(req, res) {
  console.log("test");
  console.log("post body", req.body.complete);
  // var taskState = req.body.complete;
  // var taskCompleted = req.params.id;
  // res.sendStatus(200);

  pool.connect(function(connectionError, client, done) {
    // error handling for the connection
    if (connectionError) {
      console.log(connectionError);
      res.sendStatus(500);
    } else {
      client.query(
        "UPDATE todo SET complete = $1 WHERE id = $2",
        [req.body.complete, req.body.id],
        function(queryError, result) {
          done();
          // error handling for the query
          if (queryError) {
            console.log(queryError);
            res.sendStatus(500);
          } else {
            // if successful respond with a 200 level status code
            console.log("success??");
            res.sendStatus(202);
          }
        }
      );
    }
  });
});

module.exports = router;
