<template>
  <div>
    <ul v-for="item in shopList" :key="item.id" class="shop-list">
      <li>
        <div class="shop-img">
          <img :src="imgBaseUrl + item.image_path" alt="" />
        </div>
        <section class="shop-container">
          <section class="left-container">
            <p class="title"><span>品牌</span>{{ item.name }}</p>
            <p class="order">月售{{ item.rating_count }}单</p>
            <p class="delivery-fee">
              <span>¥{{ item.float_minimum_order_amount }}起送</span>
              /
              <span>配送费{{ item.float_delivery_fee }}</span>
            </p>
          </section>
          <section class="right-container">
            <p class="support-icon">
              <span v-for="support in item.supports " :key="support.id">{{ support.icon_name }}</span>
            </p>
            <p class="delivery">
              <span v-if="item.delivery_mode">{{ item.delivery_mode.text }}</span>
              <span>准时达</span>
            </p>
            <p class="distance-time">
              <span class="distance">{{ item.distance }}</span>
              /
              <span class="time">{{ item.order_lead_time }}</span>
            </p>
          </section>
        </section>
      </li>
    </ul>
    <button style="width: 100%; text-align: center;" @click="loaderMore">加载更多</button>
  </div>
</template>

<script>
import { shopList } from '@/api/api'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      offset: 0, // 请求数据的数量
      shopList: [],
      imgBaseUrl: '/img/',
      touchend: false, // 没有更多数据
      preventRepeatRequest: false, // 防止重复请求
    }
  },
  computed: {
    ...mapState(['latitude', 'longitude']),
  },
  props: {
    restaurantCategoryId: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      // 获取数据
      let res = await shopList(this.latitude, this.longitude)
      this.shopList = [...res]
      if (res.length < 20) {
        this.touchend = true
      }
    },
    async loaderMore() {
      console.log('加载更多数据')
      // 是否有数据
      if (this.touchend) {
        return
      }
      // 防止重复请求
      if (this.preventRepeatRequest) {
        return
      }
      this.preventRepeatRequest = true

      this.offset += 20
      let res = await shopList(this.latitude, this.longitude, this.offset)
      this.shopList = [...this.shopList, ...res]
      if (res.length < 20) {
        this.touchend = true
      }
      this.preventRepeatRequest = false
    },
  },
}
</script>

<style lang="scss" scoped>
h4 {
  @include sc(12px, #999);
}
.shop-list {
  li {
    @include fj(flex-start);
    border-bottom: 1px solid $bc;
    padding: 18px 8px;
  }
  .shop-img {
    @include wh(64px, 64px);
    img {
      @include coverimg;
    }
  }
  .shop-container {
    width: 100%;
    @include fj;
  }
  .left-container {
    margin-left: 10px;
    @include fj(center);
    flex-direction: column;
    .title {
      @include sc(14px, #333);
      font-weight: 700;
      line-height: 14px;
      span {
        text-align: center;
        display: inline-block;
        @include wh(30px, 14px);
        border-radius: 2px;
        font-weight: 700;
        line-height: 14px;
        font-size: 12px;
        background-color: #ffd930;
        margin-right: 5px;
      }
    }
    .order {
      margin: 20px 0 16px;
      line-height: 10px;
      @include sc(8px, #666);
    }
    .delivery-fee {
      @include sc(10px, #666);
      line-height: 10px;
    }
  }
  .right-container {
    text-align: right;
    @include fj(center);
    flex-direction: column;
    .support-icon {
      @include sc(8px, #999);
      left: 8px;
      span {
        border: 1px solid #f1f1f1;
        border-radius: 2px;
      }
    }
    .delivery {
      line-height: 14px;
      margin: 16px 0 16px;
      span {
        display: inline-block;
        text-align: center;
        line-height: 14px;
        padding: 0 2px;
        background-color: $blue;
        border-radius: 2px;
        @include sc(8px, #fff);
        border: 1px solid $blue;
      }
      span:last-child {
        margin-left: 2px;
        border: 1px solid $blue;
        color: $blue;
        background-color: #fff;
      }
    }
    .distance-time {
      font-size: 10px;
      line-height: 10px;
      color: #999;
      .time {
        color: $blue;
      }
    }
  }
}
</style>