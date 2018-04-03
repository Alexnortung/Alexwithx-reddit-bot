require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');



const r = new Snoowrap({
	userAgent: "reddit-nodejs-bot",
	clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

var mySubmissions = [];

r.getUser(process.env.REDDIT_USER).getSubmissions().then((submissions) => {
	//console.log(submissions);
	for (var i = submissions.length - 1; i >= 0; i--) {
		mySubmissions.push(submissions[i].name)
	}
	console.log(mySubmissions);
});


r.getSubreddit('FreeKarma4U')




const client = new Snoostorm(r);


const streamOpts = {
    subreddit: 'FreeKarma4U',
    results: 5
};

const comments = client.CommentStream(streamOpts);

comments.on("comment", (comment) => {
	//console.log(comment);

	if (mySubmissions.indexOf(comment.link_id) != -1) {
		console.log("comment on my submission");
		comment.upvote();
		if (comment.link_id == comment.parent_id) {
			console
			comment.reply("Thanks! Your comment has been upvoted");
		}
		
	}

	if (comment.body === ':(') {
		comment.upvote();
		//comment.reply("upvoted to mak you feel better :)");
	}
});




	