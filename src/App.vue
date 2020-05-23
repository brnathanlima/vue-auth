<template>
  <div id="app">
    <router-view :key="$router.path" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["autoLogin"])
  },

  created() {
    this.autoLogin();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Thambi+2&display=swap");
body,
html {
  margin: 0;
  font-family: "Baloo Thambi 2", cursive;
  background-color: lightyellow;
}
</style>
