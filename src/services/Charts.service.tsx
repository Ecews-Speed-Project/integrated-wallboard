
interface mapData {
    value: number;
    code: String;
}

interface StateData {
    stateId: number;
    stateName: string;
    txcurr: number;
    uniqueFingerprints: number;
}

interface StatVleData {
    stateId: number;
    stateName: string;
    vlEligible: number;
    vLenteredEMR: number;
    vlSuppressed: number
}

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
            //  enableDoubleClickZoomTo: true
        },

        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#C40306'],
                [0.94, '#E8B51E'],
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
                pointFormat: '{point.code}: {point.value}%'
            }
        }]
    };
}


export const mapChat = (map: any, data: any, title: any, height: any = 700 , isShow=false) => {
    return {
        chart: {
            zooming: {
                type: 'xy'
            }
        },
        title: {
            text: `Trend analysis of ${title} for he past 6 months`,
            align: 'left'
        },
        subtitle: {
            text: '',
            align: 'left'
        },
        xAxis: [{
            categories: [
                'May', 'June', 'July', 'August', 'September', 'October'
            ],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    //   color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Patients',
                style: {
                    //  color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Confirmed cases',
                style: {
                    // color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    //  color: Highcharts.getOptions().colors[0]
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
            //  backgroundColor:
            // Highcharts.defaultOptions.legend.backgroundColor || // theme
            //  'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Total Suspected Cases',
            type: 'column',
            color: '#888f68',
            yAxis: 1,
            data: [
                27.6, 28.8, 21.7, 34.1, 29.0, 28.4
            ],
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Total Confrimed Cases',
            color: '#454e12',
            lineWidth: 3,
            marker: {
                radius: 10, // Adjust the size of the data points here
                lineColor: 'red', // Set the outline color here
                lineWidth: 2 //
            },
            type: 'spline',
            data: (isShow) ?  [
                13.0, 14.5, 10.8, 5.8, 5.8, 5.8,
            ] : [],
            tooltip: {
                valueSuffix: '°C'
            }
        }]
    };
}

// Get Nigeria Map
//https://jsfiddle.net/gh/get/library/pure/highslide-software/highcharts.com/tree/master/samples/mapdata/countries/ng/ng-all


export const hivStateMap = (map: any, data: any, title: any, height: any = 700) => {
    return {
        chart: {
            map: map,
            height: height
        },

        title: {
            text: title
        },

        subtitle: {
            text: ''
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#C40306'],
                [0.94, '#E8B51E'],
                [1, '#0D8651']
            ]
        },

        series: [{
            data: data,
            name: 'Patients',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.name} <br> {point.value} %'
            }
        }]
    };
}
export const hivMap = (map: any, data: any, title: any, height: any = 700) => {
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
            //  enableDoubleClickZoomTo: true
        },

        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#C40306'],
                [0.94, '#E8B51E'],
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
            name: '%Population of clients',
            nullColor: '#BEB7B7',
            tooltip: {
                pointFormat: '{point.code}: {point.value}%'
            }
        }]
    };
}

export const somasMap = (map: any, data: any, title: any, height: any = 700) => {
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
            //  enableDoubleClickZoomTo: true
        },

        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#cfae4a'],
                [0.94, '#C40306'],
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
            name: '%Population of clients',
            nullColor: '#BEB7B7',
            tooltip: {
                pointFormat: '{point.code}: {point.value}%'
            }
        }]
    };
}



export const dualColumn = (title: any, height: any = 300) => {
    return {
        chart: {
            height: height
        },
        title: {
            text: title,
            align: 'center'
        },

        xAxis: {
            categories: [
                'Art Attendance', 'Screen for HTN', 'Elevated PB', 'Previously Known HNT on Rx', 'Elevated BP_New',
                'Diagnose HTN', 'Started Treatment'
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
                borderRadius: '5%'
            }
        },
        series: [{
            type: 'column',
            name: '2020',
            data: [59, 83, 65, 228, 184, 228, 184]
        }]
    }
}

export const getMap = async (state: any) => {
    const file = (state) ? '../../demo-data/' + state + '.json' : '../../demo-data/ng-all.topo.json'
    let response = await fetch(file); // Fetch the JSON file
    return await response.json(); // Parse JSON
}

export const getMapData = async (state: any) => {
    let data = getData(state, null)
    const mapData: mapData[] = []
    data.tx_curr_lga.forEach(function (p: any) {
        mapData.push(
            {
                "value": p.txcurr,
                "code": p.lgaName
            },
        )
        p.code = p.code;
    });
    return mapData;
}

