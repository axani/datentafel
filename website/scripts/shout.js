$(function() {

	updateShout();

	setInterval(updateShout, 2000);    


    function updateShout() {
	    $.getJSON('../../data/chatlog.json', function(data) {

	        // outputArea.text(data.time + ' ' + data.user + ': ' + data.content);

	        $('.shouting').removeClass('shouting');
	        $('li[data-username="' + data.user + '"]').addClass('shouting');

	        $('.user-shout').html('<p>' + data.content + '</p>');

	    });
	}
});