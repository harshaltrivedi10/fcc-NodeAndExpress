let express = require('express');
require('dotenv').config();

let app = express();
let path = __dirname;
let staticAssets = path + "/public";
// Challenge 1 - output something to the console
console.log("Hello World!");

// Challenge 2 - respond with HELLO EXPRESS when the default route is hit
// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

// Challenge 4 - expose the public/static assets so they can be used
app.use("/public", express.static(staticAssets));

// Challenge 3 - return the index.html file
app.get("/", (req, res) => {
  resolvedPath = path + "/views/index.html";
  res.sendFile(resolvedPath);
})

// Challenge 5 - Implement env file. Use the environment variable to determine if the response should be uppercase or lowercase
app.get("/json", (req, res) => {
  let message = process.env.MESSAGE_STYLE === "uppercase" ? "Hello json".toUpperCase() : "Hello json";
  res.json({message});
})

 module.exports = app;
