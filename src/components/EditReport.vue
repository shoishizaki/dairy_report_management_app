<template>
  <div>
    <md-dialog-alert
      :md-active.sync="first"
      md-content="Edit failed.If you do not know the cause, please contact the app creator."
      md-confirm-text="OK"
    />
    <md-dialog-alert
      :md-active.sync="second"
      md-title="Report updated!"
      md-content="saved your daily report."
    />
    <h1>Edit Report</h1>
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
    <md-button class="md-raised md-primary" @click="updateReport"
      >Update</md-button
    >
  </div>
</template>

<script>
import firebase from '../firebase/firestore'

export default {
  data() {
    return {
      report_id: null,
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
    this.getUserEmail()
    this.report_id = this.$route.params['reportId']
    this.getReport()
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
    updateReport() {
      const self = this
      firebase
        .firestore()
        .collection('report')
        .doc(this.report_id)
        .update({
          date: this.date,
          dairy_report: this.dairy_report,
          memo: this.memo,
          literature_url: this.literature_url
        })
        .then(() => {
          self.second = true
        })
        .catch(() => {
          self.first = true
        })
    },

    getReport() {
      const self = this
      firebase
        .firestore()
        .collection('report')
        .doc(this.report_id)
        .get()
        .then(doc => {
          if (doc.exists) {
            self.date = doc.data().date.toDate()
            self.dairy_report = doc.data().dairy_report
            self.memo = doc.data().memo
            self.literature_url = doc.data().literature_url
          } else {
            self.$router.push('/list')
          }
        })
    },

    getUserEmail() {
      const self = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.email = user.email
        } else {
          self.$router.push('/login')
        }
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
