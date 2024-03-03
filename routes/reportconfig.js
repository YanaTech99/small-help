var httpntlm = require('httpntlm');

module.exports={
    genrep: function(query,callback){

      //  var serverurl = 'http://173.212.241.74/ReportServer_MSSQLSERVER2?/Microplus/';
          var serverurl = 'http://173.212.241.74/ReportServer_MSSQLSERVER2?/NLFPL/';
        const serialize = function(obj) {
            var str = [];
            for (var p in obj)
              if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              }
            return str.join("&");
        }
        var config = {
            // url : 'http://173.212.241.74/ReportServer_MSSQLSERVER2?/Microplus/AccountStatement&rs:Command=Render&rs:Format=PDF&Dt=01%20Mar%202017&FrmDt=01%20Mar%202017&ToDate=01%20Mar%202017&AccountNo=001046000003&BankNm=IDBI&BrNm=JHALAWAR&BrAddr=JHALAWAR',
            // url:'http://173.212.241.74/ReportServer_MSSQLSERVER2/Pages/ReportViewer.aspx?/Microplus/AccountStatement&rs:Command=Render&Dt=01%20Mar%202017&FrmDt=01%20Mar%202017&ToDate=01%20Mar%202017&AccountNo=001046000003&BankNm=IDBI&BrNm=JHALAWAR&BrAddr=JHALAWAR&rc:Parameters=false',
            url:serverurl+query.reportname+'&'+serialize(query.link),
            username: 'Administrator',
            password: 'Tru$tJourney',
            workstation:'VMI129742',
            // VIM80169
            domain:'',
            binary:true
        }    
//console.log(config);
        httpntlm.get(config,function(err,res){
            if(err) return err; 
            callback(null,res.body);
        });        
    }
};