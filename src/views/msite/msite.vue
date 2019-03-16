<template>
  <div>
    <header-top class="header" :sign-up="true">
      <router-link to="" slot="search" class="head_search">
        <img src="@/assets/svg/search.svg" alt="" />
      </router-link>
      <router-link :to="{ name: 'home' }" slot="msiteTitle" class="head_title">
        {{ msiteTitle }}
      </router-link>
    </header-top>

    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <ul v-for="items in foodTypes" :key="items[0].id" class="swiper-slide">
            <router-link
:to="{ name: 'food', query: { geohash, title: item.title, restaurant_category_id: getCategoryId(item.link) } }" tag="li" v-for="item in items"
              :key="item.id" class="swiper-item">
              <img :src='baseImgurl + item.image_url' alt="" />
              <p>{{ item.title }}</p>
            </router-link>
          </ul>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>

    <shop-list v-if="getAddressData"></shop-list>

    <footer-guide></footer-guide>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import headerTop from '@/components/header/header.vue'
import footerGuide from '@/components/footer/footer.vue'
import shopList from '@/components/common/shoplist.vue'
import { getCities, msiteAddress, msiteFoodType } from '@/api/api'
import Swiper from 'swiper'
import 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'Msite',
  data() {
    return {
      geohash: '',
      msiteTitle: '',
      foodTypes: [],
      baseImgurl: 'https://fuss10.elemecdn.com',
      getAddressData: false, // 获取到地址信息后开始加载商铺列表
    }
  },
  components: {
    headerTop,
    footerGuide,
    shopList,
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await getCities('guess')
      this.geohash = address.latitude + ',' + address.longitude
    } else {
      this.geohash = this.$route.query.geohash
    }

    this.SAVE_GEOHASH(this.geohash)
    // 获取详细地址
    let res = await msiteAddress(this.geohash)
    this.msiteTitle = res.name
    this.RECORD_ADDRESS(res)
    this.getAddressData = true
  },
  mounted() {
    msiteFoodType()
      .then(res => {
        let resLength = res.length
        let resArr = [...res]
        let foodArr = []
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8)
        }
        this.foodTypes = foodArr
      })
      .then(() => {
        new Swiper('.swiper-container', {
          loop: true, //循环模式

          // 分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
  },
  methods: {
    ...mapMutations(['RECORD_ADDRESS', 'SAVE_GEOHASH']),
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split('=')[1].replace('&target_name', ''),
      )
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id
      } else {
        return ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  .head_search {
    @include ct;
    left: 20px;
    img {
      width: 20px;
      vertical-align: top;
    }
  }
  .head_title {
    @include sc(16px, #fff);
    width: 50%;
    @include nowrap;
  }
}
.msite_nav {
  border-bottom: 2px solid $bc;
  background-color: #fff;
  .swiper-container {
    height: 200px;
    padding-bottom: 20px;
    .swiper-slide {
      @include fj;
      flex-wrap: wrap;
      text-align: center;
      .swiper-item {
        width: 25%;
        position: relative;
        img {
          width: 50%;
          @include cl;
          top: 10px;
        }
        p {
          width: 100%;
          @include cl;
          bottom: 10px;
          @include sc(12px, #000);
        }
      }
    }
  }
}
</style>
