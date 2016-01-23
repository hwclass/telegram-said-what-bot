var TelegramBot = require('node-telegram-bot-api'),
		token = '',
		bot = new TelegramBot(token, {polling: true});

var SaidWhat = (function (quotes) {
	function getQuote (typedName, callback) {
		var currentQuote;
		for (var quoteIndex = 0, len = quotes.quotes.length; quoteIndex < len; quoteIndex++) {
			if (quotes.quotes[quoteIndex]['name'] === typedName) {
				var randomQuoteIndex = Math.floor((Math.random() * quotes.quotes[quoteIndex]['quotes'].length - 1) + 1);
				currentQuote = quotes.quotes[quoteIndex]['quotes'][randomQuoteIndex];
			}
		}
		callback(currentQuote);
	};

	return {
		get : getQuote
	}
})(JSON.parse(JSON.stringify(require('./data/quotes.json'))));

bot.onText(/\/saidwhat (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = null; 
  SaidWhat.get(match[1], function (quote) {
  	resp = quote;
  	bot.sendMessage(fromId, resp);
  });
});