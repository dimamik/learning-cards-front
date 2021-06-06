<template>
  <v-row justify="center" class="nav-row">
    <v-btn :disabled="page === 1" @click="$emit('prev')" class="btn">Prev</v-btn>
    <v-card class="page" color="secondary">{{ page }}</v-card>
    <v-btn :disabled="page === total" @click="$emit('next')" class="btn">Next</v-btn>
  </v-row>
</template>

<script>
export default {
  name: "SimplePagination",
  props: {
    page: Number,
    total: Number
  }
}
</script>

<style scoped>
  .nav-row {
    margin-top: 5em;
  }

  .page {
    padding: 0.4em 1em;
    margin: 0 0.5em;
    color: #eee;
  }
</style>