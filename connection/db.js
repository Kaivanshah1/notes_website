const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callbackFn) => {
    MongoClient.connect('mongodb://127.0.0.1:27017/Books')
    .then(client => {
        _db = client.db();
        console.log('Successfully connected to the database');
        callbackFn();
    })
    .catch(error => {
        console.log('Error in connecting to the database:', error);
        callbackFn();
        throw error;
    });
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

