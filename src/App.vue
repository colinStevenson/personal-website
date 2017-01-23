<template>
	<div id="app">
		<div 
			v-if="$route.name == 'home'" 
			class="intro" 
			id="site-intro" 
			role="presentation"
			:style="{ filter: 'grayscale(' + introFade + '%)' }">
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
        methods: {
            handleScroll(e) {
                this.setIntroScrollPosition();
            },
            setIntroScrollPosition() {
                let scrollPos = window.scrollY;
                let $intro = document.getElementById("site-intro");
                if ($intro) {
                    let introHeight = $intro.clientHeight;
                    this.introFade = (scrollPos / introHeight) * 200;
                }
            },
        },
        created() {
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
    };
</script>

<style lang="scss" src="src/style/app.scss"></style>