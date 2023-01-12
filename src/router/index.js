import { createRouter, createWebHistory } from "vue-router";
import { useHotelStore } from "@/stores/hotel.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/RoomsView.vue"),
      async beforeEnter() {
        const hotelStore = useHotelStore();
        await hotelStore.getRooms();
      },
    },
    {
      path: "/rooms",
      name: "rooms",
      component: () => import("../views/RoomsView.vue"),
      async beforeEnter() {
        const hotelStore = useHotelStore();
        await hotelStore.getRooms();
      },
    },
    {
      path: "/room/:id",
      name: "room",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RoomView.vue"),
      async beforeEnter(to) {
        const roomID = to.params.id;
        const hotelStore = useHotelStore();
        await hotelStore.getRoom(roomID);
      },
    },
    {
      path: "/demo",
      name: "demo",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/DEMO.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
