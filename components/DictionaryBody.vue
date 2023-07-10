<template>
    <div class="results">
        <div class="result-container" v-for="(result, index) in results" :key="index">
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
            <div class="meanings-container" v-for="(meaning, index) in result.meanings" :key="index">
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
</template>

<script setup>
import { usePluralize } from './../composables/pluralize'

const props = defineProps({
    results: Array
})
const { results } = toRefs(props)
const pluralize = usePluralize
</script>