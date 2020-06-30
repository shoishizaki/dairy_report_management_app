<template>
  <div>
    <md-tabs md-sync-route class="md-primary">
      <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
      <md-tab
        v-if="isAuthenticated"
        id="tab-post"
        md-label="Create Report"
        to="/create"
      ></md-tab>
      <md-tab
        v-if="isAuthenticated"
        id="tab-list"
        md-label="Report List"
        to="/list"
      ></md-tab>
      <md-tab
        v-if="isAuthenticated"
        id="tab-settings"
        md-label="settings"
      ></md-tab>
      <div v-else>
        <md-tab id="tab-signup" md-label="Sign Up" to="/signup"></md-tab>
        <md-tab id="tab-login" md-label="Login" to="/login"></md-tab>
      </div>
      <md-tab
        v-if="isAuthenticated"
        id="tab-signout"
        md-label="Signout"
        to="/signout"
      ></md-tab>
    </md-tabs>
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
