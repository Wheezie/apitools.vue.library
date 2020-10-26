<template>
    <div id="register-holder">
        <form @submit.prevent="registrate">
            <Input-Field field="Email"
                type="email" icon="alternate_email"
                v-model="inputs.email" />
            <Input-Field field="Username"
                type="text" icon="person_outline"
                v-model="inputs.username" />
            <Input-Field field="First Name"
                type="text" icon="text_fields"
                v-model="inputs.firstName" />
            <Input-Field field="Last Name"
                type="text" icon="text_fields"
                v-model="inputs.lastName" />
            <Input-Field field="Password"
                type="password" icon="fingerprint"
                v-model="inputs.password" />
            <Input-Field field="Retype Password"
                type="password" icon="fingerprint"
                v-model="inputs.passwordRetype" />
            <Submit-Button field="Register" :enabled="valid" />
            <router-link v-if="showLogin" :to="{name: 'apiLogin'}">Login</router-link>
        </form>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, UnwrapRef, watch } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import { AuthenticationStatus } from '../enums/AuthenticationStatus';
import ApiService from '../services/ApiService';
import AccountService from '../services/AccountService';

import RegistrationOptions from '../models/options/RegistrationOptions';
import IRegistrationObject from '../models/account/IRegistrationObject';


import InputField from './forms/InputField.vue';
import SubmitButton from './forms/SubmitButton.vue';
import IField from '../forms/IField';

import StringValidator from '../forms/validation/StringValidator';
import StringCompareValidator from '../forms/validation/StringCompareValidator';
import RequiredValidator from '../forms/validation/RequiredValidator';
import IValidationError from '../forms/validation/IValidationError';

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
        const password = ref('');
        const inputs: UnwrapRef<IRegistrationObject> = reactive({
            email: {
                value: '',
                valid: false,
                validators: this.config!.emailRequired
                    ? [ new RequiredValidator() ] : [],
                errors: new Array<IValidationError>()
            },
            username: {
                value: '',
                valid: false,
                validators: this.config!.userName.validators,
                errors: new Array<IValidationError>()
            },
            firstName: {
                value: '',
                valid: false,
                validators: this.config!.firstName.validators,
                errors: new Array<IValidationError>()
            },
            lastName: {
                value: '',
                valid: false,
                validators: this.config!.lastName.validators,
                errors: new Array<IValidationError>()
            },
            password: {
                value: password,
                valid: false,
                validators: this.config!.password.validators,
                errors: new Array<IValidationError>()
            },
            passwordRetype: {
                value: '',
                valid: false,
                validators: this.config!.password.validators,
                errors: new Array<IValidationError>()
            }
        });

        inputs.passwordRetype.validators.push(new StringCompareValidator(password, "Password"))

        const valid = ref(false);

        watch(inputs,
            (value, _) =>
                valid.value = (Object.values(value).find(c => !c.valid) == null)
        )

        return {
            inputs: inputs,
            valid: valid
        }
    },
    methods: {
        registrate() {
            AccountService.register(this.inputs);
        }
    }
});
</script>