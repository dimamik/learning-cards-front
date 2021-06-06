<template>
  <div>
    <v-expansion-panels v-model="expansion_panel_open" accordion>
      <v-expansion-panel>

        <v-expansion-panel-header>
          <template v-slot="{open}">
            <v-row no-gutters>
              <v-col cols="4">
                Add new Collection
              </v-col>
              <v-col
                  class="text--secondary"
                  cols="8"
              >
                <v-fade-transition leave-absolute>
                <span
                    v-if="{open}"
                    key="0"
                >
                  Please, provide collection name below
                </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
              v-model="new_collection.name"
              placeholder="Collection Name"
          ></v-text-field>
          <v-text-field
              v-model="new_collection.description"
              placeholder="Collection Description"
          ></v-text-field>
          <v-btn
              v-if="!this.loading"
              class="ma-2 white--text"
              color="blue-grey"
              @click=add_collection
          >
            Add
            <v-icon
                dark
                right
            >
              mdi-cloud-upload
            </v-icon>
          </v-btn>

          <v-progress-circular v-if="this.loading"
                               color="red"
                               indeterminate
          ></v-progress-circular>

        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
    <v-row class="ma-2">
      <v-col v-for="collection in data" :key="collection.collectionID" cols="12" md="4" sm="3">
        <SingleCollectionComponent class=""
                                   v-bind:are_my_collections="true"
                                   v-bind:collection="collection"
        ></SingleCollectionComponent>
      </v-col>
    </v-row>
    <SimplePagination :page="page" :total="total" @prev="prev" @next="next"></SimplePagination>
  </div>
</template>

<script>
import CollectionsService from "@/services/CollectionsService";
import SingleCollectionComponent from "@/components/collections/SingleCollectionComponent";
import SimplePagination from "./SimplePagination";

export default {
  name: "MyCollectionsWindow",
  data: () => ({
    data: [],
    page: 1,
    total: 1,
    new_collection: {
      name: "",
      description: ""
    },
    loading: false,
    expansion_panel_open: true
  }),
  methods: {
    add_collection() {
      this.loading = true;
      if (this.new_collection.description && this.new_collection.name) {
        CollectionsService.addCollection(this.new_collection.description,
            this.new_collection.name).then(
            () => {
              this.loading = false;
              this.expansion_panel_open = false;
              this.$forceUpdate();
            }
        );
      } else {
        this.loading = false;
      }
    },
    prev() {
      CollectionsService.getCurrentUserCollections(this.page - 1).then(
          (data) => {
            this.page--;
            this.data = data.items;
            this.total = data.total
          }
      )
    },
    next() {
      CollectionsService.getCurrentUserCollections(this.page + 1).then(
          (data) => {
            this.page++;
            this.data = data.items;
            this.total = data.total
          }
      )
    }
  },
  components: {
    SimplePagination,
    SingleCollectionComponent

  },
  mounted() {
    CollectionsService.getCurrentUserCollections(this.page)
        .then(
            (data) => {
              this.data = data.items;
              this.total = data.total
            }
        )
  }
}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>