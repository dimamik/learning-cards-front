<template>
  <v-app>
    <NavigationBar></NavigationBar>


    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavigationBar from "@/components/NavigationBar";

export default {
  name: 'App',

  data: () => ({
    data: ""
  }),
  components: {
    NavigationBar
  }

};
</script>
