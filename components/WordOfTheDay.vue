<template>
    <VContainer label="Word of the day">
        <div class="container">
            <div class="results">
                <div class="result-container" v-for="result in results">
                    <div class="result-header">
                        <div class="search-word-container">
                            <h1 class="search-word">
                                {{ result.word }}
                            </h1>
                            <div class="audio-container">
                                <template v-for="phonetic in result.phonetics">
                                    <CustomAudio v-if="phonetic.audio" :source="phonetic.audio" />
                                </template>
                            </div>
                        </div>
                        <span>{{ result.phonetic }}</span>
                    </div>
                    <div class="meanings-container" v-for="meaning in result.meanings">
                        <div class="meaning-container">
                            <h3 class="part-of-speech">{{ meaning.partOfSpeech }}</h3>
                            <ul>
                                <li class="definitions" v-for="definition in meaning.definitions">
                                    <span>{{ definition.definition }}</span>
                                    <div class="example" v-if="definition.example">
                                        <p class="main-text">Example:</p>
                                        <p class="sub-text">{{ definition.example }}</p>
                                    </div>
                                </li>
                            </ul>
                            <div class="synonyms" v-if="meaning.synonyms.length > 0">
                                <p class="main-text">{{ pluralize('Synonym', meaning.synonyms) }}</p>
                                <p class="sub-text">{{ meaning.synonyms.join(', ') }}</p>
                            </div>
                            <div class="antonyms" v-if="meaning.antonyms.length > 0">
                                <p class="main-text">{{ pluralize('Antonym', meaning.antonyms) }}</p>
                                <p class="sub-text">{{ meaning.antonyms.join(', ') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </VContainer>
</template>

<script setup>
import { generate } from "random-words";
import { usePluralize } from './../composables/pluralize'
import { useCookie } from "./../composables/cookie";
import { useStorage } from '@vueuse/core'
import moment from 'moment'

const wordOfTheDay = ref(null)
const results = ref([])
const pluralize = usePluralize
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