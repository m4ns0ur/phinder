# phinder
Yet another photo finder bot.

## Install

```javascript
$ npm install
```

you need to create a folder ("config"), and add the api.key, and cse.cx files into that. if you don't have them, create a new one:
- [Google API Console](https://console.developers.google.com/)
- [Google Custom Search Engine](https://cse.google.com/)

for more information see this [stack overflow](http://stackoverflow.com/a/34062436)

then execute it:

```javascript
$ npm start
```
### test

- windows: you can test the bot by [Bot Framework Emulator](http://docs.botframework.com/connector/tools/bot-framework-emulator/#navtitle)
- others: just send a POST request to the server ([there is a sample request](sample-request.json))

## How does it work?

It's using [MS bot framework](https://dev.botframework.com/), to get text from client (as a query string), 
and find the 1st relative photo, via [Google Custom Search Engine](https://cse.google.com/cse/).

## Open source license

- [Botbuilder](https://github.com/Microsoft/BotBuilder/blob/master/LICENSE)
- [Restify](https://github.com/restify/node-restify/blob/5.x/LICENSE)
- [Request](https://github.com/request/request/blob/master/LICENSE)

## License

[MIT](LICENSE)
