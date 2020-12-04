import Highcharts from 'highcharts'
import productsOptions from './products'

const staticOptions = {
    chart: {
        type: 'column',
        styledMode: false,
        spacingRight: 25,
        spacingLeft: 20,
    },
    credits: {
        enabled: false,
    },
    title: {
        text: 'Categories sales<small>Highcharts API, Stacked column Chart</small>',
        useHTML: true,
    },
    yAxis: {
        title: {
            enabled: false,
        },
        gridLineColor: '#D0D0DA30',
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'normal',
                color: (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray',
            },
        },
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
    legend: {
        align: 'center',
        width: '90%',
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
        column: {
            stacking: 'normal',
        },
    },
};
  
function chartOptions(resultSet) {
    return productsOptions(staticOptions, resultSet);
}

export default chartOptions;