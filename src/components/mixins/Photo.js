import PhotoSizes from '../../api/flickr/PhotoSizes';

const PhotoMixin = {
	props: {
		id: {
			type: String,
		},
		includeMeta: {
			type: Boolean,
			default: false,
		},
		size: {
			type: Number,
			default: PhotoSizes.MEDIUM,
		}
	},
	computed: {
		photoId() {
			return this.id;
		},
	},
	created() {
		if(this.photoId){
			this.requestSizes(this.photoId);
			this.requestInfo(this.photoId);
		}
	},
	data() {
		return {
			hasSizesData: false,
			imageLoaded: false,
			meta: {
				title: "--",
				description: "--",
			},
			sizes: undefined,
			source: undefined,
		}
	},
	methods: {
		requestSizes(photoId) {
			let component = this;
			Flickr.requestPhotoSizes(
				photoId,
				function(x, sizes) {
					if (sizes) {
						component.sizes = sizes;
						component.hasSizesData = true;
					}
				}
			);
		},
		requestInfo(photoId) {
			let component = this;
			Flickr.requestPhotoInfo(
				photoId, 
			function(x, info) {
				if (info) {
					component.meta = info;
					component.meta.title = component.meta.title || { _content: "--" };
				}
			});
		},
		fadeBackgroundOnLoad(imagePath){
			let image = new Image();
			let component = this;
			image.onload = function(){
				component.imageLoaded = true;
			}
			image.src = imagePath;
		},
		getImageSource(size) {
			return this.sizes[size].source;
		},
	},
};

export default PhotoMixin;