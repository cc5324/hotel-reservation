<script setup>
defineProps({
  room: { type: Object, required: true },
});
</script>

<template>
  <div class="card">
    <img :src="room.imageUrl" />
    <p>{{ room.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 10px;
  img {
    max-height: 200px;
    object-fit: cover;
  }
}
</style>
