<template>
  <div>
    <v-container 
      fluid
      style="min-height: 0;"
      grid-list-lg
    >

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

            <v-card-actions>
              <v-btn
                v-show="userId != book.user_id && !book.sold"
                @click="openConfirm(book.book_id)"
                flat 
                color="purple">Buy</v-btn>
              <v-btn 
                disabled
                v-show="book.sold"
                flat
                color="red"
              >
                Sold
              </v-btn>
              <v-spacer/>
            </v-card-actions>
       
          </v-card>
        </v-flex>

      </v-layout>

    </v-container>

    <v-dialog 
      v-model="confirm" 
      max-width="500px">
      <v-card>
        <v-card-title>
          <span>Are you sure to purchase the book?</span>
          <v-spacer/>
        </v-card-title>
        <v-card-actions>
          <v-btn  
            flat 
            @click.stop="confirm=false">Close</v-btn>
          <v-btn 
            color="primary" 
            flat 
            @click.stop="doConfirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      return this.$store.getters.getBookList;
    },
  },
  mounted() {
    this.$store.dispatch('loadBookList');
  },
  methods: {
    openConfirm(_input) {
      this.confirmId = _input;
      this.confirm = true;
    },
    doConfirm() {
      console.log('this is confirmId', this.confirmId);
      let data = {
        buyer_id: this.userId,
        book_id: this.confirmId,
      }
      this.$store.dispatch('purchaseBook', data)
        .then(input => {
          if (input) {
            this.$router.go(0);
          }
        })
    },
  },
};
</script>
