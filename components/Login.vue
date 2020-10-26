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
            <Submit-Button field="Login" :enabled="valid" />
            <router-link v-if="showRegister ?? true" :to="{name: 'apiRegister'}">Register</router-link>
            <router-link v-if="showForgot ?? true" :to="{name: 'apiForgotPassword'}">Forgot password</router-link>
        </form>
    </div>
</template>

<style scoped lang="scss">
    #errors {
        list-style:none;
    }
</style>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref, UnwrapRef, watch } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import { AuthenticationStatus } from '../enums/AuthenticationStatus';
import ApiService from '../services/ApiService';

import InputField from './forms/InputField.vue';
import SubmitButton from './forms/SubmitButton.vue';
import RequiredValidator from '../forms/validation/RequiredValidator';
import StringValidator from '../forms/validation/StringValidator';
import ILoginObject from '../models/account/ILoginObject';
import IValidationError from '../forms/validation/IValidationError';
import ValidationError from '../forms/validation/ValidationError';

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
        const inputs: UnwrapRef<ILoginObject> = reactive({
            username: {
                value: '',
                valid: false,
                validators: [ new RequiredValidator() ],
                errors: new Array<IValidationError>()
            },
            password: {
                value: '',
                valid: false,
                validators: [ new RequiredValidator() ],
                errors: new Array<IValidationError>()
            }
        });

        const valid = ref(false);

        watch(inputs,
            (value, _) =>
                valid.value = (Object.values(value).find(c => !c.valid) == null)
        )

        return {
            inputs: inputs,
            validators: {
                required: [ new RequiredValidator() ]
            },
            valid: valid
        }
    },

    methods: {
        authenticate() {
            ApiService.login(this.inputs.username.value, this.inputs.password.value)
                .subscribe(status => {
                    switch (status) {
                        case AuthenticationStatus.Unauthenticated:
                            this.inputs.password.value = '';
                            this.inputs.password.errors.length = 0;
                            this.inputs.password.errors.push(new ValidationError("Incorrect password"));
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