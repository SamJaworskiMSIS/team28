const SomeApp = {
    data() {
      return {
        referees: [],
        selectedReferee: null,
        games: [],
        gameForm: {},
        selectedGame: null
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectReferee(s) {
            if (s == this.selectedReferee) {
                return;
            }
            this.selectedReferee = s;
            this.games = [];
            this.fetchGameData(this.selectedReferee);
        },
        fetchRefereeData() {
            fetch('/api/referee/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchGameData(s) {
            console.log("Fetching game data for ", s);
            fetch('/api/game/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postGame(evt) {
            console.log ("Test:", this.selectedGame);
          if (this.selectedGame) {
              this.postEditGame(evt);
          } else {
              this.postNewGame(evt);
          }
        },
        postEditGame(evt) {
          this.gameForm.id = this.selectedGame.id;
          this.gameForm.refereeId = this.selectedReferee.id;        
          
          console.log("Editing!", this.gameForm);
  
          fetch('api/game/update.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        postNewGame(evt) {
          this.gameForm.refereeId = this.selectedReferee.id;        
          
          console.log("Creating!", this.gameForm);
  
          fetch('api/game/create.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        postDeleteGame(o) {  
          if ( !confirm("Are you sure you want to delete the game from " + o.companyName + "?") ) {
              return;
          }  
          
          console.log("Delete!", o);
  
          fetch('api/game/delete.php', {
              method:'POST',
              body: JSON.stringify(o),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        handleEditGame(game) {
            this.selectedGame = game;
            this.gameForm = Object.assign({}, this.selectedGame);
        },
        handleResetEdit() {
            this.selectedGame = null;
            this.gameForm = {};
        }
    },
    created() {
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#gameApp');