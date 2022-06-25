let express = require('express');
let app = express();

// Challenge 1 - output something to the console
console.log("Hello World!");

app.get("/", function (req, res) {
  res.send("Hello Express");
});

































 module.exports = app;
