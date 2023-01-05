<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useHotelStore } from "@/stores/hotel.js";

const hotelStore = useHotelStore();

const currentRoom = ref(null);
onBeforeMount(async () => {
  await hotelStore.getRooms();
  currentRoom.value = hotelStore.rooms[0];
});
const imageUrl = computed(() => currentRoom.value?.imageUrl);

function renderRoom(roomIndex) {
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
      class="homepage-logo"
    />
    <div class="homepage-caption">
      <div class="caption">
        <div class="caption-index">{{ findIndex(currentRoom?.id) }}</div>
        <p class="caption-name">{{ currentRoom?.name }}</p>
      </div>
    </div>
    <div class="homepage-main">
      <div class="homepage-main-rooms">
        <ul class="rooms">
          <li
            v-for="(room, index) in hotelStore.rooms"
            :key="room.id"
            @mouseenter="renderRoom(index, $event)"
          >
            <router-link :to="{ name: 'room', params: { id: room.id } }">
              {{ room.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="homepage-connection">
      <div class="connection">
        <div class="connection-media">
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
        <div class="connection-contacts">
          <div class="contact">
            <img
              src="@/assets/icons/common/phone-alt-solid.svg"
              alt="phone icon"
              class="icon"
            />
            <span>02-2222-2222</span>
          </div>
          <div class="contact">
            <img
              src="@/assets/icons/common/envelope-solid.svg"
              alt="email icon"
              class="icon"
            />
            <span>white-space@hotel.com.tw</span>
          </div>
          <div class="contact">
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
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/stripe.scss";

.icon {
  width: 20px;
  height: 20px;

  margin-right: 10px;
}

.homepage {
  height: 100vh;
  width: 100vw;
  padding: 50px 30px 70px 70px;

  position: relative;

  overflow: hidden;

  text-align: start;

  transition: background-image 0.8s ease-in-out;

  &-logo {
    margin: 0 auto 0 0;
  }

  &-main {
    position: absolute;
    top: 0;
    right: 0;
    padding-top: inherit;

    &-contacts,
    &-media {
      padding-left: 24px;
    }
  }

  &-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    padding-left: inherit;
    padding-right: inherit;
    padding-bottom: inherit;

    width: fit-content;
  }

  &-connection {
    position: absolute;
    right: 0;
    bottom: 0;

    padding-right: inherit;
    padding-bottom: inherit;
  }
}

.contact {
  & + & {
    margin-top: 10px;
  }

  img,
  span {
    vertical-align: middle;
  }
}

.connection {
  font-family: NotoSansCJKtc-DemiLight;
  font-size: 14px;
  color: #ffffff;

  &-media {
    margin-bottom: 50px;
  }
}

.caption {
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

      width: 100%;
      height: 19px;
      @include stripe.white-stripe;
    }
  }
  &-name {
    // font-family: NotoSansCJKtc-DemiLight;
    font-size: 24px;
    color: #ffffff;
    letter-spacing: 2.51px;
  }
}

.rooms {
  width: 300px;
  padding: 37px 0 62px 34px;
  margin: 0 0 100px auto;

  background-color: #ffffff;
  color: #000000;

  text-align: start;
  font-size: 14px;
  letter-spacing: 1.46px;

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
    @include stripe.white-stripe;
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
