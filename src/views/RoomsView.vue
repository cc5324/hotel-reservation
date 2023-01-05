<script setup>
// import { RouterLink } from "vue-router";
import { useHotelStore } from "@/stores/hotel.js";
import { ref, computed, onBeforeMount } from "vue";

const hotelStore = useHotelStore();

const currentRoom = ref(null);
onBeforeMount(async () => {
  await hotelStore.getRooms();
  currentRoom.value = hotelStore.rooms[0];
});
const imageUrl = computed(() => currentRoom.value?.imageUrl);

// const bgImage = ref(null);
// const bgImage = computed(() => hotelStore.rooms[0].imageUrl);

// const currentRoom = computed(() => hotelStore.rooms[0]);
// const bgImage = computed(() => hotelStore.rooms[2].imageUrl);
// const currentRoom = computed(() => hotelStore.rooms[0]);

function renderRoom(roomIndex) {
  console.log(roomIndex, "id");
  currentRoom.value = hotelStore.rooms[roomIndex];
}

// function prefixInteger(num, length = 1) {
//   return (Array(length).join("0") + num).slice(-length);
// }
function findIndex(id) {
  // return prefixInteger(hotelStore.rooms.findIndex((room) => room.id === id));
  return `0${hotelStore.rooms.findIndex((room) => room.id === id) + 1}`;
}
</script>

<template>
  <div
    class="homepage"
    :style="{
      'background-image': 'url(' + imageUrl + ')',
      'background-size': 'cover',
      'background-position': 'bottom',
    }"
  >
    <img
      src="@/assets/icons/common/logo_white.svg"
      alt="white space"
      class="logo"
    />
    <div class="room-title">
      <div class="room-title-index">{{ findIndex(currentRoom?.id) }}</div>
      <p class="room-title-name">{{ currentRoom?.name }}</p>
    </div>
    <div class="homepage-main">
      <ul class="rooms-list">
        <li
          v-for="(room, index) in hotelStore.rooms"
          :key="room.id"
          @mouseenter="renderRoom(index, $event)"
        >
          {{ room.name }}
        </li>
      </ul>
      <div class="media">
        <img
          src="@/assets/icons/common/facebook-square-brands.svg"
          alt="facebook link"
          class="icon"
        />
        <img
          src="@/assets/icons/common/instagram-brands.svg"
          alt="instagram link"
          class="icon"
        />
      </div>
      <div class="contact">
        <div class="contact-type">
          <img
            src="@/assets/icons/common/phone-alt-solid.svg"
            alt="phone icon"
            class="icon"
          />
          <span>02-2222-2222</span>
        </div>
        <div class="contact-type">
          <img
            src="@/assets/icons/common/envelope-solid.svg"
            alt="email icon"
            class="icon"
          />
          <span>white-space@hotel.com.tw</span>
        </div>
        <div class="contact-type">
          <img
            src="@/assets/icons/common/home-solid.svg"
            alt="house icon"
            class="icon"
          />
          <span>台北市中正區</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.homepage {
  height: 100vh;
  width: 100vw;

  padding: 50px 0 70px 70px;
  text-align: start;

  transition: background-image 0.8s ease-in-out;

  .logo {
    margin: 0 auto 0 0;
  }

  position: relative;

  &-main {
    position: absolute;
    top: 0;
    right: 0;
    padding-top: inherit;

    .icon {
      width: 20px;
      height: 20px;

      margin-right: 10px;
    }

    .contact,
    .media {
      padding-left: 24px;
    }

    .media {
      margin-bottom: 50px;
    }

    .contact {
      font-family: NotoSansCJKtc-DemiLight;
      font-size: 14px;
      color: #ffffff;

      &-type {
        & + & {
          margin-top: 10px;
        }
        img,
        span {
          vertical-align: middle;
        }
      }
    }
  }
}

.room-title {
  padding-left: inherit;
  padding-right: inherit;
  padding-bottom: inherit;

  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  &-index {
    width: 86px;
    // font-family: NotoSansCJKtc-DemiLight;
    text-align: center;
    font-size: 66px;
    color: #ffffff;

    position: relative;

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 10px;

      // width: 86px;
      width: 100%;
      height: 19px;
      // background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NnB4IiBoZWlnaHQ9IjE5cHgiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuX2x5VDJCIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48bGluZSB4MT0iMCIgeT0iMCIgeDI9IjAiIHkyPSIxNSIgc3Ryb2tlPSIjMTk0ZDMzIiBzdHJva2Utd2lkdGg9IjI4Ii8+PC9wYXR0ZXJuPjwvZGVmcz4gPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuX2x5VDJCKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==");
      background-image: linear-gradient(
        45deg,
        #ffffff 3.57%,
        rgba(255, 255, 255, 0.1) 3.57%,
        rgba(255, 255, 255, 0.1) 50%,
        #ffffff 50%,
        #ffffff 53.57%,
        rgba(255, 255, 255, 0.1) 53.57%,
        rgba(255, 255, 255, 0.1) 100%
      );
      background-size: 19.8px 19.8px;
    }
  }
  &-name {
    // font-family: NotoSansCJKtc-DemiLight;
    font-size: 24px;
    color: #ffffff;
    letter-spacing: 2.51px;
  }
}

.rooms-list {
  width: 300px;
  padding: 37px 0 62px 34px;
  margin: 0 0 100px auto;

  background-color: #ffffff;
  color: #000000;

  text-align: start;
  font-size: 14px;
  letter-spacing: 1.46px;

  overflow: hidden;

  position: relative;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 20px;

    position: absolute;
    left: 24px;
    bottom: 0;
    transform: translateY(100%);

    background-image: linear-gradient(
      45deg,
      #ffffff 3.57%,
      rgba(255, 255, 255, 0.1) 3.57%,
      rgba(255, 255, 255, 0.1) 50%,
      #ffffff 50%,
      #ffffff 53.57%,
      rgba(255, 255, 255, 0.1) 53.57%,
      rgba(255, 255, 255, 0.1) 100%
    );
    background-size: 19.8px 19.8px;
  }

  li {
    position: relative;
    cursor: pointer;

    & + li {
      margin-top: 37px;
    }

    &:hover {
      &::before {
        content: "";
        display: block;
        width: 23px;
        height: 1px;
        border: 1px solid #000000;

        position: absolute;
        top: 50%;
        transform: translateX(-100%);
      }
    }
  }
}
</style>
