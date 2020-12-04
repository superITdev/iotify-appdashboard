export default {
    measures: ['Orders.count'],
    dimensions: ['Orders.status'],
    timeDimensions: [
        {
            dimension: 'Orders.createdAt',
            dateRange: 'last year',
        },
    ],
    order: {
        'Orders.createdAt': 'asc',
    },
}