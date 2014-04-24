## Playlist sculptor

This web app will allow users to create playlists of songs by graphically sculpting how their parameters change over time. This is possible using the [Echo Nest API](http://developer.echonest.com), which allows access to quantitative musical data for tens of millions of songs. Using this database, Echo Nest provides methods for song suggestions that are constrained by numerous user-specified parameters like tempo, key, danceability, etc. Users will be able to click and drag lines on plots that describe how parameters used to suggest songs should change over time. For example, this could be used to create a 2 hour playlist in which tempo and danceability increase for 90 minutes followed by a 30 minute dropoff. A primary goal of this project has been to learn about Javascript, asyncronicity, HTML/CSS, data visualization and interactivity, web app frameworks, and other aspects of web programming.

Features:

* Creates [Spotify](https://www.spotify.com) playlists with song selections constrained by:
  - 4 genres
  - values for tempo, danceability, energy, loudness, and acousticness for each song
* Specification of different parameter sets per song is done graphically using the Highcharts JS charting framework.


To do:

* Test more thoroughly
* Refactor/clean up the code
* Find good parameter ranges for users to select from. At this point, API calls sometimes return 0 songs given a parameter set, and the method later throws an exception and prevents playlist building.
* Add more features to constrain song selections (loudness, liveliness, speechiness, etc).
* deploy on the web (via, e.g., Heroku).

<p align="center">
  <img src="https://raw.githubusercontent.com/christopherjamesryan/Playlist-Sculptor/master/example_imge.png"  width=500/>
</p>