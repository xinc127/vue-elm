<template>
  <div>
    <Header :sign-up="true">
      <h4 slot="logo" class="header_logo" @click="reload">ele.me</h4>
    </Header>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市是：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="{ name: 'city', params: { cityid: guessId } }" class="guess_city">
        <span>{{ guessCity }}</span>
      </router-link>
    </nav>
    <img src="" alt="" />
    <section class="hot_city_container">
      <h4>热门城市</h4>
      <ul>
        <router-link tag="li" v-for="item in hotCities" :key="item.id" :to="{ name: 'city', params: { cityid: item.id } }" class="city_box">
          {{ item.name }}
        </router-link>
      </ul>
    </section>
    <section class="group_city_container">
      <ul>
        <li class="city_group" v-for="(item, key, index) in sortGroupCities" :key="index">
          <h4>{{ key }}<span v-if="index === 0">(按字母顺序排序)</span></h4>
          <ul>
            <router-link tag="li" v-for="items in item" :key="items.id" :to="{ name: 'city', params: { cityid: items.id } }" class="city_box">
              {{ items.name }}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue'
import { getCities } from '@/api/api'

export default {
  name: 'Home',
  components: {
    Header,
  },
  data() {
    return {
      guessCity: '', // 定位城市
      guessId: '', // 定位城市id
      hotCities: [], // 热门城市列表
      groupCities: {}, // 全部城市列表
    }
  },
  computed: {
    // 将获取到的城市列表A-Z排序
    sortGroupCities() {
      let sortObj = {}
      for (let i = 65; i <= 90; i++) {
        const code = String.fromCharCode(i)
        sortObj[code] = this.groupCities[code]
      }
      return sortObj
    },
  },
  mounted() {
    // 获取定位地址
    getCities('guess').then(res => {
      this.guessCity = res.name
      this.guessId = res.id
    })
    // 获取热门城市
    getCities('hot').then(res => {
      this.hotCities = res
    })
    // 获取全部城市
    getCities('group').then(res => {
      console.log(res)
      this.groupCities = res
    })
  },
  methods: {
    // 点击刷新页面
    reload() {
      window.location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
.header_logo {
  @include sc(12px, #fff);
  display: inline;
  line-height: 46px;
  padding: 0 10px;
}

.city_nav {
  background-color: #fff;
  border-bottom: 2px solid $bc;
  .city_tip {
    @include fj;
    padding: 0 12px;
    line-height: 44px;
    border-bottom: 1px solid $bc;
    span:nth-child(1) {
      @include sc(12px, #666);
    }
    span:nth-child(2) {
      @include sc(12px, #9f9f9f);
    }
  }
  .guess_city {
    padding: 0 14px 0 12px;
    line-height: 41px;
    display: block;
    span {
      @include sc(16px, $blue);
    }
  }
}
.hot_city_container,
.group_city_container {
  border-top: 2px solid $bc;
  background-color: #fff;
  margin-top: 10px;
  h4 {
    @include sc(12px, #666);
    line-height: 30px;
    padding-left: 10px;
    border-bottom: 1px solid $bc;
  }
  ul {
    @include clearfix;
    li.city_box {
      float: left;
      text-align: center;
      line-height: 40px;
      @include wh(25%, 40px);
      @include sc(14px, $blue);
      @include nowrap;
      border-right: 1px solid $bc;
      border-bottom: 1px solid $bc;
    }
  }
}
.group_city_container {
  li.city_group {
    border-bottom: 1px solid $bc;
  }
  li.city_box {
    color: #666 !important;
  }
}
</style>
