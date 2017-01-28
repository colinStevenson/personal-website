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
	};
</script>

<style lang="scss" src="src/style/app.scss"></style>