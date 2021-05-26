import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import AuthService from "@/services/AuthService";
import axios from "axios";

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers["Content-Type"] = "application/json";
//axios.defaults.headers["Access-Control-Allow-Origin"] = '*';
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
