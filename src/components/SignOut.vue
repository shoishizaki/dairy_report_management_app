<template>
  <p>Please use again...</p>
</template>

<script>
import firebase from '../firebase/firestore'

export default {
  created: function() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // 正常にsignoutできた時の処理
        window.location.href = '/login'
      })
  }
}
</script>

<style scoped>
p {
  margin-left: 60px;
}
</style>
