$(document).ready(function () {

    if (sesClientId == 999) {
        bindComboDefault('Select nMAcDetailID,cast(cMin AS NUMERIC)+484856 CmiN From GetMAcDetail Where nMacDetailId in (10, 14, 15, 19, 20, 24, 27, 29, 30, 31, 47, 54, 62, 64, 65, 66, 67, 68, 69, 71, 72, 73, 75, 78, 79, 80, 83, 84, 88, 91, 93, 95, 105) ', 'ddlclient');
    } else {
        bindComboDefault('Select nMAcDetailID,cMin From GetMAcDetail Where nClientID =' + sesClientId + '', 'ddlclient');
        
    }
});

$('#btnexport').click(function () {
    if (validate() == false)
        return false;
    var objFromDate = $('#dateFrom').val();
    var objToDate = $('#dateTo').val();
    var diff = DateDiff(objFromDate, objToDate);
    if (diff < 0)
        alert("To date must be greater then or equal to from date");

    var MacDetailID = $('#ddlclient').val() ? $('#ddlclient').val() : 0;
    //var qs = "Select * From getsalesdata(" + MacDetailID + ",'" + objFromDate + "','" + objToDate + "'," + sesClientId + ")";
    var qs = "exec Pr_getsalesdata " + MacDetailID + ",'" + objFromDate + "','" + objToDate + "'," + sesClientId + "";
    window.location.href = "../downloadexcel?query=" + qs + "";
});

