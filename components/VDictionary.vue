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
        <DictionaryBody :results="results" />
    </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import _ from 'lodash';
import DictionaryBody from "./DictionaryBody.vue";

export default defineComponent({
    components: { DictionaryBody },
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