<template>
	<div>
		<div v-if="includeMeta" class="meta">
			<h1>{{meta.title._content}}</h1>
		</div>
		<img ref="image" v-if="hasSizesData" v-on:load="handleImageLoad" :src="getSource()" :alt="meta.title._content" class="img-responsive img-loadable">
	</div>
</template>
<script>
	import Flickr from '../api/flickr/flickr';
	import PhotoMixin from './mixins/Photo';
	import $ from 'webpack-zepto';

	export default {
		methods: {
			getSource(){
				return this.sizes[this.size].source;
			},
			handleImageLoad(){
				$(this.$refs.image).addClass("loaded");
			},
		},
		mixins: [PhotoMixin],
		props: {
			id: {
				type: String,
			}
		},
	};
</script>