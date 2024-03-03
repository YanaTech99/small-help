var va, _callBackURL, _callBackArgs, jsonURL, jsonArgs;
var eresult = null, result = null, AJAXResult = null, AJAXRes = null, param1 = null, param2 = null, param3, param4, param5;
var gl = false, cmdQS = null, windowHeight = $(window).height(), windowWidth = $(window).width();
var wid = screen.width, hei = screen.height - 50;
var DoNotEsc = false;
(function ($) {
    $.fn.limitkeypress = function (options) {
        var defaults = { rexp: /^[-+]?\d*\.?\d*$/ }; var options = $.extend(defaults, options); return this.each(function () {
            var regExpression = options.rexp; $(this).blur(function () { sanitize(this); }); $(this).keypress(function (e) {
                if (e.which == "0" || e.which == "8" || e.which == "13" || e.ctrlKey || e.altKey) { return; }
                sanitizeWithSelection(this); var pressedChar = String.fromCharCode(e.which), updatedInput = this.value.substring(0, getSelectionStart(this)) + pressedChar + this.value.substring(getSelectionEnd(this), this.value.length); if (!regExpression.test(updatedInput)) { e.preventDefault(); return; }
                return;
            }); function sanitizeWithSelection(o) {
                var startCaretPos = getSelectionStart(o), endCaretPos = getSelectionEnd(o), temp = "", testPlusChar = "", selectionCharInfo = []; for (i = 0; i < o.value.length; i++) { if (startCaretPos > i) { selectionCharInfo[i] = 'beforeSelection'; } else if ((startCaretPos <= i) && (endCaretPos > i)) { selectionCharInfo[i] = 'inSelection'; } }
                for (i = 0; i < o.value.length; i++) { var iPlusOne = i + 1; testPlusChar += o.value.substring(i, iPlusOne); if ((!regExpression.test(testPlusChar))) { var lastChar = testPlusChar.length - 1; temp = testPlusChar.substring(0, lastChar); testPlusChar = temp; if (selectionCharInfo[i] == 'beforeSelection') { startCaretPos = startCaretPos - 1; endCaretPos = endCaretPos - 1; } else if (selectionCharInfo[i] == 'inSelection') { endCaretPos = endCaretPos - 1; } } }
                o.value = testPlusChar; setSelectionRange(o, startCaretPos, endCaretPos);
            }
            function sanitize(o) {
                var temp = "", testPlusChar = ""; for (i = 0; i < o.value.length; i++) { var iPlusOne = i + 1; testPlusChar += o.value.substring(i, iPlusOne); if ((!regExpression.test(testPlusChar))) { var lastChar = testPlusChar.length - 1; temp = testPlusChar.substring(0, lastChar); testPlusChar = temp; } }
                o.value = testPlusChar;
            }
            function getSelectionStart(o) {

                if (o.createTextRange) {
                    var r = document.selection.createRange().duplicate()
                    r.moveEnd('character', o.value.length)
                    if (r.text == '') return o.value.length
                    return o.value.lastIndexOf(r.text)
                } else return o.selectionStart

            }
            function getSelectionEnd(o) {

                if (o.createTextRange) {
                    var r = document.selection.createRange().duplicate()
                    r.moveStart('character', -o.value.length)
                    return r.text.length
                } else return o.selectionEnd

            }
            function setSelectionRange(input, selectionStart, selectionEnd) {
                if (input.setSelectionRange) { input.focus(); input.setSelectionRange(selectionStart, selectionEnd); }
                else if (input.createTextRange) { var range = input.createTextRange(); range.collapse(true); range.moveEnd('character', selectionEnd); range.moveStart('character', selectionStart); range.select(); }
            }
        });
    };
})(jQuery);

try {
    $('.date').datepicker({ dateFormat: 'dd-M-yy' });
    $('.date1').datepicker({ dateFormat: 'dd-M-yy' });
    validateCtrl();
} catch (e) {

}

var sesClientId = window.localStorage.getItem("ClientId") ? window.localStorage.getItem("ClientId") : 0;
var sesUserId = window.localStorage.getItem("UserId") ? window.localStorage.getItem("UserId") : 0;
var sesRoleId = window.localStorage.getItem("RoleId") ? window.localStorage.getItem("RoleId") : 0;

function selectCheckAll(el) {
    if ($(el).prop('checked')) {
        $('#MasterListCheckbox tr td input[type="checkbox"]').each(function () {
            $(this).prop('checked', true);
        });
    } else {
        $('#MasterListCheckbox tr td input[type="checkbox"]').each(function () {
            $(this).prop('checked', false);
        });
    }
}


