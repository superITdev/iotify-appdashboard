import products from './products'

export default {
    ...products,
    timeDimensions: [
        {
            ...products.timeDimensions[0],
            granularity: 'month',
        },
    ],
}