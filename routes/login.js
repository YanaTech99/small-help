var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
var db = require('./PostgresConfig');
var localStorage = require('localStorage');



function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}


exports.encryptText = function (req, res) {
    var text = req.body.query;
    // var cipher = crypto.createCipher(algorithm, password)
    // var crypted = cipher.update(text, 'utf8', 'hex')
    // crypted += cipher.final('hex');
    // res.send(
    //     { msg: '1', data: crypted }
    // );
    var PassPhrase = "#N@E$W*L&I^N~";
    var SaltValue = "@!2$9$7$@^&D%S*";
    var HashAlgorithm = "SHA1";
    var PasswordIterations = 2;
    var InitVector = "@1B2c3D4e5F6g7H8";
    var KeySize = 256;
    crypto.pbkdf2(PassPhrase, SaltValue, 2, 256, HashAlgorithm, (err, derivedKey) => {
        if (err) throw err;
        console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
        res.send(
                { msg: '1', data: derivedKey.toString('hex') }
            );
      });
};

exports.decryptText = function (req, res) {
    var text = req.body.querys;
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    res.send(
        { msg: '1', data: dec }
    );
};

//export only the field 'poo' as string
exports.UserLogin = function (req, res) {

    var username = req.body.username;
    var password = req.body.password;
    password = encrypt(password);
    var logData = '';
    // Where ""cUserName"" = '"+username+"' and ""cPassword"" = '"+password+"'
    var db1 = new db.executeQuery("Select * from Employeemaster where cusername ='" + username + "' and cpassword ='" + password + "'", function (err, data) {
        console.log(data);
        if (err) {
            res.send(
                (err === null) ? { msg: '-1', value1: err } : { msg: '-1', value1: "Error" }
            );
        } else {
            if (data[0].msg == 1) {

                logData = data;
                localStorage.clear();
                localStorage.setItem('UserId', data[0].nuserid);
                localStorage.setItem('UserName', data[0].cusername);
                localStorage.setItem('ClientId', data[0].nclientid);

                res.send(
                    (err === null) ? { msg: '1', data: logData } : { msg: err }
                );


            } else {
                res.render('login', { title: 'login', logError: data[0].value1 });
            }
        }
    });
};



















