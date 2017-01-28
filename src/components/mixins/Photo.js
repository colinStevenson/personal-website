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
				default: 5,
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
				medium: undefined,
				large: undefined,
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
						component.source = component.sizes[component.size].source;
						component.medium = component.sizes[5].source;
						component.large = component.sizes[7].source;
						console.log(component.sizes)
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
			}
		},
	};

	export default PhotoMixin;