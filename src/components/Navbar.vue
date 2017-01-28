<template>
	<header class="navbar navbar-default">
		<div class="container">
			<h1 class="navbar-brand">
				<router-link :to="{ name:'home'}">Colin Stevenson</router-link>
			</h1>
			<ul class="navbar-right nav navbar-nav">
				<li><router-link :to="{ name: 'home'}">Photography</router-link></li>
				<li><router-link :to="{ name: 'about'}">About</router-link></li>
			</ul>
		</div>
	</header>
</template>