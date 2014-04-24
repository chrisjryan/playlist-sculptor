// (I think) this prevents data from being returned as a long string, instead of a structured JSON object (see https://api.jquery.com/jQuery.param )
jQuery.ajaxSettings.traditional = true; 

var embed = '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:TRACKS" style="width:640px; height:520px;" frameborder="0" allowtransparency="true"></iframe>';

$(document).ready(function() {
    $("#go").removeAttr("disabled");
    $("#all_results").hide();
    fetchGenreList();

    initializeChart(12); // TODO: this track number must be hardwired to the 12 in the HTML, fix this
});