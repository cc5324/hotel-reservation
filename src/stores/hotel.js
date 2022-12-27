import { defineStore } from "pinia";
import API from "@/api/service";
import router from "../router";
import { camelizeJsonKeys } from "@/assets/utilities/camelizeJsonKeys.js";

export const useHotelStore = defineStore("hotel", {
  state: () => ({
    rooms: [],
    room: {},
    booked: [],
    requestState: {
      isReady: false,
      isSuccess: false,
    },
  }),
  getters: {
    getRoomById: (state) => {
      return (roomId) => state.rooms.find((room) => room.id === roomId);
    },
    getRoomAmenities: (state) => camelizeJsonKeys(state.room.amenities),
    getBookedDates: (state) => state.booked.map((book) => book.date),
    getRoomShortDescription: (state) =>
      camelizeJsonKeys(state.room.descriptionShort),
    // getRoomProfile: (state) => camelizeJsonKeys(state.room),
  },
  actions: {
    resetRequestState() {
      this.requestState = {
        isSuccess: false,
        isReady: false,
      };
    },
    async getRooms() {
      try {
        const { success, items: rooms } = await API.GET("rooms");
        if (success) {
          this.rooms = rooms;
        } else {
          console.warn("getRooms fail");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getRoom(roomID) {
      try {
        const res = await API.GET(`room/${roomID}`);
        this.room = res.room[0];
        this.booked = res.booking;
        console.log(`get room res`, res);

        // const { room, booking } = await API.GET(`room/${roomID}`);
        // this.room = room[0];
        // this.booked = booking;
      } catch (error) {
        console.log(error);
        router.push({ name: "NotFound" });
      }
    },
    async reserveRoom(roomID, customerInfo) {
      this.requestState = {
        isSuccess: false,
        isReady: false,
      };
      try {
        const { success } = await API.POST(`room/${roomID}`, customerInfo);
        this.requestState = {
          isSuccess: success,
          isReady: true,
        };
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAllReservation() {
      try {
        const { data } = await API.DELETE("rooms");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
