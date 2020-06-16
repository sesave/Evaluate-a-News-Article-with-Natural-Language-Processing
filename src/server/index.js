var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var aylien = require("aylien_textapi");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.static("dist"));

console.log(__dirname);

var textapi = new aylien({
  application_id: server.env.API_ID,
  application_key: server.env.API_KEY,
});

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.post("/api", (req, res) => {
  const { text } = req.body;
  console.log("Request to '/api' endpoint", text);
  textapi.sentiment({ text }, (error, result, remaining) => {
    console.log("Aylien Callback", result, remaining);
    res.send(result);
  });
});

app.post("/article", (req, res) => {
  const { text } = req.body;
  console.log("Request to '/article' endpoint", text);
  textapi.sentiment({ url: text }, (error, result, remaining) => {
    console.log("Aylien Callback", result, remaining);
    res.send(result);
  });
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
