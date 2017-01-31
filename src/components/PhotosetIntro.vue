<template>
	<div class="slide slide-link">
		<div ref="media" class="slide-media slide-loadable">
		</div>
		<div class="slide-body">
			<router-link :to="{ name: 'photoset', params: { id: details.id }}">
				{{details.title._content}}
			</router-link>
		</div>
	</div>
</template>
<script>
	import PhotoMixin from './Photo';
	import PhotoSizes from '../api/flickr/PhotoSizes';

	export default {
		computed: {
			photoId() {
				return this.details.primary;
			},
			photoSource(){
				return this.sizes[PhotoSizes.LARGE].source;
			}
		},
		props: ['details'],
		mixins: [PhotoMixin],
		watch: {
			hasSizesData(){
				this.fadeBackgroundOnLoad(this.photoSource, this.$refs.media);
			}
		}
	}
</script>