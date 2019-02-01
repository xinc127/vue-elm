<template>
  <div>
    <Header>
      <router-link to="" slot="search" class="head_search">
        <img src="@/assets/svg/search.svg" alt="" />
      </router-link>
      <router-link :to="{ name: 'home' }" slot="msiteTitle" class="head_title">{{ msiteTitle }}</router-link>
    </Header>

    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <router-link to="" class="swiper-slide">
            111
          </router-link>
          <router-link to="" class="swiper-slide">
            111
          </router-link>
          <router-link to="" class="swiper-slide">
            111
          </router-link>
          <router-link to="" class="swiper-slide">
            111
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Header from '@/components/header/header.vue'
import { getCities, msiteAddress, msiteFoodType } from '@/api/api'
import '@/utils/swiper.min.js'
import '@/style/swiper.min.css'

export default {
  name: 'Msite',
  data() {
    return {
      geohash: '',
      msiteTitle: '',
      foodTypes: '',
    }
  },
  components: {
    Header,
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
          direction: 'vertical',
          loop: true,
        })
      })
  },
  methods: {
    ...mapMutations(['RECORD_ADDRESS', 'SAVE_GEOHASH']),
  },
}
</script>

<style lang="scss" scoped>
.head_search {
  @include ct;
  left: 20px;
  img {
    width: 20px;
    vertical-align: top;
  }
}
.head_title {
  @include sc(18px, #fff);
  width: 50%;
  @include nowrap;
}
</style>


