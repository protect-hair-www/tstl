<!--
 * @Author: hzheyuan
 * @Date: 2022-03-12 12:10:21
 * @LastEditTime: 2022-03-12 15:07:32
 * @LastEditors: hzheyuan
 * @Description: heap
 * @FilePath: /tstl/demo/Heap.vue
-->
<template>
  <div class="heap-test">
    <div class="op">
      <div>
        <label for="insert">push_back</label>
        <input type="number" @keyup.enter="onPushBack" />
      </div>

      <div>
        <label for="insert">push_front</label>
        <input type="number" @keyup.enter="onPushFront" />
      </div>

      <div>
        <button @click="onGetFront">front</button>
        <button @click="onGetBack">back</button>
      </div>

      <div>
        <button @click="onPopFront">pop_front</button>
        <button @click="onPopBack">pop_back</button>
      </div>
    </div>
    <div id="list-box" style="width: 100vw;height:100vh;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart } from './chart'
import { Vector, makeHeap } from '../src/index'
import { testAllIterators, traverseCntr } from './util'

let chart: any = ref(null)
let vec: Vector<string> = ref<any>(null);

const onPushBack = (e) => {
  const v = e.target.value
  vec.push_back(v)
  //   chart.updateList(list)
}

const onPushFront = (e) => {
  const v = e.target.value
  vec.push_back(v)
  //   chart.updateList(list)
}

const onGetFront = () => {
  console.log(vec.front())
}

const onGetBack = () => {
  console.log(vec.back())
}

const onPopFront = (e) => {
  vec.pop_back()
  //   chart.updateList(list)
}

const onPopBack = (e) => {
  vec.pop_back()
  //   chart.updateList(list)
}

const test = () => {
  // 可视化整颗树
  //   chart = new Chart('list-box')
  //   chart.drawList(list)

  // 创建一个list容器
  vec = new Vector<string>();
  vec.push_back('1')
  vec.push_back('2')
  vec.push_back('3')
  vec.push_back('4')
  vec.push_back('5')
  console.log(vec)
  traverseCntr(vec, 'vec')

  // 可视化  
  // chart.drawList(list)
}

onMounted(test)

</script>
<style lang="css" scoped>
</style>

