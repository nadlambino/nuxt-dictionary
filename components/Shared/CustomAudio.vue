<template>
    <button ref="audio" class="audio-play-btn" :class="{ active: isActive }" v-if="source" @click="playAudio">
        <i class="fa fa-volume-up"></i>
        {{ audioLocale }}
    </button>
</template>

<script>
import _ from "lodash";

export default {
    emits: ['onPlayCompleted'],
    props: {
        source: {
            required: true
        },
        autoplay: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            isActive: false,
            duration: 0,
            locales: ['au', 'us', 'uk']
        }
    },
    computed: {
        audioLocale() {
            const audioFile = this.source.split('/').pop();
            const fileName = audioFile.split('.')[0] || null;
            const locale = fileName.split('-').pop() || ''

            if (this.locales.includes(locale.toLowerCase()) && !_.isNil(fileName)) {
                return locale.toUpperCase();
            }

            return null;
        }
    },
    methods: {
        playAudio() {
            const audio = new Audio(this.source);
            audio.volume = 0.6;
            this.isActive = true;
            audio.load();
            audio.play();
            _.delay(() => {
                this.isActive = false;
                this.$emit('onPlayCompleted')
            }, this.duration);
        },

        getAudioDuration() {
            const audio = new Audio(this.source);
            audio.onloadedmetadata = () => {
                this.duration = Math.ceil(audio.duration) * 1000;
            };
        }
    },

    mounted() {
        this.getAudioDuration();
        if (this.autoplay) {
            this.$refs.audio?.click();
        }
    }
}
</script>