<!--
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:50:15
 * @LastEditTime: 2022-03-03 17:16:10
 * @LastEditors: hzheyuan
 * @Description: 迭代器测试
 * @FilePath: \tstl\demo\MultiSet.vue
-->
<template>
  <dev class="Set-test">
    <div id="multiset-box" style="width: 100vw;height:100vh;"></div>
  </dev>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MultiSet } from '../src/container/associative/multiset'
import { Tree } from '../src/container/tree/Tree'
import { Chart } from './chart'

let chart: any = ref(null)
let tr: Tree<number, string> = ref<any>(null)

const testSet = () => {
  const s = new MultiSet<string>();
  console.log('empty', s.empty())

  s.insert('aa')
  s.insert('cc')
  s.insert('xx')
  s.insert('yy')
  s.insert('zz')
  s.insert('zz')
  s.insert('zz')
  s.insert('zz')
  s.insert('dd')
  s.insert('bb')
  s.insert('dd')

  // 可视化整颗树
  chart = new Chart('multiset-box')
  chart.drawTree(s._t)

  console.log('empty', s.empty())
  console.log('size', s.size())

  console.log('find', s.find('cc').key(), s.find('cc').value())
  console.log('find', s.find('eeee').key())

  console.log('count', s.count('zz'))
  console.log('count', s.count('xx'))
  console.log('count', s.count('11'))

  console.log('lower_bound', s.lower_bound('xx').get())
  console.log('upper_bound', s.upper_bound('xx').get())
  console.log('equal_range', s.equal_range('yy'))

  // 删除
  console.log('erase', s.erase('cc'))
  console.log('erase', s.erase('kkkk'))

  console.log('===keys====')
  let keys = s.begin().keys();
  for(let k of keys) {
    console.log(k)
  }

  console.log('===values====')
  let values = s.begin().values();
  for (let item of values) {
    console.log(item)
  }

  console.log('===entries====')
  let entries = s.begin().entries();
  for (let item of entries) {
    console.log(item)
  }

  s.clear()
}
onMounted(testSet)

</script>
<style lang="css" scoped>
</style>