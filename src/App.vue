<template>
  <div>
    <Header />
    <router-view />
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Header from './components/global/Header.vue'
// import Footer from './components/global/Footer.vue'

export default {
  components: {
    Header: Header
    // Footer: Footer
  }
}
</script>

<style scoped>
/* #main {
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
  box-sizing: border-box;
}

#footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
} */
</style>
