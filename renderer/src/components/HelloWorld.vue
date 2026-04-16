<template>
  <div>
    <h1>Hello from Vue + Electron!</h1>
    <button @click="sendPing">Ping 主进程</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');

async function sendPing() {
  message.value = await window.electronAPI.ping();
}
</script>