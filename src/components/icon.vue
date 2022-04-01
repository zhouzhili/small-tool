<script setup>
const props = defineProps({
  iconName: [String]
})
</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + props.iconName"></use>
  </svg>
</template>

<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em; //宽高可设成100% 这样可以根据父级元素改变图标大小
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
