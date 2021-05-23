<template>
  <div>
    <v-expansion-panels v-model="expansion_panel_open" accordion>
      <v-expansion-panel>

        <v-expansion-panel-header>
          <template v-slot="{open}">
            <v-row no-gutters>
              <v-col cols="4">
                Add new Card to Collection
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
                  Please, provide card back and front below
                </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
              v-model="new_card.front"
              placeholder="Front side of a card (word to learn)"
          ></v-text-field>
          <v-text-field
              v-model="new_card.back"
              placeholder="Back side of a card (definition)"
          ></v-text-field>
          <v-btn
              v-if="!this.loading"
              class="ma-2 white--text"
              color="blue-grey"
              @click=add_new_card
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

    <!--    Show single card and controllers-->


    <v-carousel hide-delimiters

    >
      <SingleCardComponent v-for="card in data"
                           v-bind:card="card"
      >

      </SingleCardComponent>
    </v-carousel>

  </div>
</template>

<script>
import CollectionsService from "@/services/CollectionsService";
import SingleCardComponent from "@/components/cards/SingleCardComponent";

export default {
  name: "SingleCardWindow",
  data() {
    return {
      collection_id: 0,
      data: "",
      loading: false,
      collection_name: "",
      expansion_panel_open: true,
      new_card: {
        front: "",
        back: ""

      }
    }
  },
  components: {
    SingleCardComponent
  },
  methods: {
    add_new_card() {
      this.loading = true;
      if (this.new_card.back && this.new_card.front) {
        CollectionsService.addCardToCollection(this.collection_id, this.new_card).then(
            () => {
              this.loading = false;
              this.expansion_panel_open = false;
              this.$forceUpdate();
            }
        );

      } else {
        console.log("Error in add_new_card");
        this.loading = false;
      }
    }
  },
  mounted() {
    this.collection_id = this.$route.params.collection_id;
    CollectionsService.getSingleCollection(this.collection_id).then(
        (data) => {
          this.data = data;
        }
    )
  }
}
</script>

<style scoped>

</style>