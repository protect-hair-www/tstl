<!--
 * @Author: hzheyuan
 * @Date: 2022-03-02 10:53:35
 * @LastEditTime: 2022-03-02 15:48:11
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\demo\Map.vue
-->
<template>
  <dev class="Set-test"></dev>
</template>

<script setup lang="ts">
import { convertToObject } from 'typescript';
import { onMounted } from 'vue'
import { Map } from '../src/container/associative/map'

const testSet = () => {
  const m = new Map<string, number>(); 
  console.log(m.empty())

//   m.insert('aa')
//   m.insert('cc')
//   m.insert('xx')
//   m.insert('yy')
//   m.insert('zz')
//   m.insert('dd')
//   m.insert('bb')
//   m.insert('dd')

//   m.insert(2)
//   m.insert(4)
//   m.insert(5)
//   m.insert(7)
//   m.insert(1)
//   m.insert(3)
//   m.insert(9)
//   m.insert(8)
//   console.log(m[1])
//   m[2] = 10;

  m['xx'] = 'test'
  m['kk'] = 'as'

//   console.log(m.empty())
//   console.log(m.size())

//   let beginItr = m.begin();
//   while(beginItr.hasNext()) {
//     console.log(beginItr.get())
//     beginItr.next()
//   }

//   let values = m.begin().values();
//   console.log('begin iterator', beginItr);
//   for (let item of values) {
//     console.log(item)
//   }

//   // 删除
//   console.log('erase', m.erase('cc'))
//   console.log('erase', m.erase('kkkk'))

//   values = m.begin().values();
//   console.log('begin iterator', values);
//   for (let item of values) {
//     console.log(item)
//   }

//   console.log('find', m.find('eeee').get())
//   console.log('find', m.find('cc').get())
//   console.log('find', m.find('xx').get())

//   console.log('count', m.count('cc'))
//   console.log('count', m.count('xx'))

//   console.log('lower_bound', m.lower_bound('xx').get())
//   console.log('upper_bound', m.upper_bound('xx').get())
//   console.log('equal_range', m.equal_range('yy'))

//   m.clear()
//   // test set of object
//   type Ty = {
//     key: number,
//     value: object
//   }
//   const s2 = new Map<string, Ty>((a, b) => a.key < b.key);
//   // s2.insert('x')
//   s2.insert({ key: 1, value: { name: '1' } })
//   s2.insert({ key: 3, value: { name: '2' } })
//   s2.insert({ key: 7, value: { name: '3' } })
//   s2.insert({ key: 2, value: { name: '4' } })
//   s2.insert({ key: 5, value: { name: '5' } })
//   s2.insert({ key: 8, value: { name: '6' } })
//   console.log('find s2', s2.find({ key: 7, value: { name: '3' } }).get())

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