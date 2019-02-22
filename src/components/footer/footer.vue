<template>
  <div>
    <div class="footer_guide">
      <section @click="gotoAdress({ name: 'msite', query: {geohash} })">
        <img :src="$route.path.includes('msite') ? `${publicPath}svg/elm-active.svg` : `${publicPath}svg/elm.svg`" alt="" />
        <span>外卖</span>
      </section>
      <section @click="gotoAdress({ name: 'search', query: {geohash} })">
        <img :src="$route.path.includes('search') ? `${publicPath}svg/search-active.svg` : `${publicPath}svg/search.svg`" alt="" />
        <span>搜索</span>
      </section>
      <section @click="gotoAdress({ name: 'order' })">
        <img :src="$route.path.includes('order') ? `${publicPath}svg/order-active.svg` : `${publicPath}svg/order.svg`" alt="" />
        <span>订单</span>
      </section>
      <section @click="gotoAdress({ name: 'center' })">
        <img :src="$route.path.includes('center') ? `${publicPath}svg/center-active.svg` : `${publicPath}svg/center.svg`" alt="" />
        <span>我的</span>
      </section>
    </div>
    <div class="clear-footer"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Footer',
  data() {
    return {
      publicPath: process.env.BASE_URL,
    }
  },
  computed: {
    ...mapState(['geohash']),
  },
  methods: {
    gotoAdress(path) {
      this.$router.push(path)
    },
  },
}
</script>

<style lang="scss" scoped>
.footer_guide {
  @include wh(100%, 50px);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  @include fj;
  border-top: 1px solid $bc;
  background-color: #fff;
  section {
    width: 25%;
    text-align: center;
    position: relative;
    img {
      width: 30px;
      @include cl;
    }
    span {
      @include sc(12px, #000);
      @include cl;
      bottom: 5px;
    }
  }
}
.clear-footer {
  height: 50px;
}
</style>