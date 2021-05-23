<template>
  <div>
    <v-row class="ma-2">
      <v-col v-for="collection in data" :key="collection.collectionID" cols="12" md="4" sm="3">
        <SingleCollectionComponent
            v-bind:are_liked_collections="false"
            v-bind:are_my_collections="false"
            v-bind:collection="collection"

        ></SingleCollectionComponent>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import CollectionsService from "@/services/CollectionsService";
import NavigationBar from "@/components/NavigationBar";
import SingleCollectionComponent from "@/components/collections/SingleCollectionComponent";

export default {
  name: "AllCollectionsWindow",

  data: () => ({
    data: "",
    liked: ""
  }),
  components: {
    NavigationBar,
    SingleCollectionComponent
  },
  mounted() {

    CollectionsService.getAllCollections().then(
        (data) => {
          this.data = data;
        }
    )
  }
}
</script>

<style scoped>

</style>