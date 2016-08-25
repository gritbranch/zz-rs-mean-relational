'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require('./config');

var db = {};

var rootPath = path.normalize(__dirname + '/..');
var modelsDir = rootPath + '/app/models';

console.log('Initializing Sequelize...');

var sequelize =
    new Sequelize(config.db.name, config.db.username, config.db.password, {
        host: config.db.host,
        port: config.db.port,
        dialect: 'mysql',
        storage: config.db.storage,
        logging: false
    });

// loop through all files in models directory ignoring hidden files and this file
//fs.readdirSync(config.modelsDir)
fs.readdirSync(modelsDir)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    // import model files and save model names
    .forEach(function (file) {
        console.log('Loading model file ' + file);
//        var model = sequelize.import(path.join(config.modelsDir, file));
        var model = sequelize.import(path.join(modelsDir, file));
        db[model.name] = model;
    });

// invoke associations on each of the models
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
});

// Synchronizing any model changes with database. 
// set FORCE_DB_SYNC=true in the environment, or the program parameters to drop the database,
//   and force model changes into it, if required;
// Caution: Do not set FORCE_DB_SYNC to true for every run to avoid losing data with restarts
sequelize
    .sync({
        force: config.FORCE_DB_SYNC === 'true',
        logging: false
    })
    .then(function () {
        console.log("Database " + (config.FORCE_DB_SYNC === 'true' ? "*DROPPED* and " : "") + "synchronized");

        var port = Number(process.env.PORT) || 3000;
        console.log('Server running at http://localhost:' + port +'/');
    }).catch(function (err) {
        console.log("An error occurred: " + err);
    });

// assign the sequelize variables to the db object and returning the db. 
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;