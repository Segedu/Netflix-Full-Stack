const mongoDB = require("mongodb"),
    MongoClient = mongoDB.MongoClient,
    ObjectId = mongoDB.ObjectId,
    moviesRoute = "movies",
    tvShowsRoute = "tvShows",
    usersRoute = "users",
    url = "mongodb://localhost:27017/";
// url = process.env.MONGO_URL || 
const dbName = "Netflix";

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

function getUserDataById(req, res, collectionName) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const userId = req.params.id;
        const currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .findOne({ _id: userId }, (err, user) => {
                if (err) throw err;
                res.status(200).send(user);
                db.close();
            });
    });
}

function getMediaItemsById(req, res, collectionName) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const MediaItem = req.params.id;
        const currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .findOne({ id: MediaItem }, (err, user) => {
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

function deleteMediaItemFromWatchListById(req, res, collectionName) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const MediaItem = req.body,
            userId = req.params.id,
            currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: userId },
                { $pull: { watchList: MediaItem } },
                function (err, updatedResult) {
                    if (err) throw err;
                    res.status(201).send(updatedResult);
                    db.close();
                }
            );
    });
}
function deleteMediaItemFromFavoritesById(req, res, collectionName) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const MediaItem = req.body,
            userId = req.params.id,
            currentDB = db.db(dbName);
        currentDB
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: userId },
                { $pull: { favoritesList: MediaItem } },
                function (err, updatedResult) {
                    if (err) throw err;
                    res.status(201).send(updatedResult);
                    db.close();
                }
            );
    });
}


module.exports = { getData, getUserDataById, insertNewUser, updateUserListById, getMediaItemsById, deleteMediaItemFromWatchListById, deleteMediaItemFromFavoritesById };