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
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="modelValue" class="modal-bg">
          <div class="modal">
            <p class="title">{{ title }}</p>
            <StripeSeparator />
            <slot />
            <!-- <button @click="$emit('update:modelValue', false)">Close</button> -->
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
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
  // max-width: 50vw;
  min-width: 60vw;
  background-color: white;
  padding: 30px;
  border-radius: 5px;

  button {
    margin: 0 auto;
  }

  .title {
    margin: 0 0;
    font-size: 24px;
  }
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
