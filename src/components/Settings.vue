<template>
  <div>
    <md-dialog-alert
      :md-active.sync="first"
      md-content="Password update failed.If you do not know the cause, please contact the app creator."
      md-confirm-text="OK"
    />
    <md-dialog-alert
      :md-active.sync="second"
      md-title="Authentication error"
      md-content="Wrong password. Please check your password and enter it again."
    />
    <h1>Settings</h1>
    <md-divider />
    <div class="password-reset-form">
      <h3>Password Reset</h3>
      <md-field :class="messageClass">
        <label>Current Password(Required Field)</label>
        <md-input v-model="current_password" type="password"></md-input>
        <span class="md-error">Password is a required item</span>
      </md-field>
      <md-field :class="messageClass">
        <label>New Password(Required Field)</label>
        <md-input v-model="new_password" type="password"></md-input>
        <span class="md-error">Password is a required item</span>
      </md-field>
      <md-dialog-confirm
        :md-active.sync="active"
        md-title="Updated password"
        md-content="Please check you can login with your new password."
        md-confirm-text="OK"
        md-cancel-text=""
        md-click-outside-to-close="false"
        @md-cancel="signout"
        @md-confirm="signout"
      />
      <md-button class="md-raised md-primary" @click="resetPassword"
        >Reset</md-button
      >
    </div>
  </div>
</template>

<script>
import firebase from '../firebase/firestore'

export default {
  data() {
    return {
      email: null,
      current_password: null,
      new_password: null,
      hasMessages: false,
      active: false,
      first: false,
      second: false
    }
  },

  created: function() {
    const self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.email = user.email
      } else {
        self.$router.push('/login')
      }
    })
  },

  computed: {
    messageClass() {
      return {
        'md-invalid': this.hasMessages
      }
    }
  },

  methods: {
    resetPassword() {
      if (!this.password) {
        this.hasMessages = true
        return
      }
      const self = this
      const user = firebase.auth().currentUser
      // 再認証のcredentialを取得する
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.email,
        this.current_password
      )
      // credentialをreauthenticateWithCredentialに渡す
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          // 再認証に成功した場合のみ、updatePasswordメソッドを実行する
          user
            .updatePassword(self.new_password)
            .then(() => {
              self.active = true
            })
            .catch(() => {
              self.first = true
            })
          // reauthenticateWithCredentialに失敗した場合
        })
        .catch(() => {
          self.second = true
        })
    },

    signout() {
      this.$router.push('/signout')
    }
  }
}
</script>

<style scoped>
h1 {
  margin-left: 60px;
}

h3 {
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
