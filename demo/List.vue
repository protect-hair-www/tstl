<!--
 * @Author: hzheyuan
 * @Date: 2022-03-04 17:01:41
 * @LastEditTime: 2022-03-04 17:02:56
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\demo\List.vue
-->
<template>
  <dev class="List-test">
    <div id="list-box" style="width: 100vw;height:100vh;"></div>
  </dev>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart } from './chart'

let chart: any = ref(null)

const testSet = () => {
  // 可视化整颗树
  chart = new Chart('list-box')
  chart.drawList()
}

onMounted(testSet)

</script>
<style lang="css" scoped>
</style>