<script setup>
import { generate } from "random-words";
import CustomAudio from './../../Shared/CustomAudio'

const min = ref(3)
const max = ref()
const word = ref(generate({minLength: min.value, maxLength: max.value}))
const result = ref([])
const answer = ref(null)
const timeout = ref()
const tries = ref(3)
const preAnswer = ref(null)

const phonetics = computed(() => {
    return result.value.map(r => {
        return r.phonetics
    }).filter(p => p.audio !== '')[0];
})

const generateWord = () => {
    tries.value = 3
    preAnswer.value = null
    answer.value = null
    result.value = [];
    word.value = generate({minLength: min.value, maxLength: max.value});
}

const isCorrect = computed(() => {
    return word.value?.trim().toLowerCase() === answer.value?.trim().toLowerCase();
})

const submit = () => {
    if (tries.value <= 0 || isCorrect.value || !word.value || result.value.length === 0 || phonetics.value?.length === 0) {
        return
    }

    answer.value = preAnswer.value
    if (answer.value === word.value) {
        clearTimeout(timeout.value)
        timeout.value = setTimeout(generateWord, 3000)
    } else {
        tries.value -= 1;
    }
}

watch(word, () => {
    useDictionary(word.value).then(data => result.value = data)
}, { immediate: true })

watch(phonetics, () => {
    if (phonetics.value?.length === 0) {
        generateWord();
    }
})

</script>

<template>
    <div class="form-container">
        <div class="question-container">
            <div class="word-container">
                <div v-if="result.length === 0 || phonetics?.length === 0">Generating a word . . .</div>
                <div v-else>
                    <h1>
                        Spell the word
                        <span class="word error" v-if="tries <= 0">{{ word }}</span>
                        <span class="word" v-else-if="isCorrect">{{ word }}</span>
                        <span v-else :class="{error: answer && !isCorrect}">. . .</span>
                    </h1>
                    <CustomAudio v-for="(phonetic, i) in phonetics" :key="i" :source="phonetic.audio" />
                </div>
            </div>
            <button class="new-btn" @click="generateWord">SKIP</button>
        </div>
        <div class="answer-container">
            <label>Tries Left: <span class="tries" :class="{danger: tries <= 0, warning: tries === 1}">{{ tries }}</span></label>
            <div class="answer">
                <form @submit.prevent="submit">
                    <input
                        v-model.trim="preAnswer"
                        type="text"
                        autofocus
                        class="answer-textbox"
                        :disabled="isCorrect || tries <= 0"
                    />
                    <button class="answer-btn" :disabled="isCorrect || tries <= 0">SUBMIT</button>
                </form>
            </div>
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

.answer-container label {
    @apply uppercase font-semibold
}

.tries {
    @apply text-[#0c6];
}

.warning {
    @apply text-orange-500;
}

.danger {
    @apply text-red;
}

.answer form {
    @apply flex;
}

.answer-btn {
    @apply bg-red text-gray-200 px-2 py-1 rounded-tr-sm rounded-br-sm uppercase font-extrabold
}

.answer-textbox {
    @apply border-2 border-red rounded-tl-sm rounded-bl-sm px-2 py-2 w-full
}

.error {
    @apply !text-red
}
</style>