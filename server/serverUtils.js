const mongoDB = require("mongodb"),
    MongoClient = mongoDB.MongoClient,
    ObjectId = mongoDB.ObjectId,
    url = "mongodb://localhost:27017/";
// url = process.env.MONGO_URL || 
const dbName = "Netflix";

//! get movies, get tvShows
function getData(req, res, collectionName) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .find({})
            .toArray((err, collectionData) => {
                if (err) throw err;
                res.status(200).send(collectionData);
                db.close();
            });
    });
}

//!users/:id movie/:id, /tvShow/:id
function getDataById(req, res, collectionName) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const objId = req.params.id;
        const currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .findOne({ _id: ObjectId(objId) }, (err, user) => {
                if (err) throw err;
                res.status(200).send(user);
                console.log({ user });
                db.close();
            });
    });
}

function insertNewUser(req, res, collectionName) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const user = req.body;
        const currentDB = db.db(dbName);
        currentDB.collection(collectionName).insertOne(user, (err, newUser) => {
            if (err) throw err;
            res.status(201).send(newUser);
            console.log({ user });
            db.close();
        });
    });
}

module.exports = { getData, getDataById, insertNewUser };