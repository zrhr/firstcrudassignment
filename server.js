const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
var fs = require("fs");
var path = require("path");
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [];
let tempArray = [];
let temp2 = "";
app.use(bodyParser.json());
app.get('/users', function(req, res) {
let temp = fs.readFileSync(path.join(__dirname, "/storage.json"), "utf-8");
  res.json(JSON.parse(temp));
});
app.post("/users", (req, res) => {
  let temporary = req.body;
  console.log(temporary)
  let temp = fs.readFileSync(path.join(__dirname, "/storage.json"), "utf-8");

  if (temp.length === 0) {
    tempArray.push(temporary);
    temp2 = JSON.stringify(tempArray);
  } else {
    tempArray = JSON.parse(temp);
    tempArray.push(temporary);
    temp2 = JSON.stringify(tempArray);
  }
  console.log(temp2);
  fs.writeFileSync(path.join(__dirname, "/storage.json"), temp2);

  res.sendStatus(200);
});
app.get("/", function(req, res) {
let temp = fs.readFileSync(path.join(__dirname, "/storage.json"), "utf-8");
  res.send(temp);
});
app.get("/users/:name", function(req, res) {
let temp = fs.readFileSync(path.join(__dirname, "/storage.json"), "utf-8");
 tempArray = JSON.parse(temp);
 for(let i=0; i<tempArray.length; i++)
 {
   if(req.params.name==tempArray[i].name)
   res.send(JSON.stringify(tempArray[i]))
 }
 res.sendStatus(400)
});
app.put("/users/:name", function(req, res) {
let temp = fs.readFileSync(path.join(__dirname, "/storage.json"), "utf-8");
 tempArray = JSON.parse(temp);
 for(let i=0; i<tempArray.length; i++)
 {
   if(req.params.name==tempArray[i].name)
   {
    tempArray[i]=req.body;
      temp2 = JSON.stringify(tempArray);


    fs.writeFileSync(path.join(__dirname, "/storage.json"), temp2);
   res.sendStatus(200)
   }
 }
 res.sendStatus(400)
});
app.delete("/users/:name", function(req, res) {
let temp = fs.readFileSync(path.join(__dirname, "/storage.json"), "utf-8");
 tempArray = JSON.parse(temp);

    temp2=tempArray.filter(item=>req.params.name!==item.name)
    console.log(temp2)
      temp2 = JSON.stringify(temp2);


    fs.writeFileSync(path.join(__dirname, "/storage.json"), temp2);
 res.sendStatus(200)
});


app.use(function(req, res) {
  res.sendStatus(404);
});
app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
