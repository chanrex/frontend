export default [
  {
    path: '/',
    name: 'Home',
    component() {
      return import('../../components/Home.vue');
    },
  },
  {
    path: '/table',
    name: 'Table',
    component() {
      return import('../../components/Table.vue');
    },
  },
  {
    path: '/card',
    name: 'Card',
    component() {
      return import('../../components/Card.vue');
    },
  },
  {
    path: '/card-dropdown',
    name: '',
    component() {
      return import('../../components/CardDropdown.vue');
    },
  },
  {
    path: '/card-list',
    name: 'Card List',
    component() {
      return import('../../components/CardList.vue');
    },
  },
  {
    path: '/dialogs',
    name: 'Dialogs',
    component() {
      return import('../../components/Dialog.vue');
    },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component() {
      return import('../../components/SignIn.vue');
    },
  },
];
