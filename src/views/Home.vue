<template>
  <div class="home">
    <app-header />
    <main-content />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Main from "@/components/home/Main.vue"

export default {
  name: "Home",
  components: {
    "app-header": Header,
    "main-content": Main
  },
};
</script>
