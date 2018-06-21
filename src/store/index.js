import Vue from 'vue';
import Vuex from 'vuex';

import { dofetch } from './fetch.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 20,
    user: {
      user_name: '',
      user_email: '',
      id: '',
      user_id: '',
    },
  },
  getters: {
    getCount: state => {
      return state.count;
    },
    getUserId: state => {
      return state.user.id;
    },
    getIfLogin: state => {
      if (state.user.user_name != '' && state.user.user_email != '') {
        return true;
      } else {
        return false;
      }
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    updateUserInfo(state, _input) {
      state.user = Object.assign({}, ..._input);
      console.log(state.user);
    },
  },
  actions: {
    async signIn({ commit }, _input) {
      let { email, password } = _input;
      let inputData = {
        email,
        password,
      };
      let { status, data } = await dofetch('/signIn', 'POST', inputData);
      if (status == 'success') {
        commit('updateUserInfo', data);
        return true;
      } else {
        return false;
      }
    },
  },
});

export default store;
