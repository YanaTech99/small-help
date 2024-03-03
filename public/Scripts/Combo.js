
// ================= Get Data From Sql ==================================
//alert(2);
function bindComboDefault(querystring, destinationcombo) {
    CallAJAX2(querystring);
    if (AJAXResult != null) {
        bindDropDownJSON($('#' + destinationcombo + ''), AJAXResult, 'Y');
    } else {
        bindSelect($('#' + destinationcombo + ''));
    }
}

function bindComboDefaultNoSelect(querystring, destinationcombo) {
    CallAJAX2(querystring);
    if (AJAXResult != null) {
        bindDropDownJSON($('#' + destinationcombo + ''), AJAXResult, 'N');
    } else {
        bindSelect($('#' + destinationcombo + ''));
    }
}

function bindComboByJSON(iJSON, destinationcombo) {

    if (iJSON != null && iJSON.length > 0) {
        bindDropDownJSON($('#' + destinationcombo + ''), iJSON, 'Y');
    } else {
        bindSelect($('#' + destinationcombo + ''));
    }
}


function bindComboByJSONMultiple(iJSON, destinationcombo) {

    $('#' + destinationcombo + '').multiselect('destroy');
    if (iJSON != null && iJSON.length > 0) {
        bindDropDownJSON($('#' + destinationcombo + ''), iJSON, 'N');
        $('#' + destinationcombo + '').multiselect({
            includeSelectAllOption: true
        });

    } else {
        bindSelect($('#' + destinationcombo + ''));
        $('#' + destinationcombo + '').multiselect({
            includeSelectAllOption: true
        });
    }
}

function bindComboDefaultDS(querystring, destinationcombo) {

    var arr = new Array();
    arr = destinationcombo.split(",");
    CallAJAXDataSet1(querystring);
    if (AJAXResult != null) {
        var ds = AJAXResult.msg;
        for (var i = 0; i < arr.length; i++) {
            bindDropDownJSON($('#' + arr[i] + ''), ds[i], 'Y');
        }
    } else {
        for (var i = 0; i < arr.length; i++) {
            bindSelect($('#' + arr[i] + ''));
        }
    }
}










// ================= Get Data From Sql ==================================



// ===================== Binding To Drop Down ==\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function bindDropDownJSON(dropFeild, arrVal, BindSelect) {

    dropFeild.empty();
    dropFeild.get(0).options.length = 0;

    var len = arrVal.length;
    var i = 0;
    var j = 0;
    if (BindSelect != undefined && BindSelect == "Y") {
        j = 1;
        dropFeild.get(0).options[0] = new Option('Select', '0');
    }
    var col = [];
    col = GetHeaders(arrVal);
    for (i = 0; i < len; i++) {
        dropFeild.get(0).options[j] = new Option(arrVal[i][col[1]], arrVal[i][col[0]]);
        j = j + 1;
    }
}

function bindSelect(dropFeild) {
    dropFeild.empty();
    dropFeild.get(0).options.length = 0;
    dropFeild.get(0).options[0] = new Option('Select', '0');
}
// ===================== Binding To Drop Down ==\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

