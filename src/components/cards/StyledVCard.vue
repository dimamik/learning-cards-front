<template>
  <v-card
      class="mx-auto rounded-xl"
      color="#26c6da"
      dark
      height="400"
      width="400"
  >
    <v-container
        fill-height fluid
    >
      <v-card-text class="headline font-weight-bold text-center unselectable">
        {{ text }}
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>

export default {
  name: "StyledVCard",
  props: ['text'],
  components: {}
}
</script>

<style scoped>
*.unselectable {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;

  /*
    Introduced in IE 10.
    See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
  -ms-user-select: none;
  user-select: none;
}
</style>