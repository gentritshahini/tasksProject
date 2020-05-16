<template>
    <div>
        <div id="wrapper">
            <app-navbar v-if="isLogged"></app-navbar>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
        <!-- set progressbar -->
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
    import navbar from './header/navbar';
    export default {
        name: "App",
        components: {
            'app-navbar': navbar,
        },
        computed:{
            isLogged(){
                return this.$store.getters.isLogged
            }
        }
    }
</script>

<style scoped>

</style>
