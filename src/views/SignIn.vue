<template>
  <section>
    <app-header />
    <sign-in-form />
  </section>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Form from "@/components/auth/SignInForm.vue";

export default {
  name: "SignIn",
  components: {
    "app-header": Header,
    "sign-in-form": Form,
  },
};
</script>
