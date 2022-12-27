<script setup>
defineProps({
  label: {
    type: String,
  },
});
</script>

<template>
  <button>{{ label }}</button>
</template>

<style scoped lang="scss">
button {
  position: relative;
  padding: 16px 24px;
  background-color: #575757;
  color: white;
  font-size: 16px;

  &::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 8px;
    left: 8px;
    z-index: -1;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXzB5dHoiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48bGluZSB4MT0iMCIgeT0iMCIgeDI9IjAiIHkyPSI1IiBzdHJva2U9IiM1NzU3NTciIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+IDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybl8weXR6KSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==");
  }
}

// button::after {
//   content: "";
//   display: inline-block;
//   width: 100%;
//   height: 100%;

//   position: absolute;
//   top: 5px;
//   left: 5px;
//   z-index: -1;

//   background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXzB5dHoiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI5LjUiIGhlaWdodD0iOS41IiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoMTM1KSI+PGxpbmUgeDE9IjAiIHk9IjAiIHgyPSIwIiB5Mj0iOS41IiBzdHJva2U9IiMxOTRkMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+IDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybl8weXR6KSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==);
// }
</style>
