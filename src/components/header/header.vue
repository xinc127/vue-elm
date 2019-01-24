<template>
  <div>
    <header id="header-top">
      <slot name="logo"></slot>
      <section class="head_goback"></section>
    </header>
    <div class="clear_header"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
header {
  @include wh(100%, 46px);
  background-color: $blue;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
}
.clear_header {
  @include wh(100%, 46px);
}
</style>
