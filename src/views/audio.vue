<script setup>
import { ElMessage } from 'element-plus'
import { downloadMP3 } from '@/utils/index.js'
const audio = ref('')
const uploadRef = ref('')

const handleExceed = files=>{
  uploadRef.value.clearFiles()
  audio.value = ''
  const file = files[0]
  file.uid = Date.now()
  uploadRef.value.handleStart(file)
}

const onConvert = () => {
  const file = uploadRef.value.uploadFiles[0]
  if (file) {
    audio.value = ''
    const reader = new FileReader()
    reader.readAsText(file.raw)
    reader.onload = function (rea) {
      const result = rea.target.result
      try {
        const data = JSON.parse(result)
        if (data.log.entries) {
          const media = data.log.entries.find((s) => s._resourceType === 'media')
          if (media) {
            const audioText = media.response.content.text
            audio.value = `data:audio/mpeg;base64,${audioText}`
          }
        }
      } catch (e) {
        ElMessage.error('转换JSON失败')
        console.log(e)
      }
    }
  }
}
const onDownload = () => {
  if (audio.value) {
    downloadMP3(audio.value, `录音-${Date.now()}.mp3`)
  }
}
</script>

<template>
  <div class="audio">
    <el-row>
      <el-col :span="24" class="title">
        <h4>根据har文件提取中的音频数据</h4>
        <span class="tips">可从阿里云语音合成界面白嫖，然后将接口调用信息保存har文件到本地</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <el-upload action="" :auto-upload="false" :on-exceed="handleExceed" :limit="1" ref="uploadRef" accept=".har">
            <el-button>选择文件</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="onConvert">转换</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="onDownload">下载</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <audio controls="controls" autobuffer="autobuffer" v-if="audio">
          <source :src="audio" />
        </audio>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.audio {
  .el-row {
    margin: 16px 0;
    .title {
      display: flex;
      align-items: center;
      .tips {
        opacity: 0.5;
        margin-left: 8px;
      }
    }
  }
}
</style>
