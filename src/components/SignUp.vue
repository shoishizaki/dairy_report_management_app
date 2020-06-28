<template>
  <div>
    <md-dialog-alert
      :md-active.sync="first"
      md-content="Sending failed for some reason.If you do not know the cause, please contact the app creator."
      md-confirm-text="OK"
    />
    <md-dialog-alert
      :md-active.sync="second"
      md-title="Success sign up!"
      md-content="Create your account."
    />
    <h1>Sign Up</h1>
    <md-divider />
    <md-field :class="messageClass">
      <label>E-mail(Required Field)</label>
      <md-input v-model="email"></md-input>
      <span class="md-error">E-Mail is a required item</span>
    </md-field>
    <md-field :class="messageClass">
      <label>Password(Required Field)</label>
      <md-input v-model="password" type="password"></md-input>
      <span class="md-error">Password is a required item</span>
    </md-field>
    <md-button class="md-raised md-primary" @click="signUp">Sign Up</md-button>
  </div>
</template>

<script>
import firebase from '../firebase/firestore'

export default {
  data() {
    return {
      email: null,
      password: null,
      hasMessages: false,
      first: false,
      second: false
    }
  },

  computed: {
    messageClass() {
      return {
        'md-invalid': this.hasMessages
      }
    }
  },

  methods: {
    signUp: function() {
      if (!this.email || !this.password) {
        this.hasMessages = true
        return
      }
      const self = this
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(function() {
          // 正常にsignupできた時の処理
          self.second = true
          self.email = null
          self.password = null
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
}
</style>
