<script setup lang="ts">
  const pipelines: object = await useApi('/pipelines')
</script>
<template>
  <ul>
    <li v-for="pipeline in pipelines.data" :key="pipeline.id">
      <NuxtLink :href="`/pipelines/${pipeline.id}`">
        <h2 v-text="pipeline.title" />
      </NuxtLink>

      <p v-if="pipeline.description" v-text="pipeline.description" />
    </li>
  </ul>
</template>
