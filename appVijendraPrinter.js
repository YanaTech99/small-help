
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var dbhelp = require('./routes/DataBaseHelper');
var cors = require('cors');
var app = express();
var UserLogin = require('./routes/login');
var multipart = require('connect-multiparty');

var favicon = require('serve-favicon');
 
app.set('port', process.env.PORT || 5004);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
 
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cors());
app.use(express.static('FTP'));

app.post('/executequeryVJPR', function(req, res){
    dbhelp.executequeryVJPR
});

app.post('/executeDataSetVJPR', function(req, res){
    dbhelp.executeDataSetVJPR
});

app.post('/executequerySH', dbhelp.executequerySH);
app.post('/executeDataSetSH', dbhelp.executeDataSetSH);
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
// app.get('/', routes.index);
app.get('/userhome', routes.userhome);
app.get('/salesdata', routes.salesdata);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});