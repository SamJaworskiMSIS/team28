const RefereeApp = {
    data() {
      return {
        referee: [],
      }
    },
    computed: {},
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchrefereeData() {
            fetch('/api/projectdb/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referee = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        }
    },
    created() {
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(RefereeApp).mount('#RefereeApp');