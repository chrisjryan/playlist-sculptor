## Playlist sculptor

This web app will ultimately allow users to create playlists of songs by graphically sculpting how their parameters change over time. This is possible using the [Echo Nest API](http://developer.echonest.com), which allows access to quantitative musical data for tens of millions of songs. Using this database, Echo Nest provides methods for song suggestions that are constrained by numerous user-specified parameters like tempo, key, danceability, etc. Users will ultimately be able to click and drag lines on plots that describe how parameters used to suggest songs should change over time. For example, this could be used to create a 2 hour playlist in which tempo and danceability increase for 90 minutes followed by a 30 minute dropoff. A primary goal of this project has been to learn about Javascript, asyncronicity, HTML/CSS, data visualization and interactivity, web app frameworks, and other aspects of web programming.

Features:

* Creates [Spotify](https://www.spotify.com) playlists with song selections constrained by:
  - 4 genres
  - min and max values for tempo, danceability, energy, loudness, and acousticness

To do:

* Allow for specification of different parameter sets per song (as opposed to 1 set for the whole batch).
* Create interactive plots using, e.g., Highcharts.js or D3.js for user specified parameter selections.
* Add more features to constrain song selections (loudness, liveliness, speechiness, etc).