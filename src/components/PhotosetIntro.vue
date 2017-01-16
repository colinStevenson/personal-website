<template>
	<div class="container">
		<router-link :to="{ name: 'photoset', params: { id: details.id }}">
			<h2>{{details.title._content}}</h2>
			<photo :id="details.primary"></photo>
		</router-link>
		<p>{{details.description._content}}</p>
	</div>
</template>
<script>
    import Photo from './Photo.vue';

    export default {
        props: ['details'],
        components: {
            Photo,
        },
    }
</script>