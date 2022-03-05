<!--
 * @Author: hzheyuan
 * @Date: 2022-03-04 17:01:41
 * @LastEditTime: 2022-03-05 17:41:29
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/demo/List.vue
-->
<template>
  <div class="List-test">
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
import { List } from '../src/container/sequence/list/list'

let chart: any = ref(null)
let list: List<string> = ref<any>(null);

const onPushBack = (e) => {
  const v = e.target.value
  list.push_back(v)
  chart.updateList(list)
}

const onPushFront = (e) => {
  const v = e.target.value 
  list.push_front(v)
  chart.updateList(list)
}

const onGetFront = () => {
  console.log(list.front())
}

const onGetBack = () => {
  console.log(list.back())
}

const onPopFront = (e) => {
  list.pop_front()
  chart.updateList(list)
}

const onPopBack = (e) => {
  list.pop_back()
  chart.updateList(list)
}

const logData = (list, dec?: string) => {
  let begin = list.begin(), str = ''
  for(let item of begin) {
    str += ` ${item}`
  }
  if(dec) console.log(`${dec}: `, str)
  else console.log(str)
}

const testSet = () => {
  // 可视化整颗树
  chart = new Chart('list-box')

  // 创建一个list容器
  list = new List<string>();
  list.push_back('1')
  list.push_back('2')
  list.push_back('3')
  list.push_back('4')
  list.push_back('5')
  chart.drawList(list)

  // 可视化  
  // chart.drawList(list)

  console.log('=====Iterator=====')
  logData(list)

  console.log('=====Capacity=====')
  console.log('empty', list.empty())
  console.log('size', list.size())

  console.log('=====Element Access=====')
  console.log('front', list.front())
  console.log('back', list.back())


  console.log('=====Modifiers=====')
  list.insert(list.begin().next(), '5')
  logData(list, 'begin next insert 5')

  list.insert(list.end(), 2, '20')
  logData(list, 'insert at en with 2 20')

  list.assign(2, '11')
  logData(list, 'assign 2 11')

  list.erase(list.begin())
  logData(list, 'erase begin')
  console.log(list)

  list.resize(5, '5')
  logData(list, 'resize 5 5')

  // list.unique()
  // logData(list, 'resize 5 5')

  list.resize(2, '5')
  logData(list, 'resize 5 5')

  list.clear()
  logData(list, 'resize 5 5')

  console.log('=====Operations=====')
  list.push_back('1')
  list.push_back('2')
  list.push_back('3')
  list.push_back('4')
  list.push_back('5')


}

onMounted(testSet)

</script>
<style lang="css" scoped>
</style>