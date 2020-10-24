<template>
    <div class="header">
        <img :src="$props.banner" :alt="$props.bannerAlt" />
        <span v-if="$props.title" class="title">{{ $props.title }}</span>
        <span v-if="$props.description" class="description">{{ $props.description }}</span>
    </div>
</template>

<style lang="scss" scoped>
    .header {
        img {
            display:block;
            margin:0 auto;
        }

        .title {
            display:inline-block;
            margin:.3em 0;
            font-size: 2em;
            font-weight: 400;
        }
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: String,
        description: String,
        banner: String,
        bannerAlt: String
    }
});
</script>