<template>
  <div>
    <Header />
    <router-view style="min-height: 800px;"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Main',
  components: { Header, Footer }
}
</script>
