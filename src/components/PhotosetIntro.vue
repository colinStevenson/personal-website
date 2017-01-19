<template>
	<section class="panel panel-photoset">
		<!--<photo :id="details.primary" :size=5 class='panel-media img-responsize'></photo>-->
		<div class="panel-media" :style="{ backgroundImage: 'url(' + large + ')' }">
		</div>
		<div class="panel-body">
			<header class="panel-heading">
				<h1 class="panel-title">
					<router-link :to="{ name: 'photoset', params: { id: details.id }}">
						{{details.title._content}}
					</router-link>
				</h1>
			</header>
			
			<!--<p>{{details.description._content}}</p>-->
		</div>
	</section>
</template>
<script>
    import PhotoMixin from './Photo';

    export default {
        computed: {
            photoId() {
                return this.details.primary;
            }
        },
        props: ['details'],
        mixins: [PhotoMixin],
    }
</script>