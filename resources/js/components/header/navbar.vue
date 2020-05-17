<template>
    <div class="navbar-parent">
        <nav class="navbar">
            <router-link :class="'navbar-brand'" :to="'/'">Tasks</router-link>
            <div class="my-2 my-lg-0">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item dropdown" v-if="loggedIn">
                        <a v-if="user" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="div-image">
                                <img :src="'https://i.stack.imgur.com/l60Hf.png'"/>
                            </div>
                            {{ user.name}}
                        </a>
                        <div class="dropdown-menu dropdown-menu-left" aria-labelledby="navbarDropdown">
                            <router-link :class="'dropdown-item'" :to="'/logout'">Log Out</router-link>
                        </div>
                    </li>
                </ul>
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
    .navbar {
        display: block;
    }
    .navbar-nav .dropdown-menu {
        position: absolute;
    }
    .navbar-parent {
        background-color: #4c5566;
        width: 200px;
        height: 100vh;
        display: table-cell;
        vertical-align: top;
    }
    a.navbar-brand, .navbar-nav .nav-link {
        color: #ffffff;
    }
</style>
