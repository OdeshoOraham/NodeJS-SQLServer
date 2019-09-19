//Iniitilize Libraries
const dbconfig = require("./config/db").dbconfig;
const express = require("express");
const sql = require("mssql");
// const path = require("path");
// const bodyparser = require("body-parser");

//Express App
const app = express();

//Set port number
const PORT = process.env.PORT || 5000;

//Use body parser
// app.use(bodyparser.json());

//Routes
// app.use("/", require("./routes/index"));

//Setting paths
// app.use(express.static(path.join(__dirname, "/public/styles")));
// app.use(express.static(path.join(__dirname, "/public/images")));
// app.use(express.static(path.join(__dirname, "/public/scripts")));

// connect to your database
sql.connect(dbconfig, function(err) {
  if (err) {
    console.log(err);
  } else console.log(`Server connected to Database: ${dbconfig.database} \n`);

  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query("select top 10 * from Demographics", function(err, recordset) {
    //print the first value of a specific column
    console.log("First Value of Patient_ID column");
    console.log(`Value: ${recordset["recordset"][0]["Demographics_ID"]}`);
    console.log("\n");

    //print all values of a specific columns using foreach
    console.log("All Values using Foreach");
    recordset["recordset"].forEach((element, index) => {
      console.log(`Value_${index}: ${element["Demographics_ID"]}`);
    });
    console.log("\n");

    //iterate through array using for loop
    console.log("Iterate through Array For-Loop y");
    let array = recordset["recordset"];
    for (let i = 0; i < array.length; i++) {
      console.log(`Value_${i}: ${array[i]["Demographics_ID"]}`);
    }
    console.log("\n");
  });
});

//open the port
app.listen(
  PORT,
  console.log(`Server started on port http://localhost:${PORT}`)
);
