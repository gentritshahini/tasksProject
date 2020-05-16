<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "logout",
        created() {
            this.$store.dispatch('logout')
                .then(res => {
                    this.$router.push('/login');
                })
        }
    }
</script>

<style scoped>

</style>
