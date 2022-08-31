<template>
    <button ref="audio" class="audio-play-btn" :class="{ active: isActive }" v-if="source" @click="playAudio">
        <i class="fa fa-volume-up"></i>
        {{ audioLocale }}
    </button>
</template>

<script>
import _ from "lodash";

export default {
    props: {
        source: {
            required: true
        }
    },
    data() {
        return {
            isActive: false,
            duration: 0
        }
    },
    computed: {
        audioLocale() {
            const audioFile = this.source.split('/').pop();
            const fileName = audioFile.split('.')[0] || null;
            return _.isNil(fileName) ? '' : fileName.split('-').pop();
        }
    },
    methods: {
        playAudio() {
            const audio = new Audio(this.source);
            audio.volume = 0.5;
            this.isActive = true;
            audio.load();
            audio.play();
            _.delay(() => {
                this.isActive = false;
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
    }
}
</script>