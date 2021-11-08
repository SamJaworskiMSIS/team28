const SomeApp = {
  data() {
    return {
      report: []
    }
  },
  methods: {
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },
      fetchReportData() {
          fetch('/api/gamereport/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.report = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      }
  },
  created() {
      this.fetchReportData();
  }
}

Vue.createApp(SomeApp).mount('#gamereportApp');