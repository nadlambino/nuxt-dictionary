<template>
    <div class="container">
        <h1>{{ label }}</h1>
        <div class="body">
            <slot/>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String
    }
})

</script>

<style scoped lang="scss">
.container {
    @apply w-full flex flex-col;

    h1 {
        @apply text-red text-lg uppercase font-semibold;
    }
}
</style>