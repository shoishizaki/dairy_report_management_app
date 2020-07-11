<template>
  <div>
    <md-dialog-alert
      :md-active.sync="first"
      md-content="Deletion failed.If you don't know the cause, please contact the creator."
      md-confirm-text="OK"
    />
    <h1>Report List</h1>
    <div
      class="display_report"
      v-for="report in reports"
      v-bind:key="report.report_id"
    >
      <list-modal
        :date="report.date"
        :report="report.dairy_report"
        :memo="report.memo"
        :literature_url="report.literature_url"
      ></list-modal>
      <md-button
        class="md-primary md-raised"
        :to="{ name: 'Edit', params: { reportId: report.report_id } }"
        >To edit page</md-button
      >
      <md-dialog-confirm
        :md-active.sync="active"
        md-title="Do you really want to delete this?"
        md-content="Once deleted, it cannot be restored."
        md-confirm-text="Yes"
        md-cancel-text="No"
        @md-cancel="onCancel"
        @md-confirm="deleteReport"
      />
      <md-button
        class="md-accent md-raised"
        @click=";(active = true), getEditReportId(report.report_id)"
        >Delete</md-button
      >
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
      reports: [],
      active: false,
      edit_report_id: null,
      first: false
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
    },

    getEditReportId(reportId) {
      this.edit_report_id = reportId
    },

    deleteReport() {
      const self = this
      firebase
        .firestore()
        .collection('report')
        .doc(this.edit_report_id)
        .delete()
        .then(function() {
          self.$router.go({ path: '/list' })
        })
        .catch(function() {
          self.first = true
        })
    },

    onCancel() {
      this.edit_report_id = null
    }
  }
}
</script>

<style scoped>
h1 {
  margin-left: 60px;
}

.display_report {
  margin-left: 50px;
  display: flex;
}
</style>
