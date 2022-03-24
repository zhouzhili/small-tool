<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { fabric } from 'fabric'
import temImg from '@/assets/tmp.png'
import avatarImg from '@/assets/avatar.png'

const state = reactive({
  form: {
    title: '',
    time: '08:30',
    peopleList: [
      { name: '', msg: '' },
      { name: '', msg: '' },
      { name: '', msg: '' }
    ]
  },
  img: temImg,
  zanFileList: [],
  commentFileList: []
})

const zanRef = ref('')

let canvas = null
const loadImg = (url) => {
  return new Promise((resolve) => {
    fabric.Image.fromURL(url, (img) => {
      resolve(img)
    })
  })
}

const loadAvatarImg = async (url) => {
  const img = await loadImg(url)
  const width = img.width
  const height = img.height
  const w = 70
  if (width >= height) {
    img.scaleToHeight(w)
  } else {
    img.scaleToWidth(w)
  }

  return img
}

const loadZanImgs = async (list) => {
  for (let i = 0; i < list.length; i++) {
    const img = await loadAvatarImg(list[i])
    img.set({
      left: 89 + 81 * i,
      top: 1087
    })
    canvas.add(img)
  }
}

const loadCommentImg = async (list) => {
  for (let i = 0; i < list.length; i++) {
    const img = await loadAvatarImg(list[i])
    img.set({
      left: 86,
      top: 1203 + 108 * i
    })
    canvas.add(img)
  }
}

const init = async () => {
  canvas = new fabric.StaticCanvas('c')
  // 背景图
  const img = await loadImg(temImg)
  canvas.add(img)
}

const getAvatarImgList = (list, maxLen) => {
  const len = list.length
  let defaultUrl = avatarImg
  if (len > 0 && len < maxLen) {
    defaultUrl = list[len - 1].url
    return new Array(maxLen - len).fill(defaultUrl).concat(list.map((f) => f.url))
  } else {
    return new Array(maxLen).fill(defaultUrl)
  }
}

// 合成图片
const createImg = async () => {
  canvas.clear()
  // 点赞的头像
  const zanImgList = getAvatarImgList(state.zanFileList, 8)
  await loadZanImgs(zanImgList)

  // 评论席
  const commentImgList = getAvatarImgList(state.commentFileList, 3)
  await loadCommentImg(commentImgList)

  // 背景图
  const img = await loadImg(temImg)
  canvas.add(img)

  const { title, time, peopleList } = state.form

  // 标题
  const titleObj = new fabric.Text(title, {
    fontFamily: '黑体-简',
    fontSize: 32,
    fill: '#1a1a1a',
    left: 125,
    top: 167
  })
  canvas.add(titleObj)

  // 时间
  const timeObj = new fabric.Text(time, {
    fontFamily: '黑体-简',
    fontSize: 28,
    fill: '#c5c5c5',
    left: 117,
    top: 1012
  })
  canvas.add(timeObj)

  // 评论席
  const nameObj = {
    fontFamily: '黑体-简',
    fontSize: 28,
    fill: '#5b6a91'
  }
  peopleList.forEach((item, ind) => {
    const pName = new fabric.Text(item.name, {
      ...nameObj,
      left: 166,
      top: 1202 + 110 * ind
    })
    const pMsg = new fabric.Text(item.msg, {
      ...nameObj,
      fill: '#1a1a1a',
      left: 166,
      top: 1202 + 108 * ind + 42
    })
    canvas.add(pName)
    canvas.add(pMsg)
  })
  canvas.requestRenderAll()
  state.img = canvas.toDataURL({
    width: 828,
    height: 1792
  })
}

// 下载
const downloadImg = () => {
  const a = document.createElement('a')
  a.download = '模板'
  a.href = state.img
  document.body.append(a)
  a.click()
  document.body.removeChild(a)
}

// 点赞
const handleZanChange = (file, list) => {
  state.zanFileList = list
}

const delFile = (file) => {
  state.zanFileList = state.zanFileList.filter((f) => f.uid !== file.uid)
}

// 评论
const handleCommentChange = (file, list) => {
  if (state.commentFileList.length > 2) {
    ElMessage.warning('评论头像最多3个')
  }
  state.commentFileList = list
}

const delCommentFile = (file) => {
  state.commentFileList = state.commentFileList.filter((f) => f.uid !== file.uid)
}

onMounted(init)
</script>

<template>
  <div class="wechat">
    <div class="form">
      <el-form :model="form" label-width="70px" label-position="left">
        <el-form-item label="标题">
          <el-input v-model="state.form.title" placeholder="输入标题"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="state.form.time" placeholder="输入时间"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, ind) in state.form.peopleList"
          :key="ind"
          :label="'评论席' + (ind + 1)"
          class="comment-item"
        >
          <div class="p-item">
            <label>姓名:</label>
            <el-input v-model="item.name" placeholder="输入姓名"></el-input>
          </div>
          <div class="p-item">
            <label>评论:</label>
            <el-input v-model="item.msg" placeholder="输入评论"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="点赞头像" class="upload-item">
          <el-upload
            class="upload-demo"
            action="#"
            list-type="picture-card"
            :file-list="state.zanFileList"
            :on-change="handleZanChange"
            :auto-upload="false"
            :limit="7"
          >
            <template #file="{ file }">
              <div class="el-upload-list__item">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <el-button type="danger" @click="delFile(file)">删除</el-button>
              </div>
            </template>
            <template #default>
              <el-button type="primary" :disabled="state.zanFileList.length > 7">选择文件</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="评论头像" class="upload-item">
          <el-upload
            class="upload-demo"
            action="#"
            list-type="picture-card"
            :file-list="state.commentFileList"
            :on-change="handleCommentChange"
            :auto-upload="false"
            :limit="3"
          >
            <template #file="{ file }">
              <div class="el-upload-list__item">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <el-button type="danger" @click="delCommentFile(file)">删除</el-button>
              </div>
            </template>
            <template #default>
              <el-button type="primary" :disabled="state.commentFileList.length > 2">选择文件</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createImg">创建图形</el-button>
          <el-button type="success" @click="downloadImg">下载图形</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="img-wrap">
      <canvas id="c" width="828" height="1792"></canvas>
      <el-image :src="state.img" :preview-src-list="[state.img]" :initial-index="0"> </el-image>
    </div>
  </div>
</template>

<style lang="less">
.wechat {
  #c {
    border: 1px solid #ddd;
    display: none;
  }
  .form {
    padding: 24px;
    .p-item {
      display: flex;
      flex: 1;
      padding: 0 10px;
      label {
        display: inline-block;
        width: 40px;
      }
    }
    .upload-item {
      .el-form-item__content {
        .upload-demo {
          .el-upload--picture-card {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .el-upload-list__item {
            position: relative;
            .el-button {
              position: absolute;
              bottom: 0;
              left: 4px;
              z-index: 99;
            }
          }
          .el-upload-list {
            .el-upload-list__item {
              width: 72px;
              height: 72px;
            }
          }
        }
      }
    }
  }
  .img-wrap {
    text-align: center;
    .el-image {
      height: 300px;
    }
  }
}

@media screen and (max-width: 500px) {
  .wechat .form {
    .comment-item {
      flex-direction: column;
      .el-form-item__content {
        display: block;
        .p-item {
          padding: 8px 0;
        }
      }
    }
  }
}
</style>
