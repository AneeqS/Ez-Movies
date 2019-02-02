const express = require('express');
const bodyParser = require("body-parser");
const rp = require('request-promise');
const app = express();
const port = 3000;
const url = 'http://www.omdbapi.com/?s=';
const key = '&apikey=thewdb';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    console.log("Requst was made for the root route");
    res.render("home");
});

app.post("/results", function(req, res){
    let search = req.body.search;
    console.log("Request was made for the results route");
    rp(url + search + key)
        .then(function (body) {
            let parsedData = JSON.parse(body);
            res.render("results", {search: search, data: parsedData});
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.listen(port, function(){
    console.log("Server Started");
});
