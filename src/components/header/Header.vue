<template>
  <header id="header">
    <div class="logo">
      <router-link to="/">Vue Authenticate</router-link>
    </div>
    <nav>
      <ul>
        <li v-if="authenticated">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li v-if="!authenticated">
          <router-link to="/signup">Register</router-link>
        </li>
        <li v-if="!authenticated">
          <router-link to="/signin">Log In</router-link>
        </li>
        <li v-if="authenticated" @click="logout">
          Log Out
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {

  computed: {
    ...mapGetters({
      authenticated: "isAuthenticated",
    }),
  },

  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style scoped>
* {
  cursor: pointer;
}
#header {
  height: 56px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: #747080;
  padding: 0 20px;
}

.logo {
  font-weight: bold;
  color: white;
}

.logo a {
  text-decoration: none;
  color: white;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
}

li {
  margin: 0 16px;
}

li a {
  text-decoration: none;
  color: black;
}

li a:hover,
li a:active,
li a.router-link-active {
  color: #fa9f;
}
</style>
