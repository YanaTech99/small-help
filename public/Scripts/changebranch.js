function openpopupChangebranch() {
    debugger;
    $('.defaultchangeBranch').show();
    $('#btnmodalchangebranch').click();
    bindComboDefault("Select nBranchId,cBranchName From SystemControl Where nbranchId>0", 'ddldefaultchngbranch');
}

$('#btndefaultchngbranch').click(function () {
    if ($('#ddldefaultchngbranch').val() > 0) {
        var qs = "exec Changebranch_GetDetail " + $('#ddldefaultchngbranch').val() + "," + sesUserId + "";
        CallAJAXChangeBranch(qs);
        debugger;
        if (AJAXResult != null) {
            window.localStorage.setItem('CurrentDt', AJAXResult[0]['dCurrentDate']);
            window.localStorage.setItem('BranchName', AJAXResult[0]['cBranchName']);
            window.localStorage.setItem('BranchId', AJAXResult[0]['nBranchId']);
            $('#BrName').text('Branch: ' + AJAXResult[0]['cBranchName']);
            $('#BrDate').text('   Day: '+AJAXResult[0]['dCurrentDate']);
            
        }
    }
    $('#btnclosechangebranch').click();
});

