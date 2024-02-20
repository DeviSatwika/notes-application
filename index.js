const PORT = 4001;

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb+srv://satwika:satwika@cluster0.wmtonfb.mongodb.net/?retryWrites=true&w=majority');

var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to the database"));
db.once('open', () => {
  console.log("Connected to the Database");

  app.post("/note", (req, res) => {
    var text = req.body.text;
    var write = req.body.write;

    var data = {
      "text": text,
      "write": write
    };

    db.collection('users').insertOne(data, (err, collection) => {
      if (err) {
        console.error("Error inserting data into MongoDB:", err);
      }
      console.log("Record Inserted successfully");
    });
  });

  app.get("/", (req, res) => {
    res.set({
      "Access-Control-Allow-Origin": "*"
    });
    return res.redirect('index.html');
  });

  // Use app.listen to start the server
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
