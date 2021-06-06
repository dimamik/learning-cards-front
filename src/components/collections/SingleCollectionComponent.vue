<template>
  <div class="justify-center">
    <v-card
        class="single-collection overflow-y-auto"
        elevation="2"
        max-height="160"
        max-width="320"
        outlined
        shaped
        v-bind:disabled="!is_visible"
    >

      <v-card-title>
        {{ collection.collectionName ? collection.collectionName : "No Title" }}
      </v-card-title>

      <v-card-text

      >
        {{ collection.collectionDescription ? collection.collectionDescription : "No Description" }}
      </v-card-text>

      <v-card-actions>
        <div v-if="is_logged_in" class="learn_cls">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  color="primary"
                  dark
                  fab
                  small
                  @click="learn_clicked"
              >
                <v-icon dark>
                  mdi-school
                </v-icon>
              </v-btn>
            </template>
            <span>Learn Collection</span>
          </v-tooltip>
        </div>

        <div v-if="!liked && is_logged_in && !are_liked_collections" class="add_to_liked_cls">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-if="!are_my_collections"
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  color="purple lighten-1"
                  dark
                  fab
                  small
                  @click=add_to_liked
              >
                <v-icon dark>
                  mdi-thumb-up
                </v-icon>
              </v-btn>
            </template>
            <span>Add To Liked Collections</span>
          </v-tooltip>
        </div>


        <div v-if="(liked && is_logged_in) || are_liked_collections" class="delete_from_liked_cls">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  color="red lighten-1"
                  dark
                  fab
                  small
                  @click=delete_from_liked
              >
                <v-icon dark>
                  mdi-thumb-down
                </v-icon>
              </v-btn>
            </template>
            <span>Remove From Liked Collections</span>
          </v-tooltip>
        </div>

        <div v-if="are_my_collections" class="delete_collection_cls">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  color="red darken-2"
                  dark
                  fab
                  small
                  @click=delete_collection
              >
                <v-icon dark>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Remove From Liked Collections</span>
          </v-tooltip>
        </div>


      </v-card-actions>


    </v-card>
  </div>
</template>

<script>
import CollectionsService from "@/services/CollectionsService";
import AuthService from "@/services/AuthService";
import router from "@/router";

export default {
  name: "SingleCollectionComponent",
  props: ['collection', 'are_my_collections', 'are_liked_collections'],
  components: [AuthService],
  methods: {
    learn_clicked: function (event) {
      // `this` inside methods points to the Vue instance
      router.push({path: "/collections/" + this.collection.collectionID});
    },
    add_to_liked: function (event) {
      CollectionsService.addCollectionToUserFavourites(this.collection.collectionID);
      this.liked = true;
    },
    delete_from_liked: function (event) {
      CollectionsService.deleteCollectionFromUserFavourites(this.collection.collectionID);
      this.liked = false;
      if (this.are_liked_collections) {
        this.is_visible = false;
      }
    },
    delete_collection: function (event) {
      CollectionsService.deleteCollection(this.collection.collectionID);
      this.is_visible = false;
      location.reload()
    }
  },
  data() {
    return {
      buttons:
          [
            {
              button_name: 'Learn Collection',
              button_icon: 'mdi-school',
              button_action_name: 'learn_clicked'
            }
          ],
      liked: true,
      is_logged_in: false,
      is_visible: true

    }
  },
  mounted() {
    this.is_logged_in = AuthService.current !== null;
    this.liked = this.collection.is_liked;
  }

}
</script>

<style scoped>

</style>