export const getNigeriaMapData = async (mapdata: any) => {
    const stateCodes: { [key: string]: string } = {
        "Delta": "ng-de",
        "Osun": "ng-os",
        "Ekiti": "ng-ek",
        // Add more mappings if needed
    };
    const data = mapdata.map((state: StateData) => {
        const stateCode = stateCodes[state.stateName];  // Map stateName to its code
        return [stateCode, Math.round((state.uniqueFingerprints / state.txcurr) * 100)];
    });
    /*    const data = [
           ['ng-ri', 10], ['ng-kt', 11], ['ng-so', 12], ['ng-za', 13],
           ['ng-yo', 14], ['ng-ke', 15], ['ng-ad', 16], ['ng-bo', 17],
           ['ng-ak', 18], ['ng-ab', 19], ['ng-im', 20], ['ng-by', 21],
           ['ng-be', 22], ['ng-cr', 23], ['ng-ta', 24], ['ng-kw', 25],
           ['ng-la', 26], ['ng-ni', 27], ['ng-fc', 28], ['ng-og', 29],
           ['ng-on', 30], ['ng-ek', 31], ['ng-os', 32], ['ng-oy', 33],
           ['ng-an', 34], ['ng-ba', 35], ['ng-go', 36], ['ng-de', 37],
           ['ng-ed', 38], ['ng-en', 39], ['ng-eb', 40], ['ng-kd', 41],
           ['ng-ko', 42], ['ng-pl', 43], ['ng-na', 44], ['ng-ji', 45],
           ['ng-kn', 46]
       ]; */
    return data
}
export const getNigeriaMapForCoverageData = async (mapdata: any) => {
    const stateCodes: { [key: string]: string } = {
        "Delta": "ng-de",
        "Osun": "ng-os",
        "Ekiti": "ng-ek",
        // Add more mappings if needed
    };
    const data = mapdata.map((state: StatVleData) => {
        const stateCode = stateCodes[state.stateName];  // Map stateName to its code
        return [stateCode, Math.round((state.vLenteredEMR / state.vlEligible) * 100)];
    });
    /*    const data = [
           ['ng-ri', 10], ['ng-kt', 11], ['ng-so', 12], ['ng-za', 13],
           ['ng-yo', 14], ['ng-ke', 15], ['ng-ad', 16], ['ng-bo', 17],
           ['ng-ak', 18], ['ng-ab', 19], ['ng-im', 20], ['ng-by', 21],
           ['ng-be', 22], ['ng-cr', 23], ['ng-ta', 24], ['ng-kw', 25],
           ['ng-la', 26], ['ng-ni', 27], ['ng-fc', 28], ['ng-og', 29],
           ['ng-on', 30], ['ng-ek', 31], ['ng-os', 32], ['ng-oy', 33],
           ['ng-an', 34], ['ng-ba', 35], ['ng-go', 36], ['ng-de', 37],
           ['ng-ed', 38], ['ng-en', 39], ['ng-eb', 40], ['ng-kd', 41],
           ['ng-ko', 42], ['ng-pl', 43], ['ng-na', 44], ['ng-ji', 45],
           ['ng-kn', 46]
       ]; */
    return data
}

export const getNigeriaMapForSupressionData = async (mapdata: any) => {
    const stateCodes: { [key: string]: string } = {
        "Delta": "ng-de",
        "Osun": "ng-os",
        "Ekiti": "ng-ek",
        // Add more mappings if needed
    };
    const data = mapdata.map((state: StatVleData) => {
        const stateCode = stateCodes[state.stateName];  // Map stateName to its code
        return [stateCode, Math.round((state.vlSuppressed / state.vLenteredEMR) * 100)];
    });
    /*    const data = [
           ['ng-ri', 10], ['ng-kt', 11], ['ng-so', 12], ['ng-za', 13],
           ['ng-yo', 14], ['ng-ke', 15], ['ng-ad', 16], ['ng-bo', 17],
           ['ng-ak', 18], ['ng-ab', 19], ['ng-im', 20], ['ng-by', 21],
           ['ng-be', 22], ['ng-cr', 23], ['ng-ta', 24], ['ng-kw', 25],
           ['ng-la', 26], ['ng-ni', 27], ['ng-fc', 28], ['ng-og', 29],
           ['ng-on', 30], ['ng-ek', 31], ['ng-os', 32], ['ng-oy', 33],
           ['ng-an', 34], ['ng-ba', 35], ['ng-go', 36], ['ng-de', 37],
           ['ng-ed', 38], ['ng-en', 39], ['ng-eb', 40], ['ng-kd', 41],
           ['ng-ko', 42], ['ng-pl', 43], ['ng-na', 44], ['ng-ji', 45],
           ['ng-kn', 46]
       ]; */
    return data
}


export const getNigeriaMapForSomasData = async (stateData: any) => {
    // Mapping of Nigerian states to their respective codes
    const stateMapping: { [key: string]: string } = {
        Osun: 'ng-os',
        Delta: 'ng-de',
        Ekiti: 'ng-ek',
    };

    // Existing array
    const data = [
        ['ng-ek', null], ['ng-os', null], ['ng-de', null]
    ];

    // Update the array with values from stateData
    data.forEach(item => {
        const stateCode = item[0];
        for (let state in stateData) {
            if (stateMapping[state] === stateCode) {
                if(stateData[state] !== 0){
                    item[1] = stateData[state]; // Update the value
                }
            }
        }
    });
    return data
}

