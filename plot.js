var chart = new Highcharts.Chart({

    chart: {
        renderTo: 'container', // where it goes in the HTML file
        animation: false, // if true, this puts an awkward lag on all chart interactions
        zoomType: 'x', // the axis in which users can drag and zoom
        alignTicks: false,
        type:'spline'
    },

    xAxis: {
        // a range()-like function, copied and modified from Stack Overflow (where 12 is the max tracklist number):
        categories: Array.apply(null, Array(12)).map(function (_, i) {return i+1;}), // makes [1,2,3,4,5,6,7,8,9,10,11,12]
        text: 'track number'
    },
    title: {
        text: 'playlist parameter values'
    },
    plotOptions: {
        series: {
            cursor: 'ns-resize', // "north-south resize", just changes what the cursor looks like when you can click (not funcitonality)
            point: {
                events: {
                    
                    drag: function(e) { 
                        // Returning false stops the drag and drops. Example:
                        /*
                        if (e.newY > 300) {
                            this.y = 300;
                            return false;
                        }
                        */
                        // sends data about the last-dragged point to the HTML 
                        // $('#drag').html(
                        //     'Dragging <b>' + this.series.name + '</b>, <b>' +
                        //     this.category + '</b> to <b>' + 
                        //     Highcharts.numberFormat(e.newY, 2) + '</b>'
                        // );
                    },
                    drop: function() {
                        // $('#drop').html(
                        //     'In <b>' + this.series.name + '</b>, <b>' +
                        //     this.category + '</b> was set to <b>' + 
                        //     Highcharts.numberFormat(this.y, 2) + '</b>'
                        // );
                    }
                }
            },
            stickyTracking: false
        },
        column: {
            stacking: null
        }
    },
    
    tooltip: {
        yDecimals: 2
    },


    yAxis: [{ // tempo yAxis
            labels: {
                format: '{value} BPM',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            tickInterval: 10, // I'm not sure why this doesn't seem to set the correct tick interval
            title: {
                text: 'tempo',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            // opposite: true
        }, { // danceability yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'danceability',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }, { // energy yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            title: {
                text: 'energy',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true
        }, { // loudness yAxis
            labels: {
                format: '{value} (dB)',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            },
            title: {
                text: 'loudness',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            },
            // opposite: true
        }, { // acousticness yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[4]
                }
            },
            title: {
                text: 'acousticness',
                // tickInterval: 0.2,
                style: {
                    color: Highcharts.getOptions().colors[4]
                }
            },
            opposite: true
        }],



    series: [{
        name: 'tempo',
        draggableY: true,
        dragMaxY: 300.0,
        dragMinY: 0.0,
        yAxis:0
        // type: 'column',
    }, {
        name: 'danceability',
        draggableY: true,
        dragMinY: 0.0,
        dragMaxY: 1.0,
        yAxis:1,
        type: 'column'
    }, {
        name: 'energy',
        draggableY: true,
        dragMinY: 0.0,
        dragMaxY: 1.0,
        yAxis:2,
        type: 'column'
    }, {
        name: 'loudness',
        draggableY: true,
        dragMinY: -100.0,
        dragMaxY:  100.0,
        yAxis:3
        // type: 'column'
    }, {
        name: 'acousticness',
        draggableY: true,
        dragMinY: 0.0,
        dragMaxY: 1.0,
        yAxis:4,
        type: 'column'
    }]

});
