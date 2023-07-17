<script setup>
import { generate } from "random-words";
import CustomAudio from './../../Shared/CustomAudio'

const min = ref(2)
const max = ref(3)
const word = ref(generate({minLength: min.value, maxLength: max.value}))
const result = ref([])
const answer = ref(null)
const timeout = ref()
const tries = ref(3)
const preAnswer = ref(null)
const score = ref(0)
const totalCorrectAnswer = ref(0)
const answerInput = ref(null)
const maxLevel = 5
const apiTries = ref(0)
const audioElement = ref(null)

const phonetics = computed(() => {
    return result.value.map(r => {
        return r.phonetics
    })[0]?.filter(p => p.audio !== '');
})

const generateWord = () => {
    tries.value = 3
    preAnswer.value = null
    answer.value = null
    result.value = [];
    word.value = generate({minLength: min.value, maxLength: max.value});
}

const computeMin = () => {
    min.value = max.value + 1
}

const computeMax = () => {
    if (level.value === maxLevel) {
        max.value = undefined
    } else {
        max.value = max.value + 2
    }
}

const isCorrect = computed(() => {
    return word.value?.trim().toLowerCase() === answer.value?.trim().toLowerCase();
})

const level = computed(() => {
    if (level.value === 5) {
        return maxLevel
    }

    return Math.floor((totalCorrectAnswer.value / 10)) + 1
})

const submit = () => {
    if (tries.value <= 0 || isCorrect.value || !word.value || result.value.length === 0 || phonetics.value?.length === 0) {
        return
    }

    if (!preAnswer.value) {
        playAudio();
        return;
    }

    answer.value = preAnswer.value
    if (answer.value === word.value) {
        score.value += word.value.length
        totalCorrectAnswer.value += 1
        clearTimeout(timeout.value)
        timeout.value = setTimeout(generateWord, 200)
        if (answerInput.value) {
            answerInput.value.focus()
        }
    } else {
        tries.value -= 1;
        playAudio()
    }
}

const playAudio = () => {
    if (audioElement.value) {
        audioElement.value[0].$refs.audio.click()
    }
}

watch(word, () => {
    if (apiTries.value >= 3) {
        return
    }
    useDictionary(word.value)
        .then(data => {
            result.value = data
            apiTries.value = 0;
        })
        .catch(() => {
            generateWord()
            apiTries.value += 1
        })
}, { immediate: true })

watch(phonetics, () => {
    if (phonetics.value?.length === 0) {
        generateWord();
    }
})

watch(level, () => {
    computeMin()
    computeMax()
})

watch(tries, () => {
    if (tries.value <= 0) {
        clearTimeout(timeout.value)
        timeout.value = setTimeout(generateWord, 1000)
    }
})

</script>

<template>
    <div class="game-wrapper">
        <div class="form-container">
            <div class="question-container">
                <div class="word-container">
                    <div v-if="apiTries >= 3">Server is busy. Please try again later.</div>
                    <div v-else-if="result.length === 0 || phonetics?.length === 0">Generating a word . . .</div>
                    <div v-else>
                        <h1>
                            Spell the word
                            <span class="word error" v-if="tries <= 0">{{ word }}</span>
                            <span class="word" v-else-if="isCorrect">{{ word }}</span>
                            <span v-else :class="{error: answer && !isCorrect}">. . .</span>
                        </h1>
                        <CustomAudio 
                            v-for="(phonetic, i) in phonetics" 
                            :key="i" :source="phonetic.audio" 
                            @on-play-completed="answerInput?.focus()"
                            :autoplay="i === 0"
                            ref="audioElement"
                        />
                    </div>
                </div>
                <button class="new-btn" @click="generateWord">SKIP</button>
            </div>
            <div class="answer-container">
                <label>Tries Left: <span class="tries" :class="{danger: tries <= 0, warning: tries === 1}">{{ tries }}</span></label>
                <div class="answer">
                    <form @submit.prevent="submit">
                        <input
                            ref="answerInput"
                            v-model.trim="preAnswer"
                            type="text"
                            autofocus
                            class="answer-textbox"
                        />
                        <button class="answer-btn" :disabled="isCorrect || tries <= 0">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="info-container">
            <div class="row">
                <h1 class="info-label">Level:</h1>
                <h1 class="info-value">{{ level }}</h1>
            </div>
            <div class="row">
                <h1 class="info-label">Min characters:</h1>
                <h1 class="info-value">{{ min }}</h1>
            </div>
            <div class="row">
                <h1 class="info-label">Max characters:</h1>
                <h1 class="info-value">{{ max }}</h1>
            </div>
            <div class="row">
                <h1 class="info-label">Correct:</h1>
                <h1 class="info-value">{{ totalCorrectAnswer }}</h1>
            </div>
            <div class="row">
                <h1 class="info-label">Score:</h1>
                <h1 class="info-value">{{ score }}</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
.game-wrapper {
    @apply flex flex-col gap-5;

    @apply lg:flex-row;
}
.form-container {
    @apply flex flex-col w-full gap-5;

    @apply lg:w-2/3;
}

.question-container {
    @apply flex justify-between;
}

.word-container div {
    @apply flex gap-1 text-xl items-center font-semibold;

    @apply md:text-2xl md:gap-3;
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

.info-container {
    @apply w-full;

    @apply lg:w-1/3;
}

.row {
    @apply w-full flex justify-between;
}
</style>