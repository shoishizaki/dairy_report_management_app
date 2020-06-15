<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/global/Header.vue'
import Footer from './components/global/Footer.vue'

export default {
  components: {
    Header: Header,
    Footer: Footer
  }
}
</script>

<style></style>
