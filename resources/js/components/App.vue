<template>
    <div>
        <div id="wrapper">
            <app-navbar v-if="isLogged"></app-navbar>
            <router-view></router-view>
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
    #wrapper {
        width: 100%;
        height: 100vh;
        display: table;
        overflow: hidden;
    }
    @media (max-width: 767px) {
        #wrapper {
            display: block;
        }
    }
    @media (max-width: 575px) {
        #wrapper {
            overflow: unset;
        }
    }
</style>
