<template>
  <div>
    <h1>Report List</h1>
    <div v-for="report in reports" v-bind:key="report.report_id">
      <list-modal
        :date="report.date"
        :report="report.dairy_report"
        :memo="report.memo"
        :literature_url="report.literature_url"
      ></list-modal>
    </div>
  </div>
</template>

<script>
import ListModal from '../components/ui/Report/List_modal'
import firebase from '../firebase/firestore'

export default {
  components: {
    'list-modal': ListModal
  },

  data() {
    return {
      email: null,
      reports: []
    }
  },

  created: function() {
    this.getListPageInfo()
  },

  methods: {
    getReport() {
      const self = this
      firebase
        .firestore()
        .collection('report')
        .where('email', '==', this.email)
        .get()
        .then(snapShot => {
          snapShot.forEach(doc => {
            self.reports.push({
              dairy_report: doc.data().dairy_report,
              date: doc.data().date.toDate(),
              memo: doc.data().memo,
              literature_url: doc.data().literature_url,
              report_id: doc.id
            })
          })
        })
    },

    getListPageInfo() {
      const self = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.email = user.email
          self.getReport()
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
</style>
