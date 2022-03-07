<!--
 * @Author: hzheyuan
 * @Date: 2022-03-04 17:01:41
 * @LastEditTime: 2022-03-07 23:22:07
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/demo/Vector.vue
-->
<template>
  <div class="Vector-test">
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
import { Vector } from '../src/container/sequence/vector/vector'

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

const logData = (list, dec?: string) => {
  let begin = list.begin(), str = ''
  for(let item of begin) {
    str += ` ${item}`
  }
  if(dec) console.log(`${dec}: `, str)
  else console.log(str)
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

  // 可视化  
  // chart.drawList(list)

  console.log('=====Iterator=====')
  logData(vec, 'iterator')

  console.log('=====Capacity=====')
  console.log('empty', vec.empty())
  console.log('size', vec.size())

  console.log('=====Element Access=====')
  console.log('front', vec.front())
  console.log('back', vec.back())


  console.log('=====Modifiers=====')
  let begin = vec.begin(), end = vec.end()
  vec.insert(begin.next(), '5')
  logData(vec, 'begin next insert 5')

  vec.insert(end, '2')
  logData(vec, 'insert at en with 2 20')

//   vec.erase(begin)
//   logData(vec, 'erase begin')

//   vec.resize(5, '5')
//   logData(list, 'resize 5 5')

  // list.unique()
  // logData(list, 'resize 5 5')

  // vec.clear()
//   logData(list, 'resize 5 5')
  console.log('=====Operations=====')
}

onMounted(test)

</script>
<style lang="css" scoped>
</style>