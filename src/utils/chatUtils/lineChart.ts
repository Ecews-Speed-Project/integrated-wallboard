export const buildLineChat = (
    title: any,
    categoriesData: any,
    seriesData: any,
    height: number
) => {
    return {
        chart: {
            type: 'spline',
            height: height
        },
        title: {
            text: title
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: categoriesData,
            accessibility: {
                description: 'Months of the year'
            }
        },
        yAxis: {
            title: {
                text: 'Number Of Patients'
            },
            labels: {
                format: '{value}°'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: seriesData
    }
}


export const seriesDataObj = (
    state: any,
    seriesData: any
) => {
    return {
        name: state,
        marker: {
            symbol: 'circle'
        },
        data: seriesData

    }
}