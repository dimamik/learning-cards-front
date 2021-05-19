<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
import CollectionsService from "@/services/CollectionsService";

export default {
  name: "MyCollectionsWindow",
  data: () => ({
    data: ""
  }),
  mounted() {
    CollectionsService.getSingleCollection(9
    ).then(
        (data) => {
          this.data = data;
        }
    )
  }
}
</script>

<style scoped>

</style>