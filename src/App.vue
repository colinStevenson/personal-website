<template>
	<div id="app">
		<div v-if="$route.name == 'home'" class="intro" role="presentation">
		</div>
		<navbar></navbar>
		<main id="main">
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
    import Navbar from './components/Navbar';

    export default {
        name: 'app',
        components: {
            Navbar
        },
    };
</script>

<style lang="scss" src="src/style/app.scss"></style>