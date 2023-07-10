<template>
    <div>
        <div class="search-container">
            <form @submit.prevent="search" class="block w-full">
                <input
                    v-model="word"
                    type="text"
                    class="search-bar"
                    placeholder="Search anything..."
                />
                <button class="search-btn" @click="search">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </div>
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
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import _ from 'lodash';
import CustomAudio from "./CustomAudio";

export default defineComponent({
    components: {CustomAudio},
    setup() {
        const word = ref('');
        const results = ref([]);

        watch(word, (newWord) => {
            results.value = _.isEmpty(newWord) || _.isNil(newWord) ? [] : results.value;
        })

        const search = () => {
            results.value = [];
            useDictionary(word.value).then(response => {
                results.value = response;
            });
        }

        const pluralize = (word, data) => {
            return data.length > 1 ? word + 's' : word;
        }

        return {
            word,
            results,
            search,
            pluralize
        }
    }
});
</script>