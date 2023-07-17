<script setup>
useHead({
    titleTemplate: (title) => {
        return title ? `${title} | Spelling Bee` : 'Free Dictionary | Spelling Bee'
    }
})
</script>

<template>
    <GamesSpellingBeeSpellForm />
</template>