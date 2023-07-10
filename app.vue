<template>
    <NuxtLayout>
        <div class="wrapper">
            <VDictionary class="main-content" />
            <div class="side-content">
                <WordOfTheDay class="" />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import './assets/scss/app.scss';
import VDictionary from './components/VDictionary.vue';
import WordOfTheDay from './components/WordOfTheDay.vue';
</script>

<style scoped lang="scss">
.wrapper {
    @apply flex flex-col gap-5 mt-10 relative;

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