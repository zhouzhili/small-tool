<script setup>
import { useRouter, useRoute } from 'vue-router'
import icon from '@/components/icon.vue'
const router = useRouter()
const route = useRoute()

const showBack = computed(() => route.path !== '/')

const onBack = () => router.go(-1)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="center">
          <icon iconName="icon-xitongfanhui" v-show="showBack" @click="onBack"></icon>
          <div>工具集合</div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="less">
.common-layout {
  .el-header {
    padding: 0;
    border-bottom: 1px solid #ddd;
    .center {
      padding: 0 60px;
      font-weight: 600;
      height: 60px;
      display: flex;
      align-items: center;
      .icon{
        margin-right: 16px;
        cursor: pointer;
      }
    }
  }
}
</style>
