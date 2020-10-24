<template>
    <div id="login-holder">
        <form @submit.prevent="authenticate" >
            <div class="input-field">
                <label for="usernameInput">Username or email</label>
                <input id="usernameInput" type="text" v-model="inputs.username" placeholder="Username/Email" />
                <i class="material-icons">person_outline</i>
            </div>
            <div class="input-field">
                <label for="passwordInput">Password</label>
                <input id="passwordInput" type="password" v-model="inputs.password" placeholder="Password" />
                <i class="material-icons">fingerprint</i>
            </div>
            <div class="input-field">
                <input type="submit" value="Login" />
            </div>
            <router-link v-if="$props.showForgot" :to="{name: 'apiRegister'}">Register</router-link>
            <router-link v-if="$props.showForgot" :to="{name: 'apiForgotPassword'}">Forgot password</router-link>
        </form>
        <ul id="errors">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">

    #errors {
        list-style:none;
    }
</style>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import { AuthenticationStatus } from '@/apitools/enums/AuthenticationStatus';
import ApiService from '@/apitools/services/ApiService';

import { Subscription } from 'rxjs';

export default defineComponent({
    props: {
        success: Object,
        showForgot: Boolean,
    },

    data(props) {
        return {
            inputs: {
                username: '',
                password: ''
            },
            errors: Array<String>()
        }
    },

    methods: {
        authenticate() {
            ApiService.login(this.inputs.username, this.inputs.password)
                .subscribe(status => {
                    switch (status) {
                        case AuthenticationStatus.Unauthenticated:
                            this.errors.length = 0;
                            this.errors.push("Incorrect username/password");
                            break;
                        case AuthenticationStatus.Authenticated:
                            this.$router.push(this.$props.success!);
                            break;
                        default:
                            return;
                    }
                });
        }
    }
});
</script>