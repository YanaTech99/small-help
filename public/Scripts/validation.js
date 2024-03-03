$(document).ready(function () {
    $(":text").blur(function () {
        if ($(this).hasClass('require') || $(this).hasClass('require1') || $(this).hasClass('require2') || $(this).hasClass('require10')) {
            if ($(this).val().length < 1) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        }
     
        var attr = $(this).attr('exists');
        if ((typeof attr !== typeof undefined && attr !== false) && $('.perm').val() == 'N') {
            var checkValue = $(this).val();
            if (checkValue.length > 0) {
                CallAJAX(new SpDetailCheckExisting(attr, checkValue));
                if (AJAXResult == null) {
                    $(this).val('');
                    $(this).addClass('error');
                }
            }
        }
    });
    $("textarea").blur(function () {
        if ($(this).hasClass('require') || $(this).hasClass('require1') || $(this).hasClass('require2')) {
            if ($(this).val().length < 1) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        }
    });
    $('.dropdown').blur(function () {

        if ($(this).hasClass('require') && $(this).val() == 0 || $(this).hasClass('require1') && $(this).val() == 0 || $(this).hasClass('require2') && $(this).val() == 0 || ($(this).hasClass('require10') && $(this).val() == 0)) {
            $(this).addClass('error');

        } else {
            $(this).removeClass('error');
        }

    });

    $(":password").blur(function () {
        if ($(this).hasClass('require')) {
            if ($(this).val().length < 3) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        }
    });
    $('.email').blur(function () {
        if ($(this).val().length > 2) {
            if (isEmail($(this).val()) == false) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        } else {
            $(this).addClass('error');
        }
    });
    $('.mobile').blur(function () {
        if ($(this).val().length < 10) {
            $(this).addClass('error');
            $(this).focus();
        } else {
            $(this).removeClass('error');
        }
    });
});
function validate() {
    var flag = true;
    $(":text").each(function () {
        if ($(this).hasClass('require')) {
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }

    });
    $("textarea").each(function () {
        if ($(this).hasClass('require')) {
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }
    });

    $('.dropdown').each(function () {
        if ($(this).hasClass('require') && $(this).val() == 0) {
            $(this).addClass('error');
            flag = false;
        } else {
            $(this).removeClass('error');
        }
    });


    $('.email').each(function () {
        if ($(this).val().length > 2) {
            if (isEmail($(this).val()) == false) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        } else {
            flag = false;
            $(this).addClass('error');
        }
    });

    $(":password").each(function () {
        if ($(this).hasClass('require')) {
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }
    });
    if ($('.perm').val() == 'Q') {
        alert('Only view allowed in query mode');
        flag = false;
    }
    return flag;
}
function isEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    if (re.test(email)) {
        return true;
    } else {
        return false;
    }
}
function validate1() {

    var flag = true;
    $(":text").each(function () {
        if ($(this).hasClass('require1')) {
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }
    });
    $("textarea").each(function () {
        if ($(this).hasClass('require1')) {
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }
    });

    $('.dropdown').each(function () {

        if ($(this).hasClass('require1') && $(this).val() == 0) {
            $(this).addClass('error');
            flag = false;
        } else {
            $(this).removeClass('error');
        }
    });

    $(":password").each(function () {
        if ($(this).hasClass('require1')) {
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }
    });
    return flag;
}


function validate2() {

    var flag = true;
    $(":text").each(function () {
        if ($(this).hasClass('require2')) {
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }
    });
    $("textarea").each(function () {
        if ($(this).hasClass('require2')) {
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }
    });

    $('.dropdown').each(function () {

        if ($(this).hasClass('require2') && $(this).val() == 0) {
            $(this).addClass('error');
            flag = false;
        } else {
            $(this).removeClass('error');
        }
    });

    
    return flag;
}
function validate10() {

    var flag = true;
    $(":text").each(function () {
        if ($(this).hasClass('require10')) {
			
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }
    });
    $('.dropdown').each(function () {
        if ($(this).hasClass('require10') && $(this).val() == 0) {
            $(this).addClass('error');
            flag = false;
        } else {
            $(this).removeClass('error');
        }
    });
    return flag;
}

function validate11() {

    var flag = true;
    $(":text").each(function () {
        if ($(this).hasClass('require11')) {
            if ($(this).val().length <= 0 || $(this).val() == undefined || $(this).val() == null) {
                $(this).addClass('error');
                flag = false;
            } else {
                $(this).removeClass('error');
            }
        }
    });
    $('.dropdown').each(function () {
        if ($(this).hasClass('require11') && $(this).val() == 0) {
            $(this).addClass('error');
            flag = false;
        } else {
            $(this).removeClass('error');
        }
    });
    return flag;
}

function fullDate(date) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //  var date = new Date();
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
function DateDDMMYYYY(date) {
    
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    switch (day.toString().length) {
        case 1:
            day = '0' +  day;
            break;
        case 2:
            day
            break;
    }
    switch (monthIndex.toString().length) {
        case 1:
            monthIndex = '0' + parseInt(monthIndex + 1);
            break;
        case 2:
            parseInt( monthIndex+1)
            break;
    }
    return day + '-' + monthIndex + '-' + parseInt(year);
}



function ClearItem() {
    $(':text').each(function () {
        $(this).val('');
    });
    $('.address').each(function () {
        $(this).html('');
    });

    $('.divs').each(function () {
        $(this).html('');
    });
    $(":password").each(function () {
        $(this).val('');
    });
    $(":file").each(function () {

        var control = $("#" + $(this).attr('id') + "");
        control.replaceWith(control = control.clone(true));

    });

    $('img').each(function () {
        if ($(this).hasClass('logout') == false) {
            $(this).attr('src', '../Images/noImage.png');
        }
    });

    $(".dropdown").each(function () {
        if ($(this).hasClass('perm') == false)
            $(this).val(0);
        if ($(this).hasClass('mls') == true) {
            $(this).val([]);
            $(this).multiselect("refresh");
        }
    });
}



function arrayToCSV(pId) {
    var Vals = '0';
    if (pId != null && pId.length > 0 && pId!=0) {
        for (var i = 0; i < pId.length; i++) {
            if (i == 0)
                Vals = pId[i];
            else
                Vals = Vals + ',' + pId[i];
        }
    }
    return Vals;
}

function SpDetailCheckExisting(checkFlag, checkValue) {
    var qs = "exec Check_ExistData '" + checkFlag + "','" + checkValue + "'," + sesBranchId + "," + sesUserId + "";
    this.querys = qs;
}

$('.perm').change(function () {
    ClearItem();
});

$('.dropdown23').click(function () {
    $(this).addClass('open')
    $(this).toggleClass('open');
    $(this).removeClass('open');

});

function randString(x) {
    var s = "";
    while (s.length < x && x > 0) {
        var r = Math.random();
        s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s;
}


$('.search').keyup(function () {
    var value = this.value.toLowerCase().trim();
    $("table tr").each(function (index) {
        if (!index) return;
        $(this).find("td").each(function () {
            var id = $(this).text().toLowerCase().trim();
            var not_found = (id.indexOf(value) == -1);
            $(this).closest('tr').toggle(!not_found);
            return not_found;
        });
    });
});