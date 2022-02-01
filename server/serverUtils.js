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

//! movie/:id, /tvShow/:id
function getDataById(req, res) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const mediaId = req.params.id;
        const currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .findOne({ _id: ObjectId(mediaId) }, (err, user) => {
                if (err) throw err;
                res.status(200).send(user);
                console.log({ user });
                db.close();
            });
    });
}

function insertNewMedia(req, res) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const mediaObj = req.body;
        const currentDB = db.db(dbName);
        currentDB.collection(collectionName).insertOne(mediaObj, (err, media) => {
            if (err) throw err;
            res.status(200).send(media);
            console.log({ media });
            db.close();
        });
    });
}

module.exports = { getData, getDataById, insertNewMedia };