<script setup>
defineProps({
  photos: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="container">
    <div class="main">
      <img :src="photos[0]" class="" />
    </div>
    <div class="side-1">
      <img :src="photos[1]" class="" />
    </div>
    <div class="side-2">
      <img :src="photos[2]" class="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "main side-1"
    "main side-2";
  height: 100%;
  min-height: 0;
}

.main {
  grid-area: main;
  overflow: hidden;
}

.side-1 {
  grid-area: side-1;
  overflow: hidden;
}

.side-2 {
  grid-area: side-2;
  overflow: hidden;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  // height: auto;
  // width: auto;
  object-fit: cover;
}
</style>
