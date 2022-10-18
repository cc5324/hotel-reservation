import { createStore } from "vuex";
import API from "@/api/service";

export default createStore({
  state: {
    isLoading: false,
    rooms: [],
    room: {},
  },
  mutations: {
    //用來 commit 跟 track state 改變
    SET_ROOMS(state, rooms) {
      state.rooms = rooms;
    },
    SET_ROOM(state, room) {
      state.room = room;
    },
    SET_IS_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
    //可以 update Vuex state
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
        const { data: room } = await API.GET(`rooms/${roomID}`);
        this.room = room;
      } catch (error) {
        console.log(error);
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
  modules: {},
  getters: {
    //可以取得 state
  },
});
