<template>
    <input type="submit" :value="field" :disabled="!enabled" />
</template>

<style lang="scss" scoped>
    input[type=submit] {
        display: block;
        padding: .8em;
        margin:.6em 0;
        border-radius: .25em;
        z-index: 1;
        outline: 0;

        width: 100%;
        border:0;

        background-color: #7bc1ff;

        &:disabled {
            background-color: #769cbd; 
        }

        &:not(:disabled):hover {
            cursor: pointer;
            background-color: #2d89da;
        }
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        field: String,
        enabled: Boolean
    }
});
</script>