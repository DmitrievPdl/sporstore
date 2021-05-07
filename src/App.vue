<template>
  <store />
</template>

<script>
import Store from "./components/Store";
import { mapActions } from "vuex";

export default {
  name: 'App',
  components: {
    Store
  },
  methods: {
    ...mapActions(["getData"])
  },
  created() {
    this.getData();
  },
}
</script>
