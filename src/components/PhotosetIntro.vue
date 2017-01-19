<template>
	<div class="slide">
		<!--<photo :id="details.primary" :size=5 class='panel-media img-responsize'></photo>-->
		<div class="slide-media" :style="{ backgroundImage: 'url(' + large + ')' }">
		</div>
		<div class="slide-body">
			<router-link :to="{ name: 'photoset', params: { id: details.id }}">
				{{details.title._content}}
			</router-link>
		</div>
	</div>
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