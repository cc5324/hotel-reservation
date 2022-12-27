<script setup>
import { computed, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useHotelStore } from "@/stores/hotel.js";
import { useRoute } from "vue-router";

import dayjs from "dayjs";

import BaseDatePicker from "../components/BaseDatePicker.vue";
import RoomAmenities from "@/components/RoomAmenities.vue";
import RoomPhotos from "@/components/RoomPhotos.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseInput from "../components/BaseInput.vue";
import DateInput from "../components/DateInput.vue";

const hotelStore = useHotelStore();
const { room } = storeToRefs(hotelStore);

const route = useRoute();
const isFormModalOpen = ref(false);

const today = dayjs().format("YYYY-MM-DD");

const dates = ref({
  from: today,
  to: dayjs(today).add(1, "day").format("YYYY-MM-DD"),
});

const booking = reactive({
  name: "",
  tel: "",
});

function getRange({ from, to }) {
  const ranges = [];
  let currentDate = dayjs(from);
  while (currentDate.isSame(from) || currentDate.isBefore(to)) {
    ranges.push(currentDate.format("YYYY-MM-DD"));
    currentDate = currentDate.add(1, "day");
  }
  return ranges;
}

async function submitHandler() {
  const range = getRange(dates.value);
  const params = { date: range, ...booking };
  await hotelStore.reserveRoom(route.params.id, params);
  isFormModalOpen.value = false;
}

const bookedDates = computed(() => hotelStore.getBookedDates);

const isReady = computed(() => hotelStore.requestState.isReady);

const isSuccess = computed(() => hotelStore.requestState.isSuccess);
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
      <BaseDatePicker v-model="dates" :booked-dates="bookedDates" />
      <button @click="isFormModalOpen = true">預約</button>
    </div>
  </div>
  <BaseModal v-model="isFormModalOpen" :title="'預約時間'">
    <div>
      <form @submit.prevent="">
        <BaseInput v-model="booking.name" :label="'姓名'" />
        <BaseInput v-model="booking.tel" :label="'電話'" />
        <DateInput v-model="dates" :label="'預約時間'" />
        <div class="form-buttons">
          <button class="light-button" @click="isFormModalOpen = false">
            取消
          </button>
          <button class="dark-button" @click="submitHandler">確定預約</button>
        </div>
      </form>
    </div>
  </BaseModal>
  <BaseModal v-model="isReady" :title="isSuccess ? '預約成功' : '預約失敗'">
    <div v-if="isSuccess">
      <SvgIcon name="common-tick-inside-circle"></SvgIcon>
      <button
        class="dark-button"
        @click="$router.push({ name: 'rooms' }), hotelStore.resetRequestState()"
      >
        回首頁
      </button>
    </div>
    <div v-else>
      <p>預約時間已被人預定</p>
      <button
        class="dark-button"
        @click="$router.go(0), hotelStore.resetRequestState()"
      >
        返回
      </button>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
@use "@/assets/scss/_button.scss";
.main-wrapper {
  display: flex;
  justify-content: space-between;

  main {
    flex: 0 0 60%;
  }

  .date-picker {
    flex: 0 0 30%;
  }

  padding: 30px;
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
    line-height: 27px;
  }
}

button {
  display: block;
  padding: 10px 25px;
  margin-top: 20px;

  border: none;
  color: white;
  background: #d8d8d8;
  color: #6d7278;
  letter-spacing: 1.46px;
}

form {
  margin-top: 40px;
  > * {
    margin-bottom: 15px;
  }
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  button {
    display: inline-block;
  }
}
</style>
