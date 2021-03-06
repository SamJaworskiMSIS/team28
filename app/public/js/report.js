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
    //   selectReferee(s) {
    //     if (s == this.selectedReferee) {
    //         return;
    //     }
    //     this.selectedReferee = s;
    //     this.report = [];
    //     this.fetchReportData(this.selectedReferee);
    // },
  },
  created() {
      this.fetchReportData();
  }
}

Vue.createApp(SomeApp).mount('#reportApp');