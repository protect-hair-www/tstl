<!--
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:50:15
 * @LastEditTime: 2022-03-07 22:46:51
 * @LastEditors: hzheyuan
 * @Description: 迭代器测试
 * @FilePath: /tstl/demo/Set.vue
-->
<template>
  <div class="Set-test"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Set } from '../src/container/associative/set'

const test = () => {
  const s = new Set<string>();
  console.log(s.empty())

  s.insert('aa')
  s.insert('cc')
  s.insert('xx')
  s.insert('yy')
  s.insert('zz')
  s.insert('dd')
  s.insert('bb')
  s.insert('dd')

  console.log('empty', s.empty())
  console.log('size', s.size())

  console.log('find', s.find('cc').key(), s.find('cc').value())
  console.log('find', s.find('eeee').key())

  console.log('count', s.count('cc'))
  console.log('count', s.count('xx'))

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
onMounted(test)

</script>
<style lang="css" scoped>
</style>