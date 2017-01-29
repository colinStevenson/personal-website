<template>
	<div id="app">
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

	export default {
		name: 'app',
		components: {
			SiteFooter,
			Navbar,
			SiteIntro,
		},
		mixins: [ IntroScrollingMixin ],
		watch: {
			'$route': function(){
				//handling scroll behavior here since router isn't firing handler
				if(this.$route.name == "home" && this.$route.params.intro !== true) {
					setTimeout(this.scrollToMain, 100);
				} else {
					setTimeout(function(){
						window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
					}, 100);
				}
			}
		}
	};
</script>

<style lang="scss" src="src/style/app.scss"></style>