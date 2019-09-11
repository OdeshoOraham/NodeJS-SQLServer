//Iniitilize Libraries
const dbconfig = require("./config/db").dbconfig;
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
var sql = require("mssql");

//Express App
const app = express();

//use body parser
app.use(bodyparser.json());

//Routes
app.use("/", require("./routes/index"));

//Set port number
const PORT = process.env.PORT || 5000;

//Setting paths
app.use(express.static(path.join(__dirname, "/public/styles")));
app.use(express.static(path.join(__dirname, "/public/images")));
app.use(express.static(path.join(__dirname, "/public/scripts")));

// connect to your database
sql.connect(dbconfig, function(err) {
  if (err) console.log(err);

  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query("select top 1 * from Demographics", function(err, recordset) {
    console.log(recordset["recordset"][0]["Demographics_ID"]);
  });
});

//open the port
app.listen(
  PORT,
  console.log(`Server started on port http://localhost:${PORT}`)
);
