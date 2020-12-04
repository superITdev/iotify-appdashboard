const itemTemplates = [
    {
        queryType: 'products',
        chartType: 'productsPie',
        name: 'pie for products',
    },
    {
        type: 'ordersGauge',
        name: 'gauge for orders',
    },
    {
        queryType: 'productsTimeMonth',
        chartType: 'productsStack',
        name: 'stack for products',
    },
    {
        queryType: 'productsTimeMonth',
        chartType: 'productsArea',
        name: 'area for products',
    },
]

function init() {
    itemTemplates.forEach(item => {
        if (item.type) {
            item.queryType = item.type;
            item.chartType = item.type;
        }
    });
}
init();

export default itemTemplates
