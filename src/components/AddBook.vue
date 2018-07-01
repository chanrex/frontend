<template>
 
  <v-container
    fluid
    style="min-height: 0;"
    grid-list-lg
  >
    <v-layout 
      row 
      wrap>
      <v-flex 
        xs6 
        offset-xs3>
        <v-card>

          <v-card-title>
            <v-container fluid>

              <div class="headline">Add Book</div><br>

              <v-form v-model="valid">
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
                ></v-select>
                <v-select
                  v-model="publisherId"
                  :items="publisherOptions"
                  item-text="company_name"
                  item-value="id"
                  label="Publisher"
                ></v-select>
              </v-form>
              <div>
                <v-btn 
                  right 
                  color="info" 
                  @click="addBook">Submit</v-btn>
              </div>

            </v-container>
          </v-card-title>

        </v-card>
      </v-flex>
    
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    bookName:'my name',
    bookTitle: 'my title',
    bookDescription: 'my description',
    bookPublishDate: '2017/09/21',
    bookISBN: '11225-nn12412521',
    bookPrice: 400,
    authorId: {},
    publisherId: {},   
  }),
  computed: {
    userId: function() {
      return this.$store.getters.getUserId;
    },
    authorOptions: function() {
      return this.$store.getters.getAuthors;
    },
    publisherOptions: function() {
      return this.$store.getters.getPublishers;
    }
  },
  methods: {
    addBook: function() {
      console.log(this.authorId);

      let data = {
        book_name: this.bookName,
        book_title: this.bookTitle,
        book_description: this.bookDescription,
        book_isbn: this.bookISBN,
        book_price: this.bookPrice,
        user_id: this.userId,
        author_id: this.authorId,
        publisher_id: this.publisherId,
      }
      console.log(data);
      this.$store
        .dispatch('addBook', data)
        .then(output => {
          if (output) {
            console.log(output);
            // console.log('signIn success');
            // this.$router.push('/book-list'); // got some problem
            // location.replace('/book-list');
          } else {
            console.log('signIn failed');
          }
        });
    },
  },
};
</script>
