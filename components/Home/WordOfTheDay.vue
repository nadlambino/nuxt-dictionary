<template>
    <Container label="Word of the day">
        <div class="container">
            <DictionaryBody :results="results" />
        </div>
    </Container>
</template>

<script setup>
import { generate } from "random-words";
import { useCookie } from "./../../composables/cookie";
import { useStorage } from '@vueuse/core'
import moment from 'moment'
import Container from "../Shared/Container.vue";
import DictionaryBody from "../Shared/DictionaryBody.vue";

const wordOfTheDay = ref(null)
const results = ref([])
const cookie = useCookie()
const endOfDay = moment().endOf('day').format('YYYY MM DD H:mm:ss')
const meaning = useStorage('meaning', {meaning: null, expiration: null})

function generateWord() {
    const wordCookie = cookie.get('word');
    if (wordCookie) {
        wordOfTheDay.value = wordCookie
    } else {
        const word = generate();
        cookie.set('word', word);
        wordOfTheDay.value = word;
    }

    if (meaning.value.meaning && moment().isAfter(meaning.value.expiration) === false) {
        return results.value = meaning.value.meaning
    }

    useDictionary(wordOfTheDay.value).then(response => {
        results.value = response
        meaning.value.meaning = response
        meaning.value.expiration = endOfDay
    });
}

onMounted(() => {
    generateWord();
})
</script>

<style scoped lang="scss">
.word {
    @apply text-2xl capitalize font-semibold;
}

</style>