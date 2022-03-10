<!--
 * @Author: hzheyuan
 * @Date: 2022-02-22 09:50:15
 * @LastEditTime: 2022-03-10 15:06:02
 * @LastEditors: hzheyuan
 * @Description: 迭代器测试
 * @FilePath: \tstl\demo\Iterator.vue
-->
<template>
  <dev class="interator"></dev>
</template>

<script lang="ts">
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
    let obj = { key: 0 };
    let t = 1;
    Object.defineProperty(obj, 'key', {
      get: function name() {
        return t;
      },
      set: function (val) {
        //   console.log(val);
        t = val;
      }
    })
    obj.key++;
    //   for(let v of Iterator.tr) {
    //       console.log(v);
    //   }


    let c = {
      i: 10,
      valueOf: function () {
        return this.i
      },
      [Symbol.toPrimitive](hint) {
        // console.log('hint', hint)
        if (hint === 'number') {
          this.i++
          return this.i
        }
        return null;
      }
    }

    let cy: any = new Proxy(c, {
      get: function (target, prop, receiver) {
        // console.log('get', target, prop, Reflect.has(target, prop), receiver);
        if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)
      },
      set: function (target, prop, value, receiver) {
        console.log(`set: `, target, prop, value, Reflect.has(target, prop));
        // if(prop === 'cur') {
        //   target.cur =  value
        // } else
        if (prop !== 'cur' && Reflect.has(target, prop)) {
          Reflect.set(target, prop, value, receiver);
          return true
        } else {
          target.i = value;
          return true
        }
        return true
      }
    })
    console.log(cy > 10)
    console.log(cy++)
    console.log(cy)


  }
}
</script>
<style lang="css" scoped>
</style>