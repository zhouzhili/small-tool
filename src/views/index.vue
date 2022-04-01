<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import icon from '@/components/icon.vue'

const router = useRouter()

const navList = reactive([
  {
    name: '朋友圈绿幕',
    url: 'wechat',
    icon: 'icon-shejiaotubiao-02'
  },
  {
    name: '日记生成器',
    url: 'riji',
    icon: 'icon-qunfariji'
  },
  {
    name: 'base64转语音',
    url: 'audio',
    icon: 'icon-MPIS-TTS'
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
        <div class="item" @click="onNav(item.url)">
          <icon :iconName="item.icon"></icon>
          <span class="name">{{ item.name }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.home {
  .center {
    text-align: center;
  }
  .index{
    .item{
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border:1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 0 6px #e1e1e1;
      cursor: pointer;
      .icon{
        font-size: 28px;
        margin-right: 8px;
      }
      &:hover{
        box-shadow: 0 0 12px #67c23a;
        border-color: #67c23a;
      }
    }
  }
}
</style>
