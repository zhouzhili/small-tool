function download(url, name) {
  const a = document.createElement('a')
  a.download = name
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function base64ToBlob(base64) {
  const arr = base64.split(',')
  const mime = arr[0].split(';')[0].split(':')[1]
  const byteStr = atob(arr[1])
  const len = byteStr.length
  const intArray = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    intArray[i] = byteStr.charCodeAt(i)
  }
  return new Blob([intArray], { type: mime })
}

/**
 * base64转mp3下载
 * @param {*} base64 
 * @param {*} name 
 */
export function downloadMP3(base64, name) {
  const blob = base64ToBlob(base64)
  const url = URL.createObjectURL(blob)
  download(url, name)
}