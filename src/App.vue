<script setup></script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="center">
          <h3>工具集合</h3>
        </div>
        <el-divider />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="less">
.common-layout{
  .el-header{
    padding: 0;
    .center{
      padding: 0 80px ;
    }
  }
}
</style>
