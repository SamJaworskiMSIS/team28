const SomeApp = {
  data() {
    return {
      referees: [],
      assignments: [],
      selectedReferee: null,
      selectedAssigned: null,
      games: [],
      gameForm: {},
      assForm: {},
      refForm: {},
      selectedGame: null,
      selectedRefID: null,
      selectedGameID: null
    }
  },
  computed: {},
  methods: {
    // selectReferee(s) {
    //   if (s == this.selectedReferee) {
    //     return;
    //   }
    //   this.selectedReferee = s;
    //   this.games = [];
    //   this.fetchGameData(this.selectedReferee);
    // },
    fetchRefereeData() {
      fetch('/api/referee/')
        .then(response => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.referees = responseJson;
        })
        .catch((err) => {
          console.error(err);
        })
    },
    fetchGameData() {
      fetch('/api/game/')
        .then(response => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.games = responseJson;
        })
        .catch((err) => {
          console.error(err);
        })
    },
    fetchAssignedData() {
      fetch('/api/assigned/')
        .then(response => response.json())
        .then((parsedJson) => {
          console.log(parsedJson);
          this.assignments = parsedJson
        })
        .catch(err => {
          console.error(err)
        })
    },
    postGame(evt) {
      if (this.selectedGame) {
        this.postEditGame(evt);
      } else {
        this.postNewGame(evt);
      }
    },
    postEditGame(evt) {
      fetch('api/game/update.php', {
        method: 'POST',
        body: JSON.stringify(this.gameForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.games = json;
          this.fetchAssignedData();

          // reset the form
          this.gameForm = {};
          this.selectedGame = null;
        });
    },
    postNewGame(evt) {
      fetch('api/game/create.php', {
        method: 'POST',
        body: JSON.stringify(this.gameForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.games = json;

          // reset the form
          this.gameForm = {};
        });
    },
    deleteGame(o) {
      if (!confirm("Are you sure you want to delete the game?")) {
        return;
      }

      console.log("Delete!", o);

      fetch('api/game/delete.php', {
        method: 'POST',
        body: JSON.stringify(o),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.games = json;

          // reset the form
          this.selectedGame = null;
          this.gameForm = {};
        });
    },

    editGame(game) {
      this.selectedGame = game;
      this.gameForm = Object.assign({}, this.selectedGame);
    },
    postReferee(evt) {
      if (this.selectedReferee) {
        this.postEditReferee(evt);
      } else {
        this.postNewReferee(evt);
      }
    },
    postEditReferee(evt) {
      fetch('api/referee/update.php', {
        method: 'POST',
        body: JSON.stringify(this.refForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.referees = json;
          this.fetchAssignedData();

          // reset the form
          this.refForm = {};
          this.selectedReferee = null;
        });
    },
    postNewReferee(evt) {
      fetch('api/referee/create.php', {
        method: 'POST',
        body: JSON.stringify(this.refForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.referees = json;

          // reset the form
          this.refForm = {};
        });
    },
    editReferee(ref) {
      this.selectedReferee = ref;
      this.refForm = Object.assign({}, this.selectedReferee);
    },
    deleteReferee(o) {
      if (!confirm("Are you sure you want to delete the referee? ")) {
        return;
      }

      console.log("Delete!", o);

      fetch('api/referee/delete.php', {
        method: 'POST',
        body: JSON.stringify(o),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.referees = json;

          // reset the form
          this.selectedReferee = null;
          this.refForm = {};
        });
    },
    postAssignment(evt) {
      console.log('asa', this.selectedRefID);
      console.log('gameId', this.selectedGameID);
      console.log("Test:", this.selectedAssigned);
      if (this.selectedAssigned) {
        this.postEditAssignment(evt);
      } else {
        this.postNewAssignment(evt);
      }
    },
    postEditAssignment(evt) {
      fetch('api/assigned/update.php', {
        method: 'POST',
        body: JSON.stringify(this.assForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.assignments = json;

          // reset the form
          this.assForm = {};
          this.selectedAssigned = null;
        });
    },
    postNewAssignment(evt) {
      fetch('api/assigned/create.php', {
        method: 'POST',
        body: JSON.stringify(this.assForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.assignments = json;

          // reset the form
          this.assForm = {};
        });
    },
    deleteAssigned(o) {

      console.log("Delete assigned!", o);

      if (!confirm("Are you sure you want to delete the assignment? ")) {
        return;
      }


      fetch('api/assigned/delete.php', {
        method: 'POST',
        body: JSON.stringify(o),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.assignments = json;

          // reset the form
          this.selectedAssigned = null;
          this.assForm = {};
        });
    },
    editAssigned(ass) {
      console.log('edit assign', ass),
      this.selectedAssigned = ass;
      this.assForm = Object.assign({}, this.selectedAssigned);
    },
    cancelEditClick() {
      this.selectedReferee = null;
      this.refForm = {};
    },
    cancelEditClick1() {
      this.selectedAssigned = null;
      this.assForm = {};
    },
    handleResetEdit() {
      this.selectedGame = null;
      this.gameForm = {};
    }
  },

  created() {
    this.fetchGameData(),
    this.fetchRefereeData(),
    this.fetchAssignedData()
  }

}

Vue.createApp(SomeApp).mount('#GameApp');

