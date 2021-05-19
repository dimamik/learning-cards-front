<template>
<div>
<!--  {{data}}-->
</div>
</template>

<script>
import CollectionsService from "@/services/CollectionsService";
import NavigationBar from "@/components/NavigationBar";

export default {
  name: "AllCollectionsWindow",

  data: () => ({
    data: ""
  }),
  components: {
    NavigationBar
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