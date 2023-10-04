<script setup lang="ts">
  const endpoints = await useCustomFetch('/')
</script>
<template>
  <ul>
    <li v-for="endpoint in endpoints" :key="endpoint.id">
      <NuxtLink :href="endpoint.href">
        <h2 v-text="endpoint.title" />
      </NuxtLink>

      <p v-text="endpoint.description" />
    </li>
  </ul>
</template>
