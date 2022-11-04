import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//引入 svg 雪碧圖
import "virtual:svg-icons-register";
import SvgIcon from "./components/plugins/SvgIcon.vue";

//引入 font awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/plugins/fontawesome";

// import "./assets/main.css";
import "./assets/scss/base.scss";

import { quasar } from "./plugins";

const app = createApp(App);

// app.use(pinia);
app.use(createPinia());
app.use(router);
app.use(quasar);
app.component("SvgIcon", SvgIcon);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
