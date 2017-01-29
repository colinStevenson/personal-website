<template>
	<header class="navbar navbar-default">
		<div class="container">
			<h1 class="navbar-brand">
				<router-link :to="{ name:'home', params: { intro: true }}">Colin Stevenson</router-link>
			</h1>
			<ul class="navbar-right nav navbar-nav">
				<li :class="{active: isPhotographyRoute }">
					<router-link :to="{ name: 'home', params: { intro: false }}">
						<span class="hidden-xs">Photography</span>
						<span class="visible-xs">Photos</span>
					</router-link>
				</li>
				<li><router-link :to="{ name: 'about'}">About</router-link></li>
			</ul>
		</div>
	</header>
</template>
<script>
	const PHOTOGRAPY_ROUTES = ["photoset", "photo"];
	export default {
		computed: {
			isPhotographyRoute(){
				return PHOTOGRAPY_ROUTES.includes(this.$route.name);
			},
		},
	}
</script>