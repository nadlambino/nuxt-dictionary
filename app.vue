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
    @apply flex gap-5 mt-10 relative;

    .main-content {
        @apply w-3/5
    }

    .side-content {
        @apply w-2/5;
    }
}
</style>