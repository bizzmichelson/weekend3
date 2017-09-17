var express = require("express");
var router = express.Router();
var Pool = require("pg").Pool;

var config = {
  host: "localhost", // where does the db server live
  port: 5432, // what port is it listening on - 5432 default
  database: "tasks",
  max: 20 // number of clients in the pool
};

// ourPool is an instance of a pool that knows our configuration
var ourPool = new Pool(config);

console.log("connected to DB");

module.exports = ourPool;
