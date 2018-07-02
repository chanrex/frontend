<template>
  <div>
    <v-container 
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout
        v-show="books.length == 0"
        row
        wrap
      >
        <v-flex xs12>
          <h1>You now have no purchase</h1>
        </v-flex>
      </v-layout>
      <v-layout 
        row 
        wrap>
      
        <v-flex 
          v-for="book in books"
          :key="book.id"
          xs6
        >
          <v-card>
            <v-card-title primary-title>
              <v-container 
                fluid 
                grid-list-lg>
                <v-layout row>
                  <v-flex xs8>
                    <div class="headline">{{ book.book_name }}</div>
                    <span class="grey--text">{{ book.book_title }}</span>
                    <div>
                      AUTHOR: {{ book.author_name }}
                    </div>
                  
                    <div>
                      PRICE: {{ book.book_price }}
                    </div>
                    <div>
                      DESCRIPTION: {{ book.book_description }}
                    </div>
                    <div>
                      PUBLISH DATE: {{ book.book_publish_date }}
                    </div>
                    <div>
                      PUBLISHER: {{ book.company_name }}
                    </div>
                    <div>
                      ISBN: {{ book.book_isbn }}
                    </div>
                    <br>
                    <v-chip 
                      v-for="category in book.array_agg"
                      :key="category"
                    >{{ category }}</v-chip>
                  
                  </v-flex>
                  <v-flex xs4>
                    <v-card-media
                      src="/public/getImage.jpeg"
                      height="180px"
                      contain
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-title>       
          </v-card>
        </v-flex>

      </v-layout>

    </v-container>
  </div>

</template>
<script>
export default {
  data: () => ({
    show: false,
    confirm: false,
    confirmId: '',
  }),
  computed: {
    userId: function() {
      return this.$store.getters.getUserId;
    },
    books: function() {
      return this.$store.getters.getMyPurchase;
    },
  },
  mounted() {
    this.$store.dispatch('loadMyPurchase');
  },
};
</script>
