var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var aylien = require("aylien_textapi");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.static("dist"));

console.log(__dirname);

var apiCredentials = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve("src/client/views/index.html"));
});

app.post("/textApi", (req, res) => {
  try {
    var data = apiCredentials.sentiment(
      {
        text: req.body.text,
      },
      function (error, response) {
        if (error === null) {
          console.log(response);
          res.send(response);
        }
      }
    );
    //res.send(mockAPIResponse)
  } catch (error) {
    // Passes errors into the handler
    return next(error);
  }
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

module.exports = app;
