const colors: string[] = ['#01575C', '#59BA89', '#9d9b03', '#08bf7A78020f'];

export const buildBarVLChat = (
    title: string, 
    y1_title: string, 
    xaxisCategory: string[], 
    x_title: string, 
    seriesData: any[]
) => {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: '',
            style: {
                fontSize: '12px'
            }
        },
        xAxis: [{
            categories: xaxisCategory,
            title: {
                text: x_title
            },
            type: 'category',
            crosshair: true
        }],
        yAxis: [{
            min: 0,
            title: { text: y1_title }
        }, { 
            labels: {
                format: '{value}%'
            },
            title: {
                text: "% coverage and % Suppression"
            },
            opposite: true,
            max: 100,
            min: 0
        }],
        tooltip: {
            pointFormat: '{point.y}'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        colors,
        series: seriesData,
        exporting: { enabled: false }
    };
}

export const buildThreeColumnBarChartWithDualAxis = (
    title: string, 
    y1_title: string, 
    y2_title: string, 
    xaxisCategory: string[], 
    parent_data: number[], 
    parent_data_name: string,
    child_data: number[], 
    child_data_name: string, 
    child_data2: number[], 
    child_data2_name: string, 
    percent_data: number[], 
    percent_data_name: string,
    percent_data2: number[], 
    percent_data_name2: string, 
    useLine: boolean, 
    xaxisTitle: string, 
    height: number
) => {
    const series: any[] = [];
    let hasThousand = false;

    if (parent_data.length > 0) {
        series.push({
            name: parent_data_name,
            type: 'column',
            data: parent_data
        });
        hasThousand = parent_data.some(x => Math.abs(x) >= 1000);
    }

    if (child_data.length > 0) {
        series.push({
            name: child_data_name,
            type: 'column',
            data: child_data
        });
    }

    if (child_data2.length > 0) {
        series.push({
            name: child_data2_name,
            type: 'column',
            data: child_data2
        });
    }

    const yAxis: any[] = [{
        title: {
            text: y1_title,
            rotation: 270
        },
        labels: {
             format: '{value}'
        },
        max: Math.max(...parent_data),
        min: 0
    }];

    if (percent_data.length > 0) {
        series.push({
            name: percent_data_name,
            type: 'scatter',
            color: "#E46C0A",
            data: percent_data,
            yAxis: 1,
            tooltip: {
                pointFormat: '<b>{point.y:.1f}%</b>'
            },
            marker: {
                radius: 5
            }
        });

        yAxis.push({
            labels: {
                format: '{value}%'
            },
            title: {
                text: y2_title
            },
            opposite: true,
            max: 100,
            min: 0
        });
    }

    if (percent_data2.length > 0) {
        series.push({
            name: percent_data_name2,
            type: 'scatter',
            data: percent_data2,
            color: "#7030A0",
            yAxis: 1,
            tooltip: {
                pointFormat: '<b>{point.y:.1f}%</b>'
            },
            marker: {
                radius: 10
            }
        });
    }

    return {
        chart: {
            zoomType: 'xy',
            height
        },
        title: {
            text: null,
            style: {
                fontSize: '12px'
            }
        },
        xAxis: [{
            categories: xaxisCategory,
            crosshair: true,
            title: {
                text: xaxisTitle
            }
        }],
        yAxis,
        tooltip: {
            shared: true
        },
        colors,
        legend: {
            enabled: true
        },
        exporting: { enabled: false },
        series
    };
}

export const buildTwoColumnBarChartWithDualAxis = (
    title: string, 
    y1_title: string, 
    y2_title: string, 
    xaxisCategory: string[], 
    parent_data: number[], 
    parent_data_name: string,
    child_data: number[], 
    child_data_name: string, 
    percent_data: number[], 
    percent_data_name: string,
    percent_data2: number[], 
    percent_data_name2: string, 
    useLine: boolean, 
    xaxisTitle: string, 
    height: number
) => {
    const series: any[] = [];
    let hasThousand = false;

    if (parent_data.length > 0) {
        series.push({
            name: parent_data_name,
            type: 'column',
            data: parent_data
        });
        hasThousand = parent_data.some(x => Math.abs(x) >= 1000);
    }

    if (child_data.length > 0) {
        series.push({
            name: child_data_name,
            type: 'column',
            data: child_data
        });
    }

    const yAxis: any[] = [{
        title: {
            text: y1_title,
            rotation: 270
        },
        labels: {
            format: '{value}'
        },
        max: Math.max(...parent_data),
        min: 0
    }];

    if (percent_data.length > 0) {
        series.push({
            name: percent_data_name,
            type: 'scatter',
            color: "#E46C0A",
            data: percent_data,
            yAxis: 1,
            tooltip: {
                pointFormat: '<b>{point.y:.1f}%</b>'
            },
            marker: {
                radius: 5
            }
        });

        yAxis.push({
            labels: {
                format: '{value}%'
            },
            title: {
                text: y2_title
            },
            opposite: true,
            max: 100,
            min: 0
        });
    }

    if (percent_data2.length > 0) {
        series.push({
            name: percent_data_name2,
            type: 'scatter',
            data: percent_data2,
            color: "#7030A0",
            yAxis: 1,
            tooltip: {
                pointFormat: '<b>{point.y:.1f}%</b>'
            },
            marker: {
                radius: 10
            }
        });
    }

    return {
        chart: {
            zoomType: 'xy',
            height
        },
        title: {
            text: null,
            style: {
                fontSize: '12px'
            }
        },
        xAxis: [{
            categories: xaxisCategory,
            crosshair: true,
            title: {
                text: xaxisTitle
            }
        }],
        yAxis,
        tooltip: {
            shared: true
        },
        colors,
        legend: {
            enabled: true
        },
        exporting: { enabled: false },
        series
    };
}
