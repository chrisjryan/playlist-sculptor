function fetchPlaylist(numSongs, genre1, genre2, genre3, genre4, min_tempo, max_tempo, min_danceability, max_danceability, min_energy, max_energy, min_loudness, max_loudness, min_acousticness, max_acousticness, wandering, variety) {

	var url = 'http://developer.echonest.com/api/v4/playlist/static?api_key='+key+'&callback=?';

    $("#all_results").hide();
    info("Creating the playlist ...");

    params = { 
		'genre' : [genre1, genre2, genre3, genre4], 
		'min_tempo' : min_tempo,
		'max_tempo' : max_tempo,
		'min_danceability' : min_danceability,
		'max_danceability' : max_danceability,
		'min_energy' : min_energy,
		'max_energy' : max_energy,
		'min_loudness' : min_loudness,
		'max_loudness' : max_loudness,
		'min_acousticness' : min_acousticness,
		'max_acousticness' : max_acousticness,
		'format' : 'jsonp', 
		'bucket' : ['id:spotify-WW','tracks'], 
		'limit' : true, 
		'results' : 1, 
		'type' : 'genre-radio',
		'variety' : variety, 
		'distribution' : wandering ? 
		'wandering' : 'focused'
	}

    info("");
    $("#all_results").show();
    $("#results").empty(); // clear out the old playlist

	var data = []
	var tracklist = ""

	var download = function(d) {
	    data.push(d)
	    console.log('.')
	    if (data.length < numSongs) {
			$.getJSON(url, params, download);
	    } else if (data.length === numSongs) {
		    console.log(data)

		    // make the comma separated list of track ids as a long string:
		    for (var s=0; s<numSongs; s++) {				    	
	            var song = data[s].response.songs[0]; 
	            var tid = song.tracks[0].foreign_id.replace('spotify-WW:track:', '');
	            tracklist = tracklist + tid + ',';
		    }

	        var tembed = embed.replace('TRACKS', tracklist);
	        tembed = tembed.replace('PREFEREDTITLE', ' playlist');
	        var li = $("<span>").html(tembed);
	        $("#results").append(li);
	    }
	}

	$.getJSON(url, params, download);
}


function newPlaylist(numSongs) {
	// evntually you'll be fetching lists of params, not single params
    var genre1 = $("#genre1").val();
    var genre2 = $("#genre2").val();
    var genre3 = $("#genre3").val();
    var genre4 = $("#genre4").val();
    // var genre5 = $("#genre5").val();
    var seed_artist = $("#seed_artist").val();
    var min_tempo = $("#min_tempo").val();
    var max_tempo = $("#max_tempo").val();
    var min_danceability = $("#min_danceability").val();
    var max_danceability = $("#max_danceability").val();
    var min_energy = $("#min_energy").val();
    var max_energy = $("#max_energy").val();
    var min_loudness = $("#min_loudness").val();
    var max_loudness = $("#max_loudness").val();
    var min_acousticness = $("#min_acousticness").val();
    var max_acousticness = $("#max_acousticness").val();

    $().html('Building playlist')

    fetchPlaylist(numSongs, genre1, genre2, genre3, genre4, min_tempo, max_tempo, min_danceability, max_danceability, min_energy, max_energy, min_loudness, max_loudness, min_acousticness, max_acousticness, false, .2);

    $().html('The playlist')
}
