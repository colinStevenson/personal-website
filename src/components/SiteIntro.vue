<template>
	<div 
		class="intro slide-loadable"
		:class="{'loaded': imageLoaded}"
		id="site-intro"
		ref="intro"
		role="presentation"
		:style="{ filter: 'grayscale(' + introFade + '%)', backgroundImage: 'url(' + photoSource + ')' }">
	</div>
</template>
<script>
	import PhotoMixin from './mixins/Photo';
	import PhotoSizes from '../api/flickr/PhotoSizes';
	import { mapActions, mapGetters } from 'vuex';

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
		computed: {
			...mapGetters(['introOpen']),
			photoSource(){
				return this.sizes ? this.sizes[PhotoSizes.LARGE].source : undefined;
			},
			photoId(){
				return this.getFeaturedImageId();
			},
		},
		created() {
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
					this.fadeBackgroundOnLoad(this.photoSource);
				}
			},
			introFade(){
				this.$store.commit("toggleIntro", this.introFade < 100);
			}
		}
	}
</script>