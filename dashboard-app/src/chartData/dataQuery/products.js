export default {
    measures: ['LineItems.quantity'],
    dimensions: ['ProductCategories.name'],
    timeDimensions: [
        {
            dimension: 'Orders.createdAt',
            dateRange: 'last year',
        },
    ],
    order: {
        'ProductCategories.name': 'asc',
    },
}