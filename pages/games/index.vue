<script setup>
import games from './../../fixtures/games.json'

useHead({
    titleTemplate: (title) => {
        return title ? `${title} | Games` : 'Free Dictionary | Games'
    }
})

const filteredGames = computed(() => games.filter(g => g.active))
</script>

<template>
    <div class="container">
        <div class="game-container" v-for="(game, i) in filteredGames" :key="i">
            <div class="image-container">
                <img src="" alt="">
                <NuxtLink :to="game.url" class="play-btn">Play</NuxtLink>
            </div>
            <div class="contents">
                <h1 class="title">{{ game.name }}</h1>
                <h5 class="desc">{{ game.desc }}</h5>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    @apply grid grid-cols-3 gap-5
}

.game-container { 
    @apply flex flex-col border-slate-800 border border-solid shadow-lg w-full;
}

.image-container {
    @apply bg-slate-800/50 w-full aspect-square flex justify-center items-center;
}

.play-btn {
    @apply bg-red rounded-md text-gray-100 w-1/3 h-10 flex items-center justify-center uppercase font-extrabold
}

.contents {
    @apply p-3 flex flex-col gap-2;
}

.title {
    @apply font-bold text-lg
}
</style>