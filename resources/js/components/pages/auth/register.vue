<template>
    <div>
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="d-flex justify-content-center my-5 auth-pages">
                    <div>
                        <div class="form-wrapper">
                            <div class="project-name">
                                <router-link :to="'/'">Tasks</router-link>
                            </div>
                            <div class="project-description">
                                Sign up to use the task manager for your Project.
                            </div>
                            <form class="login-form" @submit.prevent="submitForm">
                                <div class="my-2">
                                    <input type="text" name="name" v-model="form.name"
                                           class="form-control input-auth"
                                           placeholder="Name">
                                    <div class="form-errors" v-if="errors.email">{{ errors.name[0] }}</div>
                                </div>
                                <div class="my-2">
                                    <input type="email" name="email" v-model="form.email"
                                           class="form-control input-auth"
                                           placeholder="Email">
                                    <div class="form-errors" v-if="errors.email">{{ errors.email[0] }}</div>
                                </div>
                                <div class="my-2">
                                    <input type="password" name="password" v-model="form.password"
                                           class="form-control input-auth"
                                           placeholder="Password" autocomplete="off">
                                    <div class="form-errors" v-if="errors.password">{{ errors.password[0] }}</div>
                                </div>
                                <div class="my-3">
                                    <button class="btn btn-primary btn-auth">Sign Up</button>
                                </div>
                            </form>
                        </div>
                        <div class="form-wrapper register-wrapper">
                            Already have an account?
                            <router-link :to="'/login'" class="text text-primary">Sign In</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data: function () {
            return {
                errors: [],
                form: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        created: function () {
            if (this.$store.getters.isLogged) {
                this.$router.push('/');
                return false;
            }
        },
        methods: {
            submitForm() {
                this.errors = [];
                this.$store.dispatch('register', this.$data.form)
                    .then(response => {
                        this.$router.push('/')
                    })
                    .catch(err => {
                        this.errors = err.data.errors;
                    })
            }
        }
    }
</script>

<style scoped>

</style>
