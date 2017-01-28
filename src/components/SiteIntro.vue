<template>
	<div 
		class="intro" 
		id="site-intro"
		ref="intro"
		role="presentation"
		:style="{ filter: 'grayscale(' + introFade + '%)' }">
	</div>
</template>
<script>
	import PhotoMixin from './mixins/Photo';
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
		created() {
			this._requestSizes(this.getFeaturedImageId());

			let component = this;
			window.addEventListener('scroll', function() {
				component.handleScroll.apply(this, arguments);
			});
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
				let $intro = document.getElementById("site-intro");
				if ($intro) {
					let introHeight = $intro.clientHeight;
					this.introFade = (scrollPos / introHeight) * 100;
				}
			},
		},
		mixins: [PhotoMixin],
		watch: {
			hasSizesData(newVal) {
				if (newVal) {
					this.$refs.intro.style.backgroundImage = "url(" + this.large + ")";
				}
			}
		}
	}
</script>