var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
var fs = require('fs');
var path = require('path');

var requestOptions = {
	url: 'https://www.googleapis.com/customsearch/v1',
	agentOptions: {
		key: fs.readFileSync(path.resolve(__dirname, 'ssl/server.key')),
		cert: fs.readFileSync(path.resolve(__dirname, 'ssl/server.crt'))
	},
	qs: {
		q: '',
		num: 1, // 1 to 10
		start: 1, // 1 to 101
		imgSize: 'medium',
		searchType: 'image',
		//fileType: 'jpg',
		key: fs.readFileSync(path.resolve(__dirname, 'config/api.key'), 'utf-8').trim(),
		cx: fs.readFileSync(path.resolve(__dirname, 'config/cse.cx'), 'utf-8').trim()
	}
};

var bot = new builder.BotConnectorBot({
	appId: 'YourAppId', appSecret: 'YourAppSecret'
});
bot.add('/', function (session) {
	searchImage(session);
});

function searchImage(session) {
	var query = session.message.text;
	console.log('query: ', query);
	requestOptions.qs.q = query;
	request.get(requestOptions, function (err, response) {
		if (err) {
			console.log(err);
			session.send('sorry, cannot find anything for now');
		}
		var items = JSON.parse(response.body).items;
		if (!items || items.length < 1) {
			session.send('sorry, cannot find an image');
		}
		var title = items[0].title;
		console.log('title: ', title);
		var link = items[0].link;
		console.log('link: ', link);
		session.send({
			text: title,
			attachments: [{
	      contentType: 'image',
	      contentUrl: link,
    	}]
		});
	});
};

var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
