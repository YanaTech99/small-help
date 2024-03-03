$(document).ready(function () {
    //var qs = 'Select * From USerMAster';

    // CallAJAX1(qs);
    // if (AJAXResult != null) {
    //     alert(JSON.stringify(AJAXResult));
    // }

    var qsMD = "select nMacDetailID, nMacId,cGIN,dReqDt,dActivationDt,nClientID,cDispatch,cDataSendToClient,dCreateDate,nUpdateId,dUpdateDate From MAcDetail";
    var qsMM = 'Select nMacID,cMIN,cMachineName,nVersionId From MacMAster';
  //  sycnMM(qsMM);
  //  sycnMD(qsMD);
    //var qs = "Select   [nMsgID] nRefMsgId ,[nMacDetailId] ,[cReqCMD] ,[cRequest] ,[cResCMD] ,[cResponse]      ,[cIpAddress]  ,[nPort]      ,[dTranDate],[dResponseDt] ,[nRefClientReqId] ,[cIsSendToClient] ,[cIsSendedToClient] ,[dSendDate]    ,[cIsResend]      ,[dResendDt] From MachineMsgMaster Where nMsgID  between 3199961 and 3503326";
   // sycnMMM(qs)
   // if (AJAXResult != null) {
        // var json = JSON.stringify(AJAXResult);
        //    qs = "Select * From syncmachinemsgmaster(1,'" + json + "')";
        //    CallAJAX1(qs)
   //     debugger;
  //      //   alert(JSON.stringify(AJAXResult));
   // }
});

function loginuser() {
    if (validate() == false)
        return false;
    var newUser = new getUser();
    CallAJAXLogin(newUser);
    if (AJAXResult != null) {
        if (AJAXResult.msg == '-1') {
            alert('Login Fail')
        }
        else {
            var data = AJAXResult.data;
            window.localStorage.clear();
            window.localStorage.setItem('UserId', data[0].nuserid);
            window.localStorage.setItem('UserName', data[0].cusername);
            window.localStorage.setItem('ClientId', data[0].nclientid);
            window.location.href = '/userhome';
        }
    } else {
        alert('Login Fail');
    }
};

function getUser() {
    this.username = $('#txtUsername').val();
    this.password = $('#txtPassword').val();
};