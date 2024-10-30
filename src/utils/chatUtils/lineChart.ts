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
                color: '#8c8f2b',
                marker: {
                    enabled: true, // Ensure markers (dots) are shown
                    radius:10, // Increase dot size (default is usually 4)
                    lineColor: null, // Remove marker line around dots
                    lineWidth:5

                }, dataLabels: {
                    enabled: true, // Enable labels on the markers
                    formatter: function (this: Highcharts.Point): string {
                        return `${this.y}`; // Use `this.y` to access the y-value of the point
                    },
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#000' // Customize the label color
                    },
                    align: 'right', // Align the label relative to the marker
                    verticalAlign: 'bottom', // Position the label below the marker
                    inside: false // Make sure the label is outside the marker
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