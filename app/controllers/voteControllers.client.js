'use strict';

(function(){
  var voteContent=document.querySelector("#voteContent");
  var apiUrl=appUrl+'/api/votePoll';

  function printVoteToVote(data){
    var Obj=JSON.parse(data);
    voteContent.innerHTML=Obj.question;
    //console.log(Obj);
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET',apiUrl,printVoteToVote));
})();
