<template>
  <div id="dashboard">
    <app-header />
    <h1>Welcome to the dashboard!</h1>
    <p>You're here because you are authenticated!</p>
  </div>
</template>

<script>
import Header from "@/components/header/Header";

export default {
  components: {
    "app-header": Header,
  },
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}

p {
  color: white;
}
</style>
