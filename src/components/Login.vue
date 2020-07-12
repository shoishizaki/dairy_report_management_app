<template>
  <div>
    <md-dialog-alert
      :md-active.sync="first"
      md-content="Email or password is wrong."
      md-confirm-text="OK"
    />
    <h1>Login</h1>
    <md-divider />
    <md-field>
      <label>E-mail</label>
      <md-input v-model="email"></md-input>
    </md-field>
    <md-field>
      <label>Password</label>
      <md-input v-model="password" type="password"></md-input>
    </md-field>
    <md-button class="md-raised md-primary" @click="login">Login</md-button>
    <router-link class="link" to="/password_reset"
      >If you forgot your password, click here</router-link
    >
  </div>
</template>

<script>
import firebase from '../firebase/firestore'

export default {
  data() {
    return {
      email: null,
      password: null,
      first: false
    }
  },

  methods: {
    login: function() {
      const self = this
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(function() {
          // 正常にloginできた時の処理
          window.location.href = '/'
        })
        .catch(function() {
          // エラー発生時の処理
          self.first = true
        })
    }
  }
}
</script>

<style scoped>
h1 {
  margin-left: 60px;
}

.md-field {
  margin-top: 40px;
  width: 80%;
  margin-left: 60px;
}

.md-button {
  position: relative;
  left: 50px;
  top: 40px;
}

.link {
  position: relative;
  right: 50px;
}
</style>
