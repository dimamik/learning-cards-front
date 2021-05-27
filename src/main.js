import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from "axios";
import AuthService from "./services/AuthService";

Vue.config.productionTip = false

const HOST = "localhost:5000";

axios.defaults.baseURL = "http://" + HOST + "/api";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true

AuthService.loadCurrent()
  .then(() =>
    new Vue({
        router,
        vuetify,
        render: h => h(App)
    }).$mount('#app')
  ).catch(err => {
    document.write("Unexpected connection error!");
    console.log(err);
});