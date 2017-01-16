<template>
	<div>
		<photoset-intro 
			v-for="set in photosets" 
			:details="set">
		</photoset-intro>
	</div>
</template>
<script>
    import PhotosetIntro from '../PhotosetIntro';
    import ENV from '../../env';

    export default {
        components: {
            PhotosetIntro
        },
        created() {
            let component = this;

            Flickr.photosets.getList({
                'user_id': ENV.FLICKR_USER_ID,
            }, function(x, response) {
                if (response && response.photosets && response.photosets.photoset) {
                    component.photosets = response.photosets.photoset;
                    component.hasPhotosets = true;
                }
            });
        },
        data() {
            return {
                hasPhotosets: false,
                photosets: null,
            }
        }
    };
</script>