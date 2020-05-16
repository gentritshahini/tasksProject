<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <div class="my-2 my-lg-0">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item dropdown ml-3" v-if="loggedIn">
                            <a v-if="user" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="div-image">
                                    <img :src="'https://i.stack.imgur.com/l60Hf.png'"/>
                                </div>
                                {{ user.name}}
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <router-link :class="'dropdown-item'" :to="'/logout'">Log Out</router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "navbar",
        data: function () {
            return {
                dropdown_menu_state: false
            }
        },
        computed: {
            loggedIn() {
                return this.$store.getters.isLogged;
            },
            user() {
                return this.$store.getters.user;
            }
        },
        methods: {
            clickedOnDropdownItem() {
                this.dropdown_menu_state = true;
            },
            closeDropdownMenu() {
                this.dropdown_menu_state = false;
            }
        },
    }
</script>

<style scoped>
    .dropdown .div-image {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 5px;
        display: inline-block;
        border: 1px solid gray;
    }

    .dropdown img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
</style>
