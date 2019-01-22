import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {
  sync
} from 'vuex-router-sync';
import KeenUI from 'keen-ui';

import {
  store
} from './store';
import App from './vue/App.vue';
import PageMain from './vue/PageMain.vue';
import PageMainAdmin from './vue/PageMainAdmin.vue';
import LineBlock from './vue/components/Line.vue';

import ViewIdea from './vue/modals/ViewIdea.vue';
import NewIdea from './vue/modals/NewIdea.vue';
import ViewIdeaAdmin from './vue/modals/ViewIdeaAdmin.vue';



Vue.component('LineBlock', LineBlock);

Vue.component('modal-view-idea', ViewIdea);
Vue.component('modal-new-idea',NewIdea);
Vue.component('modal-view-idea-admin', ViewIdeaAdmin);


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(KeenUI);

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'main',
    component: PageMain
  },
  {
    path: '/admin',
    name: 'admin',
    component: PageMainAdmin
  }
  ]
});
sync(store, router);

const app = new Vue({
  el: '#vue-content',
  store,
  router,
  render(h) {
    return h(App);
  }
})