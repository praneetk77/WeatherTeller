const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

var path = "https://api.openweathermap.org/data/2.5/weather?";
var appid = "appid=3c4be3c820353b995942f12119b6340e&units=metric";
var imageUrl1 = "https://openweathermap.org/img/wn/";
var imageUrl2 = "@2x.png";

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var city = req.body.city;
  https.get(path + "q=" + city + "&" + appid, function (respose) {
    respose.on("data", function (data) {
      var json = JSON.parse(data);
      console.log(json);
      const temp = json.main.temp;
      const desc = json.weather[0].description;
      const imgCode = json.weather[0].icon;
      console.log(temp + " " + desc);
      res.write("<h1>The weather in " + city + " is: " + desc + ".</h1>");
      res.write(
        "<h2>The temperature in " +
          city +
          " is " +
          temp +
          " degrees celcius.</h2>"
      );
      var imageUrl = imageUrl1 + imgCode + imageUrl2;
      console.log(imageUrl);
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("app running on port 3000.");
});
