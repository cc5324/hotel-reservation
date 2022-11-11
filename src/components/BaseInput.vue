<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<template>
  <label class="base-input">
    <span>{{ label }}</span>
    <input type="text" v-model="input" />
  </label>
</template>

<style lang="scss" scoped>
.base-input {
  display: flex;
  align-items: center;

  line-height: 24px;
  > span {
    flex: 0 0 60px;
    margin-right: 30px;
  }
  input {
    flex: 1 1 0;

    padding: 3px 5px;
    outline: 2px solid #c9c9c9;
    border-radius: 5px;
  }
}
</style>
