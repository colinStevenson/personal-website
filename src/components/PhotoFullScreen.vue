<template>
	<section class="photo-full-screen" :class="{ 'in': isIn }">
		<button class="close btn-link" v-on:click.stop="handleClose">
			<span class="icon-cross"></span>
			<span class="sr-only">Close</span>
		</button>
		<div>
			<button 
				class="btn btn-link previous"
				v-if="previous !== null"
				v-on:click.stop="goToIndex(previous)">
				<span class="sr-only">Previous Photo</span>
				<span>&#9664;</span>
			</button>
			<button 
				class="btn btn-link next" 
				v-if="next"
				v-on:click.stop="goToIndex(next)">
				<span class="sr-only">Next Photo</span>
				<span>&#9654;</span>
			</button>
		</div>
		<figure>
			<img
			v-if="hasSizesData" 
			v-on:load="handleImageLoad" 
			:src="photoSource" 
			:alt="meta.title._content" 
			:class="{'loaded': imageLoaded}"
			class="img-responsive img-loadable" />
			<figcaption class="meta">
				<h1 class="title">{{meta.title._content}}</h1>
				<p v-if="meta.description._content && meta.description._content !== ''">{{meta.description._content}}</p>
			</figcaption>
		</figure>
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
			window.addEventListener('keydown', this._keyDownHandler);
			window.addEventListener('keyup', this._keyUpHandler);
		},
		destroyed(){
			window.removeEventListener('keydown', this._keyDownHandler);
			window.removeEventListener('keyup', this._keyUpHandler);
		},
		data(){
			return {
				isIn: false,
				keyPressed: false,
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
			},
			handleKeyPress(e){
				//27 is esc
				let currentPhoto = Number(this.$route.query.photo);
				if(e.keyCode == 27){
					this.handleClose();
				} else if(e.keyCode == 37) {
					if(this.previous != null){
						this.goToIndex(currentPhoto - 1);
					}
				} else if(e.keyCode == 39) {
					if(this.next != null) {
						this.goToIndex(currentPhoto + 1);
					}
				}
			},
			_keyDownHandler(e){
				if(!this.keyPressed){
					this.keyPressed = true;
					this.handleKeyPress(e);
				}
			},
			_keyUpHandler(e){
				this.keyPressed = false;
			},
			goToIndex(index){
				this.$router.push(
					{ 
						name: 'photoset', 
						params: {id: this.$route.params.id,  },
						query: { photo: index },
					}
				)
			},
		},
		mixins: [ PhotoMixin ],
		props: {
			id: {
				type: String,
			},
			next:{
				default: null,
				type: Number
			},
			previous:{
				default: null,
				type: Number
			}
		},
	};
</script>
<style lang="scss">
	@import "../style/variables";

	.photo-full-screen{
		background: $body-bg;
		cursor: default;
		display: flex;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		opacity: 0;
		padding: $spacer 50px $spacer;
		position: fixed;
		transform: scaleY(0);
		transition: all 0.3s ease;
		z-index: 999;

		.meta{
			
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

		.next,
		.previous{
			font-size: 1.5em;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
		.next{
			right: 0;
			left: auto;
		}
	}
	.photo-full-screen.in{
		transform: scaleY(1);
		opacity: 1;
	}
	.photo-full-screen figure{
		background: #fff;
		box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.1);
		margin: 0 auto;

		> figcaption{
			padding: $spacer*2 $spacer;
		}
	}
	.photo-full-screen img{
		max-height: calc(100vh - 100px); //full height less the height of the meta and close button
		width: auto;
	}
</style>