export const getLiveMapData = async (mapdata: any) => {
    const mapData: mapData[] = []
    mapdata.forEach(function (p: any) {
        mapData.push(
            {
                "value": Math.round((p.uniqueFingerprints / p.txcurr) * 100),
                "code": p.lgaName
            },
        )
        p.code = p.code;
    });
    return mapData;
}


export const getSomaLiveMapData = async (mapdata: any) => {
    const mapData: mapData[] = []
    mapdata.forEach(function (p: any) {
        if (p.value !== 0) {
            mapData.push(
                {
                    "value": p.value,
                    "code": p.lgaName
                },
            )
            p.code = p.code;
        }
    });
    return mapData;
}


export const getSomaLiveMapForSummaryPageData = async (mapdata: any) => {
    console.log(mapdata)
    const mapData: mapData[] = []
    mapdata.forEach(function (p: any) {
        mapData.push(
            {
                "value": (p.value === undefined || 0) ? 1 : 1,
                "code": (p.lgaName === undefined) ? null : p.lgaName
            },
        )
        p.code = (p.lgaName === undefined) ? null : p.code;
    });
    return mapData;
}


export const getSuppressionData = async (mapdata: any) => {
    console.log(mapdata)
    const mapData: mapData[] = []
    mapdata.forEach(function (p: any) {
        mapData.push(
            {
                "value": Math.round((p.vlSuppressed / p.vLenteredEMR) * 100),
                "code": p.lgaName
            },
        )
        p.code = p.code;
    });
    return mapData;
}

export const getCoverageData = async (mapdata: any) => {
    console.log(mapdata)
    const mapData: mapData[] = []
    mapdata.forEach(function (p: any) {
        mapData.push(
            {
                "value": Math.round((p.vLenteredEMR / p.vlEligible) * 100),
                "code": p.lgaName
            },
        )
        p.code = p.code;
    });
    return mapData;
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


export const getData = (state: any, lga: any) => {
    if (state === "Delta") {
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
                    "lgaName": 'Oshimili North',
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }, {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "lgaName": 'Oshimili South',
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }, {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "lgaName": 'Bomadi',
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }, {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "lgaName": 'Okpe',
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
    } else if (state === "Osun") {
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
                    "lgaName": 'Boluwaduro',
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }, {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "lgaName": 'Obokun',
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }, {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "lgaName": 'Osogbo',
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }, {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "lgaName": 'Boripe',
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
                    "lgaName": 'Irepodun Ifelodun',
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }, {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "lgaName": 'Ilejemeji',
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }, {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "lgaName": 'Ekiti East',
                    "reportingWeek": 29,
                    "txcurr": 2110,
                    "uniqueFingerprints": 2074,
                    "reportDate": "2024-07-20T00:00:00"
                }, {
                    "id": 1,
                    "stateId": 1,
                    "lgaId": 3,
                    "lgaName": 'Ise\/Orun',
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


export const ageAndSexChart = (title: any) => {
    const categories = [
        '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-40', '40-45',
        '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84',
        '80+'
    ];
    return {
        chart: {
            type: 'bar',
            height: 700

        },
        title: {
            text: title,
            align: 'center'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
            }
        },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            },
            accessibility: {
                description: 'Age (male)'
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            },
            accessibility: {
                description: 'Age (female)'
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                format: '{value}%'
            },
            accessibility: {
                description: 'Percentage population',
                // rangeDescription: 'Range: 0 to 5%'
            }
        },

        plotOptions: {
            series: {
                stacking: 'normal',
                borderRadius: '20%'
            }
        },

        tooltip: {
            format: '<b>{series.name}, age {point.category}</b><br/>' +
                'Population: {(abs point.y):.2f}%'
        },

        series: [{
            name: 'Male',
            pointWidth: 25,
            style: {
                fontSize: 14,
                textOutline: 0
            },
            data: [
                -1.38, -2.09, -2.45, -2.71, -2.97,
                -3.69, -4.04, -3.81, -4.19, -4.61,
                -4.56, -4.21, -3.53, -2.55, -1.82,
                -1.46, -0.78, -0.71
            ]
        }, {
            name: 'Female',
            pointWidth: 25,
            style: {
                fontSize: 14,
                textOutline: 0,
                color: '#000'
            },
            data: [
                1.35, 1.98, 2.43, 2.39, 2.71,
                3.02, 3.50, 3.52, 4.03, 4.40,
                4.17, 3.88, 3.29, 2.42, 1.80,
                1.39, 0.99, 1.15
            ]
        }]

    }
}