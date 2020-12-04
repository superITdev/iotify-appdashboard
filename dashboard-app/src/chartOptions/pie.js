const staticOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        styledMode: false,
        spacingRight: 20,
        spacingLeft: 20,
        spacingBottom: 20,
    },
    credits: {
        enabled: false,
    },
    title: {
        text: 'Top Categories<small>Highcharts API, Pie Chart</small>',
        useHTML: true,
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
        point: {
            valueSuffix: '',
        },
    },
    plotOptions: {
        pie: {
            shadow: false,
            center: ['50%', '50%'],
            colors: [
                '#45446F',
                '#BE3D7F',
                '#FF6492',
                '#FF93A8',
                '#FFC3BA',
                '#FFEAE4',
                '#DFD7FF',
                '#B5ACFF',
                '#7A77FF',
                '#5251C9',
            ],
        },
    },
    series: [
        {
            name: 'Orders amount',
            colorByPoint: true,
            size: '80%',
            innerSize: '50%',
        },
    ],
};

function toResult(resultSet) {
    let result = [];
    if (resultSet) {
        resultSet.tablePivot().forEach((item) => {
            result.push({
                name: item['ProductCategories.name'],
                y: parseInt(item['LineItems.quantity']),
            });
        });
    }
    if (!result.length) result = [{ name: '', y: 1180 }];
    return result;
}

function chartOptions(resultSet) {
    const result = toResult(resultSet);
    const options = {
        ...staticOptions,
        series: [
            {
                ...staticOptions.series[0],
                data: result,
            },
        ],
    }
    return options;
}

export default chartOptions;