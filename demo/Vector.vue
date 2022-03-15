<!--
 * @Author: hzheyuan
 * @Date: 2022-03-04 17:01:41
 * @LastEditTime: 2022-03-15 23:00:01
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
import { testAllIterators, traverseCntr,  Person} from './util'
import { Vector } from '../src/index'

import { Chart } from './chart'

let chart: any = ref(null)
// let vec: Vector<string> = ref<any>(null);
let vec: Vector<Person<string>> = ref<Vector<Person<string>>>(null);

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

const testObject = () => {
  // let vec: Vector<Person<string>> = new Vector<Person<string>>();
  let vec: Vector<string> = new Vector<string>();
  // 创建一个list容器
  ['nick', 'jack', 'kalai'].forEach(name => {
    // let ins: Person<string> = new Person<string>(name)
    vec.push_back(name)
  })
  console.log(vec)

  const front = vec.front()
  // vec.resize()
  const b = vec.begin()
  console.log(front.say())

  let c = new Array<Person<string>>();
  ['nick', 'jack', 'kalai'].forEach(name => {
    let ins = new Person<string>(name)
    c.push(ins)
  })

  let d:Vector<Person<string>> = new Vector<Person<string>>();
  // 创建一个list容器
  ['nick', 'jack', 'kalai'].forEach(name => {
    let ins: Person<string> = new Person<string>(name)
    d.push_back(ins)
  })
  let k = d.back()
  k.say()
}

// test js primitive type
const testPrimitive = () => {
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
  traverseCntr(vec, 'iterator')
  testAllIterators(vec)

  console.log('=====Capacity=====')
  console.log('empty', vec.empty())
  console.log('size', vec.size())

  console.log('=====Element Access=====')
  console.log('front', vec.front())
  console.log('back', vec.back())

  console.log('=====Modifiers=====')
  let itr = vec.begin()
  itr.next()
  vec.insert(itr, '5')
  traverseCntr(vec, 'begin next insert 5')

  vec.insert(vec.end(), '2')
  traverseCntr(vec, 'insert at en with 2')

  itr = vec.begin()
  itr.next(); itr.next()
  vec.insert(itr, 5, '7')
  traverseCntr(vec, 'insert at begin.next with 5 7')

  itr = vec.begin()
  itr.next()
  vec.insert(itr, vec.begin(), vec.end())
  traverseCntr(vec, 'inset a range of iterator')

  vec.erase(vec.begin())
  traverseCntr(vec, 'erase begin')

  vec.resize(10, '1')
  traverseCntr(vec, 'resize of 10 1')
  vec.resize(15, '1')
  traverseCntr(vec, 'resize of 15 1')

  vec.resize(5, '5')
  traverseCntr(vec, 'resize 5 5')

  console.log('=====Operations=====')
  vec.assign(6, '5')
  traverseCntr(vec, 'assign 6 5')

  let arr = ['1', '2', '4', '3']
  vec.assign(arr)
  traverseCntr(vec, 'assign iterable cntr')

  let vec2 = new Vector<string>();
  vec2.push_back('3')
  vec2.push_back('5')
  vec2.push_back('2')
  vec.assign(vec2.begin(), vec2.end())
  traverseCntr(vec, 'assign with iterator')

  vec2.clear()
  vec2.push_back('8')
  vec2.push_back('9')
  vec2.push_back('10')
  vec.swap(vec2)
  traverseCntr(vec, 'swap two vec')
  traverseCntr(vec2, 'swap two vec')

  vec.clear()
  traverseCntr(vec, 'clear')

  vec.emplace<String>(vec.begin(), String, '3')
  vec.emplace_back<String>(String, '5')
  traverseCntr(vec, 'emplace')
}

const test = () => {
  // 可视化整颗树
  //   chart = new Chart('list-box')
  //   chart.drawList(list)
  testObject()
}

onMounted(test)

</script>
<style lang="css" scoped>
</style>
