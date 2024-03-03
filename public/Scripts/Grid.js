function bindHTMLTable(queryString, divfiled) {
    CallAJAX1(queryString);
    if (AJAXResult != null) {
        var html = createtableHTML(AJAXResult);
        $('#' + divfiled + '').html('').append(html);
    } else {
        $('#' + divfiled + '').html('');
    }
}


function bindHTMLTableRadio(queryString, divfiled) {
    CallAJAX1(queryString);
    if (AJAXResult != null) {
        var html = createTableRadio(AJAXResult);
        $('#' + divfiled + '').html('').append(html);
    } else {
        $('#' + divfiled + '').html('');
    }
}



function bindHTMLTableCheckBox(queryString, divfiled) {
    CallAJAX1(queryString);
    if (AJAXResult != null) {
        var html = createTableCheckBox(AJAXResult);
        $('#' + divfiled + '').html('').append(html);
    } else {
        $('#' + divfiled + '').html('');
    }
}


function bindHTMLTableByJson(iJSON, divfiled) {

    if (iJSON != null && iJSON.length > 0) {
        var html = createtableHTML(iJSON);
        $('#' + divfiled + '').html('').append(html);
    } else {
        $('#' + divfiled + '').html('');
    }
}



function bindHTMLTableRadioByJson(iJSON, divfiled) {
    
    if (iJSON != null && iJSON.length>0) {
        var html = createTableRadio(iJSON);
        $('#' + divfiled + '').html('').append(html);
    } else {
        $('#' + divfiled + '').html('');
    }
}


function bindHTMLTableCheckBoxByJson(iJSON, divfiled) {

    if (iJSON != null && iJSON.length > 0) {
        var html = createTableCheckBox(iJSON);
        $('#' + divfiled + '').html('').append(html);
    } else {
        $('#' + divfiled + '').html('');
    }
}


function bindHTMLTableRadioByJson1(iJSON, divfiled) {
    if (iJSON != null && iJSON.length > 0) {
        var html = createTableRadio1(iJSON);
        $('#' + divfiled + '').html('').append(html);
    } else {
        $('#' + divfiled + '').html('');
    }
}


function bindHTMLTableRadio1(queryString, divfiled) {
    CallAJAX1(queryString);
    if (AJAXResult != null) {
        var html = createTableRadio1(AJAXResult);
        $('#' + divfiled + '').html('').append(html);
    } else {
        $('#' + divfiled + '').html('');
    }
}



//==================== HTML Table ======================================

function createtableHTML(obj) {

    var cols = GetHeaders(obj);
    var table = $('<table id="MasterListHTML" style="width:100%;"  class="table table-bordered table-hover scroll" ></table>');
    var th = $('<tr></tr>');
    for (var i = 0; i < cols.length; i++) {
        if (cols[i].substring(0, 1) == "0") {
            th.append('<th width="0%"  style="display:none">' + cols[i] + '</th>');
        } else {
            th.append('<th width="0%" style="background-color:rgb(80, 80, 80)!important;color:#fff;">' + cols[i] + '</th>');
        }
    }
    var thead = $('<thead></thead>');
    thead.append(th);
    table.append(thead);
    var tbody = $('<body></tbody>');
    table.append(tbody);
    for (var j = 0; j < obj.length; j++) {
        var childNODE = obj[j];
        var tr = $('<tr></tr>');
        for (var k = 0; k < cols.length; k++) {
            var columnName = cols[k];
            if (columnName.substring(0, 1) == "0") {
                tr.append('<td width="0%" style="display:none">' + childNODE[columnName] + '</td>');
            } else {
                tr.append('<td width="0%" >' + childNODE[columnName] + '</td>');
            }
        }
        table.append(tr);
    }
    return table;
}

