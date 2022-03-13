<!--
 * @Author: hzheyuan
 * @Date: 2022-03-12 12:10:21
 * @LastEditTime: 2022-03-13 17:51:47
 * @LastEditors: hzheyuan
 * @Description: priority queue
 * @FilePath: /tstl/demo/PriorityQueue.vue
-->
<template>
    <div class="priorityqueue-test">
        <div class="op">
            <div>
                <label for="insert">push_heap</label>
                <input type="number" @keyup.enter="onPush" />
            </div>
            <div>
                <button @click="onPop">pop</button>
                <button @click="onGetTop">top</button>
            </div>
        </div>
        <div id="priorityqueue-box" style="width: 100vw;height:100vh;"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, queuePostFlushCb } from 'vue'
import { Chart } from './chart'
import { Vector, PriorityQueue, less, greater } from '../src/index'
import { testAllIterators, traverseCntr } from './util'

let chart: any = ref(null)
let pq: PriorityQueue<number, Vector> = ref<any>(null);


const onGetTop = () => {
    console.log(pq.top())
}

const onGetBack = () => {
    console.log(pq.back())
}

const onPush = (e) => {
    const v = Number(e.target.value)
    pq.push(v)
    console.log(pq.top(), 'top')
}

const onPop = (e) => {
    console.log(pq.top(), 'pop')
    pq.pop()
}

const test = () => {
    // construt a echarts
    chart = new Chart('priorityqueue-box')

    // create a sequence container
    // pq = new PriorityQueue<number, Vector>(greater, Vector);
    pq = new PriorityQueue<number, Vector>(less, Vector);
    pq.push(10)
    pq.push(20)
    pq.push(30)
    pq.push(5)
    pq.push(15)

    console.log(pq.top(), 'top')
    pq.push(50)
    console.log('push 50')
    console.log(pq.top(), 'top')
    pq.push(19)
    console.log('push 19')
    console.log(pq.top(), 'top')

    console.log('pop all of pq: ')
    // while(pq.size() > 0) {
    //     console.log(pq.top());
    //     pq.pop()
    // }

    // draw the chart
    // chart.drawHeap(pq)
}

onMounted(test)

</script>
<style lang="css" scoped>
</style>

