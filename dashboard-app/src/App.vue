<template>
<v-app>
    <v-app-bar app
        color="deep-purple accent-4"
        dense
        dark
    >
        <v-app-bar-nav-icon/>
        <v-toolbar-title>IoTIFY | Analytics Dashboard</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom nudge-bottom="50">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(itemTemplate, i) in itemTemplates" :key="i" @click="onAddNewItem(itemTemplate)">
                    <v-list-item-title>{{ itemTemplate.typeName }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>    
    <v-main>
        <v-container fluid class="fill-height">
            <golden-layout class="gl-container">
                <gl-row>
                    <gl-component v-for="(item, i) in items" :key="i"
                        :title='`chart of type-${item.typeName}`'
                        @destroy="onRemoveItem(item)"
                    >
                        <query-builder :cubejs-api="cubejsApi" :query="item.query">
                            <template v-slot="{ loading, resultSet }">
                                <Chart
                                    :title='`chart of type-${item.typeName}`'
                                    :type="item.chartType"
                                    :loading="loading"
                                    :result-set="resultSet"
                                />
                            </template>
                        </query-builder>
                    </gl-component>
                </gl-row>
            </golden-layout>
        </v-container>
    </v-main>
</v-app>
</template>

<style>
body {
    overflow: hidden; /* The 'light' theme let a scroll-bar on the right of the main container */
}
.gl-container { /* golden-layout container */
    width: 100%;
    height: 100%;
}
</style>

<script>
import cloneDeep from 'lodash.clonedeep'
// import debounce from 'lodash.debounce'

import cubejs from "@cubejs-client/core";
import { QueryBuilder } from "@cubejs-client/vue";

import Chart from "./components/Chart";

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQ2NjY4OTR9.0fdi5cuDZ2t3OSrPOMoc3B1_pwhnWj4ZmM3FHEX7Aus",
    { apiUrl: "https://ecom.cubecloudapp.dev/cubejs-api/v1" }
);

export default {
    components: {
        Chart,
        QueryBuilder
    },
    data() {
        return {
            cubejsApi,

            itemTemplates: [
                {
                    typeName: 'chart01',
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
                    typeName: 'chart02',
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
            items: [],
        }
    },
    methods: {
        onAddNewItem(itemTemplate) {
            const item = cloneDeep(itemTemplate);
            this.items.push(item);
        },
        onRemoveItem(item) {
            const idx = this.items.indexOf(item);
            if (0<=idx) this.items.splice(idx, 1);
            else console.assert(false, 'Closed dynamic component is in the array');
        }
    },
    created() {
    }
}
</script>