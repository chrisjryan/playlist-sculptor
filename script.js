
// what does this mean?
// jQuery.ajaxSettings.traditional = true; 
 
// var embed = '<iframe src="https://embed.spotify.com/?uri=TRACK_URI" style="width:300px; height:380px;" frameborder="0" allowTransparency="true">';
 
 
// function fetchArtistPlaylist(artist,  wandering, variety) {
//     var url = 'http://developer.echonest.com/api/v4/playlist/static?api_key=FHPFXUKUGHZWWUXPR&callback=?';
 
//  	// ask jQuery to hide the previously fetched and displayed results, if any
//     $("#all_results").hide();
//     // not sure why the following doesn't delete previous text... where does it specify where the inserted text should go?
//     info("Creating the playlist ...");
//     // make the JSON request via jQuery:
//     $.getJSON(url, { 'artist': artist, 'format':'jsonp', 
//             'bucket': [ 'id:spotify-WW', 'tracks'], 'limit' : true,
//             'results': 12, 'type':'artist-radio', 'variety' : variety,
//             // what's "wandering"?
//             'distribution' : wandering ? 'wandering' : 'focused' }, function(data) {
 
//         info("");
//         $("#results").empty();
//         $("#all_results").show();
 
//         for (var i = 0; i < data.response.songs.length; i++) {
//             var song = data.response.songs[i];
//             var tid = song.tracks[0].foreign_id.replace('-WW', '');
//             var tembed = embed.replace('TRACK_URI', tid);
//             var li = $("<span>").html(tembed);
//             $("#results").append(li);
//         }
//     });
// }
 
 
// function newArtist() {
//     var artist = $("#artist").val();
//     fetchArtistPlaylist(artist, false, .2);
// }
 
//  // sets the content of the #info element/div.	
// function info(txt) {
//     $("#info").text(txt);
// }
 
 
// $(document).ready(function() {
//     $("#go").removeAttr("disabled");
//     $("#all_results").hide();
// });