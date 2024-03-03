var requestSHGDetailId = 0, requestMemberId = 0, requestSchemeId = 0, requestCustId = 0, requestShgId = 0,
    requestLoanChargesId = 0, requestLoanCycleId = 0, requestSerialNo = 0, requestEmpID = 0, requestRoleId = 0, requestTaxID = 0, requestTaxRateID = 0, requestFundID = 0, requestFundIncomeID = 0, requestMember = 0, requestUserID = 0, requestDesigId = 0, requestHierarchyId = 0;
var TableName = '', ColumnName = '', WhColumn = '', OldColvalue = '', NewColValue = '';

var requestType = '', requestGroupType = '';
function setRequest(focused) {
    
    $('#txtdefaultoldColValue').val('');
    $('#txtdefaultnewColValue').val('');
    $('#ddldefaultoldvalue').val(0);
    $('#ddldefaultnewvalue').val(0);
    TableName = '', ColumnName = '', WhColumn = '', OldColvalue = '';
    var arr = $(focused).attr('requestclass').split(" ");
    OldColvalue = $(focused).val() ? $(focused).val() : '';
    if (arr.length >= 4 && (requestSHGDetailId > 0 || requestMemberId > 0 || requestSchemeId > 0 || requestSerialNo > 0 || requestEmpID > 0 || requestRoleId > 0 || requestTaxID > 0 || requestTaxRateID > 0 || requestFundID > 0 || requestFundIncomeID > 0 || requestMember > 0 || requestUserID > 0 || requestDesigId > 0 || requestHierarchyId > 0 || requestLoanChargesId > 0 || requestLoanCycleId > 0) && $('.perm').val() == 'E') {
        TableName = arr[0];
        ColumnName = arr[1];
        WhColumn = arr[2];
        requestType = arr[3];
        requestGroupType = arr[4] ? arr[4] : 0;
        if (requestType == 'C') {
            var curid = $(focused).attr('id');
            $('.defaultstatusfundinggroup').hide();
            $('#ddldefaultnewvalue').empty();
            $('#ddldefaultoldvalue').empty();
            $('#' + curid + ' option').clone().appendTo('#ddldefaultnewvalue');
            $('#' + curid + ' option').clone().appendTo('#ddldefaultoldvalue');
            $('.defaultrequestcombo').show();
            $('.defaultrequesttextbox').hide();
            $('.defaultaddressgroup').hide();
            $('.defaultrequestcoldetail').hide();
            $('#ddldefaultoldvalue').val(OldColvalue);
        } else if (requestType == 'G') {
            if (requestGroupType == 1 || requestGroupType == 2) {
                $('.defaultstatusfundinggroup').hide();
                bindComboByCTG($('#ddldefaultstate'), 6);
                $('.defaultrequestcombo').hide();
                $('.defaultaddressgroup').show();
                $('.defaultrequesttextbox').hide();
                $('.defaultrequestcoldetail').hide();
            } else {
                $('.defaultstatusfundinggroup').hide();
                bindComboByCTG($('#ddldefaultcolcenter'), 38);
                $('.defaultrequestcombo').hide();
                $('.defaultaddressgroup').hide();
                $('.defaultrequesttextbox').hide();
                $('.defaultrequestcoldetail').show()
            }
        }
        else if (requestType == 'D') {

            $('.defaultstatusfundinggroup').hide();
            $('#txtdefaultnewColValue').addClass('date');
            $('.date').datepicker({ dateFormat: 'dd-M-yy' });
            $('#txtdefaultoldColValue').val(OldColvalue);
            $('.defaultrequestcombo').hide();
            $('.defaultaddressgroup').hide();
            $('.defaultrequestcoldetail').hide();
            $('.defaultrequesttextbox').show();
        }
        else if (requestType == 'CB') {
            //debugger;
            $('#ddlstatusfunding').empty();
            var curid = $(focused).attr('id');
            
            $('#' + curid + ' option').clone().appendTo('#ddlstatusfunding');
            $('#ddlstatusfunding').val(OldColvalue);
            var status = OldColvalue;
            if (status == 'Y') {
                $("#txtfundingclose").attr("disabled", "disabled");
                //$("#btnrequestSavestatus").hide();

            } else {
                $("#txtfundingclose").removeAttr("disabled");
                //$("#btnrequestSavestatus").show();
                $('input[id="txtfundingclose"]').val('');
            }
            $('#txtstatusoldColValue').val(OldColvalue);
            $('.defaultstatusfundinggroup').show();
            $('.defaultrequestcombo').hide();
            $('.defaultaddressgroup').hide();
            $('.defaultrequestcoldetail').hide();
            $('.defaultrequesttextbox').hide();
        }

        else {
            $('.defaultstatusfundinggroup').hide();
            $('#txtdefaultnewColValue').removeClass('date');
            $("#txtdefaultnewColValue").datepicker("destroy");

            $('#txtdefaultoldColValue').val(OldColvalue);
            $('.defaultaddressgroup').hide();
            $('.defaultrequestcombo').hide();
            $('.defaultrequestcoldetail').hide();
            $('.defaultrequesttextbox').show();
        }

    /*} else if (requestType == 'CB') {
        if (requestGroupType == 1 || requestGroupType == 2) {
            bindComboByCTG($('#ddldefaultstate'), 6);
            $('.defaultrequestcombo').hide();
            $('.defaultaddressgroup').hide();
            $('.defaultrequesttextbox').hide();
            $('.defaultrequestcoldetail').hide();
            $('.defaultstatusfundinggroup').show();
        } else {
            bindComboByCTG($('#ddldefaultcolcenter'), 38);
            $('.defaultrequestcombo').hide();
            $('.defaultaddressgroup').hide();
            $('.defaultrequesttextbox').hide();
            $('.defaultrequestcoldetail').show();
        }
    }*/




        $('#btnmodalrequest').click();
    }
}


