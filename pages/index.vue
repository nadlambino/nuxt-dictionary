<template>
    <div class="wrapper">
        <Dictionary class="main-content" />
        <div class="side-content">
            <WordOfTheDay class="" />
        </div>
    </div>
</template>

<script setup>
import './../assets/scss/app.scss';
import Dictionary from './../components/Home/Dictionary.vue';
import WordOfTheDay from './../components/Home/WordOfTheDay.vue';
</script>

<style scoped lang="scss">
.wrapper {
    @apply flex flex-col gap-10 mt-10 relative;

    @apply lg:flex-row;

    .main-content {
        @apply w-full;
        
        @apply lg:w-3/5
    }

    .side-content {
        @apply w-full;
        
        @apply lg:w-2/5;
    }
}
</style>