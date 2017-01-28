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

	export default {
		name: 'app',
		components: {
			SiteFooter,
			Navbar,
			SiteIntro,
		},
		methods: {
			scrollToMain(){
				let $intro = document.getElementById("site-intro");
				if ($intro) {
					let introHeight = $intro.clientHeight;
					window.scrollTo(0, introHeight);
				}
			},
		},
		watch: {
			'$route': function(){
				//handling scroll behavior here since router isn't firing handler
				if(this.$route.name == "home" && this.$route.params.intro !== true) {
					console.log("yes");
					setTimeout(this.scrollToMain, 100);
				} else {
					console.log("no");
					setTimeout(function(){
						window.scrollTo(0,0);
					}, 100);
				}
			}
		}
	};
</script>

<style lang="scss" src="src/style/app.scss"></style>