function InsertDataChangeRequesttext() {
        
    if ($('#txtdefaultnewColValue').val().length > 0) {
        $('#txtdefaultnewColValue').removeClass('error');
        NewColValue = $('#txtdefaultnewColValue').val();
		if ($('#txtdefaultreason').val().length > 0) {
			$('#txtdefaultreason').removeClass('error');
		var requestReason=$('#txtdefaultreason').val();
        
        var qs = 'exec ProcessDCR ';
        qs += "'" + TableName + "'" + ',';
        qs += "'" + ColumnName + "'" + ',';
        qs += "'" + WhColumn + "'" + ',';
        qs += "'" + OldColvalue + "'" + ',';
        qs += "'" + NewColValue + "'" + ',';
        qs += requestShgId + ',';
        qs += requestSHGDetailId + ',';
        qs += requestCustId + ',';
        qs += requestMemberId + ',';
        qs += requestSchemeId + ',';
        qs += requestLoanCycleId + ',';
        qs += requestLoanChargesId + ',';
        qs += requestSerialNo + ',';
        qs += requestDesigId + ',';
        qs += requestHierarchyId + ',';
        qs += requestEmpID + ',';
        qs += requestRoleId + ',';
        qs += requestTaxID + ',';
        qs += requestTaxRateID + ',';
        qs += requestFundID + ',';
        qs += requestFundIncomeID + ',';
        //qs += requestMember + ',';
        
        qs += requestUserID + ',';
        qs += sesBranchId + ',';
        qs += sesUserId + ',';
		qs += "'" + requestReason + "'" + ',';
	
        qs += "'" + sesBranchDt + "'" + '';
        CallAJAX1(qs)
        if (AJAXResult != null) {
            alert(AJAXResult[0]['Value1']);
        }
		}else{
			
			$('#txtdefaultreason').addClass('error');
		}
    } else {
        $('#txtdefaultnewColValue').addClass('error');
    }
}

$('#btnrequestSavetext').click(function () {
	
    InsertDataChangeRequesttext();
});


$('#btnrequestSavecombo').click(function () {
    InsertDataChangeRequestCombo();
});

function InsertDataChangeRequestCombo() {
   // debugger;
    
    if ($('#ddldefaultnewvalue').val() > 0 || $('#ddldefaultnewvalue').val().length>0) {
        $('#ddldefaultnewvalue').removeClass('error');
        NewColValue = $('#ddldefaultnewvalue').val();
		if ($('#txtdefaultreasondd').val().length > 0) {
			$('#txtdefaultreasondd').removeClass('error');
		var requestReason=$('#txtdefaultreasondd').val();
        var qs = 'exec ProcessDCR ';
        qs += "'" + TableName + "'" + ',';
        qs += "'" + ColumnName + "'" + ',';
        qs += "'" + WhColumn + "'" + ',';
        qs += "'" + OldColvalue + "'" + ',';
        qs += "'" + NewColValue + "'" + ',';
        qs += requestShgId + ',';
        qs += requestSHGDetailId + ',';
        qs += requestCustId + ',';
        qs += requestMemberId + ',';
        qs += requestSchemeId + ',';
        qs += requestLoanCycleId + ',';
        qs += requestLoanChargesId + ',';
        qs += requestSerialNo + ',';
        qs += requestDesigId + ',';
        qs += requestHierarchyId + ',';
        qs += requestEmpID + ',';
        qs += requestRoleId + ',';
        qs += requestTaxID + ',';
        qs += requestTaxRateID + ',';
        qs += requestFundID + ',';
        qs += requestFundIncomeID + ',';
        //qs += requestMember + ',';

        qs += requestUserID + ',';
        qs += sesBranchId + ',';
        qs += sesUserId + ',';
		qs += "'" + requestReason + "'" + ',';
        qs += "'" + sesBranchDt + "'" + '';
        CallAJAX1(qs);
        if (AJAXResult != null) {
            alert(AJAXResult[0]['Value1']);
        }
		}else{
			
			$('#txtdefaultreason').addClass('error');
		}
    } else {
        $('#ddldefaultnewvalue').addClass('error');
    }
}

