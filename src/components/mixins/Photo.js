import PhotoSizes from '../../api/flickr/PhotoSizes';
import $ from 'webpack-zepto';

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
		this.requestSizes(this.photoId);
		this.requestInfo(this.photoId);
	},
	data() {
		return {
			hasSizesData: false,
			meta: {
				title: "--",
			},
			sizes: undefined,
			source: undefined,
		}
	},
	methods: {
		requestSizes(photoId) {
			let component = this;
			Flickr.photos.getSizes({
				'photo_id': photoId
			}, function(x, response) {
				if (response && response.sizes && response.sizes.size) {
					component.sizes = response.sizes.size;
					component.hasSizesData = true;
				}
			});
		},
		requestInfo(photoId) {
			let component = this;
			Flickr.photos.getInfo({
				'photo_id': photoId
			}, function(x, response) {
				if (response && response.photo) {
					component.meta = response.photo;
					component.meta.title = component.meta.title || { _content: "--" };
				}
			});
		},
		fadeBackgroundOnLoad(imagePath, element){
			let image = new Image();
			let $element = $(element);
			image.onload = function(){
				$element.css({ backgroundImage: "url(" + image.src + ")" });
				$element.addClass("loaded");
			}
			image.src = imagePath;
		},
		getImageSource(size) {
			return this.sizes[size].source;
		},
	},
};

export default PhotoMixin;