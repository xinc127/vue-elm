<template>
  <div>
    <header-top :head-title="headTitle" :head-back="true"></header-top>
    <section class="sort-container">
      <!-- 分类 -->
      <div class="sort-item">
        <div class="sort-item-border" @click="changeType('food')">
          <span :class="{'active-title': sortType == 'food'}">分类</span>
        </div>
        <section v-show="sortType == 'food'" class="sort-detail category-container">
          <ul class="parent-ul">
            <li v-for="(item, index) in shopTypes" :key="item.id" @click="selectCategoryName(item.name, index)">
              <section class="parent">
                {{ item.name }}
              </section>
            </li>
          </ul>
          <ul class="child-ul">
            <li v-for="childItem in currentCategory" :key="childItem.id"></li>
          </ul>
        </section>
      </div>
      <!-- 排序 -->
      <div class="sort-item">
        <div class="sort-item-border" @click="changeType('sort')">
          <span :class="{'active-title': sortType == 'sort'}">排序</span>
        </div>
        <section v-show="sortType == 'sort'" class="sort-detail">
          排序详情
        </section>
      </div>
      <!-- 筛选 -->
      <div class="sort-item">
        <div class="sort-item-border" @click="changeType('act')">
          <span :class="{'active-title': sortType == 'act'}">筛选</span>
        </div>
        <section v-show="sortType == 'act'" class="sort-detail">
          筛选详情
        </section>
      </div>
    </section>
    <div class="clear-sort-container"></div>
    <shop-list v-if="latitude"></shop-list>
  </div>
</template>

<script>
import headerTop from '@/components/header/header.vue'
import shopList from '@/components/common/shoplist.vue'
import { mapState, mapMutations } from 'vuex'
import { getShopTypes, msiteAddress } from '@/api/api'

export default {
  data() {
    return {
      sortType: 'food', // 下拉标签
      sortTypes: [],
      headTitle: '',
      geohash: '',
      restaurant_category_id: '', // 分类id
      currentCategoryName: '', // 当前选择分类
      currentCategoryIndex: '', // 当前选择分类序号
      currentCategory: this.shopTypes(this.currentCategoryIndex),
    }
  },
  components: {
    shopList,
    headerTop,
  },
  computed: {
    ...mapState(['latitude', 'longitude']),
  },
  mounted() {
    console.log(this.sortType)
    this.initData()
  },
  methods: {
    ...mapMutations(['RECORD_ADDRESS', 'SAVE_GEOHASH']),
    async initData() {
      // 从msite页面传过来的数据
      this.geohash = this.$route.query.geohash
      this.headTitle = this.$route.query.title
      this.restaurant_category_id = this.$route.query.restaurant_category_id
      // 防止页面刷新，vuex数据丢失
      if (!this.latitude) {
        // 获取位置信息
        let res = await msiteAddress(this.geohash)
        this.RECORD_ADDRESS(res)
      }
      // 获取商铺分类列表
      let shopTypes = await getShopTypes(this.latitude, this.longitude)
      console.log(shopTypes)
      this.shopTypes = shopTypes
    },
    // 切换标签
    changeType(type) {
      // 已有下拉标签 再次点击相同标签则关闭
      if (this.sortType == type) {
        this.sortType = ''
      } else {
        this.sortType = type
      }
    },
    // 分类下拉 选择左侧分类 渲染右侧列表
    selectCategoryName(name, index) {
      this.currentCategoryName = name
      this.currentCategoryIndex = index
    },
  },
}
</script>

<style lang="scss" scoped>
.sort-container {
  position: fixed;
  top: 46px;
  left: 0;
  width: 100%;
  background-color: #fff;
  @include fj;
  border-bottom: 1px solid $bc;
  .sort-item {
    width: 100%;
    // 排序 筛选 分类 标题
    .sort-item-border {
      text-align: center;
      @include sc(12px, #333);
      line-height: 24px;
      margin: 7px 0;
      border-right: 1px solid $bc;
      .active-title {
        color: $blue;
      }
    }
    // 下拉框
    .sort-detail {
      position: absolute;
      top: 38px;
      left: 0;
      background-color: pink;
      width: 100%;
    }
    .category-container {
      @include fj;
    }
  }
}
.clear-sort-container {
  height: 38px;
}
</style>