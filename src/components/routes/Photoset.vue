<template>
	<div v-if="hasPhotosetData" class="container">
		<h1>{{photosetData.title._content}}</h1>
		<router-link :to="{ name: 'photo', params: { id: photosetData.primary }}">
			<photo :id="photosetData.primary"></photo>
		</router-link>
		<p>{{photosetData.description._content}}</p>
		<ul>
			<li v-for="photo in photos">
				<router-link :to="{ name: 'photo', params: { id: photo.id }}">
					<photo :id="photo.id" :size=3></photo>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
    import Photo from '../Photo.vue';

    export default {
        components: {
            Photo,
        },
        created() {
            let component = this;

            //Request photoset info
            Flickr.photosets.getInfo({
                'photoset_id': this.$route.params.id,
            }, function(x, response) {
                if (response && response.photoset && response.photoset.id) {
                    component.photosetData = response.photoset;
                    component.hasPhotosetData = true;
                }
            });

            //Request photoset photoset
            Flickr.photosets.getPhotos({
                'photoset_id': this.$route.params.id,
            }, function(x, response) {
                if (response && response.photoset && response.photoset.photo) {
                    component.photos = response.photoset.photo;
                    component.hasPhotos = true;
                    console.log
                }
            });

        },
        data() {
            return {
                hasPhotosetData: false,
                hasPhotos: false,
                photosetData: null,
                photos: null,
            }
        },
    }
</script>