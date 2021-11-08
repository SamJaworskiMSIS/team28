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
          fetch('/api/report/')
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

Vue.createApp(SomeApp).mount('#reportApp');