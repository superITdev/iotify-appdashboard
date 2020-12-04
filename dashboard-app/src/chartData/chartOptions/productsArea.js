import productsOptions from './products'

const staticOptions = {
    chart: {
        type: 'area',
        styledMode: false,
        spacingRight: 25,
        spacingLeft: 20,
    },
    credits: {
        enabled: false,
    },
    title: {
        text: 'Sales by category<small>Highcharts API, Area Chart</small>',
        useHTML: true,
    },

    yAxis: {
        title: {
            enabled: false,
        },
        gridLineColor: '#D0D0DA30',
    },

    legend: {
        align: 'center',
        width: '90%',
    },

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
    plotOptions: {
        area: {
            stacking: 'normal',
            lineWidth: 1,
            marker: {
                enabled: false,
            },
        },
        series: {
            label: {
                connectorAllowed: false,
            },
            connectNulls: true,
        },
    },
    responsive: {
        rules: [
            {
                condition: {
                    maxWidth: 500,
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                    },
                },
            },
        ],
    },
};

function chartOptions(resultSet) {
    return productsOptions(staticOptions, resultSet);
}

export default chartOptions;