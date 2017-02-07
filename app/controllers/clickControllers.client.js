'use strict';

(function () {
  var content=document.querySelector("#content");
  var apiUrl = appUrl + '/api/polls';

   function printPolls(data){

    var Obj=JSON.parse(data);
    var poll="";
    for(var i=0;i<Obj.length;++i){
      var id=Obj[i]._id;
      //console.log(Obj[i]);
      //poll+="<a href='/votePoll'>";
      poll+="<form id='pollId' method='post' action='/votePoll' ><input name='question' value='"+Obj[i].question+"' readonly>"+"</input>";
      for(var j=0;j<Obj[i].choices.length;++j){
        poll+="<input name='choices' type='text' hidden value='"+Obj[i].choices[j].text+"'></input>"
      }
      poll+="<button type='submit' > Vote </button>"
      poll+="</form>"+"<hr>";
      poll+="<iframe name='formresponse' width='300' hidden height='200'></iframe>";
      //poll+="</a>";
      //poll+="<button onclick='doPreview(this.form);'>Preview</button>";
    }

    //console.log(poll);
    content.innerHTML=poll;

   };

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET',apiUrl,printPolls));

})();
