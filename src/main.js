import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";

Vue.prototype.$http  =  Axios;
const accessToken = localStorage.getItem("usertoken");

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] =  accessToken
}
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
