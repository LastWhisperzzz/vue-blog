<template>
  <div>
    <Header />
    <Snow />
    <router-view style="min-height: 800px;"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Snow from '../components/snow.vue'

export default {
  name: 'Main',
  components: { Header, Footer, Snow }
}
</script>
