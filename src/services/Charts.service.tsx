export const stateMaps = (map: any, data: any, title: any, height: any = 700) => {
    return {

        chart: {
            map: map,
            height: height
        },

        title: {
            text: title
        },

        exporting: {
            sourceWidth: 600,
            sourceHeight: 500
        },

        legend: {
            layout: 'horizontal',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: true,
            verticalAlign: 'top',
            y: 25
        },


        mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true
        },

        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#C40306'],
                [0.67, '#E8B51E'],
                [1, '#0D8651']
            ]
        },

        series: [{
            accessibility: {
                point: {
                    valueDescriptionFormat: '{xDescription}, {point.value} ' +
                        'people per square kilometer.'
                }
            },
            animation: {
                duration: 1000
            },
            data: data,
            joinBy: ['admin2Name', 'code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.code} <br> {point.value}'
            },
            name: 'Population density',
            nullColor: '#BEB7B7',
            tooltip: {
                pointFormat: '{point.code}: {point.value}/km²'
            }
        }]
    };
}


export const dualColumn = (title: any) => {
    return {
        title: {
            text: 'Sales of petroleum products March, Norway',
            align: 'left'
        },
        xAxis: {
            categories: [
                'Jet fuel', 'Duty-free diesel', 'Petrol', 'Diesel', 'Gas oil'
            ]
        },
        yAxis: {
            title: {
                text: 'Million liters'
            }
        },
        tooltip: {
            valueSuffix: ' million liters'
        },
        plotOptions: {
            series: {
                borderRadius: '25%'
            }
        },
        series: [{
            type: 'column',
            name: '2020',
            data: [59, 83, 65, 228, 184]
        }, {
            type: 'column',
            name: '2021',
            data: [24, 79, 72, 240, 167]
        }, {
            type: 'column',
            name: '2022',
            data: [58, 88, 75, 250, 176]
        }, {
            type: 'line',
            step: 'center',
            name: 'Average',
            data: [47, 83.33, 70.66, 239.33, 175.66],
            marker: {
                lineWidth: 2,
                // lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total',
            data: [{
                name: '2020',
                y: 619,
                // color: Highcharts.getOptions().colors[0], // 2020 color
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    format: '{point.total} M',
                    style: {
                        fontSize: '15px'
                    }
                }
            }, {
                name: '2021',
                y: 586,
                // color: Highcharts.getOptions().colors[1] // 2021 color
            }, {
                name: '2022',
                y: 647,
                //  color: Highcharts.getOptions().colors[2] // 2022 color
            }],
            center: [75, 65],
            size: 100,
            innerSize: '70%',
            showInLegend: true,
            dataLabels: {
                enabled: true
            }
        }]
    }
}


export const columnChart = (title: any, categories: any, data: any) => {
    return {
        title: {
            text: title,
            align: 'left'
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: 'Total Number of Clients'
            }
        },
        tooltip: {
            valueSuffix: 'Total Number of Clients'
        },
        plotOptions: {
            series: {
                borderRadius: '5%'
            }
        },
        series: [{
            type: 'column',
            name: null,
            data: data
        }]
    }
}


export const getData = (state: any) => {
    if (state == "Delta") {
        return {
            "tx_cur_states": [
                {
                    "stateId": 1,
                    "stateName": "Delta",
                    "txcurr": 5302,
                    "uniqueFingerprints": 5241
                }

            ],
            "tx_curr_lga": [
                {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }
            ],
            "stats": {
                "facilities": 92,
                "tx_curr": 54000,
                "saturation": 80
            }
        }
    } else if (state = "Osun") {
        return {
            "tx_cur_states": [
                {
                    "stateId": 1,
                    "stateName": "Osun",
                    "txcurr": 5302,
                    "uniqueFingerprints": 5241
                }

            ],
            "tx_curr_lga": [
                {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }
            ],
            "stats": {
                "facilities": 21,
                "tx_curr": 24404,
                "saturation": 70
            }
        }

    } else {
        return {
            "tx_cur_states": [
                {
                    "stateId": 1,
                    "stateName": "Ekiti",
                    "txcurr": 5302,
                    "uniqueFingerprints": 5241
                }

            ],
            "tx_curr_lga": [
                {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }
            ],
            "stats": {
                "facilities": 11,
                "tx_curr": 11222,
                "saturation": 90
            }
        }

    }
}