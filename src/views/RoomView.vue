<script setup>
import { computed, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useHotelStore } from "@/stores/hotel.js";
import { useRoute } from "vue-router";

import dayjs from "dayjs";
import weekday from "dayjs";

import BaseDatePicker from "@/components/BaseDatePicker.vue";
import RoomAmenities from "@/components/RoomAmenities.vue";
import RoomPhotos from "@/components/RoomPhotos.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseInput from "@/components/BaseInput.vue";
import DateInput from "@/components/DateInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import StripeSeparator from "../components/StripeSeperator.vue";

dayjs.extend(weekday);

const hotelStore = useHotelStore();
const { room, getRoomShortDescription } = storeToRefs(hotelStore);

const route = useRoute();
const isFormModalOpen = ref(false);

const today = dayjs().format("YYYY-MM-DD");

const dates = ref({
  from: today,
  to: dayjs(today).add(1, "day").format("YYYY-MM-DD"),
});

const getWeekday = computed(() => {
  const appendix = {
    weekday: [1, 2, 3, 4, 5],
    weekend: [0, 6],
  };
  const result = { weekday: 0, weekend: 0 };
  const { from, to } = dates.value;
  let day = dayjs(from);
  while (day.isBefore(to)) {
    if (appendix.weekday.includes(dayjs(day).day())) {
      result.weekday += 1;
    } else {
      result.weekend += 1;
    }
    day = day.add(1, "day");
  }
  return result;
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
  <div class="page-wrapper">
    <div class="page-header">
      <RoomPhotos :photos="room.imageUrl" />
    </div>
    <div class="main-wrapper">
      <main>
        <div class="room-detail">
          <h3 class="room-detail-name">{{ room.name }}</h3>
          <div class="room-detail-description">
            <div class="room-detail-description--ch">
              <p>
                房客人數限制：
                {{ room.descriptionShort.GuestMin }}~
                {{ room.descriptionShort.GuestMax }}
                人
              </p>
              <p>床型：{{ room.descriptionShort.Bed[0] }}</p>
              <p>衛浴數量：{{ getRoomShortDescription.privateBath }} 間</p>
              <p>房間大小：{{ room.descriptionShort.Footage }} 平方公尺</p>
            </div>
            <p class="room-detail-description--en">{{ room.description }}</p>
          </div>
          <StripeSeparator />
          <div class="room-detail-checkInAndOut">
            <div class="check check--in">
              <span class="check-title">Check In</span>
              <div class="check-time">
                {{ room.checkInAndOut.checkInEarly }} －
                {{ room.checkInAndOut.checkInLate }}
              </div>
            </div>
            <div class="check check--out">
              <span class="check-title">Check Out</span>
              <div class="check-time">
                {{ room.checkInAndOut.checkOut }}
              </div>
            </div>
          </div>
          <div class="room-detail-facilities">
            <RoomAmenities :amenities="hotelStore.getRoomAmenities" />
          </div>
        </div>
        <div class="room-detail-price price">
          <p class="price-main">NT. {{ room.normalDayPrice }}</p>
          <p class="price-period">平日(一~四)</p>
          <p class="price-sub">NT. {{ room.holidayPrice }}</p>
          <p class="price-period">假日(一~四)</p>
        </div>
      </main>
      <div class="calender">
        <BaseDatePicker v-model="dates" :booked-dates="bookedDates" />
        <BaseButton
          label="預約"
          @click="isFormModalOpen = true"
          class="calender-button"
        ></BaseButton>
        <!-- <button @click="isFormModalOpen = true">預約</button> -->
      </div>
    </div>
  </div>
  <BaseModal v-model="isFormModalOpen" :title="'預約時間'">
    <div>
      <form @submit.prevent="">
        <BaseInput v-model="booking.name" :label="'姓名'" />
        <BaseInput v-model="booking.tel" :label="'電話'" />
        <DateInput v-model="dates" :label="'預約時間'" />
        <div class="form-calculate">
          <p>
            <span>平日時段</span>
            <span>{{ getWeekday.weekday }} 夜</span>
          </p>
          <p>
            <span>假日時段</span>
            <span>{{ getWeekday.weekend }} 夜</span>
          </p>
        </div>
        <div class="form-price">
          = NT.
          {{
            getWeekday.weekday * room.normalDayPrice +
            getWeekday.weekend * room.holidayPrice
          }}
        </div>
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
@use "@/assets/scss/_breakpoint.scss";
@use "@/assets/scss/_button.scss";

.page {
  &-wrapper {
    max-width: 1280px;
    min-width: 375px;
    margin: 0 auto;
  }
  &-header {
    height: 300px;
    @include breakpoint.tablet {
      height: 600px;
    }
  }
}

.main-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  padding: 20px;

  @include breakpoint.desktop {
    display: flex;
    flex-wrap: nowrap;

    padding: 30px;
  }

  main {
    flex: 0 0 100%;
    @include breakpoint.tablet {
      flex: 0 0 60%;
    }

    display: flex;
    flex-wrap: wrap;
    @include breakpoint.tablet {
      display: flex;
      flex-wrap: nowrap;
    }
  }
}

.room-detail {
  text-align: left;

  &-name {
    margin-bottom: 30px;
    font-size: 36px;
    font-weight: 500;
    letter-spacing: 3.76px;
  }

  &description {
    &--ch {
      font-size: 14px;
    }

    &--en {
      font-size: 12px;
    }
  }

  &-checkInAndOut {
    margin-bottom: 40px;

    .check {
      display: inline-block;

      &--in {
        margin-right: 100px;
      }
    }
  }

  &-facilities {
    margin-bottom: 40px;
  }
}

.check {
  font-weight: 300;

  &-title {
    font-size: 20px;
  }
  &-time {
    font-size: 30px;
  }
}

.price {
  width: 500px;

  text-align: right;
  // font-family: NotoSansCJKtc-Light;

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
    // font-family: NotoSansCJKtc-Light;
    font-size: 14px;
    color: #6d7278;
    letter-spacing: 1.46px;
    line-height: 27px;
  }
}

.calender {
  button {
    display: block;
    // padding: 10px 25px;
    margin-top: 20px;

    // color: #6d7278;
    // background: #d8d8d8;
    letter-spacing: 1.46px;
  }
}

form {
  margin-top: 40px;
  > * {
    margin-bottom: 15px;
  }
}

.form {
  &-calculate {
    padding: 15px 40px;
    margin: 30px 0 10px;
    background-color: #ededed;
    color: #6d7278;
    font-size: 12px;

    > p {
      display: flex;
      justify-content: space-between;
      margin: 0;

      font-weight: 500;
      letter-spacing: 1.25px;
    }

    // text-align-last: justify;
  }

  &-price {
    margin-bottom: 30px;

    color: #ff5c5c;
    font-size: 26px;
    text-align: right;
  }

  &-buttons {
    display: flex;
    justify-content: space-between;
    button {
      display: inline-block;
      padding: 10px 25px;
    }
  }
}
</style>
