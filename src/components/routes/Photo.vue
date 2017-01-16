<template>
	<div class="container">
		<h1>Photo</h1>
		<photo-component :id='$route.params.id' :size=7></photo-component>
	</div>
</template>
<script>
    import PhotoComponent from '../Photo.vue';

    export default {
        components: {
            PhotoComponent
        }
    }
</script>