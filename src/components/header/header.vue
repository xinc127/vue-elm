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
      <router-link :to="userInfo ? {name: 'center'} : {name: 'login'}" v-if="signUp" class="head_login">
        <div v-if="userInfo">已登录</div>
        <span v-else class="login_span">登录/注册</span>
      </router-link>
    </header>
    <div class="clear_header"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  // props: ['headTitle', 'headBack'],
  props: {
    headTitle: {
      type: String,
      default: '',
    },
    headBack: Boolean,
    signUp: Boolean,
  },
  computed: {
    ...mapState(['userInfo']),
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
#header-top {
  @include wh(100%, 46px);
  background-color: $blue;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  .head_title {
    @include center;
    text-align: center;
    .title_text {
      @include sc(18px, #fff);
      font-weight: 700;
    }
  }
  .head_back {
    @include ct;
    left: 12px;
    img {
      width: 16px;
    }
  }
  .head_login {
    @include ct;
    right: 12px;
    span {
      @include sc(14px, #fff);
    }
  }
}
.clear_header {
  @include wh(100%, 46px);
}
</style>
