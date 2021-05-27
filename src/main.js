import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import AuthService from "@/services/AuthService";
import axios from "axios";
import HttpStatus from "./shared/HttpStatus";

Vue.config.productionTip = false

const HOST = "localhost:5000"

axios.defaults.baseURL = "http://" + HOST + "/api";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true

const loadVue = () =>
  new Vue({
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app');

AuthService.loadCurrent()
    .then(loadVue)
    .catch(err => {
        document.write("Unexpected connection error!");
        console.log(err);
    });
