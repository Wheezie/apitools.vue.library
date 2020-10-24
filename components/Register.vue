<template>
    <div id="register-holder">
        <form @submit.prevent="registrate">
            <div class="input-field">
                <label for="emailInput">Email</label>
                <input id="emailInput" type="email" v-model="inputs.email" placeholder="Email" />
                <i class="material-icons">alternate_email</i>
            </div>
            <div class="input-field">
                <label for="usernameInput">Username</label>
                <input id="usernameInput" type="text" v-model="inputs.username" placeholder="Username" />
                <i class="material-icons">person_outline</i>
            </div>
            <div class="input-field">
                <label for="firstNameInput">First name</label>
                <input id="firstNameInput" type="text" v-model="inputs.firstName" placeholder="First name" />
                <i class="material-icons">text_fields</i>
            </div>
            <div class="input-field">
                <label for="lastNameInput">Last name</label>
                <input id="lastNameInput" type="text" v-model="inputs.lastName" placeholder="Last name" />
                <i class="material-icons">text_fields</i>
            </div>
            <div class="input-field">
                <label for="passwordInput">Password</label>
                <input id="passwordInput" type="password" v-model="inputs.password" placeholder="Password" />
                <i class="material-icons">fingerprint</i>
            </div>
            <div class="input-field">
                <label for="passwordRetypeInput">Retype Password</label>
                <input id="passwordRetypeInput" type="password" v-model="inputs.passwordRetype" placeholder="Retype password" />
                <i class="material-icons">fingerprint</i>
            </div>
            <div class="input-field">
                <input type="submit" value="Register" />
            </div>
            <router-link v-if="$props.showLogin" :to="{name: 'apiLogin'}">Login</router-link>
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

import { Subscription } from 'rxjs';

export default defineComponent({
    props: {
        success: Object,
        config: RegistrationOptions,
        showLogin: Boolean,
    },

    data(props) {
        return {
            inputs: {
                email: '',
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                passwordRetype: ''
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