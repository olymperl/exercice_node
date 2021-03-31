const express = require('express');

const PORT = 3000;


const app = express();
app.use(express.json()); 


app.get("/", (req, res) => {
res.send("Bonjour !");
});


app.get("/hello", (req, res) => {
if (req.query.nom === undefined) {
res.send('Quel est votre nom ?');
} else {
res.send("Bonjour, " + req.query.nom + " !");
}
});

app.listen(PORT);

app.post("/chat", (req, res) => {
let réponse;
if (req.body.msg === 'ville') {
réponse = "Nous sommes à Paris";
} else if (req.body.msg === 'météo') {
réponse = "Il fait beau";
} else {
réponse = "Paramètre msg non reconnu";
}

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://olympe:olympe@cluster0.2vr8z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {

const collection = client.db("test").collection("message");

await collection.insertOne({
from: "user",
msg: req.body.msg,
});
await collection.insertOne({
from: "bot",
msg: réponse,
});

client.close();
});

res.send(réponse);
});

app.get("/messages/all", (req, res) => {

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://olympe:olympe@cluster0.2vr8z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
const collection = client.db("test").collection("message");
const docs = await collection.find().project({_id: 0,from:1, msg:1}).toArray();
res.send(docs);

client.close();
});

});

app.delete("/messages/last", (req, res) => {
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://olympe:olympe@cluster0.2vr8z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {

const collection = client.db("test").collection("message");
const docs = await collection.find().sort({_id: -1}).limit(2).toArray();
await collection.deleteOne({ _id: docs[0]._id });
await collection.deleteOne({ _id: docs[1]._id });
console.log("supprimé documents:", docs);
res.send(docs);

client.close();
});
});