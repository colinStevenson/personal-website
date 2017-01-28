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
		this._requestSizes(this.photoId);
		this._requestInfo(this.photoId);
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
		_requestSizes(photoId) {
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
		_requestInfo(photoId) {
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
		getImageSource(size) {
			return this.sizes[size].source;
		},
	},
};

export default PhotoMixin;