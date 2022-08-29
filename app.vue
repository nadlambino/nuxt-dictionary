<template>
    <NuxtLayout>
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
                            <div class="synonyms" v-for="synonym in definition.synonyms">
                                <p class="text">Synonym</p>
                                <p>{{ synonym }}</p>
                            </div>
                            <div class="antonyms" v-for="antonym in definition.antonyms">
                                <p class="text">Antonym</p>
                                <p>{{ antonym }}</p>
                            </div>
                            <p class="example" v-if="definition.example">
                                <span>Example:</span>
                                {{ definition.example }}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script>
import './assets/scss/app.scss';
import { defineComponent } from "@vue/composition-api";
import _ from 'lodash';
import CustomAudio from "./components/CustomAudio";

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
            const dictionary = useDictionary(word.value).then(response => {
                results.value = response;
            });
        }

        return {
            word,
            results,
            search
        }
    }
});
</script>
