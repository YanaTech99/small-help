
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
};


exports.login = function (req, res) {
    res.render('login', { title: 'Express', year: new Date().getFullYear() });
};

exports.userhome = function (req, res) {
    res.render('userhome', { title: 'User Home', year: new Date().getFullYear(), message: 'Sales data' });
};

exports.salesdata = function (req, res) {
    res.render('salesdata', { title: 'Sales Data', year: new Date().getFullYear(), message: 'Sales data' });
};
