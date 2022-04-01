<script setup>
const audioStr = ref('')
const audio = ref('')
const onConvert = () => {
  audio.value = ''
  audio.value = audioStr.value
}
</script>

<template>
  <div class="audio">
    <el-row>
      <el-col :span="24">
        <div class="tips">
          <span>base64字符串</span>
          <span class="example">示例：data:audio/mpeg;base64,....</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input type="textarea" :rows="8" v-model="audioStr"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="onConvert">转换</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <audio controls="controls" autobuffer="autobuffer"  v-if="audio">
          <source :src="audio" />
        </audio>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.audio {
  .el-row{
    margin: 16px 0;
    .tips{
      .example{
        opacity: 0.5;
        margin-left: 8px;
      }
    }
  }
}
</style>
