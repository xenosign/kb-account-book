<template>
  <div>{{ test }}</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  test: Boolean,
});
</script>
