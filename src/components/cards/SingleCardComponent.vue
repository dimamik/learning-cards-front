<template>
  <v-carousel-item
      style="align-content: center; text-align: center; justify-content: center;
    padding-top: 8vh;"
  >
    <!--    {{ card }}-->
    <v-row
        align="center"
        justify="center">
      <v-col>
        <FlipCard
        >
          <template slot="front" class="red"
          >
            <StyledVCard
                v-bind:text="card.cardInside.front"
            ></StyledVCard>
          </template>
          <template slot="back">
            <StyledVCard
                v-bind:text="card.cardInside.back"
            ></StyledVCard>
          </template>
        </FlipCard>
      </v-col>
    </v-row>
  </v-carousel-item>
</template>

<script>
import StyledVCard from "@/components/cards/StyledVCard";
import VueFlip from "vue-flip";
import FlipCard from "@/components/cards/FlipCard";

export default {
  name: "SingleCardComponent",
  props: ['card'],
  components: {
    StyledVCard,
    'vue-flip': VueFlip,
    FlipCard
  },
  methods: {
    toggleCard: function (card) {
      card.flipped = !card.flipped;
    },
  }
}
</script>

<style scoped>

</style>