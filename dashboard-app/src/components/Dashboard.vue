<template>
    <v-container fluid class="fill-height">
        <golden-layout class="gl-container">
            <gl-row>
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