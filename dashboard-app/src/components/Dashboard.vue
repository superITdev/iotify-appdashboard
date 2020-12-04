<template>
    <v-container fluid class="fill-height">
        <golden-layout class="gl-container"
            :showPopoutIcon="false"
        >
            <gl-row>
                <gl-component v-for="(item, i) in items" :key="i"
                    :title='item.name'
                    @destroy="onRemoveItem(item)"
                    @resize="onResize(`chart-ref-${i}`)"
                >
                    <query-builder class="fill-height" :cubejsApi="cubejsApi" :query="dataQuery[item.queryType]">
                        <template v-slot="{ loading, resultSet }">
                            <v-card class="fill-height">
                                <div v-if="loading" class="fill-height d-flex justify-content-center align-center text-dark">
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <highcharts
                                    class="fill-height"
                                    :ref="`chart-ref-${i}`"
                                    v-if="!loading && resultSet != null"
                                    :options="chartOptions[item.chartType](resultSet)"
                                    :updateArgs="updateArgs"
                                />
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

export default {
    props: [
        "cubejsApi",
        "addNewItem",
    ],
    components: {
        QueryBuilder,
    },
    data() {
        return {
            dataQuery,
            items: [],
            
            // highcharts
            chartOptions,
            updateArgs: [true, true, {duration: 100}],
        }
    },
    methods: {
        onRemoveItem(item) {
            const idx = this.items.indexOf(item);
            if (0<=idx) this.items.splice(idx, 1);
            else console.assert(false, 'Closed dynamic component is in the array');
        },
        onResize(refChart) {
            const ref = this.$refs[refChart];
            if (ref) {
                const chart = ref[0];
                const width = chart.$el.clientWidth;
                const height = chart.$el.clientHeight;
                const hc = chart.chart;
                hc.setSize(width, height);
            }
        },
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