// bindPermission();



function bindPermission() {
    var arrVal = getQuerystring('PERM') ? getQuerystring('PERM') : '';
    var dropFeild = $('.perm');
    dropFeild.empty();
    var arr = new Array();
    arr = arrVal.split(",");
    var len = arr.length;
    var i = 0;
    var j = 0;
    for (i = 0; i < len; i = i + 1) {
        if (arr[i] == 'N') {
            dropFeild.get(0).options[j] = new Option('NEW', arr[i]);
        } else if (arr[i] == 'E') {
            dropFeild.get(0).options[j] = new Option('EDIT', arr[i]);
        }
        else if (arr[i] == 'D') {
            dropFeild.get(0).options[j] = new Option('DELETE', arr[i]);
        }
        else if (arr[i] == 'Q') {
            dropFeild.get(0).options[j] = new Option('QUERY', arr[i]);
        }
        j = j + 1;
    }
}

var encryptedPassword = '', decryptedPassword = '';
function encryptPassword(querystring) {
    encryptedPassword = '';
    var sp = new spDetail(querystring);
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/encryptpassword',
        async: false,
        dataType: 'JSON',
        success: function (response) {

            encryptedPassword = response.data ? response.data : '';
        },
        complete: function (req, q) { },
        failure: function (response) { encryptedPassword = ''; }
    });
}


function emailParamDetail(ToEmail, subject, emailbody) {
    this.tomailId = ToEmail;
    this.subject = subject;
    this.mailBody = emailbody;
}
var Emailresult = '';
function sendEmail(ToEmail, subject, emailbody) {
    Emailresult = '';
    var sp = new emailParamDetail(ToEmail, subject, emailbody);
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/sendEmail',
        async: true,
        dataType: 'JSON',
        success: function (response) {
            Emailresult = response.data ? response.data : '';
        },

        failure: function (response) { encryptedPassword = ''; }
    });
}

function decryptPassword(querystring) {

    decryptedPassword = '';
    var sp = new spDetail(querystring);
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/decryptpassword',
        async: false,
        dataType: 'JSON',
        success: function (response) {

            decryptedPassword = response.data ? response.data : '';
        },
        complete: function (req, q) { },
        failure: function (response) { decryptedPassword = ''; }
    });
}


