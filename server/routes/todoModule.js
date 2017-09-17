var express = require("express");
var router = express.Router();
var pool = require("../modules/pool");

router.delete("/:id", function(req, res) {
  console.log("in delete inventory route");
  console.log("req.params.id ->", req.params.id);
  var dbId = req.params.id;

  // pool.connect
  pool.connect(function(connectionError, client, done) {
    // error handling for the connection
    if (connectionError) {
      console.log(connectionError);
      res.sendStatus(500).end();
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
          res.sendStatus(500).end();
        } else {
          // if successful respond with a 200 level status code
          res.sendStatus(202).end();
        }
      });
    }
  });
});

router.post("/", function(req, res) {
  console.log("post body", req.body.task);
  var post = req.body.task;
  res.sendStatus(200).end();

  // pool.connect
  pool.connect(function(connectionError, client, done) {
    // error handling for the connection
    if (connectionError) {
      console.log(connectionError);
      res.sendStatus(500).end();
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
          res.sendStatus(500).end();
        } else {
          // if successful respond with a 200 level status code
          res.sendStatus(202).end();
        }
      });
    }
  });
});
router.get("/", function(req, res) {
  console.log("inside todoModule GET function");
  pool.connect(function(err, client, done) {
    if (err) {
      res.sendStatus(500).end();
    } else {
      client.query("SELECT * FROM todo", function(err, resObj) {
        // done();
        if (err) {
          res.sendStatus(500).end();
        } else {
          res.send(resObj.rows).end();
        }
      });
    }
  });
});

module.exports = router;
