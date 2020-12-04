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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQ2NjY4OTR9.0fdi5cuDZ2t3OSrPOMoc3B1_pwhnWj4ZmM3FHEX7Aus",
    { apiUrl: "https://ecom.cubecloudapp.dev/cubejs-api/v1" }
);

import Dashboard from '@/components/Dashboard'

import cloneDeep from 'lodash.clonedeep'
// import debounce from 'lodash.debounce'

export default {
    components: {
        Dashboard,
    },
    data() {
        return {
            cubejsApi,
            addNewItem: undefined,

            itemTemplates: [
                {
                    name: 'line',
                },
            ],
        }
    },
    methods: {
        onAddNewItem(itemTemplate) {
            const item = cloneDeep(itemTemplate);
            this.addNewItem = item;
        },
    },
}
</script>