<template>
    <NuxtLayout>
        <VDictionary />
    </NuxtLayout>
</template>
import VDictionary from './components/VDictionary.vue';

<script>
import './assets/scss/app.scss';
import { defineComponent } from "@vue/composition-api";
import VDictionary from './components/VDictionary.vue';

export default defineComponent({
    components: { VDictionary, VDictionary },
});
</script>
