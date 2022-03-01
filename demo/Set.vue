<!--
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:50:15
 * @LastEditTime: 2022-03-01 16:36:48
 * @LastEditors: hzheyuan
 * @Description: 迭代器测试
 * @FilePath: \tstl\demo\Set.vue
-->
<template>
  <dev class="Set-test"></dev>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Set } from '../src/container/associative/set'

const testSet = () => {
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

  console.log(s.empty())
  console.log(s.size())

  let beginItr = s.begin();
  while(beginItr.hasNext()) {
    console.log(beginItr.get())
    beginItr.next()
  }
  let values = s.begin().values();
  console.log('begin iterator', beginItr);
  for (let item of values) {
    console.log(item)
  }

  // 删除
  console.log('erase', s.erase('cc'))
  console.log('erase', s.erase('kkkk'))

  values = s.begin().values();
  console.log('begin iterator', values);
  for (let item of values) {
    console.log(item)
  }

  console.log('find', s.find('eeee').get())
  console.log('find', s.find('cc').get())
  console.log('find', s.find('xx').get())

  console.log('count', s.count('cc'))
  console.log('count', s.count('xx'))

  console.log('lower_bound', s.lower_bound('xx').get())
  console.log('upper_bound', s.upper_bound('xx').get())
  console.log('equal_range', s.equal_range('yy'))
  s.clear()
  console.log(s)

  // test set of object
  type Ty = {
    key: number,
    value: object
  }
  const s2 = new Set<Ty>((a, b) => a.key < b.key);
  // s2.insert('x')
  s2.insert({ key: 1, value: { name: '1' } })
  s2.insert({ key: 3, value: { name: '2' } })
  s2.insert({ key: 7, value: { name: '3' } })
  s2.insert({ key: 2, value: { name: '4' } })
  s2.insert({ key: 5, value: { name: '5' } })
  s2.insert({ key: 8, value: { name: '6' } })
  console.log('find s2', s2.find({ key: 7, value: { name: '3' } }).get())

  // entries = s2.begin().entries()
  // console.log(entries)
  // for(let item of entries) {
  //   console.log(item)
  // }
}
onMounted(testSet)

</script>
<style lang="css" scoped>
</style>