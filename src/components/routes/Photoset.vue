<template>
	<div v-if="hasPhotosetData">
		<header class="page-header">
			<div 
				class="page-header-media slide-loadable" 
				:class="{'loaded': imageLoaded }"
				:style="{ backgroundImage: 'url(' + photoSource + ')' }"
				role="presentation">
			</div>
			<div class="page-header-body">
				<div class="container">
					<h1 class="page-title">{{photosetData.title._content}}</h1>
					<p>{{photosetData.description._content}}</p>
				</div>
			</div>
		</header>
		<div class="container">
			<div class="row">
				<div v-for="photo in photos" class="col-md-3 col-xs-4">
					<div class="slide slide-square slide-link">
						<router-link :to="{ name: 'photo', params: { id: photo.id }}">
							<photo :id="photo.id" :size=1></photo>
						</router-link>
					</div>
				</div>
			</ul>
		</div>
	</div>
</template>
<script>
	import Photo from '../Photo.vue';
	import PhotoMixin from '../mixins/Photo';
	import PhotoSizes from '../../api/flickr/PhotoSizes';

	export default {
		components: {
			Photo,
		},
		computed: {
			photoSource(){
				return this.sizes ? this.sizes[PhotoSizes.LARGE].source : undefined;
			},	
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
				Flickr.requestPhotosetInfo(
					this.$route.params.id, 
					function(x, photoset) {
						if (photoset) {
							component.photosetData = photoset;
							component.hasPhotosetData = true;
						}
					}
				);
			},
			_requestPhotosetPhotos() {
				let component = this;
				//Request photoset photos
				Flickr.requestPhotosetPhotos(
					this.$route.params.id, 
					function(x, photos) {
						if (photos) {
							component.photos = photos;
							component.hasPhotos = true;
						}
					}
				);
			},
		},
		mixins: [PhotoMixin],
		watch: {
			hasPhotosetData() {
				if (this.photosetData.primary) {
					this.requestSizes(this.photosetData.primary);
				}
			},
			hasSizesData(newVal) {
				this.fadeBackgroundOnLoad(this.photoSource);
			},
		},
	}
</script>