var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fieldsersmarterway@gmail.com',
        pass: 'Test@123'
    }
});

exports.sendEmail = function (req, res) {
    var Toemail = req.body.tomailId;
    var Subject = req.body.subject;
    var mailBody = req.body.mailBody;
    var mailOptions = {
        from: 'fieldsersmarterway@gmail.com',
        to: Toemail,
        subject: Subject,
        text: '',
        html: mailBody
    };
    transporter.sendMail(mailOptions, (err, info) => {
        res.send((err === null) ? { msg: "Email send successfully." } : { msg: err });
    });
};

