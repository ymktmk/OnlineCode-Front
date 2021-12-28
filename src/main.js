import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')