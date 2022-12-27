<script setup>
import { computed } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  modelValue: {
    required: true,
  },
  bookedDates: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const today = dayjs().format("YYYY-MM-DD");
const range = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

function optionFilter(date) {
  // 每個可選日期都會被傳進 function
  date = dayjs(date).format("YYYY-MM-DD");
  return (
    !props.bookedDates.includes(date) && !dayjs(date).isBefore(dayjs(today))
  );
}
</script>

<template>
  <!-- <span v-for="day in bookedDates" :key="day">{{ day }},</span> -->
  <QDate
    v-model="range"
    :navigation-min-year-month="dayjs().format('YYYY/MM')"
    :navigation-max-year-month="dayjs().add(3, 'M').format('YYYY/MM')"
    :mask="'YYYY-MM-DD'"
    :options="optionFilter"
    minimal
    range
    color="grey-7"
    class="modify-datepicker"
  ></QDate>
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
