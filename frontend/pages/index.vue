<script setup lang="ts">
  const endpoints: object = await useApi('/')
</script>
<template>
  <ul>
    <li v-for="endpoint in endpoints.data" :key="endpoint.id">
      <NuxtLink :href="endpoint.href">
        <h2 v-text="endpoint.title" />
      </NuxtLink>

      <p v-text="endpoint.description" />
    </li>
  </ul>
</template>
