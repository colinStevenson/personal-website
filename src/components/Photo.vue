<template>
	<img v-if="hasSizesData" :src="source" alt="[NEEDS ALT]">
</template>
<script>
    import Flickr from '../api/flickr/flickr';

    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
            size: {
                type: Number,
                default: 5,
            }
        },
        created() {
            let component = this;
            Flickr.photos.getSizes({
                'photo_id': this.id
            }, function(x, response) {
                if (response && response.sizes && response.sizes.size) {
                    let image = response.sizes.size;
                    component.hasSizesData = true;
                    component.source = image[component.size].source;
                }
            });
        },
        data() {
            return {
                hasSizesData: false,
                source: undefined,
            }
        },
    };
</script>