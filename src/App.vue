<template>
	<div id="app">
		<navbar></navbar>
		<main>
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