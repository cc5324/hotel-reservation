<script setup>
import { RouterLink } from "vue-router";
import { computed, watch, ref, watchEffect, onBeforeMount } from "vue";
import RoomCard from "@/components/RoomCard.vue";
import { useHotelStore } from "@/stores/hotel.js";
import { useAsyncState } from "@vueuse/core";
import hotelAPI from "@/api/service.js";

// const hotelStore = useHotelStore();

// const { items: rooms } = await hotelAPI.GET("/rooms");
// console.log(`rooms`, rooms);

// const { state, isReady, isLoading } = useAsyncState(
//   axios.get("https://jsonplaceholder.typicode.com/todos/1").then((t) => t.data),
//   { id: null }
// );

// const { state: rooms, isReady } = useMyAsyncState(
//   hotelAPI.GET("/rooms").then((res) => res.items),
//   []
// );

// const rooms = ref([]);

// watchEffect(async () => {
//   const response = await hotelAPI.GET("/rooms");
//   rooms.value = response.items;
//   console.log(rooms.value);
// });

// watch(isReady, () => console.log(`rooms`, rooms));

// const firstRoom = computed(() => rooms[1]);
// console.log(`firstRoom`, firstRoom);

// const rooms = ref([]);
// hotelAPI
//   .GET("/rooms")
//   .then((res) => (rooms.value = res.items))
//   .catch((err) => console.log(err));

const loading = ref(true);
const rooms = ref([]);
onBeforeMount(async () => {
  try {
    const { items } = await hotelAPI.GET("/rooms");
    rooms.value = items;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
});

// setTimeout(async () => {
//   const { items } = await hotelAPI.GET("/rooms");
//   rooms.value = items;
// }, 3000);

// const rooms = ref([]);
// const { items } = await hotelAPI.GET("/rooms");
// rooms.value = items;

// async function getRooms() {
//   try {
//     const { items } = await hotelAPI.GET("rooms");
//     rooms.value = items;
//   } catch (error) {
//     console.log(error);
//   }
// }
// getRooms();

// const hotelStore = useHotelStore();
// const rooms = computed(() => hotelStore.rooms);
// onBeforeMount(() => hotelStore.getRooms());
// hotelStore.getRooms();
// const rooms = computed(() => hotelStore.rooms);

// const getRooms = async () => {
//   try {
//     const { success, items: rooms } = await hotelAPI.GET("rooms");
//     if (success) {
//       rooms.value = items;
//     } else {
//       console.warn("getRooms fail");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// async function getRooms() {
//   try {
//     const { success, items: rooms } = await hotelAPI.GET("rooms");
//     if (success) {
//       rooms.value = items;
//     } else {
//       console.warn("getRooms fail");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// getRooms();
// const rooms = await getRooms();
</script>

<template>
  <p>state：{{ rooms.map((room) => room.name) }}</p>
  <!-- <p>isReady：{{ isReady }}</p> -->
  <!-- <p>isLoading：{{ isLoading }}</p> -->
  <!-- <div v-if="!isReady" class="loading">Loading...</div> -->
  <p v-if="loading">Loading</p>
  <div v-else class="wrapper">
    <h2>Rooms View</h2>
    <router-link v-for="room in rooms" :to="`/room/${room.id}`" :key="room.id">
      <RoomCard :room="room" class="room" />
    </router-link>
  </div>
  <!-- <div class="wrapper">
    <h2>Rooms View</h2>
    <router-link
      v-for="room in hotelStore.rooms"
      :to="`/room/${room.id}`"
      :key="room.id"
    >
      <RoomCard :room="room" class="room" />
    </router-link>
  </div> -->
</template>

<style lang="scss" scoped>
.room {
  display: inline-block;

  & + .room {
    margin-left: 10px;
  }
}

.loading {
  font-size: 48px;
}
</style>
