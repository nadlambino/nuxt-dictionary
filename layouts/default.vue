<template>
    <div>
        <header>
            <img src="/public/app-logo.png" alt="logo" class="logo" />
            <span class="app-text">
                <span class="app-text__free">Free </span>
                <span class="app-text__dictionary">Dictionary</span>
            </span>
    	</header>
		<slot/>
	</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    setup() {
        useHead({
            title: 'Free Dictionary',
            link: [
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css'
                }
            ]
        });
    }
});
</script>
