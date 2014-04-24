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
			jobs[i](i, params[i], singleJobDoneCallback);
		}
	};

	// this is a little tricky; the singleJobDoneCallback below is not necessarily the same as the one above. The one below only lives in the namespace within that function. Then again that is true for the first argument too and I think I prefer that style.
	var getRandoSong = function(i, paramsSingleTrack, singleJobDoneCallback) {
		$.getJSON(url, paramsSingleTrack, function(json){
			singleJobDoneCallback(i, json);
		});
	};

	// make the array of functions that contain the jobs to be sent out in the batch:
	var jobs = [];
	for (var i = 0; i < 12; i++) {
		jobs.push(getRandoSong); 
	}

	// send out the batch of jobs & do the callback function:
    batcher(jobs, params, function(jobResults) {

    	// sort the songs in the order they were sent out:
    	jobResults.sort(function(a,b){return a[0]-b[0]});


    	// console.log(jobResults);
		var tracklist = "";
		var tempolist = new Array;
		var danceabiliylist = new Array;
		var energylist = new Array;
		var loudnesslist = new Array;
		var acousticnesslist = new Array;

		// build the tracklist for the spotify URI:
	    for (var s=0; s<numSongs; s++) {	
	    	console.log(jobResults[s][1])
            var song = jobResults[s][1].response.songs[0]; 
            var tid = song.tracks[0].foreign_id.replace('spotify-WW:track:', '');
            tracklist = tracklist + tid + ',';

            // also get the parms so you can construct the Highchart:
            // (modularize this better)
            tempolist.push(song.audio_summary.tempo);
            danceabiliylist.push(song.audio_summary.danceability);
            energylist.push(song.audio_summary.energy);
            loudnesslist.push(song.audio_summary.loudness);
            acousticnesslist.push(song.audio_summary.acousticness);
	    }

	    // embed the spotify playlist:
	    $("#playlist").html('The playlist')
        var tembed = embed.replace('TRACKS', tracklist);
        tembed = tembed.replace('PREFEREDTITLE', ' playlist');
        var li = $("<span>").html(tembed);
        $("#results").append(li);

	});
}


function newPlaylist(numSongs) {

    $("#playlist").html('Building playlist');

	// get the params for each song form the chart:
	var labels = ["tempo", "danceability", "energy", "loudness", "acousticness"];
	var chartparams = {};
	for (i=0; i<labels.length; i++) {
		chartparams[labels[i]] = new Array;
	}

	for (p=0; p < labels.length; p++) {
		paramseries = chart.series[p].data;
		for (d=0; d < paramseries.length; d++) {
			chartparams[labels[p]].push(paramseries[d].y);
		}
	}


	// non-time-varying API-request params:
    var params_nonvarying = { 
		'genre' : [$("#genre1").val(), $("#genre2").val(), $("#genre3").val(), $("#genre4").val()], 
		'format' : 'jsonp', 
		'bucket' : ['id:spotify-WW','tracks', 'audio_summary'], 
		'limit' : true, 
		'results' : 1, 
		'type' : 'genre-radio',
		'variety' : 0.2, 
		'distribution' : false ? 
		'wandering' : 'focused'
	}

	// Echo Nest seems to have min/max params as hard constraints, even though 
	// older forum posts suggest that this wasn't always the case. For now, let's 
	// hard code how much these params can vary:
	// (Eventually, maybe add this as another input box.)
	var tempo_range = 10;
	var danceability_range = 0.1;
	var energy_range = 0.15;
	var loudness_range = 6;
	var acousticness_range = 0.1;
	var params = new Array;
	for (var i=0; i<numSongs; i++){
		params[i] = params_nonvarying;
		params[i]['min_tempo'] = chartparams['tempo'][i] - tempo_range;
		params[i]['max_tempo'] = chartparams['tempo'][i] + tempo_range;
		params[i]['min_energy'] = chartparams['energy'][i] - energy_range;
		params[i]['max_energy'] = chartparams['energy'][i] + energy_range;
		params[i]['min_loudness'] = chartparams['loudness'][i] - loudness_range;
		params[i]['max_loudness'] = chartparams['loudness'][i] + loudness_range;
		params[i]['min_acousticness'] = chartparams['acousticness'][i] - acousticness_range;
		params[i]['max_acousticness'] = chartparams['acousticness'][i] + acousticness_range;
		params[i]['min_danceability'] = chartparams['danceability'][i] - danceability_range;
		params[i]['max_danceability'] = chartparams['danceability'][i] + danceability_range;
	}



	// get the playlist, embed it in the page:
    fetchPlaylist(numSongs, params);
}


// CJR: not quite sure what this does:
function info(txt) {
    $("#info").text(txt);
}


var repeatelem = function(elem, n){
    // returns an array with element elem repeated n times.
    var arr = [];
    for (var i=0; i<n; i++) {
        arr.push(elem);
        // arr = arr.concat(elem);
    };
    return arr;
};


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
};


function initializeChart(numSongs) {
	var tempo = parseFloat($("#tempo").val());
	var danceability = parseFloat($("#danceability").val())
	var energy = parseFloat($("#energy").val());
	var loudness = parseFloat($("#loudness").val())
	var acousticness = parseFloat($("#acousticness").val())

	var numParams = 5;
	var defaults = [tempo, danceability, energy, loudness, acousticness];
	for (p=0; p<numParams; p++) {
		chart.series[p].setData(repeatelem(defaults[p], numSongs));
	}

	// set axis extremes:
	if (chart.yAxis[1].getExtremes().dataMax < 1) {
	   chart.yAxis[1].setExtremes(0, 1);
	}
	if (chart.yAxis[2].getExtremes().dataMax < 1) {
	   chart.yAxis[2].setExtremes(0, 1);
	}
	if (chart.yAxis[4].getExtremes().dataMax < 1) {
	   chart.yAxis[4].setExtremes(0, 1);
	}
};


