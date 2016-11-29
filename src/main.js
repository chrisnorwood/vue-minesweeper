import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './App';
import './styles/global.scss';

Vue.use(VueResource);
Vue.http.options.root = 'https://vue-minesweeper.firebaseio.com';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
