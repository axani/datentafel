$(function() {

    var users = {
        "&#xEB83;": "le_marton", 
        "&#xF282;": "dragital",
        "&#x1F357;": "askaniaskani"

    }

    updateMusicList();

    setInterval(updateMusicList, 60000);



    function updateMusicList() {

        $('.stations').html('');

        $.each(users, function(user_icon, lastfm_name) {
            
            /* Get data */
            $.getJSON( "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfm_name + "&api_key=e1c0d80992681df2296b69b3f73c07f5&format=json", function( data ) {
                console.log(data);

                try {
                    data.recenttracks.track[0]['@attr']['nowplaying'];
                    var listening = "listening_active"

                    var artist = data.recenttracks.track[0].artist['#text'];
                    var songtitle = data.recenttracks.track[0].name
                    var coverimage = data.recenttracks.track[0].image[2]['#text'];
                   
                    /* Create HTML for user */
                    // var html_snippet = '<div class="' + listening + ' user_station"><h2>' + real_name + '</h2><strong>' + listening +'</strong><br><img class="coverimage" src="' + coverimage + '" ><br>' + artist + ' - ' + songtitle + '</div>'

                    var html_snippet = '<li class="user-station"><img class="coverimage" src="' + coverimage + '"><span class="song-info"><span class="ss-icon user-icon">' + user_icon + '</span> - ' + artist + ' - ' + songtitle + '</span></li>';
                    
                    // stationListElements += html_snippet;

                    $('.stations').append(html_snippet);

                    // console.log(stationListElements);
                } catch (e) {
                    var listening = "listening_idle";
                }
            });

        });

    }
});