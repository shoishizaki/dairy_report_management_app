<template>
  <div>
    <md-dialog-alert
      :md-active.sync="first"
      md-content="Sending failed for some reason.If you do not know the cause, please contact the app creator."
      md-confirm-text="OK"
    />
    <md-dialog-alert
      :md-active.sync="second"
      md-title="Report created!"
      md-content="saved your daily report."
    />
    <h1>Create Report</h1>
    <md-divider />
    <div class="block">
      <h3>Date</h3>
      <md-datepicker v-model="date" />
      <p>*If there is no input, today's date will be saved</p>
    </div>
    <md-divider />
    <md-field :class="messageClass">
      <label>Dairy Report(Required Field)</label>
      <md-textarea v-model="dairy_report"></md-textarea>
      <span class="md-error">Daily report is a required item</span>
    </md-field>
    <md-field>
      <label>Memo</label>
      <md-textarea v-model="memo"></md-textarea>
    </md-field>
    <md-field>
      <label>Literature URL</label>
      <md-textarea v-model="literature_url"></md-textarea>
    </md-field>
    <md-button class="md-raised md-primary" @click="sendItem">Submit</md-button>
  </div>
</template>

<script>
import firebase from '../firebase/firestore'

export default {
  data() {
    return {
      email: null,
      date: null,
      dairy_report: null,
      memo: null,
      literature_url: null,
      first: false,
      second: false,
      hasMessages: false
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
    },

    isAuthenticated() {
      return this.email !== null
    }
  },

  methods: {
    sendItem() {
      // 送るコレクションを指定
      if (this.dairy_report == null) {
        this.hasMessages = true
        return
      }
      if (this.date == null) {
        this.date = new Date()
      }
      const colref = firebase.firestore().collection('report')
      const self = this

      // 保存用JSONデータを作成
      const saveData = {
        email: this.email,
        date: this.date,
        dairy_report: this.dairy_report,
        memo: this.memo,
        literature_url: this.literature_url
      }

      // addの引数に保存したいデータを渡す
      colref
        .add(saveData)
        .then(function() {
          // 正常にデータ保存できた時の処理
          self.second = true
          self.date = null
          self.dairy_report = null
          self.memo = null
          self.literature_url = null
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

h3 {
  margin-left: 60px;
}

p {
  margin-left: 60px;
}

.md-datepicker {
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
