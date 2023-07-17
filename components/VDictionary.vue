<template>
    <div>
        <div class="search-container">
            <form @submit.prevent="search" class="block w-full">
                <input
                    v-model="word"
                    ref="searchElement"
                    type="text"
                    class="search-bar"
                    autofocus
                />
                <button class="search-btn" @click="search">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </div>
        <h1 v-show="!results.length && !error" class="text-center text-4xl font-bold mt-5">Search anything...</h1>
        <h1 v-show="error" class="text-center text-4xl font-bold mt-5">{{ error }}</h1>
        <DictionaryBody v-show="results.length" :results="results" />
    </div>
</template>

<script setup>
import _ from 'lodash';
import DictionaryBody from "./DictionaryBody.vue";

const word = ref('');
const results = ref([]);
const searchElement = ref(null)
const error = ref(null)

watch(word, (newWord) => {
    results.value = _.isEmpty(newWord) || _.isNil(newWord) ? [] : results.value;
})

const search = () => {
    results.value = [];
    error.value = null;
    useDictionary(word.value).then(response => {
        results.value = response;
    }).catch(() => {
        error.value = `No results found for "${word.value}"`
    });
}

onMounted(() => searchElement.value.focus())

</script>