<script setup>
import { useHotelStore } from "@/stores/hotel.js";
import { storeToRefs } from "pinia";

import BaseDatePicker from "../components/BaseDatePicker.vue";
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
  <div class="main-wrapper">
    <main>
      <div class="room-detail">
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
          <div>
            <span>Check In</span>
            {{ room.checkInAndOut.checkInEarly }} －
            {{ room.checkInAndOut.checkInLate }}
          </div>
          <div><span>Check Out</span> {{ room.checkInAndOut.checkOut }}</div>
        </div>
        <div class="facilities">
          <RoomAmenities :amenities="hotelStore.getRoomAmenities" />
        </div>
      </div>
      <div class="room-price price">
        <p class="price-main">NT. {{ room.normalDayPrice }}</p>
        <p class="price-period">平日(一~四)</p>
        <p class="price-sub">NT. {{ room.holidayPrice }}</p>
        <p class="price-period">假日(一~四)</p>
      </div>
    </main>
    <div class="date-picker">
      <BaseDatePicker />
      <button>預約</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-wrapper {
  display: flex;
  justify-content: space-between;

  main {
    flex: 0 0 60%;
  }

  .date-picker {
    flex: 0 0 30%;
  }
}

.photos-box {
  height: 300px;
}
main {
  display: flex;
}

.room-detail {
  text-align: left;
}

.checkInAndOut {
  > div {
    display: inline-block;
  }
}

.price {
  text-align: right;
  font-family: NotoSansCJKtc-Light;

  &-main {
    font-size: 30px;
    // color: #000000;
    letter-spacing: 3.13px;
    // text-align: right;
    line-height: 27px;
  }

  &-sub {
    font-size: 16px;
    // color: #000000;
    letter-spacing: 1.67px;
    text-align: right;
    line-height: 27px;
  }
  .price-period {
    font-family: NotoSansCJKtc-Light;
    font-size: 14px;
    color: #6d7278;
    letter-spacing: 1.46px;
    // text-align: right;
    line-height: 27px;
  }
}

button {
  display: block;
  padding: 10px 15px;
  margin-top: 20px;

  border: none;
  color: white;
  background: #575757;
}
</style>
