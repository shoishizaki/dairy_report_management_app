<template>
  <div class="home">
    <div v-if="isAuthenticated">
      <h3>Welcome to Dairy Report management App</h3>
      <h4>2020/7/15</h4>
      <p>
        update textarea<br />
        ・create report page<br />
        ・edit report page
      </p>
      <h4>2020/7/12</h4>
      <p>
        Open Page<br />
        ・settings page(password reset)<br /><br />
        Add function<br />
        ・password reset function(2 patterns)<br />
        Before login, you can go to the email sending page from the link on the
        login page.<br />
        After login, you can do it on the settings page.<br />
      </p>
      <h4>2020/7/11</h4>
      <p>
        Add function<br />
        ・Delete dairy report<br />
        ・Edit dairy report<br />
      </p>
      <h4>2020/7/2</h4>
      <p>
        Released daily report management application.<br />
        Add function<br />
        ・Create dairy report<br />
        ・Read dairy report<br />
      </p>
    </div>
    <div v-else>
      <h1>Dairy Report management App</h1>
      <h2>Let's write Dairy Report!</h2>
      <div class="sign-up-button">
        <md-button class="md-raised md-primary" @click="goToSignUp"
          >Go to Sign Up</md-button
        >
      </div>

      <div class="write-rearon-area">
        <div class="write-reason-text-area">
          <h3>Good things to write</h3>
          <li>You can keep a daily record so you can always look back.</li>
          <li>You can make time to think about the day.</li>
          <li>And you can grow.</li>
          <h4>As a result you can make your dreams come true.</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase/firestore'

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
    const self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.email = user.email
      }
    })
  },

  methods: {
    goToSignUp() {
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

h2 {
  text-align: center;
}

h3 {
  margin-left: 60px;
}

h4 {
  margin-left: 60px;
}

p {
  margin-left: 60px;
}

.sign-up-button {
  text-align: center;
}

.write-rearon-area {
  text-align: center;
}

.write-reason-text-area {
  display: inline-block;
  width: 400px;
  text-align: left;
}
</style>
