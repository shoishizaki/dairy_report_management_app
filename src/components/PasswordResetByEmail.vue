<template>
  <div>
    <md-dialog-alert
      :md-active.sync="first"
      md-content="Email address does not exist. Please check your email address again."
      md-confirm-text="OK"
    />
    <md-dialog-alert
      :md-active.sync="second"
      md-title="Send Email"
      md-content="A reset link has been sent to your registered email address."
    />
    <h1>Password Reset by Email</h1>
    <md-divider />
    <md-field :class="messageClass">
      <label>E-mail</label>
      <md-input v-model="email"></md-input>
      <span class="md-error">E-Mail is a required item</span>
    </md-field>
    <md-button class="md-raised md-primary" @click="sendEmail"
      >send email</md-button
    >
  </div>
</template>

<script>
import firebase from '../firebase/firestore'

export default {
  data() {
    return {
      email: null,
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
    sendEmail: function() {
      if (!this.email) {
        this.hasMessages = true
        return
      }
      const self = this
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          self.second = true
        })
        .catch(() => {
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
