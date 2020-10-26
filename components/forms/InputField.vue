<template>
    <div class="input-field">
        <label :for="fieldId">{{description ?? field}}</label>
        <input :id="fieldId" ref="inputField" :type="type ?? 'text'"
            :value="modelValue.value" @input="validate()" @blur="validate()"
            v-bind:class="{error: hasErrors}" :placeholder="field"
            :min="minimum" :minlength="minimum"
            :max="maximum" :maxlength="maximum" />
        <i class="material-icons">{{icon}}</i>
        <div class="errors" v-if="hasErrors">
            <span class="error" v-for="error in errors" :key="error">{{error.message}}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .input-field {
        position: relative;
        margin: .6em 0;

        i {
            position: absolute;
            padding: .52em;
            font-size: 1.4em;
            left: 0;
            top: 0;
            z-index: 0;
            border-radius: .25em 0 0 .25em;
        }
        
        label {
            display: none;
        }
        

        input {
            position: relative;
            display: block;
            padding: .8em;
            font-size: 1em;
            border-radius: .25em;
            z-index: 1;
            outline: 0;

            &[type=text], &[type=password], &[type=email] {
                padding-left: 2.6em;
                width: calc(100% - 3.4em);
                border: 1px solid #888;

                background-color: rgba(0,0,0,0);

                &:focus {
                    -webkit-animation: padding-left-pop .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                       -moz-animation: padding-left-pop .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                         -o-animation: padding-left-pop .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                            animation: padding-left-pop .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;

                    & + i {
                        -webkit-animation: background-icon .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                           -moz-animation: background-icon .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                             -o-animation: background-icon .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                                animation: background-icon .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                    }
                }

                &.error {
                    border: 1px solid rgb(252, 74, 74);

                    &:focus + i {
                        -webkit-animation: background-icon-error .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                           -moz-animation: background-icon-error .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                             -o-animation: background-icon-error .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                                animation: background-icon-error .5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                        
                    }
                }
            }
        }
    }

    .errors .error {
        color: rgb(252, 74, 74);
        margin: .2em .4em;
        display:block;
        text-align: left;
    }

    @keyframes padding-left-pop {
        from {
            padding-left: 2.6em;
            width: calc(100% - 3.4em);
        }
        to {
            padding-left: 3.4em;
            width: calc(100% - 4.2em);
        }
    }
    @-webkit-keyframes padding-left-pop {
        from {
            padding-left: 2.6em;
            width: calc(100% - 3.4em);
        }
        to {
            padding-left: 3.4em;
            width: calc(100% - 4.2em);
        }
    }
    @-moz-keyframes padding-left-pop {
        from {
            padding-left: 2.6em;
            width: calc(100% - 3.4em);
        }
        to {
            padding-left: 3.4em;
            width: calc(100% - 4.2em);
        }
    }
    @-o-keyframes padding-left-pop {
        from {
            padding-left: 2.6em;
            width: calc(100% - 3.4em);
        }
        to {
            padding-left: 3.4em;
            width: calc(100% - 4.2em);
        }
    }

    @keyframes background-icon-error {
        from {
            background-color: rgba(0,0,0,0);
        }
        to {
            background-color: rgb(252, 74, 74);
        }
    }
    @-webkit-keyframes background-icon-error {
        from {
            background-color: rgba(0,0,0,0);
        }
        to {
            background-color: rgb(252, 74, 74);
        }
    }
    @-moz-keyframes background-icon-error {
        from {
            background-color: rgba(0,0,0,0);
        }
        to {
            background-color: rgb(252, 74, 74);
        }
    }
    @-o-keyframes background-icon-error {
        from {
            background-color: rgba(0,0,0,0);
        }
        to {
            background-color: rgb(252, 74, 74);
        }
    }

    @keyframes background-icon {
        from {
            background-color: rgba(0,0,0,0);
        }
        to {
            background-color: #ebeef2;
        }
    }
    @-webkit-keyframes background-icon {
        from {
            background-color: rgba(0,0,0,0);
        }
        to {
            background-color: #ebeef2;
        }
    }
    
    @-moz-keyframes background-icon {
        from {
            background-color: rgba(0,0,0,0);
        }
        to {
            background-color: #ebeef2;
        }
    }
    
    @-o-keyframes background-icon {
        from {
            background-color: rgba(0,0,0,0);
        }
        to {
            background-color: #ebeef2;
        }
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

import IValidator from '../../forms/validation/IValidator';
import ValidationError from '../../forms/validation/ValidationError';
import StringValidator from '../../forms/validation/StringValidator';

import IField from '../../forms/IField';

export default defineComponent({
    props: {
        field: String,
        description: String,

        modelValue: Object as () => IField,

        type: String,
        icon: String
    },
    data(props) {
        const stringValidator = this.modelValue!.validators!.find(c => c instanceof StringValidator) as StringValidator;

        return {
            fieldId: `${props.field!.charAt(0).toLowerCase()}${props.field!.substring(1).replace(' ', '')}Input`,
            hasErrors: false,
            errors: new Array<ValidationError>(),
            validators: this.modelValue!.validators!,

            minimum: stringValidator?.minimum ?? 0,
            maximum: stringValidator?.maximum ?? Number.MAX_SAFE_INTEGER
        }
    },
    methods: {
        validate() {
            const inputField = (this.$refs.inputField as HTMLInputElement);
            const currentValue: IField = this.modelValue!;

            if (this.validators && this.validators.length > 0) {
                const totalErrors = new Array<ValidationError>();

                this.validators.forEach((validator) => totalErrors.push(...validator.validate(currentValue.value)));

                this.errors = totalErrors;
                this.hasErrors = this.errors.length > 0;
            }

            currentValue.value = inputField.value;
            currentValue.valid = !this.hasErrors;
            this.$emit('update:modelValue', currentValue);
        }
    }
});
</script>