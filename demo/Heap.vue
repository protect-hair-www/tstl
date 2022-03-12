<!--
 * @Author: hzheyuan
 * @Date: 2022-03-12 12:10:21
 * @LastEditTime: 2022-03-12 21:29:46
 * @LastEditors: hzheyuan
 * @Description: heap
 * @FilePath: /tstl/demo/Heap.vue
-->
<template>
    <div class="heap-test">
        <div class="op">
            <div>
                <label for="insert">push_heap</label>
                <input type="number" @keyup.enter="onPushHeap" />
            </div>
            <div>
                <button @click="onPopHeap">pop_heap</button>
                <button @click="onSortHeap">sort_heap</button>
                <button @click="onGetFront">front</button>
                <button @click="onGetBack">back</button>
            </div>
        </div>
        <div id="heap-box" style="width: 100vw;height:100vh;"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart } from './chart'
import { Vector, makeHeap, popHeap, pushHeap, sortHeap, isHeap, isHeapUntil } from '../src/index'
import { testAllIterators, traverseCntr } from './util'

let chart: any = ref(null)
let vec: Vector<number> = ref<any>(null);


const onGetFront = () => {
    console.log(vec.front())
}

const onGetBack = () => {
    console.log(vec.back())
}

const onPushHeap = (e) => {
    const v = Number(e.target.value)
    vec.push_back(v)
    pushHeap(vec.begin(), vec.end())
    chart.updateHeap(vec)
    traverseCntr(vec, `push heap ${v}`)
}

const onPopHeap = (e) => {
    let popValue = popHeap(vec.begin(), vec.end())
    vec.pop_back()
    chart.updateHeap(vec)
    traverseCntr(vec, `pop heap ${popValue}`);
}

const onSortHeap = () => {
    sortHeap(vec.begin(), vec.end());
    traverseCntr(vec, `heap sort`);
    chart.updateHeap(vec)
} 

const test = () => {
    // construt a echarts
    chart = new Chart('heap-box')

    // create a sequence container
    vec = new Vector<number>();
    vec.push_back(10)
    vec.push_back(20)
    vec.push_back(30)
    vec.push_back(5)
    vec.push_back(15)
    traverseCntr(vec, 'vec')

    makeHeap(vec.begin(), vec.end())
    traverseCntr(vec, 'make_heap with [10, 20, 30, 5, 15]');

    makeHeap(vec.begin(), vec.end())

    vec.push_back(100)
    pushHeap(vec.begin(), vec.end())
    traverseCntr(vec, 'push heap 100')

    let popValue = popHeap(vec.begin(), vec.end())
    vec.pop_back() // origin container element shoud remove 
    traverseCntr(vec, `pop heap ${popValue}`);

    // draw the chart
    chart.drawHeap(vec)
}

onMounted(test)

</script>
<style lang="css" scoped>
</style>

