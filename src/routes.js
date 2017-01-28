import Home from './components/routes/Home.vue';
import Photo from './components/routes/Photo.vue';
import Photoset from './components/routes/Photoset.vue';

const routes = [
	{ name: 'home', path: '/', component: Home },
	{ name: 'photo', path: '/photo/:id', component: Photo },
	{ name: 'photoset', path: '/photoset/:id', component: Photoset },
	{ path: '*', redirect: '/' }
];

export default routes;