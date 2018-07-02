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
          v-for="(book, index) in books"
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
                      v-for="category in book.category_name_all"
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
            <v-card-actions v-show="false">
              <v-spacer/>
              <v-btn 
                flat 
                color="green"
                @click.stop="openEdit(book.id, index)"
              >
                Edit
              </v-btn>
            </v-card-actions>      
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>


    <v-dialog 
      v-model="editDialog" 
      max-width="500px">
      <v-card>
        <v-card-title>
          <v-container fluid>

            <div class="headline">Edit Book</div>
            <br>

            <v-form>
              <v-text-field
                v-model="bookName"
                label="Name"
                required
              />
              <v-text-field
                v-model="bookTitle"
                label="Title"
                required
              />
              <v-text-field
                v-model="bookDescription"
                label="Description"
                required
              />
              <v-text-field
                v-model="bookPublishDate"
                label="publish date"
                required
                type="date"
              />

              <v-text-field
                v-model="bookISBN"
                label="ISBN"
                required
              />
              <v-text-field
                v-model="bookPrice"
                label="Price"
                required
                type="number"
              />
                
              <v-select
                v-model="authorId"
                :items="authorOptions"
                item-text="author_name"
                item-value="id"
                label="Author"
              />
              <v-select
                v-model="publisherId"
                :items="publisherOptions"
                item-text="company_name"
                item-value="id"
                label="Publisher"
              />

              <v-select
                v-model="e7"
                :items="categoryOptions"
                item-text="category_name"
                item-value="id"
                label="Category"
                multiple
                chips
                hint="You can select multi categories"
                persistent-hint
              />
            </v-form>
            <div>
              <v-btn 
                right 
                color="info" 
                @click="submit">Submit</v-btn>
            </div>

          </v-container>

        </v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn 
            flat
            @click.stop="editDialog=false">Close</v-btn>
          <v-btn 
            color="primary"  
            @click.stop="editDialog=false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
<script>
import moment from 'moment-timezone'

export default {
  data: () => ({
    show: false,
    confirm: false,
    confirmId: '',
    editDialog: false,
      bookName: '',
      bookTitle: '',
      bookDescription: '',
      bookPublishDate: '',
      bookISBN: '',
      bookPrice: 0,
      authorId: {},
      publisherId: {},
      e7: [],
  }),
  computed: {
    userId: function() {
      return this.$store.getters.getUserId;
    },
    books: function() {
      return this.$store.getters.getMyBook;
    },
    authorOptions: function() {
      return this.$store.getters.getAuthors;
    },
    publisherOptions: function() {
      return this.$store.getters.getPublishers;
    },
    categoryOptions: function() {
      return this.$store.getters.getCategorys;
    },
  },
  mounted() {
    this.$store.dispatch('loadMyBook');
  },
  methods: {
    openEdit(book_id, index) {
      console.log(book_id, index);
      console.log(this.books[index]);
      let {
        book_name,
        book_title,
        book_publish_date,
        book_description,
        book_isbn,
        book_price,
        author_id,
        publisher_id,
        category_id_all,
      } = this.books[index];
      console.log(new Date(book_publish_date).getDate())
      this.bookName = book_name
      this.bookTitle = book_title
      this.bookDescription = book_description
      this.bookISBN = book_isbn
      this.bookPrice = book_price
      this.bookPublishDate = moment(book_publish_date).format('DD/MM/YYYY');

      this.editDialog = true;
    },
    submit() {
      console.log('fuck');
    },
  },
};
</script>
