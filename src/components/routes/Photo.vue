<template>
	<div class="container">
		<div class="slide slide-lg">
			<photo-component 
				:id='$route.params.id' 
				:size=7 :include-meta=true 
				class="img-responsive">
			</photo-component>
		</div>
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