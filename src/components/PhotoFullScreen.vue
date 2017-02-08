<template>
	<section class="photo-full-screen" :class="{ 'in': isIn }">
		<button class="close btn-link" v-on:click.stop="handleClose">
			<span class="icon-cross"></span>
			<span class="sr-only">Close</span>
		</button>
		<div>
			<img
			v-if="hasSizesData" 
			v-on:load="handleImageLoad" 
			:src="photoSource" 
			:alt="meta.title._content" 
			:class="{'loaded': imageLoaded}"
			class="img-responsive img-loadable" />
			<div class="meta">
				<h1 class="title">{{meta.title._content}}</h1>
				<p>{{meta.description._content}}</p>
			</div>
		</div>
	</section>
</template>
<script>
	import PhotoMixin from './mixins/Photo';
	import PhotoSizes from '../api/flickr/PhotoSizes';
	const ANIMATION_DELAY = 100;

	export default {
		computed: {
			photoId() {
				return this.id;
			},
			photoSource(){
				return this.sizes ? this.sizes[PhotoSizes.LARGE].source : undefined;
			},
		},
		created(){
			let component = this;
			setTimeout(function(){component.isIn = true}, ANIMATION_DELAY);
		},
		data(){
			return {
				isIn: false,
			};
		},
		methods: {
			handleClose(){
				let component = this;
				this.isIn = false;
				setTimeout(function(){
					component.$router.push({ 
						name: 'photoset', 
						params: {id: component.$route.params.id,  },
					});
				}, ANIMATION_DELAY);
			},
			handleImageLoad(){
				this.imageLoaded = true;
			}
		},
		mixins: [ PhotoMixin ],
		props: {
			id: {
				type: String,
			}
		},
	};
</script>
<style lang="scss">
	@import "../style/variables";

	.photo-full-screen{
		background: $body-bg;
		padding: $spacer*3 $spacer*3 $spacer;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		opacity: 0;
		position: fixed;
		transform: scaleY(0);
		transition: all 0.3s ease;
		z-index: 999;

		.meta{
			background: $body-bg;
			padding: $spacer 0;
		
			.title{
				font-size: 24px;
				margin: 4px 0;
			}
		}
		> .close{
			position: absolute;
			right: $spacer;
			top: 5px;
		}
	}
	.photo-full-screen.in{
		transform: scaleY(1);
		opacity: 1;
	}
	.photo-full-screen img{
		height: calc(100vh - 100px); //full height less the height of the meta and close button
		margin: 0;
	}
</style>