<template>
  <div>
    <header id="header-top">
      <slot name="logo"></slot>
      <slot name="search"></slot>
      <section class="head_goback"></section>
      <section class="head_title ">
        <span class="title_text">{{ headTitle }}</span>
      </section>
      <section class="head_back" v-if="headBack" @click="$router.go(-1)">
        <img src="@/assets/head_back.png" alt="" />
      </section>
      <slot name="msiteTitle"></slot>
      <slot name="changeCity"></slot>
    </header>
    <div class="clear_header"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  // props: ['headTitle', 'headBack'],
  props: {
    headTitle: {
      type: String,
      default: '',
    },
    headBack: Boolean,
  },
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
  .head_title {
    @include center;
    text-align: center;
    .title_text {
      @include sc(18px, #fff);
      font-weight: 600;
    }
  }
  .head_back {
    @include ct;
    left: 12px;
    img {
      width: 16px;
    }
  }
}
.clear_header {
  @include wh(100%, 46px);
}
</style>
