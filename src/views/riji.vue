<script setup>
import HanziWriter from 'hanzi-writer'
import dayjs from 'dayjs'

let stopWrite = false

const input = ref(getDateFormStore('sent'))
const now = ref(new Date(getDateFormStore('date')))
const weather = ref(getDateFormStore('weather'))
const footerNum = ref(getDateFormStore('footerNum'))
const user = ref(getDateFormStore('user'))
const visible = ref('visible')

const writeSetting = {
  width: 40,
  height: 40,
  padding: 4,
  showOutline: false,
  showCharacter: false,
  strokeAnimationSpeed: 15, // 5x normal speed
  delayBetweenStrokes: 2, // milliseconds
  strokeColor: '#000'
}

function getDateFormStore(key) {
  return localStorage.getItem(key)
}

function setDataToStorage(key, val) {
  localStorage.setItem(key, val)
}

function storeData() {
  setDataToStorage('sent', input.value)
  setDataToStorage('user', user.value)
  setDataToStorage('weather', weather.value)
  setDataToStorage('date', dayjs(now.value).format('YYYY-MM-DD'))
  setDataToStorage('footerNum', footerNum.value)
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

function checkChinese(str) {
  var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
  return reg.test(str)
}

function createWriter(char, charWarpEl, isTime) {
  const div = document.createElement('div')
  const id = Math.random().toString()
  div.id = id
  document.getElementById(charWarpEl).appendChild(div)
  if (checkChinese(char) && char !== '玦') {
    div.className = 'char-item'
    const setting = isTime ? { ...writeSetting, width: 28, height: 28, padding: 3 } : writeSetting
    const writer = HanziWriter.create(id, char, setting)
    return writer.animateCharacter()
  } else {
    div.className = 'bd-item'
    div.innerHTML = `<span class='bd'>${char}</span>`
    return Promise.resolve()
  }
}

async function writeArr(txt, elsWrap, isTime) {
  const arr = txt.split('')
  for (const char of arr) {
    if (stopWrite) {
      break
    } else {
      await createWriter(char, elsWrap, isTime)
    }
  }
}

async function writeTime(now) {
  const weekMap = ['日', '一', '二', '三', '四', '五', '六']
  const els = ['year', 'week', 'weather']
  els.forEach((id) => {
    document.getElementById(id).innerHTML = ''
  })
  const yearStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
  const week = `星期${weekMap[now.getDay()]}`
  await writeArr(yearStr, 'year', true)
  await writeArr(week, 'week', true)
  await writeArr(weather.value, 'weather', true)
}

async function writeTxt(txt) {
  const arr = txt.split('\n')
  for (const section of arr) {
    if (stopWrite) {
      break
    } else {
      const div = document.createElement('div')
      const id = `section-${Math.random().toString()}`
      div.id = id
      div.className = 'paragraph'
      document.getElementById('char-content').appendChild(div)
      await writeArr(section, id)
    }
  }
}

const onBeginWrite = async () => {
  stopWrite = true
  document.getElementById('char-content').innerHTML = ''
  await sleep(100)
  stopWrite = false
  await writeTime(now.value)
  const txt = input.value.trimEnd()
  await writeTxt(txt)
  await writeArr(user.value, 'signature-content')
  storeData()
}

const onResetNote = async () => {
  stopWrite = true
  Array.from(document.querySelectorAll('.char-item,.bd-item,.paragraph')).forEach((el) => {
    el.parentNode.removeChild(el)
  })
  await sleep(100)
}

const onHideSent = () => {
  visible.value = visible.value === 'visible' ? 'hidden' : 'visible'
}
</script>

<template>
  <div class="riji">
    <div id="character-target-div">
      <div class="time-content">
        <div id="year" class="flex"></div>
        <div id="week" class="flex"></div>
        <div id="weather" class="flex"></div>
      </div>
      <div id="char-content"></div>
      <div id="signature-content"></div>
      <div class="footer">
        <span>• {{ footerNum }} •</span>
      </div>
    </div>
    <div class="right">
      <el-row :gutter="20">
        <el-col :span="6" :sm="12">
          <div class="form-item">
            <label>日期：</label>
            <el-date-picker v-model="now" type="date" placeholder="选择日期" />
          </div>
        </el-col>
        <el-col :span="6" :sm="12">
          <div class="form-item">
            <label>天气：</label>
            <el-input v-model="weather" placeholder="输入天气" />
          </div>
        </el-col>
        <el-col :span="6" :sm="12">
          <div class="form-item">
            <label>作者：</label>
            <el-input v-model="user" placeholder="输入用户" />
          </div>
        </el-col>
        <el-col :span="6" :sm="12">
          <div class="form-item">
            <label>页码：</label>
            <el-input-number v-model="footerNum" placeholder="输入天气" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="form-item textarea-item">
            <label>内容：</label>
            <el-input
              type="textarea"
              :rows="12"
              v-model="input"
              placeholder="请输入日记内容"
              class="textarea"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="btn-wrap">
            <el-button type="primary" @click="onBeginWrite">书写</el-button>
            <el-button type="primary" @click="onResetNote">重置</el-button>
            <el-button type="primary" @click="onHideSent">隐藏正文</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="less">
.riji {
  display: flex;
  padding: 20px;
  .right {
    padding: 20px 0 0 50px;
    flex: 1;
    .form-item {
      display: flex;
      padding: 8px 0;
      align-items: center;
      label {
        color: #606266;
        display: block;
        min-width: 50px;
      }
    }
    .textarea-item {
      align-items: flex-start;
    }
    .btn-wrap {
      padding-left: 50px;
    }
  }
  * {
    box-sizing: border-box;
  }

  .char-item {
    // height: 30px;
  }
  .bd-item,
  .char-item {
    // height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex {
    display: flex;
  }
  .bd {
    height: 20px;
  }

  #character-target-div {
    width: 560px;
    height: 780px;
    background-image: url('../assets/rj-bg.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    padding: 118px 65px 0 85px;
    .paragraph {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
    }
    #char-content {
      visibility: v-bind(visible);
    }

    .time-content {
      position: absolute;
      top: 63px;
      left: 85px;
      display: flex;
      align-items: center;
      width: 300px;
      padding-left: 5px;
    }
    #week,
    #year {
      margin-right: 20px;
    }
    #signature-content {
      display: flex;
      margin-left: 330px;
      margin-top: 30px;
      padding-right: 65px;
    }
    .footer {
      position: absolute;
      bottom: 55px;
      left: 270px;
      color: #9d9191;
    }
  }
}
</style>
