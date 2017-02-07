'use strict';

var Polls = require('../models/polls.js');

function ClickHandler () {

	this.auto = function (req, res) {
		Polls
			.find({},{})
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};


}

module.exports = ClickHandler;
