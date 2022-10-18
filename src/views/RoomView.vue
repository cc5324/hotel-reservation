<script setup>
import { useHotelStore } from "@/stores/hotel.js";
import { storeToRefs } from "pinia";
// import RoomAmenities from "@/components/RoomAmenities.vue";
const hotelStore = useHotelStore();
const { room } = storeToRefs(hotelStore);

console.log(`room `, room);
</script>

<template>
  <div class="photos">
    <div>
      <img :src="room.imageUrl[0]" class="photos-main" />
      <span class="room-name">{{ room.name }}</span>
    </div>
    <div class="photos-minors">
      <img :src="room.imageUrl[1]" class="" />
      <img :src="room.imageUrl[2]" class="" />
    </div>
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
    <div>{{ room.checkInAndOut.checkOut }}</div>
  </div>
  <div class="facilities">
    <!-- <RoomAmenities :amenities="room.amenities" /> -->
  </div>
</template>

<style scoped lang="scss">
.photos {
  display: flex;
  justify-content: center;
  margin: auto 0;
  width: 100%;

  img {
    max-width: 100%;
  }

  &-main {
    max-height: 450px;
    object-fit: contain;
  }

  .room-name {
    padding: 5px;
    position: absolute;
    bottom: 30px;
    right: -45px;
    background: black;
    color: white;
  }

  &-minors {
    margin-left: 15px;
    img {
      display: block;
      margin-bottom: 10px;
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
  }
}
</style>
