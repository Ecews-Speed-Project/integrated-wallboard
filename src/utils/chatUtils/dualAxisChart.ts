
function calculateRatio(array1:any, array2:any) {
    let ratioArray = [];

    for (let i = 0; i < array1.length; i++) {
        // Avoid division by zero
        if (array1[i] === 0) {
            ratioArray.push(2);
        } else {
            let ratio = Math.round((array2[i] / array1[i]) *100);
            ratio = Math.min(ratio, 100);
            ratioArray.push(ratio);
        }
    }

    return ratioArray;
}


export const dualAxisChart = (
    title: any,
    state: any,
    seriesData: any,
    categories:any,
    series:any
) => {
 
    return {
    chart: {
        zooming: {
            type: 'xy'
        },
        height : 600
    },
    title: {
        text: title,
        align: 'center'
    },
    subtitle: {
        text: '' ,
        align: 'left'
    },
    xAxis: [{
        categories:categories,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}',
            style: {
              //  color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: ' Patients',
            style: {
              //  color: Highcharts.getOptions().colors[1]
            }
        }
        
    }, { // Secondary yAxis
        title: {
            text: 'Percentage',
            style: {
              //  color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}%',
            style: {
               // color: Highcharts.getOptions().colors[0]
            }
        },
        max: 100, 
        tickInterval: 10, // Set tick interval to 10%
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 60,
        floating: true,
        backgroundColor:
          //  Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    plotOptions: {
        column: {
            pointWidth: 60, // Set fixed column width
            pointPadding: 0.1 // Adjust spacing between columns
        },
        spline: {
            marker: {
                enabled: true, // Ensure markers (dots) are shown
                radius: 8, // Increase dot size (default is usually 4)
                lineColor: null // Remove marker line around dots

            },dataLabels: {
                enabled: true, // Enable labels on the markers
                formatter: function (this: Highcharts.Point): string {
                    return `${this.y}%`; // Use `this.y` to access the y-value of the point
                  },
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#000' // Customize the label color
                },
                align: 'right', // Align the label relative to the marker
                verticalAlign: 'bottom', // Position the label below the marker
                inside: false // Make sure the label is outside the marker
            }
        }
    },
    series: [{
        name: 'Eligible',
        type: 'column',
        yAxis: 0,
        data: series.eligible,
        color: {
            pattern: {
                path: 'M 0 0 L 10 10 M 9 - 1 L 11 1 M - 1 9 L 1 11',
                width: 10,
                height: 10
            }
        },
        keys: ['y', 'color.pattern.color'],
        tooltip: {
            valueSuffix: 'patients'
        }

    },{
        name: 'Result recieved',
        type: 'column',
        yAxis: 0,
        color: '#159B65',
        data: series.resultRecieved,
        tooltip: {
            valueSuffix: ' Patients'
        }

    }, {
        name: 'Coverage',
        type: 'spline',
        data: calculateRatio(series.eligible, series.resultRecieved) ,
        color: '#FFC30B', // Set color of the spline to red
        lineWidth:0,
        yAxis: 1,
        tooltip: {
            valueSuffix: '%'
        }
    }, {
        name: 'Suppression',
        type: 'spline',
        data: calculateRatio(series.resultRecieved, series.suppression),
        color: '#C00000', // Set color of the spline to red
        lineWidth:0,
        yAxis: 1,
        tooltip: {
            valueSuffix: '%'
        }
    }]
}
}