function CallAJAXASJ(querystring) {
    var sp = new spDetail(querystring);
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/executequeryASJ',
        async: false,
        dataType: 'JSON',
        success: function (response) {
            try {
                if (response.msg == -1) {
                    alert(response.value1);
                    AJAXResult = null;
                } else {
                    var msgss = response.msg;
                    if (msgss[0]['msg'] == -1) {
                        alert(msgss[0]['value1']);
                    } else {
                        AJAXResult = response.msg;
                    }
                }
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}



function sycnMMM(querystring) {
    var sp = new spDetail(querystring);
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/executequeryMigrateMMM',
        async: false,
        dataType: 'JSON',
        success: function (response) {
            try {
                if (response.msg == -1) {
                    alert(response.value1);
                    AJAXResult = null;
                } else {
                    var msgss = response.msg;
                    if (msgss[0]['msg'] == -1) {
                        alert(msgss[0]['value1']);
                    } else {
                        AJAXResult = response.msg;
                    }
                }
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}



function sycnMM(querystring) {
    var sp = new spDetail(querystring);
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/executequeryMigrateMM',
        async: false,
        dataType: 'JSON',
        success: function (response) {
            try {
                if (response.msg == -1) {
                    alert(response.value1);
                    AJAXResult = null;
                } else {
                    var msgss = response.msg;
                    if (msgss[0]['msg'] == -1) {
                        alert(msgss[0]['value1']);
                    } else {
                        AJAXResult = response.msg;
                    }
                }
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}
function sycnMD(querystring) {
    var sp = new spDetail(querystring);
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/executequeryMigrateMD',
        async: false,
        dataType: 'JSON',
        success: function (response) {
            try {
                if (response.msg == -1) {
                    alert(response.value1);
                    AJAXResult = null;
                } else {
                    var msgss = response.msg;
                    if (msgss[0]['msg'] == -1) {
                        alert(msgss[0]['value1']);
                    } else {
                        AJAXResult = response.msg;
                    }
                }
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}
function CallAJAX1(querystring) {
    var sp = new spDetail(querystring);

    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/executequery',
        async: false,
        dataType: 'JSON',
        success: function (response) {

            try {
                if (response.msg == -1) {
                    alert(response.value1);
                    AJAXResult = null;
                } else {
                    var msgss = response.msg;
                    if (msgss[0]['msg'] == -1) {
                        alert(msgss[0]['value1']);
                    } else {
                        AJAXResult = response.msg;
                    }
                }
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}


function CallAJAX2(querystring) {
    var sp = new spDetail(querystring);

    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/executequeryASJ',
        async: false,
        dataType: 'JSON',
        success: function (response) {

            try {
                if (response.msg == -1) {
                    //alert(response.value1);
                    AJAXResult = null;
                } else {
                    var msgss = response.msg;
                    if (msgss[0]['msg'] == -1) {
                        // alert(msgss[0]['value1']);
                    } else {
                        AJAXResult = response.msg;
                    }
                }
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}


function spDetail(qs) {
    this.querys = qs;
}

function CallAJAX(spdetail) {

    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: spdetail,
        url: '/executequery',
        async: false,
        dataType: 'JSON',
        success: function (response) {

            try {
                if (response.msg == -1) {
                    alert(response.Value1);
                    AJAXResult = null;
                } else {
                    var msgss = response.msg;
                    if (msgss[0]['msg'] == -1) {
                        alert(msgss[0]['Value1']);
                    } else {
                        AJAXResult = response.msg;
                    }
                }
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}


function CallAJAXdownloadexcel(spdetail) {
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: spdetail,
        url: '/downloadexcel',
        async: false,
        dataType: 'JSON',
        success: function (response) {

            try {
                AJAXResult = 101;
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail') }
    });
}


function CallAJAXDataSet(spdetail) {

    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: spdetail,
        url: '/executeDataSet',
        async: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.msg == -1) {
                alert(response.Value1);
                AJAXResult = null;
            } else {
                var msgss = response.msg[0];
                if (msgss[0]['msg'] == -1) {
                    AJAXResult = null;
                    alert(msgss[0]['Value1']);
                } else {
                    AJAXResult = response;
                }
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}

function CallAJAXDataSet1(querystring) {
    var sp = new spDetail(querystring);
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/executeDataSet',
        async: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.msg == -1) {
                alert(response.Value1);
                AJAXResult = null;
            } else {
                var msgss = response.msg[0];
                if (msgss[0]['msg'] == -1) {
                    AJAXResult = null;
                    alert(msgss[0]['Value1']);
                } else {
                    AJAXResult = response;
                }
            }

        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}

function CallAJAXLogin(parms) {
    AJAXResult = null;

    $.ajax({
        type: 'POST',
        data: parms,
        url: '/login',
        async: false,
        dataType: 'JSON',
        success: function (response) {

            AJAXResult = response;
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail') }
    });
}


function fullDate(date) {
    if (date == null || date == undefined || date == '' || date == NaN)
        return '01-jan-1990';
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    switch (day.toString().length) {
        case 1:
            day = '0' + day;
            break;
        case 2:
            day
            break;
    }
    return day + '-' + monthNames[monthIndex] + '-' + year;
}

function CallAJAXUploadImage(spdetail) {
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: spdetail,
        url: '/uploadimage',
        async: true,
        processData: false,
        contentType: false,
        success: function (response) {
            try {
                if (response.msg == -1) {
                    alert(response.value1);
                    AJAXResult = null;
                } else {
                    AJAXResult = response;
                }
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail') }
    });
}




function CallAJAXUploadExcel(spdetail) {

    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: spdetail,
        url: '/uploadexcel',
        async: false,
        processData: false,
        contentType: false,
        success: function (response) {

            try {
                if (response.msg == -1) {
                    alert(response.Value1);
                    AJAXResult = null;
                } else {
                    AJAXResult = response;
                }

            }
            catch (e) {

                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}




function GetHeaders(obj) {
    var cols = new Array();
    var p = obj[0];
    for (var key in p) {
        cols.push(key);
    }
    return cols;
}

function GetHeadersArray(obj) {
    var cols = new Array();
    var p = obj;
    for (var key in p) {
        cols.push(key);
    }
    return cols;
}

function getTwoDArrayForDashBoard(arrs) {

    var catsArr;
    var headers = GetHeadersArray(arrs);
    catsArr = [];
    for (var i = 1; i < headers.length; i++) { var cat = { data: arrs[headers[i]], label: headers[i] }; catsArr.push(cat); }
    return catsArr;
}




function clearAll() {
    $('.blktxt').val('');
    $('.blklbl').text('');
    $('.blkselect').attr('selectedIndex', 0);
}



function getQuerystring(key, default_) {

    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null) { return default_; }
    else { return qs[1]; }
}

//***********************************Date Validation****************************************/
var cursor = 0;


//*********************************DateDifference******************************
function DateDiff(StartDate, EndDate) {

    StartDate = convertToDate(StartDate);
    EndDate = convertToDate(EndDate);

    var sDate = StartDate.toString().substring(3, 5);
    var sMon = StartDate.toString().substring(0, 2);
    var sYear = StartDate.toString().substring(6, 10);
    var eDate = EndDate.toString().substring(3, 5);
    var eMon = EndDate.toString().substring(0, 2);
    var eYear = EndDate.toString().substring(6, 10);
    StartDate = sDate + '-' + sMon + '-' + sYear;
    EndDate = eDate + '-' + eMon + '-' + eYear;
    var enddate = new Date(EndDate);
    var startdate = new Date(StartDate);
    return (enddate - startdate) / (24 * 3600 * 1000);
}

function convertToDate(fDate) {

    var arr = new Array();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (fDate.indexOf("-") == -1)
        arr = fDate.split(" ");
    else
        arr = fDate.split("-");
    var monthindex = -1;
    monthindex = monthNames.indexOf(arr[1]) + 1;

    if (monthindex <= 9)
        monthindex = "0" + monthindex
    return arr[0] + "-" + monthindex + "-" + arr[2];
}
function validateCtrl() {
    $('.decimal').limitkeypress();
    $('.soption').limitkeypress({ rexp: /^[NEQDneqd]$/ });
    $('.yn').limitkeypress({ rexp: /^[YNyn]$/ });
    $('.ie').limitkeypress({ rexp: /^[IEie]$/ });
    $('.num').limitkeypress({ rexp: /^[0-9]+$/ });
    $('.numNeg').limitkeypress({ rexp: /^[0-9\-]+$/ });
    $('.alphanumComa').limitkeypress({ rexp: /^[a-zA-Z\,]+$/ });
    $('.alpha').limitkeypress({ rexp: /^[A-Za-z]*$/ });
    $('.alphanum').limitkeypress({ rexp: /^[a-zA-Z0-9]+$/ });
    $('.alphanumdot').limitkeypress({ rexp: /^[a-zA-Z0-9\.\s]+$/ });
    $('.alphaspec').limitkeypress({ rexp: /^[a-zA-Z\.\s]+$/ });
    $('.alphanumspec').limitkeypress({ rexp: /^[a-zA-Z0-9\s]+$/ });
    $('.address').limitkeypress({ rexp: /^[a-zA-Z0-9\-\_\,\s]+$/ });
    $('.uname').limitkeypress({ rexp: /^[a-zA-Z\-\_\@\.]+$/ });
    $('.pass').limitkeypress({ rexp: /^[a-zA-Z0-9\-\_\.\@\#\&\$\!\~\*]+$/ });
    $('.accno').limitkeypress({ rexp: /^[0-9\.]+$/ });
    $('.IDProof').limitkeypress({ rexp: /^[A-Z0-9\/\-]+$/ });
    $('.stringval').limitkeypress({ rexp: /^[a-zA-Z0-9\s\,\.\(\)\_\-\/]+$/ });
    $('.sd').limitkeypress({ rexp: /^[SDGNDsdgnd]$/ });
    $('.mail').limitkeypress({ rexp: /^[a-zA-Z0-9\-\_\.\@]+$/ });
    $('.time').limitkeypress({ rexp: /^(1[012]|0[1-9]):[0-5][0-9](\\s)? (am|pm)+$/ });
    $('.time').maxLength(8);
    $('.dates').maxLength(10);
    $('.dates').isDates();
    $('.dates').limitkeypress({ rexp: /^[0-9\-]+$/ });
    $('.wacts').maxLength(0);
    $('.wacts').isDates();
}

function CallAJAXUploadImage(imgByte, imgName) {
    var sp = new imgDetail(imgByte, imgName);
    AJAXResult = null;
    $.ajax({
        type: 'POST',
        data: sp,
        url: '/uploadimagebase64',
        dataType: 'JSON',
        success: function (response) {
            try {
                if (response.msg == -1) {
                    //   alert(response.Value1);
                    AJAXResult = null;
                } else {
                    var msgss = response.msg;
                    if (msgss[0]['msg'] == -1) {
                        //    alert(msgss[0]['Value1']);
                    } else {
                        AJAXResult = response.msg;
                    }
                }
            }
            catch (e) {
                AJAXResult = null;
            }
        },
        complete: function (a, b, c) { },
        failure: function (response) { AJAXResult = null; alert('fail'); }
    });
}

function imgDetail(imgByte, imgName) {
    this.imgByte = imgByte;
    this.imgName = imgName;
}