function createTableRadio(obj) {

    var cols = GetHeaders(obj);
    var table = $('<table id="MasterListRadio" style="width:100%;" class="table table-bordered table-hover scroll"></table>');
    var th = $('<tr></tr>');
    for (var i = 0; i < cols.length; i++) {
        if (i == 0)
            th.append('<th style="background-color:rgb(80, 80, 80)!important;color:#fff;"></th>');
        else
            if (cols[i].substring(0, 1) == "0")
                th.append('<th style="display:none">' + cols[i] + '</th>');
            else
                th.append('<th style="background-color:rgb(80, 80, 80)!important;color:#fff;text-align:left">' + cols[i] + '</th>');
    }
    table.append(th);

    for (var j = 0; j < obj.length; j++) {
        var childNODE = obj[j];
        var tr = $('<tr></tr>');
        for (var k = 0; k < cols.length; k++) {
            var columnName = cols[k];
            if (k == 0)
                tr.append('<td><input type="radio" name="group1"   onclick="selectRadio(this)"/></td>');
            else
                if (columnName.substring(0, 1) == "0")
                    tr.append('<td style="display:none">' + childNODE[columnName] + '</td>');
                else
                    tr.append('<td>' + childNODE[columnName] + '</td>');
            table.append(tr);
        }
    }
    return table;
}

function createTableRadio1(obj) {

    var cols = GetHeaders(obj);
    var table = $('<table id="MasterListRadio1" style="width:100%;" class="table table-bordered table-hover scroll"></table>');
    var th = $('<tr></tr>');
    for (var i = 0; i < cols.length; i++) {
        if (i == 0)
            th.append('<th style="background-color:rgb(80, 80, 80)!important;color:#fff;">' + cols[i] + '</th>');
        else
            if (cols[i].substring(0, 1) == "0")
                th.append('<th style="display:none">' + cols[i] + '</th>');
            else
                th.append('<th style="background-color:rgb(80, 80, 80)!important;color:#fff;">' + cols[i] + '</th>');
    }
    table.append(th);

    for (var j = 0; j < obj.length; j++) {
        var childNODE = obj[j];
        var tr = $('<tr></tr>');
        for (var k = 0; k < cols.length; k++) {
            var columnName = cols[k];
            if (k == 0)
                tr.append('<td><input type="radio" name="group1"   onclick="selectRadio1(this)"/></td>');
            else
                if (columnName.substring(0, 1) == "0")
                    tr.append('<td style="display:none">' + childNODE[columnName] + '</td>');
                else
                    tr.append('<td>' + childNODE[columnName] + '</td>');
            table.append(tr);
        }

    }
    return table;
}


function createTableCheckBox(obj) {

    var cols = GetHeaders(obj);
    var table = $('<table id="MasterListCheckbox" style="width:100%;" class="table table-bordered table-hover scroll"></table>');
    
    var th = $('<tr></tr>');
    for (var i = 0; i < cols.length; i++) {
        if (i == 0)
            th.append('<th style="background-color:rgb(80, 80, 80)!important;color:#fff;"><input type="checkbox" name="group1[]"   onclick="selectCheckAll(this)"/></th>');
        else
            if (cols[i].substring(0, 1) == "0")
                th.append('<th style="display:none">' + cols[i] + '</th>');
            else
                th.append('<th style="background-color:rgb(80, 80, 80)!important;color:#fff;">' + cols[i] + '</th>');
    }
    //table.append(th);

    var thead = $('<thead></thead>');
    thead.append(th);
    table.append(thead);
    var tbody = $('<body></tbody>');
    table.append(tbody);




    for (var j = 0; j < obj.length; j++) {
        var childNODE = obj[j];
        var tr = $('<tr></tr>');
        for (var k = 0; k < cols.length; k++) {
            var columnName = cols[k];
            if (k == 0)
                tr.append('<td><input type="checkbox" id="checker" name="group1[]"   onclick="selectCheck(this)"/></td>');
            else
                if (columnName.substring(0, 1) == "0")
                    tr.append('<td style="display:none">' + childNODE[columnName] + '</td>');
                else
                    tr.append('<td>' + childNODE[columnName] + '</td>');
            table.append(tr);
        }
    }
    return table;
}

//==================== HTML Table ======================================



