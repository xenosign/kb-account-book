<template>
  <div class="container vh-90">
    <header>
      <Header />
    </header>

    <router-view />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style scoped>
.vh-90 {
  height: 90vh;
}
</style>
