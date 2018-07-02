export default [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component() {
  //     return import('../../components/Home.vue');
  //   },
  // },
  {
    path: '/book-list',
    name: 'Book List',
    component() {
      return import('../../components/BookList.vue');
    },
  },
  {
    path: '/my-purchase',
    name: 'My Purchase',
    component() {
      return import('../../components/Purchase.vue');
    },
  },
  {
    path: '/my-book',
    name: 'My Book',
    component() {
      return import('../../components/MyBook.vue');
    },
  },
  {
    path: '/book-add',
    name: 'Book Add',
    component() {
      return import('../../components/AddBook.vue');
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
