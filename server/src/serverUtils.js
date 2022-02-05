const mongoDB = require("mongodb"),
    MongoClient = mongoDB.MongoClient,
    ObjectId = mongoDB.ObjectId,
    moviesRoute = "movies",
    tvShowsRoute = "tvShows",
    usersRoute = "users",
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
function getUserDataById(req, res, collectionName) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const objId = req.params.id;
        const currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .findOne({ _id: objId }, (err, user) => {
                if (err) throw err;
                res.status(200).send(user);
                console.log({ user });
                db.close();
            });
    });
}

function getMediaDataById(req, res, collectionName) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const mediaObjId = req.params.id;
        const currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .findOne({ id: mediaObjId }, (err, user) => {
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

function updateUserListById(req, res, collectionName) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dataToUpdate = req.body,
            id = req.params.id,
            currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: id },
                { $set: dataToUpdate },
                function (err, updatedResult) {
                    if (err) throw err;
                    res.status(201).send(updatedResult);
                    db.close();
                }
            );
    });
}


// function updateUserList(dataValues, collectionName) {
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     const userId = req.body,
//         currentDB = db.db(dbName),
//         userToUpdate = { _id: userId },
//         newValues = { $set: { watchList: dataValues } };
//     currentDB.collection(collectionName).updateOne(userToUpdate, newValues, function (err, res) {
//         if (err) throw err;
//         console.log("1 document updated");
//         db.close();
//     });
// });
// }

module.exports = { getData, getUserDataById, insertNewUser, updateUserListById, getMediaDataById };