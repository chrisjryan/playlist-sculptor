function fetchPlaylist(numSongs, params) {

	var url = 'http://developer.echonest.com/api/v4/playlist/static?api_key='+key+'&callback=?';

    $("#all_results").hide();
    info("Creating the playlist ...");

    info("");
    $("#all_results").show();
    $("#results").empty(); // clear out the old playlist




	var data = []
	var tracklist = ""

	// assemble the tracklist using a recursion of callback functions:
	function download(d) {
	    data.push(d)

	    if (data.length < numSongs) {
			$.getJSON(url, params, download);
		    $("#playlist").append('.')
	    } 

	    else if (data.length === numSongs) {
		    for (var s=0; s<numSongs; s++) {				    	
	            var song = data[s].response.songs[0]; 
	            var tid = song.tracks[0].foreign_id.replace('spotify-WW:track:', '');
	            tracklist = tracklist + tid + ',';
		    }

		    $("#playlist").html('The playlist')
	        var tembed = embed.replace('TRACKS', tracklist);
	        tembed = tembed.replace('PREFEREDTITLE', ' playlist');
	        var li = $("<span>").html(tembed);
	        $("#results").append(li);
	    }
	}

	$.getJSON(url, params, download);
}


function newPlaylist(numSongs) {

    $("#playlist").html('Building playlist')

    params = { 
		'genre' : [$("#genre1").val(), $("#genre2").val(), $("#genre3").val(), $("#genre4").val()], 
		'min_tempo' : $("#min_tempo").val(),
		'max_tempo' : $("#max_tempo").val(),
		'min_danceability' : $("#min_danceability").val(),
		'max_danceability' : $("#max_danceability").val(),
		'min_energy' : $("#min_energy").val(),
		'max_energy' : $("#max_energy").val(),
		'min_loudness' : $("#min_loudness").val(),
		'max_loudness' : $("#max_loudness").val(),
		'min_acousticness' : $("#min_acousticness").val(),
		'max_acousticness' : $("#max_acousticness").val(),
		'format' : 'jsonp', 
		'bucket' : ['id:spotify-WW','tracks'], 
		'limit' : true, 
		'results' : 1, 
		'type' : 'genre-radio',
		'variety' : 0.2, 
		'distribution' : false ? 
		'wandering' : 'focused'
	}

    fetchPlaylist(numSongs, params);
}


// CJR: not quite sure what this does:
function info(txt) {
    $("#info").text(txt);
}


// TODO: since the Echo Nest server won't return more than 1000 entries (true in the demos too), get all these separately and then save them in a JSON file so you can load them from there instead of the Echo nest site (see Echo Nest's 'genre a day' demo repo)
function fetchGenreList() {
	var url = 'http://developer.echonest.com/api/v4/artist/list_genres?api_key=' + key;
	$.getJSON(url, { }, 
	    function(data) {
	        var genres = data.response.genres;
	        var glist = $('.genre');
	        console.log(genres.length)
	        for (var i = 0, max = genres.length; i < max; i++) {
	            var genre = genres[i].name;
	            var opt = $("<option>").attr('value', genre).text(genre);
	            glist.append(opt);
	        }
	        $("#genre1").val('electro')
	        $("#genre2").val('dance-punk')
	        $("#genre3").val('new wave')
	        $("#genre4").val('italian disco')
	        // $("#genre5").val('synthpop')
	    }
    );
}