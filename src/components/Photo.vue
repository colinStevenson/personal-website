<template>
	<div>
		<div v-if="includeMeta" class="meta">
			<h1>{{meta.title._content}}</h1>
		</div>
		<img v-if="hasSizesData" :src="source" :alt="meta.title._content" class="img-responsive">
	</div>
</template>
<script>
    import Flickr from '../api/flickr/flickr';
    import PhotoMixin from './mixins/Photo';

    export default {
        mixins: [PhotoMixin],
        props: {
            id: {
                type: String,
            }
        }
    };
</script>