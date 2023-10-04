<script setup lang="ts">
  const tasks: object = await useApi('/tasks')
</script>
<template>
  <ul>
    <li v-for="task in tasks.data" :key="task.id">
      <NuxtLink :href="`/tasks/${task.id}`">
        <h2 v-text="task.title" />
      </NuxtLink>

      <p v-if="task.description" v-text="task.description" />
    </li>
  </ul>
</template>
