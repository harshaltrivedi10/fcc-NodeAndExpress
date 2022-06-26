let express = require('express');
let bodyParser = require('body-parser');
require('dotenv').config();

let app = express();
let path = __dirname;
let staticAssets = path + "/public";


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Challenge 1 - output something to the console
console.log("Hello World!");

// Challenge 2 - respond with HELLO EXPRESS when the default route is hit
// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

// Challenge 7 - Implement a middleware for all the requests. Log Method, Path, IP
app.use((req, res, next) => {
  let logMessage = req.method + " " + req.path + " - " + req.ip + " ";
  console.log(logMessage);
  return next();
});

// Challenge 4 - expose the public/static assets so they can be used
app.use("/public", express.static(staticAssets));

// Challenge 3 - return the index.html file
app.get("/", (req, res) => {
  resolvedPath = path + "/views/index.html";
  res.sendFile(resolvedPath);
})

// Challenge 5 and 6 - Send a JSON reponse. Implement env file. Use the environment variable to determine if the response should be uppercase or lowercase
app.get("/json", (req, res) => {
  let message = process.env.MESSAGE_STYLE === "uppercase" ? "Hello json".toUpperCase() : "Hello json";
  res.json({message});
})

// Challenge 8 - Send Time as a response using middleware chaining
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
});

// Challenge 9 - Using Route Parameters
app.get("/:word/echo", (req, res, next) => {
  let word = req.params.word;
  res.send({echo: word});
});

app.get("/name", (req, res, next) => {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.send({name: `${firstName} ${lastName}`});
  })
  
 app.post("/name", (req, res, next) => {
    let firstName = req.body.first;
    let lastName = req.body.last;
    res.json({name: `${firstName} ${lastName}`});
  })

module.exports = app;
