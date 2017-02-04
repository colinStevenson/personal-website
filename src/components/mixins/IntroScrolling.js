const IntroScrollingMixin = {
	methods: {
		scrollToMain(){
			let $intro = document.getElementById("site-intro");
			if ($intro) {
				let introHeight = $intro.clientHeight;
				window.scrollTo({ left: 0, top: introHeight, behavior: 'smooth'});
			}
		},
		scrollToIntro(){
			if(this.$route.name == "home") {
				window.scroll({left: 0, top: 0, behavior: 'smooth'});
			}
		},
		scrollToTop(){
			window.scroll({left: 0, top: 0, behavior: 'smooth'});
		},
	},
};

export default IntroScrollingMixin;