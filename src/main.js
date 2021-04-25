import Vue from 'vue'
import App from './App.vue'
import router from './router';
import firebase from 'firebase';
import 'firebase/firestore';
import jQuery from 'jquery'
global.$ = jQuery

var firebaseConfig = {
apiKey: "AIzaSyD8KziJSPj-GTPEvww-Vkq_ZZd6JB0-gdw",
authDomain: "opap-lottery-game.firebaseapp.com",
projectId: "opap-lottery-game",
storageBucket: "opap-lottery-game.appspot.com",
messagingSenderId: "709822335105",
appId: "1:709822335105:web:89ac890764d7c5ebea2580"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
