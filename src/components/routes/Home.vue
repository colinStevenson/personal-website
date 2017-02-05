<template>
	<div class="container">
		<div class="row">
			<div class="col-md-4" v-for="set in photosets" v-on:click="goToPhotoset(set.id)">
				<photoset-intro :details="set">
				</photoset-intro>
			</div>
		</div>
	</div>
</template>
<script>
	import PhotosetIntro from '../PhotosetIntro';

	export default {
		components: {
			PhotosetIntro,
		},
		created() {
			this._requestPhotosets();
		},
		data() {
			return {
				hasPhotosets: false,
				photosets: null,
			}
		},
		methods: {
			_requestPhotosets() {
				let component = this;
				Flickr.requestPhotosetList(
					function(x, list) {
						component.photosets = list;
						component.hasPhotosets = true;
					}
				);
			},
			goToPhotoset(photosetId) {
				this.$router.push({
					name: 'photoset',
					params: {
						id: photosetId,
					}
				});
			},
		},
	};
</script>