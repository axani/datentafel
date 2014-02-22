$(function() {

    var users = {
        "Martin": "le_marton", 
        "Mathias": "dragital",
        "Philipp": "askaniaskani"

    }


    $.each(users, function(real_name, lastfm_name) {
        
        /* Get data */
        $.getJSON( "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfm_name + "&api_key=e1c0d80992681df2296b69b3f73c07f5&format=json", function( data ) {
            console.log(data);
            try {
                data.recenttracks.track[0]['@attr']['nowplaying'];
                var listening = "listening_active"
            } catch (e) {
                var listening = "listening_idle"
            }
            var artist = data.recenttracks.track[0].artist['#text'];
            var songtitle = data.recenttracks.track[0].name
            var coverimage = data.recenttracks.track[0].image[2]['#text'];
           
            /* Create HTML for user */
            var html_snippet = '<div class="' + listening + ' user_station"><h2>' + real_name + '</h2><strong>' + listening +'</strong><br><img class="coverimage" src="' + coverimage + '" ><br>' + artist + ' - ' + songtitle + '</div>'
            $('.stations').append(html_snippet)
            console.log(lastfm_name);


        });



    })

});