$('#btnrequestSaveaddress').click(function () {
    
    if (validate10() == false)
        return false;
    if (requestGroupType == 3) {
        requestCenterId = $('#ddldefaultcolcenter').val();
        requestColAreaId = $('#ddldefaultcolarea').val();
        if (requestCenterId == 0) {
            $('#ddldefaultcolcenter').addClass('error');
            return false;
        }
        if (requestColAreaId == 0) {
            $('#ddldefaultcolarea').addClass('error');
            return false;
        }
    }
  
    requestStateId = $('#ddldefaultstate').val();
    requestDistirctId = $('#ddldefaultdistrict').val();
    requestTallukaId = $('#ddldefaulttalluka').val();
    requestCityId = $('#ddldefaultcity').val();
    requestVillageId = $('#ddldefaultvillage').val();
	 requestReason=$('#txtdefaultreasonaddress').val();
    InsertDCRAddress();
});

var requestStateId = 0, requestDistirctId, requestTallukaId = 0, requestCityId = 0, requestVillageId = 0,
    requestCenterId = 0, requestColAreaId = 0,requestReason=0;

function InsertDCRAddress() {
    
    var qs = 'exec ProcessDCRAddress ';
    qs += "'" + requestGroupType + "'" + ',';
    qs += requestShgId + ',';
    qs += requestSHGDetailId + ',';
    qs += requestMemberId + ',';
    qs += requestStateId + ',';
    qs += requestDistirctId + ',';
    qs += requestTallukaId + ',';
    qs += requestCityId + ',';
    qs += requestVillageId + ',';
    qs += requestCenterId + ',';
    qs += requestColAreaId + ',';
    qs += sesBranchId + ',';
    qs += sesUserId + ',';
	qs += "'" + requestReason + "'" + ',';
    qs += "'" + sesBranchDt + "'" + '';
  
    CallAJAX1(qs);
    if (AJAXResult != null) {
        alert(AJAXResult[0]['Value1']);
    }
}

$('#ddldefaultstate').change(function () {
    if ($(this).val() > 0) {
        bindComboChild($('#ddldefaultdistrict'), $(this).val());
    }
    else {
        bindSelect($('#ddldefaultdistrict'));
    }
});
$('#ddldefaultdistrict').change(function () {
    if ($(this).val() > 0) {
        bindComboChild($('#ddldefaulttalluka'), $(this).val());
    }
    else {
        bindSelect($('#ddldefaulttalluka'));
    }
});
$('#ddldefaulttalluka').change(function () {
    if ($(this).val() > 0) {
        bindComboChild($('#ddldefaultcity'), $(this).val());
    }
    else {
        bindSelect($('#ddldefaultcity'));
    }
});

$('#ddldefaultcity').change(function () {
    if ($(this).val() > 0) {
        bindComboChild($('#ddldefaultvillage'), $(this).val());
    }
    else {
        bindSelect($('#ddldefaultvillage'));
    }
});


$('#ddldefaultcolcenter').change(function () {
    if ($(this).val() > 0) {
        bindComboChild($('#ddldefaultcolarea'), $(this).val());
        setSHGName();
    }
    else {
        bindSelect($('#ddldefaultcolarea'));
    }
});

//===========================funding line status date combo================

$('#ddlstatusfunding').change(function () {
    if ($('#ddlstatusfunding').val() == 'N') {
        $("#txtfundingclose").removeAttr("disabled");
        //$("#btnrequestSavestatus").show();
}
else {
        $("#txtfundingclose").attr("disabled", "disabled");
        //$("#btnrequestSavestatus").hide();
        $('input[id="txtfundingclose"]').val('');
        }
});


$('#btnrequestSavestatus').click(function () {
  
    if (validate11() == false)
      return false;
    requestoldvalue = $('#txtstatusoldColValue').val();
    requeststatus = $('#ddlstatusfunding').val();
    requestclosedt = $('#txtfundingclose').val();
	var datediff  = DateDiff(sesBranchDt,requestclosedt);
	//alert(datediff);
	var d=datediff.toString().substring(0, 1);

    //InsertDCRfundline();
if(d=='-'){
	alert('Date must be greater than current Branch Date!!!');
}else if(datediff>10){
	alert('Date diffrence should be 10 days next to current branch date');
}else{
    var qs = "exec ProcessDCRfundline '" + requestoldvalue + "','" + requeststatus + "','" + requestclosedt + "'," + sesBranchId + "," + sesUserId + ",'" + sesBranchDt + "'," + requestFundID + "";
    CallAJAX1(qs);
    if (AJAXResult != null) {
        alert(AJAXResult[0]['Value1']);
    }
}
});

/*var requestoldvalue = 0, requeststatus = 0, requestclosedt = 0, fundId = 0;

function InsertDCRfundline() {
    var qs = 'exec ProcessDCRfundline';
    //qs += "'" + requestGroupType + "'" + ',';
    qs += fundId + ',';
    qs += "'" + requestoldvalue + "'" + '';
    qs += "'" + requeststatus + "'" + '';
    qs += "'" + requestclosedt + "'" + '';
    qs += sesBranchId + ',';
    qs += sesUserId + ',';
    qs += "'" + sesBranchDt + "'" + '';

    CallAJAX1(qs);
    if (AJAXResult != null) {
        alert(AJAXResult[0]['Value1']);
    }
}*/

//===========================end funding line==============================