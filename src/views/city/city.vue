<template>
  <div>
    <Header :head-title="cityInfo.name" :head-back="true">
      <router-link slot="changeCity" :to="{ name: 'home' }" class="change_city">切换城市</router-link>
    </Header>
    <section class="search_container">
      <input class="search_input" type="search" v-model="keyword" required placeholder="输入学校、商务楼、地址" />
      <input class="search_btn" type="submit" value="提交" @click="search" />
    </section>
    <p class="result_title" v-if="placeHistory.length>0">搜索历史</p>
    <section class="result_container">
      <ul>
        <li v-for="item in result" :key="item.name" @click="nextpage(item)">
          <h4>{{ item.name }}</h4>
          <p>{{ item.address }}</p>
        </li>
        <li v-for="item in placeHistory" :key="item.name" @click="nextpage(item)">
          <h4>{{ item.name }}</h4>
          <p>{{ item.address }}</p>
        </li>
        <li class="clear_result" v-if="placeHistory.length>0" @click="clearHistory">清空历史</li>
      </ul>
    </section>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue'
import { getCityInfo, pois } from '@/api/api'
import { getStore, setStore, removeStore } from '@/utils/myUtils'

export default {
  name: 'City',
  data() {
    return {
      cityInfo: '',
      keyword: '',
      result: [],
      placeHistory: [],
    }
  },
  components: {
    Header,
  },
  mounted() {
    getCityInfo(this.$route.params.cityid).then(res => {
      this.cityInfo = res
    })
    this.initData()
  },
  watch: {
    keyword() {
      this.search()
    },
  },
  methods: {
    search() {
      const cityid = this.cityInfo.id
      const keyword = this.keyword
      if (keyword) {
        pois(cityid, keyword).then(res => {
          this.result = res
        })
      }
    },
    initData() {
      // 获取搜索历史
      const history = getStore('placeHistory')
      if (history) {
        this.placeHistory = JSON.parse(history)
      } else {
        this.placeHistory = []
      }
    },
    /**
     * 点击搜索结果进入下一页面时候判断是否有一样的历史记录
     * 如果没有则添加，如果有则不做重复储存，判断完成后进入下一个页面
     */
    nextpage(item) {
      const { geohash } = item
      let history = getStore('placeHistory')
      if (history) {
        let checkrepeat = false
        // this.placeHistory = JSON.parse(history)
        this.placeHistory.forEach(item => {
          if (item.geohash === geohash) {
            checkrepeat = true
          }
        })
        if (!checkrepeat) {
          this.placeHistory.push(item)
        }
      } else {
        this.placeHistory.push(item)
      }
      setStore('placeHistory', this.placeHistory)
      this.$router.push({ name: 'msite', query: { geohash } })
    },
    clearHistory() {
      removeStore('placeHistory')
      this.placeHistory = []
    },
  },
}
</script>

<style lang="scss" scoped>
.change_city {
  right: 12px;
  @include sc(14px, #fff);
  @include ct;
}
.search_container {
  padding: 20px 24px;
  background-color: #fff;
  border-bottom: 1px solid $bc;
  input {
    @include wh(100%, 32px);
    border: 1px solid $bc;
    border-radius: 4px;
    font-size: 14px;
  }
  .search_input {
    padding-left: 7px;
    line-height: 32px;
  }
  .search_input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #999;
  }
  .search_input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #999;
  }
  .search_input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #999;
  }
  .search_input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #999;
  }
  .search_btn {
    background-color: $blue;
    color: #fff;
    font-weight: 600;
    margin-top: 10px;
  }
}
.result_title {
  font-size: 12px;
}
.result_container {
  background-color: #fff;
  li {
    border-bottom: 1px solid $bc;
    padding: 16px 20px 12px;
    h4 {
      @include sc(16px, #000);
      margin-bottom: 10px;
    }
    p {
      @include sc(12px, #ccc);
    }
  }
  .clear_result {
    font-size: 14px;
    text-align: center;
  }
}
</style>

