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
    <SimplePagination :page="page" :total="total" @prev="prev" @next="next"></SimplePagination>
  </div>
</template>

<script>
import CollectionsService from "@/services/CollectionsService";
import NavigationBar from "@/components/NavigationBar";
import SingleCollectionComponent from "@/components/collections/SingleCollectionComponent";
import SimplePagination from "./SimplePagination";

export default {
  name: "AllCollectionsWindow",

  data: () => ({
    data: [],
    page: 1,
    total: 1,
    liked: ""
  }),
  components: {
    SimplePagination,
    NavigationBar,
    SingleCollectionComponent
  },
  mounted() {
    CollectionsService.getAllCollections(this.page).then(
        (data) => {
          this.data = data.items;
          this.total = data.total
        }
    )
  },
  methods: {
    prev() {
      CollectionsService.getAllCollections(this.page - 1).then(
          (data) => {
            this.page--;
            this.data = data.items;
            this.total = data.total
          }
      )
    },
    next() {
      CollectionsService.getAllCollections(this.page + 1).then(
          (data) => {
            this.page++;
            this.data = data.items;
            this.total = data.total
          }
      )
    }
  }
}
</script>

<style scoped>

</style>