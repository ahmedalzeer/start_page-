(function() {

    var quotes = $(".quotes");
    var quoteIndex = -1;

    function showNextQuote() {
		var quoteIndex = Math.floor(Math.random() * 214);
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(2000)
            .delay(4000)
            .fadeOut(2000, showNextQuote);
    }
    showNextQuote();
})();
