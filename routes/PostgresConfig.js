var pg = require("pg");
var config = {
    user: 'postgres', 
    database: 'ASJTCP3', //env var: PGDATABASE 
    password: 'GOD@TWORk', //env var: PGPASSWORD 
    host: '213.136.92.87', // Server hosting the postgres database 
    port: 5433, //env var: PGPORT 
    max: 10, // max number of clients in the pool 
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 

};
var prnamr = '', ress = '';
module.exports = {
    executeQuery: function (query, callback) {
        var pool = new pg.Pool(config);
        pool.connect(function (err, client, done) {
           
            if (err) {
                callback('error fetching client from pool ' + err);
            }
            client.query(query, function (err, result) {

                if (result != undefined) {
                    var rowlen = result.rows.length ? result.rows.length : 0;
                    if (rowlen > 0) {
                        callback(err, result.rows);
                    } else {
                        callback({ message: "No record Found" });
                    }
                } else {
                    callback(err);
                }
              //  console.log(result.rows[0].number);
            });
        });
    },
};

