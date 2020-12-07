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
                    <v-list-item-title>{{ itemTemplate.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
    <v-main>
        <Dashboard :cubejsApi="cubejsApi" :addNewItem="addNewItem"/>
    </v-main>
</v-app>
</template>

<style>
body {
    overflow: hidden; /* The 'light' theme let a scroll-bar on the right of the main container */
}
</style>

<script>
import cubejs from "@cubejs-client/core";
const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJb1RJRlkiOiJJb1RJRlkiLCJ1Ijp7fSwiaWF0IjoxNjA3MzQwODI2fQ.bOzFL1ejdaCE0Fk6gLfcro8MUlzi0MTUOd6NP8HT3ME",
    { apiUrl: "http://localhost:4000/cubejs-api/v1" }
);

import Dashboard from '@/components/Dashboard'
import itemTemplates from '@/chartData'
import cloneDeep from 'lodash.clonedeep'

export default {
    components: {
        Dashboard,
    },
    data() {
        return {
            cubejsApi,
            itemTemplates,
            addNewItem: undefined,
        }
    },
    methods: {
        onAddNewItem(itemTemplate) {
            this.addNewItem = cloneDeep(itemTemplate);
        },
    },
}
</script>