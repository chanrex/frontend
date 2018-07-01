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
        xs8
        offset-xs2>
        <v-card>

          <v-card-title>
            <v-container fluid>

              <div class="headline">Add Book</div><br>

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
                  :items="categoryOptions"
                  v-model="e7"
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
    authorOptions: function() {
      return this.$store.getters.getAuthors;
    },
    publisherOptions: function() {
      return this.$store.getters.getPublishers;
    },
    categoryOptions: function() {
      let output = this.$store.getters.getCategorys;
      console.log(output);
      return output;
    },
  },
  methods: {
    addBook: function() {
      console.log(this.authorId);

      let data = {
        book_name: this.bookName,
        book_title: this.bookTitle,
        book_publish_date: this.bookPublishDate,
        book_description: this.bookDescription,
        book_isbn: this.bookISBN,
        book_price: this.bookPrice,
        user_id: this.userId,
        author_id: this.authorId,
        publisher_id: this.publisherId,
        category_array: this.e7,
      };
      console.log(data);
      this.$store.dispatch('addBook', data).then(output => {
        if (output) {
          console.log(output);
          // console.log('signIn success');
          // this.$router.push('/book-list'); // got some problem
          // location.replace('/book-list');
        }
      });
    },
  },
};
</script>
