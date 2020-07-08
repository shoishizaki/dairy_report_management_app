<template>
  <div v-if="isAuthenticated">
    <md-button to="/">Home</md-button>
    <md-button to="/create" class="md-primary">Create Report</md-button>
    <md-button to="/list" class="md-primary">Report List</md-button>
    <md-button to class="md-accent">Settings</md-button>
  </div>
</template>

<script>
import firebase from '../../firebase/firestore'

export default {
  data() {
    return {
      email: null
    }
  },

  computed: {
    isAuthenticated() {
      return this.email !== null
    }
  },

  created: function() {
    this.getUserEmail()
  },

  methods: {
    getUserEmail() {
      const self = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.email = user.email
        }
      })
    }
  }
}
</script>
