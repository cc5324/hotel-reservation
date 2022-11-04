// plugins/quasar.js
import { Quasar } from "quasar";
// import icon libraries
import "@quasar/extras/material-icons/material-icons.css"; // Quasar icon
// import Quasar css
import "quasar/src/css/index.sass";

export default {
  install(app) {
    app.use(Quasar, {
      plugins: {},
    });
  },
};
