<template>
    <v-container fluid class="fill-height">
        <golden-layout class="gl-container">
            <gl-row>
                <gl-component v-for="(item, i) in LaueItems" :key="`Laue-${i}`"
                    :title='`LaueChart-${i}`'
                    :closeable="false"
                    :reorderEnabled="false"
                >
                    <query-builder :cubejs-api="cubejsApi" :query="item.query">
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
                    <query-builder :cubejs-api="cubejsApi" :query="item.query">
                        <template v-slot="{}">
                            <highcharts :options="chartOptions" :updateArgs="updateArgs"/>
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
import { QueryBuilder } from "@cubejs-client/vue";

import cloneDeep from 'lodash.clonedeep'
// import debounce from 'lodash.debounce'
import LaueChart from "@/components/LaueChart";

import basicLine from '@/chartData/basicLine.js'

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

            // highcharts
            updateArgs: [true, true, {duration: 100}],
            chartOptions: basicLine,

            items: [],
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
        addNewItem(itemTemplate) {
            if (!itemTemplate) return;
            const item = cloneDeep(itemTemplate);
            this.items.push(item);
        },
    },
    created() {
    }
}
</script>