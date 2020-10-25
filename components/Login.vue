<template>
    <div id="login-holder">
        <form @submit.prevent="authenticate" >
            <Input-Field field="Username" name="Username/Email"
                v-model="inputs.username" description="Username or email"
                icon="person_outline" :validators="validators.required" />
            <Input-Field field="Password" name="Password"
                v-model="inputs.password" description="Password"
                icon="fingerprint" type="password"
                :validators="validators.required" />
            <Submit-Button field="Login" />
            <router-link v-if="showRegister ?? true" :to="{name: 'apiRegister'}">Register</router-link>
            <router-link v-if="showForgot ?? true" :to="{name: 'apiForgotPassword'}">Forgot password</router-link>
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

import { AuthenticationStatus } from '../enums/AuthenticationStatus';
import ApiService from '../services/ApiService';

import InputField from './forms/InputField.vue';
import SubmitButton from './forms/SubmitButton.vue';
import RequiredValidator from '../forms/validation/RequiredValidator';
import StringValidator from '../forms/validation/StringValidator';

export default defineComponent({
    components: {
        InputField,
        SubmitButton
    },
    props: {
        success: Object,
        showForgot: Boolean,
        showRegister: Boolean
    },

    data(props) {
        return {
            inputs: {
                username: '',
                password: ''
            },
            errors: Array<String>(),
            validators: {
                required: [ new RequiredValidator() ]
            }
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