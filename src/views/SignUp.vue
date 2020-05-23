<template>
    <section>
        <app-header />
        <sign-up-form />
    </section>
</template>

<script>
import Header from '@/components/header/Header';
import Form from '@/components/auth/SignUpForm'

export default {
    components: {
        "app-header": Header,
        "sign-up-form": Form
    }
}
</script>