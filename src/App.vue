<template>
	<div id="app">
		<div v-if="$route.name == 'home'" class="intro" role="presentation">
		</div>
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

<style lang="scss" src="src/style/app.scss">

</style>
<style lang="scss">
    .intro {
        background: url(https://farm4.staticflickr.com/3282/3053276533_e4c51b5ba0_b.jpg) left bottom no-repeat;
        background-size: cover;
        height: calc(100vh - 50px);
    }
</style>