<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-toolbar
        v-show="logined" 
        flat 
        class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ userEmail }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list dense>
        <v-divider/>

        <v-list-tile 
          v-if="!logined"
          @click="$router.push('/signin')"
        >
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


        <v-list-tile 
          v-else
          @click="logout()"
        >
          <v-list-tile-action>
            <v-icon>reply</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="$router.push('/book-list')">
          <v-list-tile-action>
            <v-icon>receipt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Book List</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-show="logined" 
          @click="$router.push('/my-purchase')"
        >
          <v-list-tile-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My purchase</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-show="logined" 
          @click="$router.push('/my-book')"
        >
          <v-list-tile-action>
            <v-icon>local_library</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Book</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-show="logined" 
          @click="$router.push('/book-add')"
        >
          <v-list-tile-action>
            <v-icon>add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add Book</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar 
      color="indigo" 
      dark 
      fixed 
      app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Book Sale</v-toolbar-title>

    </v-toolbar>
    <v-content>
      
      <router-view/> 
      <!-- body part -->
    </v-content>
    <v-footer 
      color="indigo" 
      app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
    
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    dialog2: false,
    items: ['All', 'Family', 'Friends', 'Coworkers'],
  }),
  computed: {
    logined: function() {
      return this.$store.getters.getIfLogin;
    },
    userEmail: function() {
      return this.$store.getters.getUserEmail;
    },
  },
  mounted() {
    this.$store.dispatch('loadAuthors');
    this.$store.dispatch('loadPublishers');
    this.$store.dispatch('loadCategorys');
    this.$store.dispatch('loadMyBook');
    this.$store.dispatch('loadMyPurchase');
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      location.replace('/signin');
    },
  },
};
</script>
