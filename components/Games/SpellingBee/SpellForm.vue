<script setup>
import { generate } from "random-words";
import CustomAudio from './../../Shared/CustomAudio'

const word = ref('neighbor')
const result = ref([])
const answer = ref(null)
const timeout = ref()

const phonetics = computed(() => {
    return result.value.map(r => {
        return r.phonetics
    }).filter(p => p.audio !== '')[0];
})

const generateWord = () => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
        answer.value = null
        result.value = [];
        word.value = generate();
    }, 5000)
}

const isCorrect = computed(() => {
    return word.value?.trim().toLowerCase() === answer.value?.trim().toLowerCase();
})

watch(word, () => {
    useDictionary(word.value).then(data => result.value = data)
}, { immediate: true })

watch(phonetics, () => {
    if (phonetics.value?.length === 0) {
        generateWord();
    }
})

watch(answer, () => {
    if (answer.value === word.value) {
        generateWord()
    }
})

</script>

<template>
    <div class="form-container">
        <div class="question-container">
            <div class="word-container">
                <div v-show="result.length === 0">Generating a word . . .</div>
                <div v-show="result.length > 0">
                    <h1>
                        Spell the word
                        <span class="word" v-if="isCorrect">{{ word }}</span>
                        <span v-else :class="{error: answer && !isCorrect}">. . .</span>
                    </h1>
                    <CustomAudio v-for="(phonetic, i) in phonetics" :key="i" :source="phonetic.audio" />
                </div>
            </div>
            <button class="new-btn" @click="generateWord">New Word</button>
        </div>
        <div class="answer-container">
            <label>Your answer</label>
            <input
                v-model.trim="answer"
                type="text"
                autofocus
                class="answer-textbox"
                :disabled="isCorrect"
            />
        </div>
    </div>
</template>

<style scoped>
.form-container {
    @apply flex flex-col w-full gap-5;

    @apply lg:w-2/3;
}

.question-container {
    @apply flex justify-between;
}

.word-container div {
    @apply flex gap-3 text-xl items-center font-semibold;

    @apply md:text-2xl;
}

.word-container div h1 {
    @apply text-xl;

    @apply md:text-2xl;
}

.word-container div h1 span {
    @apply text-xl;
    
    @apply md:text-2xl;
}

.word-container div h1 span.word {
    @apply text-[#0c6]
}

.new-btn {
    @apply bg-red text-gray-200 px-2 py-1 rounded-sm uppercase font-extrabold
}

.answer-container {
    @apply flex flex-col gap-2
}

.answer {
    @apply flex;
}

.answer-btn {
    @apply bg-red text-gray-200 px-2 py-1 rounded-tr-sm rounded-br-sm uppercase font-extrabold
}

.answer-textbox {
    @apply border-2 border-red rounded-tl-sm rounded-bl-sm px-2 py-2 w-full
}

.error {
    @apply text-red
}
</style>