<!--
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:50:15
 * @LastEditTime: 2022-02-22 14:24:10
 * @LastEditors: hzheyuan
 * @Description: 迭代器测试
 * @FilePath: \tstl\demo\Iterator.vue
-->
<template>
  <dev class="interator">
  </dev>
</template>

<script>
import { Iterator } from '../src/Iterator/index'

export default {
  components: {
  },

  data() {
    return {
    }
  },

  computed: {
  },

  methods: {
    
  },

  mounted() {
      let obj = {key: 0};
      let t  = 1;
      Object.defineProperty(obj, 'key', {
          get: function name() {
             return t; 
          },
          set: function(val) {
            //   console.log(val);
              t = val;
          }
      })
      obj.key++;
    //   for(let v of Iterator.tr) {
    //       console.log(v);
    //   }
  }
}
</script>
<style lang="css" scoped>
</style>