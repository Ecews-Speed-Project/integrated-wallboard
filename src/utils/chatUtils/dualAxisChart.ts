export const dualAxisChart = (
    title: any,
    state: any,
    seriesData: any
) => {
    const categories = [
        '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-40', '40-45',
        '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'
    ];
    
    return {
    chart: {
        zooming: {
            type: 'xy'
        },
        height : 600
    },
    title: {
        text: 'Karasjok weather, 2021',
        align: 'left'
    },
    subtitle: {
        text: 'Source: ' +
            '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
            'target="_blank">YR</a>',
        align: 'left'
    },
    xAxis: [{
        categories:categories,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
            style: {
              //  color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Temperature',
            style: {
              //  color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Precipitation',
            style: {
              //  color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} mm',
            style: {
               // color: Highcharts.getOptions().colors[0]
            }
        },
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
    series: [{
        name: 'Eligible',
        type: 'column',
        yAxis: 1,
        data: [
            27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0,
            60.0, 28.6, 32.1 ,    60.0, 28.6, 32.1
        ],
        tooltip: {
            valueSuffix: ' mm'
        }

    },{
        name: 'Result recieved',
        type: 'column',
        yAxis: 1,
        data: [
            27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0,
            60.0, 28.6, 32.1,    60.0, 28.6, 32.1
        ],
        tooltip: {
            valueSuffix: ' mm'
        }

    }, {
        name: 'Coverage',
        type: 'spline',
        data: [
            88, 89, 91, 95, 70,97, 91, 92, 94,
            93, 96, 95, 80, 91, 89
        ],
        tooltip: {
            valueSuffix: '°C'
        }
    }, {
        name: 'Supression',
        type: 'spline',
        data: [
            90, 95, 91, 92, 99,97, 91, 92, 94,
            93, 96, 95, 80, 92, 90
        ],
        tooltip: {
            valueSuffix: '°C'
        }
    }]
}
}