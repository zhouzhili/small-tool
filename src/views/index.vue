<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const navList = reactive([
  {
    name: '朋友圈绿幕',
    url: 'wechat'
  },
  {
    name: '日记生成器',
    url: 'riji'
  }
])
const onNav = (url) => {
  router.push(`/${url}`)
}
</script>

<template>
  <div class="home">
    <el-row class="index">
      <el-col v-for="item in navList" :key="item.url" :span="4" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
          <div :class="['img', item.url]"></div>
          <div style="padding: 14px">
            <span style="margin-right: 16px">{{ item.name }}</span>
            <el-button type="text" @click="onNav(item.url)">前往</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.home{
  .center{
    text-align: center;
  }
  .img{
    height: 150px;
    background-size: 100%;
  }
  .wechat{
    background-image: url('../assets/wechat.png');
  }
  .riji{
    background-image: url('../assets/riji.png');
  }
}
</style>
