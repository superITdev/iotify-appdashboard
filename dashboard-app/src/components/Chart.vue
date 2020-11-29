<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <div class="card-text">
        <div class="d-flex justify-content-center text-dark"><div class="spinner-border" role="status" v-if="loading"><span class="sr-only">Loading...</span></div></div>
        <h1 v-if="resultVisible && type === 'number'" height="300">{{ parseFloat(values[0][metrics[0]]).toLocaleString() }}</h1>
        <line-chart v-if="resultVisible && type === 'line'" :values="values" :metrics="metrics"/>
        <bar-chart v-if="resultVisible && type === 'stackedBar'" :values="values" :metrics="metrics"/>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart";
import BarChart from "./BarChart";

export default {
  components: {
    LineChart,
    BarChart
  },
  name: "Chart",
  props: {
    resultSet: Object,
    loading: Boolean,
    title: String,
    type: String
  },
  computed: {
    values: function() {
      if (this.loading || !this.resultSet) return undefined;
      console.log("chartPivot", this.resultSet.chartPivot());
      return this.resultSet.chartPivot();
    },
    metrics: function() {
      if (this.loading || !this.resultSet) return undefined;
      console.log("seriesNames", this.resultSet.seriesNames());
      return this.resultSet.seriesNames().map(x => x.key);
    },
    resultVisible() {
      return !this.loading && this.values != undefined; // this.metrics
    }
  },
  data() {
    return {
      colors: [
        "#7DB3FF",
        "#49457B",
        "#FF7C78",
        "#FED3D0",
        "#6F76D9",
        "#9ADFB4",
        "#2E7987"
      ]
    };
  }
};
</script>

<style scoped>
</style>
