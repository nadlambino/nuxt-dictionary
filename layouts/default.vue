<template>
    <div>
        <header>
            <div class="flex items-center">
                <img :src="favicon" alt="logo" class="logo" />
                <span class="app-text">
                    <span class="app-text__free">Free </span>
                    <span class="app-text__dictionary">Dictionary</span>
                </span>
            </div>
            <nav>
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/games">Games</NuxtLink></li>
                </ul>
            </nav>
    	</header>
		<slot/>
	</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import favicon from './../assets/images/favicon.png'

export default defineComponent({
    setup() {
        useHead({
            title: 'Free Dictionary',
            link: [
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: favicon
                }
            ]
        });

        return {
            favicon
        }
    }
});
</script>

<style>
header {
    @apply flex justify-between;
}

nav ul {
    @apply flex gap-5;
}
</style>