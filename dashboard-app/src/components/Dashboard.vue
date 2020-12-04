<template>
    <v-container fluid class="fill-height">
        <golden-layout class="gl-container">
            <gl-row>
                <gl-component v-for="(item, i) in LaueItems" :key="`Laue-${i}`"
                    :title='`LaueChart-${i}`'
                    :closeable="false"
                    :reorderEnabled="false"
                >
                    <query-builder :cubejsApi="cubejsApi" :query="item.query">
                        <template v-slot="{ loading, resultSet }">
                            <LaueChart
                                :type="item.chartType"
                                :loading="loading"
                                :result-set="resultSet"
                            />
                        </template>
                    </query-builder>
                </gl-component>

                <gl-component v-for="(item, i) in items" :key="i"
                    :title='`highcharts-${i}`'
                    @destroy="onRemoveItem(item)"
                >
                    <query-builder :cubejsApi="cubejsApi" :query="dataQuery[item.queryType]">
                        <template v-slot="{ loading, resultSet }">
                            <v-card>
                                <v-card-text>
                                    <div v-if="loading" class="d-flex justify-content-center text-dark">
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    <highcharts
                                        v-if="!loading && resultSet != null"
                                        :options="chartOptions[item.chartType](resultSet)"
                                        :updateArgs="updateArgs"
                                    />
                                </v-card-text>
                            </v-card>
                        </template>
                    </query-builder>
                </gl-component>
            </gl-row>
        </golden-layout>
    </v-container>
</template>

<style>
.gl-container { /* golden-layout container */
    width: 100%;
    height: 100%;
}
</style>

<script>
import { QueryBuilder } from "@cubejs-client/vue"
import dataQuery from '@/chartData/dataQuery'
import chartOptions from '@/chartData/chartOptions'

import LaueChart from "@/components/LaueChart"

export default {
    props: [
        "cubejsApi",
        "addNewItem",
    ],
    components: {
        LaueChart,
        QueryBuilder,
    },
    data() {
        return {
            dataQuery,
            items: [],
            
            // highcharts
            chartOptions,
            updateArgs: [true, true, {duration: 100}],

            // laue chart
            LaueItems: [
                {
                    chartType: 'line',
                    query: { // sql for dataset
                        measures: ["Users.count"],
                        timeDimensions: [
                            {
                                dimension: "Users.createdAt",
                                dateRange: ["2019-01-01", "2020-12-31"],
                                granularity: "month"
                            }
                        ]
                    },
                },
                {
                    chartType: 'stackedBar',
                    query: { // sql for dataset
                        measures: ["Orders.count"],
                        dimensions: ["Orders.status"],
                        timeDimensions: [
                            {
                                dimension: "Orders.createdAt",
                                dateRange: ["2019-01-01", "2020-12-31"],
                                granularity: "month"
                            }
                        ]
                    }
                }
            ],
        }
    },
    methods: {
        onRemoveItem(item) {
            const idx = this.items.indexOf(item);
            if (0<=idx) this.items.splice(idx, 1);
            else console.assert(false, 'Closed dynamic component is in the array');
        }
    },
    watch: {
        addNewItem(item) {
            if (!item) return;
            this.items.push(item);
        },
    },
    created() {
    }
}
</script>