var fs = require('fs');
var json2xls = require('json2xls');
var db = require('./PostgresConfig');
var dbSql = require('./SqlConfig');


var converter = require('json-2-csv');
var json = '';
// = {
//    foo: 'bar',
//    qux: 'moo',
//    poo: 123,
//    stux: new Date()
//};



exports.downloadexcel = function (req, res) {

    var resp = "AB10DF";
    var bff = new Buffer(resp, 'hex');
    json = req.query.jsn;
    var qs = req.query.query;
    var db1 = new dbSql.executeQueryASJ(qs, function (err, data) {

        if (!err) {
            if (data.length > 0) {
                //                var xls = json2xls(data);
                converter.json2csv(data, function (err, csv) {
                    //                    fs.writeFileSync(__dirname + '/data.csv', csv, 'binary');
                    res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
                    //    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.csv");
                    res.end(csv, 'binary');
                    //   res.download(__dirname + '/data.csv');
                }, {});
            }
        } else {
            var xls = json2xls({});
            fs.writeFileSync(__dirname + '/data.xlsx', xls, 'binary');
            res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
            res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.download(__dirname + '/data.xlsx');
        }
    });
};


//exports.downloadexcel = function (req, res) {
//    debugger;
//    json = req.query.jsn;

//        var xls = json2xls(JSON.parse(json));
//        fs.writeFileSync(__dirname + '/data.xlsx', xls, 'binary');
//        res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
//        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//        res.download(__dirname + '/data.xlsx');
//};

