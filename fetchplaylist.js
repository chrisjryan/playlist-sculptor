function fetchPlaylist(numSongs, params) {

	var url = 'http://developer.echonest.com/api/v4/playlist/static?api_key='+key+'&callback=?';

    $("#all_results").hide();
    info("Creating the playlist ...");

    info("");
    $("#all_results").show();
    $("#results").empty(); // clear out the old playlist


	var batcher = function(jobs, params, allDoneCallback) {
		var jobResults = [];
		var singleJobDoneCallback = function(i, jobResult) {
			// the jobResult, in our case, is the songId + the order in the tracklist
			jobResults.push([i, jobResult]);

			// this works because 1 job is guaranteed to be the last job to finish (even though it won't be the last job to be submitted), and so will enter this clause:
			if (jobResults.length === jobs.length) {
				allDoneCallback(jobResults);
			}
		};

		// send in the loop index as the desired track order here:
		for (var i = 0; i < jobs.length; i++) {
			jobs[i](i, params, singleJobDoneCallback);
		}
	};

	// this is a little tricky; the singleJobDoneCallback below is not necessarily the same as the one above. The one below only lives in the namespace within that function. Then again that is true for the first argument too and I think I prefer that style.
	var getRandoSong = function(i, params, singleJobDoneCallback) {
		$.getJSON(url, params, function(json){
			singleJobDoneCallback(i, json);
		});
	};

	var jobs = [];
	for (var i = 0; i < 12; i++) {
		jobs.push(getRandoSong); 
	}


    batcher(jobs, params, function(jobResults) {

    	jobResults.sort(function(a,b){return a[0]-b[0]});
		var tracklist = "";

	    for (var s=0; s<numSongs; s++) {	
	    	console.log(jobResults[s][0])			    	
            var song = jobResults[s][1].response.songs[0]; 
            var tid = song.tracks[0].foreign_id.replace('spotify-WW:track:', '');
            tracklist = tracklist + tid + ',';
	    }

	    $("#playlist").html('The playlist')
        var tembed = embed.replace('TRACKS', tracklist);
        tembed = tembed.replace('PREFEREDTITLE', ' playlist');
        var li = $("<span>").html(tembed);
        $("#results").append(li);
	});
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