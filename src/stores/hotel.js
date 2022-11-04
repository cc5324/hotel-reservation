import { defineStore } from "pinia";
import API from "@/api/service";
import router from "../router";
import { camelizeJsonKeys } from "@/assets/utilities/camelizeJsonKeys.js";

export const useHotelStore = defineStore("hotel", {
  state: () => ({
    rooms: [],
    room: {},
    booked: [],
  }),
  getters: {
    getRoomById: (state) => {
      return (roomId) => state.rooms.find((room) => room.id === roomId);
    },
    getRoomAmenities: (state) => camelizeJsonKeys(state.room.amenities),
    getBookedDates: (state) => state.booked.map((book) => book.date),
  },
  actions: {
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
        const { room, booking } = await API.GET(`room/${roomID}`);
        this.room = room[0];
        this.booked = booking;
        // console.log(`booked`, this.booked);
      } catch (error) {
        console.log(error);
        router.push({ name: "NotFound" });
      }
    },
    async reserveRoom(roomID, customerInfo) {
      try {
        const { data } = await API.POST(`rooms/${roomID}`, customerInfo);
        return data;
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
