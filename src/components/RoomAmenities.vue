<script setup>
// import { useHotelStore } from "@/stores/hotel.js";
// import SvgIcon from "@/components/SvgIcon.vue";
// const hotelStore = useHotelStore();

defineProps({
  amenities: {
    type: Object,
    // required: true,
  },
});

const iconMap = {
  wiFi: { icon: "wifi", label: "Wi-Fi" },
  breakfast: { icon: "utensils", label: "早餐" },
  miniBar: { icon: "martini-glass", label: "Mini Bar" },
  roomService: { icon: "bell-concierge", label: "Room Service" },
  television: { icon: "tv", label: "TV" },
  airConditioner: { icon: "wind", label: "空調" },
  refrigerator: { icon: "snowflake", label: "冰箱" },
  sofa: { icon: "couch", label: "沙發" },
  greatView: { icon: "mountain", label: "視野" },
  smokeFree: { icon: "ban-smoking", label: "禁煙" },
  childFriendly: { icon: "baby", label: "適合兒童" },
  petFriendly: { icon: "dog", label: "寵物友善" },
};

// const iconMap = {
//   wiFi: "wifi",
//   breakfast: "breakfast",
//   miniBar: "bar",
//   roomService: "room_service",
//   television: true,
//   airConditioner: "breeze",
//   refrigerator: true,
//   sofa: false,
//   greatView: "mountain-range",
//   smokeFree: "no-smoke-symbol",
//   childFriendly: "crawling-baby-silhouette",
//   petFriendly: "dog",
// };

// const amenities = {
//   "Wi-Fi": true,
//   Breakfast: true,
//   "Mini-Bar": false,
//   "Room-Service": false,
//   Television: true,
//   "Air-Conditioner": true,
//   Refrigerator: true,
//   Sofa: false,
//   "Great-View": false,
//   "Smoke-Free": true,
//   "Child-Friendly": false,
//   "Pet-Friendly": true,
// };
</script>

<template>
  <div class="wrapper">
    <div
      v-for="(value, key) in amenities"
      :key="key"
      :class="{ noOffering: !value }"
      class="amenity-box"
    >
      <!-- <SvgIcon name="common-logo_block"></SvgIcon> -->
      <font-awesome-icon :icon="['fa', iconMap[key].icon]" />
      <span>{{ iconMap[key].label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/_breakpoint.scss";
@use "@/assets/scss/color.scss";

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 15px;
  background: color.$bg-gray-light;

  @include breakpoint.tablet {
    padding: 30px;
  }
}

.noOffering {
  // color: gray;
  opacity: 0.3;
}

.amenity-box {
  display: flex;
  align-items: center;

  svg {
    flex: 0 0 25px;
    margin-right: 10px;
  }
}
</style>
