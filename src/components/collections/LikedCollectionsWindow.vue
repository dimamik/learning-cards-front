<template>
  <div>
    <v-row class="ma-2">
      <v-col v-for="collection in data" :key="collection.collectionID" cols="12" md="4" sm="3">
        <SingleCollectionComponent class=""
                                   v-bind:are_liked_collections="true"
                                   v-bind:are_my_collections="false"
                                   v-bind:collection="collection"

        ></SingleCollectionComponent>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import SingleCollectionComponent from "@/components/collections/SingleCollectionComponent";
import CollectionsService from "@/services/CollectionsService";

export default {
  name: "LikedCollectionsWindow",
  data: () => ({
    data: []
  }),
  components: {
    SingleCollectionComponent

  },

  mounted() {
    CollectionsService.getCurrentUserFavourites()
        .then(
            (data) => {
              this.data = data;
            }
        )
  }
}
</script>

<style scoped>

</style>