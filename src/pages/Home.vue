<template>
  <div>
    <h1>Home</h1>
    <Test :test="test" />
    <button @click="change">변경</button>
  </div>
</template>

<script setup>
import Test from '@/components/Test.vue';
import { ref } from 'vue';

const test = ref(true);

function change() {
  test.value = !test.value;
}
</script>
