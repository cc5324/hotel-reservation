<script setup>
import { useHotelStore } from "@/stores/hotel.js";
import { storeToRefs } from "pinia";

import RoomAmenities from "@/components/RoomAmenities.vue";
import RoomPhotos from "@/components/RoomPhotos.vue";

const hotelStore = useHotelStore();
const { room } = storeToRefs(hotelStore);

console.log(`room `, room);
</script>

<template>
  <div class="photos-box">
    <RoomPhotos :photos="room.imageUrl" />
  </div>
  <h3>{{ room.name }}</h3>
  <div class="description">
    <p>
      房客人數限制：{{ room.descriptionShort.GuestMin }}~{{
        room.descriptionShort.GuestMax
      }}
    </p>
    <p>房型：{{}}</p>
    <p>衛浴數量：{{}}</p>
    <p>房間大小：{{}}</p>
    <p>{{ room.description }}</p>
  </div>
  <div class="checkInAndOut">
    <span>Check In</span>
    <div>
      {{ room.checkInAndOut.checkInEarly }} －
      {{ room.checkInAndOut.checkInLate }}
    </div>
    <span>Check Out</span>
    <div>{{ room.checkInAndOut.checkOut }}</div>
  </div>
  <div class="facilities">
    <RoomAmenities :amenities="hotelStore.getRoomAmenities" />
  </div>
</template>

<style scoped lang="scss">
.photos-box {
  height: 300px;
}
</style>
