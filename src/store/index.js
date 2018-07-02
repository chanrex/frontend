import Vue from 'vue';
import Vuex from 'vuex';

import { dofetch } from './fetch.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 20,
    user: {
      user_name: window.sessionStorage.getItem('name'),
      user_email: window.sessionStorage.getItem('email'),
      id: window.sessionStorage.getItem('user_id'),
    },
    authors: [],
    publishers: [],
    categorys: [],
    bookList: [],
    myPurchase: [],
    myBook: [],
  },
  getters: {
    getCount: state => {
      return state.count;
    },
    getUserId: state => {
      return state.user.id;
    },
    getIfLogin: state => {
      console.log(state.user);
      if (state.user.user_name || state.user.user_email) {
        return true;
      } else {
        return false;
      }
    },
    getUserEmail: state => {
      return state.user.user_email ? state.user.user_email : '';
    },
    getAuthors: state => state.authors,
    getPublishers: state => state.publishers,
    getCategorys: state => state.categorys,
    getBookList: state => state.bookList,
    getMyPurchase: state => state.myPurchase,
    getMyBook: state => state.myBook,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    updateUserInfo(state, _input) {
      state.user = Object.assign({}, ..._input);
      console.log(_input);
      window.sessionStorage.setItem('name', _input.user_name);
      window.sessionStorage.setItem('email', _input.user_email);
      window.sessionStorage.setItem('user_id', _input.id);
    },
    updateAuthorInfo(state, _input) {
      state.authors = _input;
      window.sessionStorage.setItem('authors', _input);
    },
    updatePublihserInfo(state, _input) {
      state.publishers = _input;
      window.sessionStorage.setItem('publishers', _input);
    },
    updateCategorys(state, _input) {
      state.categorys = _input;
      window.sessionStorage.setItem('categorys', _input);
    },
    updateBookList(state, _input) {
      state.bookList = _input;
    },
    updateMyPurchase(state, _input) {
      state.myPurchase = _input;
    },
    updateMyBook(state, _input) {
      state.myBook = _input;
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
    async addBook({ commit }, _input) {
      let { status, data } = await dofetch('/addBook', 'POST', _input);
      console.log(status, data);
      return true;
    },
    async loadAuthors({ commit }, _input) {
      let { status, data } = await dofetch('/authors');
      commit('updateAuthorInfo', data);
    },
    async loadPublishers({ commit }, _input) {
      let { status, data } = await dofetch('/publishers');
      commit('updatePublihserInfo', data);
    },
    async loadCategorys({ commit }) {
      let { status, data } = await dofetch('/categorys');
      commit('updateCategorys', data);
    },
    async loadBookList({ commit }) {
      let { status, data } = await dofetch('/books');
      commit('updateBookList', data);
    },
    async purchaseBook({ commit }, _input) {
      let { status, data } = await dofetch('/purchase', 'POST', _input);
      return true;
    },
    async loadMyPurchase({ getters, commit }) {
      let user_id = getters.getUserId;
      let { status, data } = await dofetch(`/myPurchase/${user_id}`);
      commit('updateMyPurchase', data);
    },
    async loadMyBook({ getters, commit }) {
      let user_id = getters.getUserId;
      let { status, data } = await dofetch(`/myBook/${user_id}`);
      commit('updateMyBook', data);
    },
  },
});

export default store;
