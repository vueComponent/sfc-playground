<script setup>
import { ref } from 'vue'
import { Input } from 'ant-design-vue'
const msg = ref('Hello World!')  
</script>
<template>
  <h1>{{ msg }}</h1>
  <Input v-model:value="msg" />
</template>
