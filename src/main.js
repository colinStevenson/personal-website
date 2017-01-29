// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import routes from './routes';
import SmoothScroll from 'smoothscroll-polyfill';

SmoothScroll.polyfill();

const router = new VueRouter({
	routes: routes,
});

Vue.use(VueRouter);

new Vue({
	el: '#app',
	template: '<App/>',
	components: { App },
	router,
})