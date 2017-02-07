'use strict';
var Poll=require('../models/polls');

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var VoteHandler=require(path+'/app/controllers/voteHandler.server.js');
module.exports = function (app, passport) {

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    var clickHandler = new ClickHandler();
    var voteHandler=new VoteHandler();
    app.route('/')
        .get(isLoggedIn, function (req, res) {
            res.sendFile(path + '/public/index.html')
        })
        .post(isLoggedIn,function(req,res){
          var poll=new Poll(req.body);
          poll.question=req.body.question;
          for(var i=0;i<req.body.optional.length;++i){
            poll.choices[i]={
              text:req.body.optional[i],
              votes:0
            };
          }
          poll.save(function(err){
            if(err) throw err;
          })
          //res.send(req.body);
          res.sendFile(path + '/public/index.html')
        });


    app.route('/login')
        .get(function (req, res) {
            res.sendFile(path + '/public/login.html');
        });

    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/login');
        });

    app.route('/newpoll')
      .get(isLoggedIn,function(req,res){
        res.sendFile(path+'/public/newpoll.html')
      })

    app.route('/profile')
        .get(isLoggedIn, function (req, res) {
            res.sendFile(path + '/public/profile.html');
        });

    app.route('/api/:id/userGithub')
        .get(isLoggedIn, function (req, res) {
            res.json(req.user.github);
            //console.log(req.user.id);
        });

    app.route('/auth/github')
        .get(passport.authenticate('github'));

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));


    app.route('/api/polls')
      .get(isLoggedIn,clickHandler.auto);

    app.route('/api/user/poll')
      //.get(isLoggedIn,savePoll.save)
      .post(isLoggedIn,function(req,res){
        res.send(req.body);
      })

      app.route('/votePoll')
        .get(isLoggedIn,function(req,res){
          res.sendFile(path+'/public/votepoll.html');
          //res.render(path+'/public/votepoll.html');
        })
        .post(isLoggedIn,function(req,res){
          var que=req.body.question;
          res.send('<!DOCTYPE html>\
          \
          <html>\
          \
              <head>\
                  <title>Vote App</title>\
                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>\
                  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\
                  <link href="http://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" type="text/css">\
                  <link href="/public/css/main.css" rel="stylesheet" type="text/css">\
              </head>\
          \
          \
          \
              <body>\
                <div class="container-fluid" id="head">\
                  <div>\
                    <p>\
                      Welcome, <span id="display-name"></span>!\
                    </p>\
                    <a class="menu" href="/profile">Profile</a>\
                    <span>|</span>\
                    <a class="menu" href="/logout">Logout</a>\
                  </div>\
          \
                  <div class="row" id="banner">\
                    <div class="col-xs-3 col-md-3 col-sm-3 col-lg-3" id="home">\
                      <a href="/" style="color:#33ff33">Home</a>\
                    </div>\
                    <div class="col-xs-8 col-md-8 col-sm-8 col-lg-8">\
                    </div>\
          \
                    <div class="col-xs-1 col-md-1 col-sm-1 col-lg-1"  >\
                        <a href="/newpoll" style="color:#33ff33" id="newpoll">New Poll</a>\
                    </div>\
          \
                  </div>\
          \
                  <p class="vote-app">Vote app</p>\
          \
                  <div id="voteContent">\
                  </div>\
                </div>\
                <script type="text/javascript">\
                    function doPreview(form)\
                    {\
                      var data=form.question.value;\
                      var voteContent=document.querySelector("#voteContent");\
                      voteContent.innerHTML=data;\
                    }\
                </script>\
                  <script type="text/javascript" src="../common/ajax-functions.js"></script>\
                  <script type="text/javascript" src="../controllers/voteControllers.client.js"></script>\
                  <script type="text/javascript" src="../controllers/clickControllers.client.js"></script>\
                  <script type="text/javascript" src="../controllers/userController.client.js"></script>\
              </body>\
          \
          </html>\
');

          //res.sendFile(path+'/public/votepoll.html');
        })



      app.route('/api/votePoll')
      .post(isLoggedIn,function(req,res){
          //res.send(req.body);
          var question=req.body.question;
          var voteContent=document.querySelector("#voteContent");
          voteContent.innerHTML(question);
        })
      .get(isLoggedIn,function(req,res){
          //Poll
          //  .findOne({'question':req.body.question})
          //  .exec(function(err,result){
          //    if(err) throw err;
          //    res.json(result);
          //  })
          res.send(req.body);
      })
          //res.render(path+'/public/votepoll.html');




};
