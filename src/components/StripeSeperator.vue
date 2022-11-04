<template>
  <div class="stripes">
    <div class="stripe"></div>
    <div class="stripe"></div>
    <div class="stripe"></div>
  </div>
</template>

<style lang="scss" scoped>
.stripes {
  width: fit-content;
  // outline: 1px solid #000;
}
.stripe {
  display: inline-block;
  width: 9px;
  height: 1.5px;
  background: #575757;
  transform: rotate(45deg);

  & + & {
    margin-left: 5px;
  }
}
</style>
