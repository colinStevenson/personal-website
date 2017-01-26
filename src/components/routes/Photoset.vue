<template>
	<div v-if="hasPhotosetData">
		<!---->
		<!--<photo :id="photosetData.primary"></photo>
		-->
		<header class="page-header" ref="container">
			<div class="page-header-body">
				<div class="container">
					<h1 class="page-title">{{photosetData.title._content}}</h1>
					<p>{{photosetData.description._content}}</p>
				</div>
			</div>
		</header>
		<div class="container">
			<ul class="slide-set">
				<li v-for="photo in photos" class="slide">
					<router-link :to="{ name: 'photo', params: { id: photo.id }}">
						<photo :id="photo.id" :size=4></photo>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
    import Photo from '../Photo.vue';
    import PhotoMixin from '../mixins/Photo';

    export default {
        components: {
            Photo,
        },
        created() {
            this._requestPhotosetInfo();
            this._requestPhotosetPhotos();

        },
        data() {
            return {
                hasPhotosetData: false,
                hasPhotos: false,
                photosetData: null,
                photos: null,
            }
        },
        methods: {
            _requestPhotosetInfo() {
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
            },
            _requestPhotosetPhotos() {
                let component = this;
                //Request photoset photoset
                Flickr.photosets.getPhotos({
                    'photoset_id': this.$route.params.id,
                }, function(x, response) {
                    if (response && response.photoset && response.photoset.photo) {
                        component.photos = response.photoset.photo;
                        component.hasPhotos = true;
                    }
                });
            },
        },
        mixins: [PhotoMixin],
        watch: {
            hasPhotosetData() {
                if (this.photosetData.primary) {
                    this._requestSizes(this.photosetData.primary);
                }
            },
            hasSizesData(newVal) {
                this.$refs.container.style.backgroundImage = "url(" + this.large + ")";
            }
        },
    }
</script>