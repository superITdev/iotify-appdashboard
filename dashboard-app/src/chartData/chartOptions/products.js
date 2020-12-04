import * as moment from 'moment'

function toResult(resultSet) {
    let range = {};
    let categories = new Set();

    resultSet.tablePivot().forEach((item) => {
        categories.add(moment(item['Orders.createdAt.month']).format('MMMM'));

        if (!range[item['ProductCategories.name']]) {
            range[item['ProductCategories.name']] = {
                name: item['ProductCategories.name'],
                data: [],
            };
        }

        range[item['ProductCategories.name']].data.push(parseInt(item['LineItems.quantity']));
    });
    
    const result = {
        categories: Array.from(categories),
        series: Object.values(range),
    };
    return result;
}

function chartOptions(staticOptions, resultSet) {
    const result = toResult(resultSet);
    const options = {
        ...staticOptions,
        xAxis: {
            categories: result.categories,
        },
        series: result.series,
    }
    return options;
}

export default chartOptions;