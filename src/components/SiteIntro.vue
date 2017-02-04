<template>
	<div 
		class="intro slide-loadable"
		id="site-intro"
		ref="intro"
		role="presentation"
		:style="{ filter: 'grayscale(' + introFade + '%)' }">
	</div>
</template>
<script>
	import PhotoMixin from './mixins/Photo';
	import PhotoSizes from '../api/flickr/PhotoSizes';
	import { mapActions, mapGetters } from 'vuex';

	import $ from 'webpack-zepto';

	const FEATURE_IMAGES = [
		"514080236",
		"4402846583",
		"514080242",
		"1802622748",
		"1801772595",
		"4308243203",
		"3053276533",
	];

	export default {
		computed: mapGetters(['introOpen']),
		created() {
			this.requestSizes(this.getFeaturedImageId());
			let component = this;
			window.addEventListener('scroll', function() {
				component.handleScroll.apply(this, arguments);
			});
			this.setIntroScrollPosition();
		},
		data() {
			return {
				introFade: 0,
			};
		},
		methods: {
			...mapActions(['toggleIntro']),
			handleScroll(e) {
				this.setIntroScrollPosition();
			},
			getFeaturedImageId() {
				return FEATURE_IMAGES[new Date().getDay()];
			},
			setIntroScrollPosition() {
				let scrollPos = window.scrollY;
				let $intro = this.$refs.intro;
				if ($intro) {
					let introHeight = $intro.clientHeight;
					this.introFade = Math.min((scrollPos / introHeight) * 100, 100);
				}
			},
		},
		mixins: [PhotoMixin],
		watch: {
			hasSizesData(newVal) {
				if (newVal) {
					this.fadeBackgroundOnLoad(
						this.getImageSource(PhotoSizes.LARGE),
						this.$refs.intro
					);
				}
			},
			introFade(){
				this.$store.commit("toggleIntro", this.introFade < 100);
				//this.toggleIntro(this.introFade < 100;
			}
		}
	}
</script>