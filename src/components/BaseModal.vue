<script setup>
import StripeSeparator from "../components/StripeSeperator.vue";

defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
  },
});
</script>

<template>
  <div class="root">
    <!-- <Teleport to="body"> -->
    <Transition name="modal">
      <div v-if="modelValue" class="modal-bg">
        <div class="modal">
          <p class="title">{{ title }}</p>
          <StripeSeparator class="separator" />
          <slot />
        </div>
      </div>
    </Transition>
    <!-- </Teleport> -->
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/_breakpoint.scss";
.root {
  position: relative;
}

.modal-bg {
  position: fixed;
  top: 0;
  left: 0;

  // width: 100vw;
  width: 100%;
  // height: 100vh;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  // 為了讓 modal slot 內容可依據卡片定位
  position: relative;
  // width: 425px;
  // max-width: 50vw;
  // min-width: 60vw;
  @include breakpoint.tablet {
    min-width: 425px;
    min-height: 235px;
  }

  background-color: white;
  padding: 25px 40px;
  border-radius: 5px;

  text-align: start;

  .title {
    margin: 0 0;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 2.5px;

    // color: #000000;
  }
}

.separator {
  margin-bottom: 24px;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
