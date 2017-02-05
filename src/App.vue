<template>
	<div id="app" :class="[introOpen ? 'intro-open' : '', $route.name]">
		<site-intro v-if="$route.name == 'home'">
		</site-intro>
		<navbar></navbar>
		<main id="main">
			<router-view></router-view>
		</main>
		<site-footer></site-footer>
	</div>
</template>

<script>
	import SiteFooter from './components/SiteFooter';
	import Navbar from './components/Navbar';
	import SiteIntro from './components/SiteIntro';
	import IntroScrollingMixin from './components/mixins/IntroScrolling';
	import { mapGetters } from 'vuex';

	export default {
		name: 'app',
		components: {
			Navbar,
			SiteFooter,
			SiteIntro,
		},
		computed: mapGetters(['introOpen']),
		created(){
			if(this.$route.name != "home"){
				this.$store.commit('toggleIntro', false);
			}
		},
		mixins: [ IntroScrollingMixin ],
		watch: {
			'$route': function(){
				//handling scroll behavior here since router isn't firing handler
				let showIntro = !!this.$route.params.intro;
				if(this.$route.name == "home"){
					this.$store.commit('toggleIntro', showIntro);
					if(showIntro){
						setTimeout(this.scrollToTop, 100);
					} else {
						setTimeout(this.scrollToMain, 100);
					}
				} else {
					setTimeout(this.scrollToTop, 100);
					this.$store.commit('toggleIntro', false);
				}
			}
		}
	};
</script>

<style lang="scss" src="src/style/app.scss"></style>
<style>
/*make sure we can scroll past the intro even if photoset list hasn't loaded yet*/
 #app.home{
	 min-height: 200vh;
 }
</style>