<template>
  <p>Please use again...</p>
</template>

<script>
import firebase from '../firebase/firestore'

export default {
  created: function() {
    const self = this
    firebase
      .auth()
      .signOut()
      .then(function() {
        // 正常にsignoutできた時の処理
        self.$router.push('/login')
      })
  }
}
</script>

<style scoped>
p {
  margin-left: 60px;
}
</style>
