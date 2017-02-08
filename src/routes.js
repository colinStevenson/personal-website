import About from './components/routes/About.vue';
import Home from './components/routes/Home.vue';
import Photoset from './components/routes/Photoset.vue';

const routes = [
	{ name: 'about', path: '/about', component: About },
	{ name: 'home', path: '/home', component: Home },
	{ name: 'photoset', path: '/photoset/:id', component: Photoset },
	{ path: '*', redirect: '/home' },
];

export default routes;