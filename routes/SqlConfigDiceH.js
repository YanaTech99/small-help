var sql = require("mssql");
var dbConfig = {
    server: "173.212.241.74",
    database: "DiceHelp",
    user: "sa",
    password: "Light@YourLif*",
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
		
        var conn = new sql.ConnectionPool(dbConfig);
        conn.connect().then(function () {
            var req = new sql.Request(conn);
			//console.log(query);
            req.query(query).then(function (recordsetsData, rec1) {
				//console.log(JSON.stringify(recordsetsData, null, 4));
				let parsedJson = recordsetsData;
				
				//console.log(parsedJson);
				//console.log(parsedJson.recordsets[0].Data);
				//console.log(JSON.parse(parsedJson));
               //var newrecored = { recordset: JSON.parse(parsedJson.recordset), message: recordset.recordset[0].message, status: recordset.recordset[0].status };
				var newrecored = { recordset: parsedJson.recordsets, message: "message", status:"success" };
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
                //console.log(recordset);
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

