<script setup>
import { onMounted, ref } from "vue";
import { useHotelStore } from "@/stores/hotel.js";

const store = useHotelStore();

const today = new Date().toISOString().split("T")[0].replaceAll("-", "/");
console.log(`today`, today);
// const date = ref("2022/10/24");

const range = ref({ from: "2022/10/24", to: "" });

const noRoom = ref(["2022/10/30", "2022/10/31", "2022/11/03"]);

onMounted(() => {
  noRoom.value = store.getBookedDates;
});

function optionFilter(date) {
  // 每個可選日期都會被傳進 function
  // console.log(`date`, date);
  return !noRoom.value.includes(date) && date >= today;
}

optionFilter;
</script>

<template>
  <p v-for="day in noRooms" :key="day">{{ day }}</p>
  <!-- {{ today }} -->
  {{ range }}
  <QDate
    v-model="range"
    navigation-min-year-month="2022/10"
    navigation-max-year-month="2022/12"
    :options="optionFilter"
    minimal
    range
    color="grey-7"
    class="modify-datepicker"
  ></QDate>
  <!-- :navigation-min-year-month="today" -->
</template>

<style lang="scss" scoped>
//可選
:deep(.q-date__calendar-item--in) {
  color: #6d7278;
}

//不可選
:deep(.q-date__calendar-item--out) {
  background-size: auto auto;
  background-color: rgba(255, 255, 255, 1);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 7px,
    #6d7278 7px,
    #6d7278 8px
  );
}

//選取開頭 q-date__edit-range-from
//選取
//選取結尾 q-date__edit-range-to

// :deep(.q-date__calendar-item) button {
//   border-radius: 3px;
// }

.q-date__view {
  background: #f7f7f7;
}

.stripe {
  background-size: auto auto;
  background-color: rgba(255, 255, 255, 1);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 7px,
    rgba(193, 56, 56, 1) 7px,
    rgba(193, 56, 56, 1) 8px
  );
  // background-image: repeating-linear-gradient(
  //   -45deg,
  //   transparent,
  //   transparent 2px,
  //   #6d7278 2px,
  //   #6d7278 4px
  // );
}
</style>
