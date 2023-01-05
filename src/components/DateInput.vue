<script setup>
import { ref, reactive } from "vue";
import dayjs from "dayjs";

defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
  },
});

// emit("update:modelValue");
const today = dayjs().format("YYYY-MM-DD");

const dates = reactive({
  from: props.modelValue.from,
  to: props.modelValue.to,
});

const fromInput = ref(null);
const toInput = ref(null);

function checkNoAfter(event) {
  if (!dayjs(dates.from).isAfter(dates.to)) return;
  if (event.target === fromInput.value) {
    toInput.value.value = "";
  }
  if (event.target === toInput.value) {
    fromInput.value.value = "";
  }
}
</script>

<template>
  <label class="base-input">
    <span class="base-input-label">{{ label }}</span>
    <input
      type="date"
      v-model="dates.from"
      :min="today"
      pattern="\[0-9]{4}-\[0-9]{2}-\[0-9]{2}"
      @change="$emit('update:modelValue', dates), checkNoAfter($event)"
      ref="fromInput"
      :required="required"
    />
    <span class="base-input-separator">～</span>
    <input
      type="date"
      v-model="dates.to"
      :min="dates.from"
      :max="dayjs(dates.from).add(3, 'M').format('YYYY-MM-DD')"
      pattern="[0-9]{4}/[0-9]{2}/[0-9]{2}"
      @change="$emit('update:modelValue', dates)"
      ref="toInput"
      :required="required"
    />
  </label>
</template>

<style lang="scss" scoped>
// input::-webkit-calendar-picker-indicator {
//   display: none;
// }
.base-input {
  display: flex;
  align-items: center;

  line-height: 24px;
  &-label {
    flex: 0 0 60px;
    margin-right: 30px;
  }

  &-separator {
    margin: 0 10px;
  }

  input {
    flex: 1 1 0;
    padding: 3px 5px;
    outline: 2px solid #c9c9c9;
    border-radius: 5px;
    text-align: center;
  }
}
</style>
