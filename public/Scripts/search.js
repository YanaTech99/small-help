try {
    $('#btnmodal').hide();
    $('.defaultcodemaster').attr('disabled', 'disabled');
    $('.defaultcodemaster').hide();
    $('#btnmodalrequest').hide();
    $('#btnmodalchangebranch').hide();
    $('.defaultchangeBranch').hide();
    $('#btnmodalshgdisbursement').hide();
    $('.defaultshgdisbursement').hide();
} catch (e) {

}

var typingTimer;
var doneTypingInterval = 400;

$("#txtdefaultsearch").keyup(function () {
    clearTimeout(typingTimer);
    if ($("#txtdefaultsearch").val) {
        typingTimer = setTimeout(function () {
            defaulterSearch();
        }, doneTypingInterval);
    }
});

var searchType = '', defaultSearchId = 0, defaultSearchValue='', defaultSearchId1 = 0, CatId = 0, parentSerialNo = 0,currentAttribute;
$(document).keydown(function (e) {
   
   
    try {
        if (e.altKey && e.keyCode == 83) {

            var focused = document.activeElement;
            var attr = $(focused).attr('searchclass');
            if (typeof attr !== typeof undefined && attr !== false) {
                searchType = ''
                CatId = 0;
                defaultSearchId = 0
                defaultSearchId1 = 0
                currentAttribute = '';
                currentAttribute = focused;
                defaultSearchValue = '';
                $('#griddefaultsearch').html('');
                $('#griddefaultsearch').css('height', parseInt(windowHeight * 0.5) + 'px');
                $('#txtdefaultsearch').val('');
                $('#btnmodal').click();
                setvalues(focused);
            }
            return false;
        }
        else if (e.altKey && e.keyCode == 82) {
            var focused = document.activeElement;
            var attr = $(focused).attr('requestclass');
            if (typeof attr !== typeof undefined && attr !== false) {
                setRequest(focused);
            }
        }
        else if (e.altKey && e.keyCode == 66) {
                openpopupChangebranch();
        }

    } catch (e) {
        searchType = '';
    }
});
var Flag = '';
function setvalues(focused) {
    var arr = $(focused).attr('searchclass').split(" ");
    var arr1, k = 0;
     Flag = arr[1];
    if (Flag != -1) {
        $('.defaultcodemaster').removeAttr('disabled', 'disabled');
        $('.defaultcodemaster').show();

        if (Flag != 0) {
            parentSerialNo = $('#' + Flag + '').val() ? $('#' + Flag + '').val() : 0;
        } else {
            parentSerialNo = 0;
        }
        CatId = arr[0];
        defaulterSearch();
    } else {
        $('.defaultcodemaster').attr('disabled', 'disabled');
        $('.defaultcodemaster').hide();
        CatId = 0;
        searchType = arr[0];
        defaulterSearch();
    }
}


function defaulterSearch() {
	
    defaultSearchId = 0;
    defaultSearchId1 = 0;
    $('#griddefaultsearch').html('');
    var qs = new SPDetaildefaulterSearch();
    CallAJAX(qs);
    if (AJAXResult != null) {
        var htmltable = createtableHTML(AJAXResult);
        $('#griddefaultsearch').html('').append(htmltable);
    } else {
        $('#griddefaultsearch').html('');
    }
}

function SPDetaildefaulterSearch() {
    var searchstring = $('#txtdefaultsearch').val() ? $('#txtdefaultsearch').val() : '0';
    var qs = "exec Search_defaulter " + CatId + "," + parentSerialNo + ",'" + searchType + "','" + searchstring + "'," + sesBranchId + "," + sesUserId + ",'" + sesBranchDt + "'";
    this.querys = qs;
}

function pickvalue(el) {
    defaultSearchId = $(el).parent().parent().find("td:eq(0)").text() ? $(el).parent().parent().find("td:eq(0)").text() : 0;
    defaultSearchValue = $(el).parent().parent().find("td:eq(3)").text() ? $(el).parent().parent().find("td:eq(3)").text() : '';
    
   
    if ($(currentAttribute).hasClass('dropdown')) {
        $(currentAttribute).val(defaultSearchId);
       
    } else {
        
        $(currentAttribute).val(defaultSearchValue);
    }
	//alert($(currentAttribute).attr('id'));
    $(currentAttribute).blur();
    $('#txtdefaultsearch').val('');
    $('#btnclose').click();
}

$('#btndefaultSave').click(function () {
    if ((Flag != -1 && Flag != 0 && parentSerialNo > 0) || (Flag == -1 && parentSerialNo >= 0) || (Flag == 0 && parentSerialNo >= 0)) {
        if ($('#txtdefaultcodename').val().length > 0) {
            $('#txtdefaultcodename').removeClass('error');
            CallAJAX(new SpDetailInsertCodeMaster());
            if (AJAXResult != null) {
                $('#txtdefaultcodename').val('');
                $('#txtdefaultdescription').val('');
                alert(AJAXResult[0]['Value1']);
                bindComboChild($(currentAttribute), parentSerialNo);
                defaulterSearch();
            }
        } else {
            alert('please enter CodeName');
            $('#txtdefaultcodename').addClass('error');
        }
    }
    else {
        alert('Select Your Parent Value First');
    }
});

function SpDetailInsertCodeMaster() {
    var CodeName = $('#txtdefaultcodename').val() ? $('#txtdefaultcodename').val() : '';
    var Description = $('#txtdefaultdescription').val() ? $('#txtdefaultdescription').val() : '';
    this.querys = "exec Insert_CodeMaster " + CatId + ",'" + CodeName + "','" + Description + "'," + parentSerialNo + "," + sesBranchId + "," + sesUserId + "";
}

