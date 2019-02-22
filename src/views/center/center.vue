<template>
  <div>
    <header-top head-title="个人中心" :head-back="true"></header-top>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
import headerTop from '@/components/header/header.vue'
import footerGuide from '@/components/footer/footer.vue'
export default {
  name: 'Search',
  components: {
    headerTop,
    footerGuide,
  },
}
</script>

<style scoped>
</style>