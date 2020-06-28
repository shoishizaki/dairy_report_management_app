<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Dairy Report</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Report">
          <p style="white-space: pre-wrap;">{{ report }}</p>
        </md-tab>

        <md-tab md-label="Memo">
          <p style="white-space: pre-wrap;">{{ memo }}</p>
        </md-tab>

        <md-tab md-label="Literature URL">
          <p style="white-space: pre-wrap;">{{ literature_url }}</p>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">
      {{ date }}
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'DialogCustom',
  data: () => ({
    showDialog: false
  }),

  props: ['date', 'report', 'memo', 'literature_url']
}
</script>

<style scoped>
.md-dialog {
  position: relative;
}
</style>
