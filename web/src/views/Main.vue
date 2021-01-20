<template>
  <div>
    <Header />
    <router-view style="min-height: 800px;"></router-view>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Main',
  components: { Header }
}
</script>
