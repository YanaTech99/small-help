

var dbSH = require('./SqlConfigSH');
var dbDiceH = require('./SqlConfigDiceH');
var dbdockon = require('./SqlConfigdockon');

var rep = require('./reportconfig');

var fs = require("fs");
 
exports.executequeryDiceH = function (req, res) {
    var qs = req.body.query;
    console.log(qs);
    var db1 = new dbDiceH.executeQuery(qs, function (err, data) {
        console.log(data);
        res.send((err === null) ? { status: data.status, Data: data.recordset, message: data.message } : { status: -1, message: err.message ? err.message : 'Error' });
    });
};

exports.executeDataSetDiceH = function (req, res) {
    var qs = req.body.query;
	console.log(qs);
    var db1 = new dbDiceH.executeDataSet(qs, function (err, data) {
        //console.log(data);
        if (err) {
            console.log(err);
        }
        res.send((err === null) ? { Status: data.status, Data: data.recordset, Message: data.message } : { status: -1, message: err.message ? err.message : 'Error' });
    });
};


exports.executequerySH = function (req, res) {
    var qs = req.body.query;
    console.log(qs);
    var db1 = new dbSH.executeQuery(qs, function (err, data) {
		
        console.log(err);
		console.log(data);
        res.send((err === null) ? { 
            status: data.status, Data: data.recordset, message: data.message 
        } : { status: -1, message: err.message ? err.message : 'Error' });
    });
};

exports.executeDataSetSH = function (req, res) {
    var qs = req.body.query;
	console.log(qs);
    var db1 = new dbSH.executeDataSet(qs, function (err, data) {
        //console.log(data);
        if (err) {
            console.log(err);
        }
        res.send((err === null) ? { Status: data.status, Data: data.recordset, Message: data.message } : { status: -1, message: err.message ? err.message : 'Error' });
    });
};
