<template>
    <div id="register-holder">
        <form @submit.prevent="registrate">
            <Input-Field field="Email"
                type="email" icon="alternate_email" :validators="validators.email" />
            <Input-Field field="Username"
                type="text" icon="person_outline" :validators="validators.username" />
            <Input-Field field="First Name"
                type="text" icon="text_fields" :validators="validators.firstName" />
            <Input-Field field="Last Name"
                type="text" icon="text_fields" :validators="validators.lastName" />
            <Input-Field field="Password"
                type="password" icon="fingerprint" :validators="validators.password" />
            <Input-Field field="Retype Password"
                type="password" icon="fingerprint" :validators="validators.password" />
            <Submit-Button field="Register" />
            <router-link v-if="showLogin" :to="{name: 'apiLogin'}">Login</router-link>
        </form>
        <ul id="errors">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import { AuthenticationStatus } from '../enums/AuthenticationStatus';
import ApiService from '../services/ApiService';
import AccountService from '../services/AccountService';

import RegistrationOptions from '../models/options/RegistrationOptions';


import InputField from './forms/InputField.vue';
import SubmitButton from './forms/SubmitButton.vue';
import StringValidator from '../forms/validation/StringValidator';
import RequiredValidator from '../forms/validation/RequiredValidator';

export default defineComponent({
    components: {
        InputField,
        SubmitButton
    },
    props: {
        success: Object,
        config: RegistrationOptions,
        showLogin: Boolean
    },

    data() {
        return {
            inputs: {
                email: '',
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                passwordRetype: ''
            },
            validators: {
                username: this.config!.userName.validators,
                firstName: this.config!.firstName.validators,
                lastName: this.config!.lastName.validators,
                password: this.config!.password.validators,
                email: this.config!.emailRequired
                    ? [ new RequiredValidator() ] : []
            },
            errors: Array<String>()
        }
    },

    methods: {
        registrate() {
            AccountService.register(this.inputs);
        }
    }
});
</script>