var sql = require("mssql");
var dbConfig = {
    server: "",
    database: "dockon",
    user: "sa",
    password: "",
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
        idleTimeoutMillis: 300000,
        max: 100
    },
    port: 1433
};


module.exports = {
    executeQuery: function (query, callback) {
		console.log(query);
        var conn = new sql.ConnectionPool(dbConfig);
        conn.connect().then(function () {
            var req = new sql.Request(conn);
            req.query(query).then(function (recordset, rec1) {
                var newrecored = { recordset: JSON.parse(recordset.recordset[0].data), message: recordset.recordset[0].message, status: recordset.recordset[0].status };
                callback(null, newrecored);
            })
                .catch(function (err) {

                    callback(err);
                    conn.close();
                });
        })
            .catch(function (err) {
                callback(err);
            });
    },

    executeDataSet: function (query, callback) {
        var conn = new sql.ConnectionPool(dbConfig);
        conn.connect().then(function () {
            var req = new sql.Request(conn);
            req.query(query).then(function (recordset, rec1) {
                console.log(recordset);
                var newrecored = { recordset: recordset.recordset ? JSON.parse(recordset.recordset[0].data) : [], message: recordset.recordset ? recordset.recordset[0].message : "Something Went Be Wrong", status: recordset.recordset ? recordset.recordset[0].status : 0 };
                callback(null, newrecored);
            })
                .catch(function (err) {
                    console.log(err);
                    callback(err);
                    conn.close();
                });
        })
            .catch(function (err) {
                console.log(err);
                callback(err);
            });
    },


};
