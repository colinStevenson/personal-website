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
				<div v-for="(photo, index) in photos" class="col-md-3 col-xs-4" :data-index="index > 0">
					<div class="slide slide-square slide-link" v-on:click="handlePhotoClick(index)">
						<photo :id="photo.id" :size=1></photo>
						<photo-full-screen 
							v-if="activePhoto==photo.id" 
							:id="photo.id"
							:next="index+1 < photos.length ? index+1 : null"
							:previous="index > 0 ? index-1 : null"
							:include-meta=true>
						</photo-full-screen>
					</div>
				</div>
			</ul>
		</div>
	</div>
</template>
<script>
	import Photo from '../Photo.vue';
	import PhotoFullScreen from '../PhotoFullScreen.vue';
	import PhotoMixin from '../mixins/Photo';
	import PhotoSizes from '../../api/flickr/PhotoSizes';

	export default {
		components: {
			Photo,
			PhotoFullScreen,
		},
		computed: {
			photoSource(){
				return this.sizes ? this.sizes[PhotoSizes.LARGE].source : undefined;
			},
			activePhoto(){
				let val = undefined;
				if(
					this.activePhotoIndex !== undefined && 
					this.photos && this.photos[this.activePhotoIndex]
				){
					val = this.photos[this.activePhotoIndex].id || undefined;
				}
				return val;
			},
			activePhotoIndex(){
				let val = undefined;
				if(this.$route.query && this.$route.query.photo !== undefined){
					val = Number(this.$route.query.photo);
				}
				return val;
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
			handlePhotoClick(photoIndex){
				this.$router.push(
					{ 
						name: 'photoset', 
						params: {id: this.$route.params.id,  },
						query: { photo: photoIndex },
					}
				)
			},
		},
		mixins: [PhotoMixin],
		watch: {
			hasPhotosetData() {
				if (this.photosetData.primary) {
					this.requestSizes(this.photosetData.primary);
				}
			},
			hasSizesData() {
				this.fadeBackgroundOnLoad(this.photoSource);
			},
			activePhoto(){
				this.$store.commit("toggleModalOpen", !!this.activePhoto);
			},
		},
	}
</script>