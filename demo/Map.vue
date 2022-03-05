<!--
 * @Author: hzheyuan
 * @Date: 2022-03-02 10:53:35
 * @LastEditTime: 2022-03-05 10:50:20
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/demo/Map.vue
-->
<template>
  <div class="Set-test">
    <div id="map-box" style="width: 100vw;height:100vh;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Map } from '../src/container/associative/map'
import { Tree } from '../src/container/tree/Tree'
import { Chart } from './chart'

let chart: any = ref(null)
let tr: Tree<number, string> = ref<any>(null)

const testSet = () => {
  const m = new Map<string, number>(); 
  console.log(m.empty())

  m.insert('a', 1)
  m.insert('b', 5)
  m.insert('c', 2)
  m.insert('d', 9)
  m.insert('x', 3)
  m.insert('y', 4)
  m.insert('z', 7)
  m['x'] = 11
  m['k'] = 4

  // console.log(m)
  // 可视化整颗树
  chart = new Chart('map-box')
  chart.drawTree(m._t)

  console.log('===keys====')
  let keys = m.begin().keys();
  for(let k of keys) {
    console.log(k)
  }

  console.log('===values====')
  let values = m.begin().values();
  for (let item of values) {
    console.log(item)
  }

  console.log('===entries====')
  let entries = m.begin().entries();
  for (let item of entries) {
    console.log(item)
  }

  // 删除
  console.log('erase', m.erase('c'))
  console.log('erase', m.erase('kkkk'))

  console.log('find', m.find('a'), m.find('a').get())
  console.log('find', m.find('g').get())
  chart.updateChart(m._t)

  console.log('count', m.count('a'))
  console.log('count', m.count('c'))

  console.log('lower_bound', m.lower_bound('c').key())
  console.log('upper_bound', m.upper_bound('d').get())
  console.log('equal_range', m.equal_range('d'))
}

onMounted(testSet)

</script>
<style lang="css" scoped>
</style>