'use strict';

var Polls=require('../models/polls.js');
function voteHandler(){

  this.findVote=function(req,res){
    Polls
      .findOne({'question':req.body.question})
      .exec(function(err,result){
        if(err) throw err;
        res.json(result);

      })
  }
}


module.exports = voteHandler;
