import FlickrApi from './flickrapi';
import ENV from '../../env';

const Flickr = window.Flickr = new FlickrApi.Flickr({
	'api_key': ENV.FLICKR_API_KEY,
	'secret': ENV.FLICKR_SECRET,
	'user_id': ENV.FLICKR_USER_ID,
});

Flickr._cache = {
	sizes:{},
	photosetInfo:{},
	photosetPhotos:{},
	photosetList:null,
	photoInfo:{},
};

Flickr.requestPhotoSizes = function(photoId, handler){
	let flickr = this;
	if(this._cache.sizes[photoId]){
		handler({ fromCache: true }, this._cache.sizes[photoId]);
	} else {
		Flickr.photos.getSizes({
			'photo_id': photoId
		}, function(x, response){
			if (response && response.sizes && response.sizes.size) {
				flickr._cache.sizes[photoId] = response.sizes.size;
				handler(x, response.sizes.size);
			} else {
				console.error("requestPhotoSizes error")
			}
		});
	}
};

Flickr.requestPhotosetPhotos = function(photosetId, handler) {
	let flickr = this;
	if(this._cache.photosetPhotos[photosetId]) {
		handler({ fromCache: true }, this._cache.photosetPhotos[photosetId]);
	} else {
		Flickr.photosets.getPhotos({
			'photoset_id': photosetId,
		}, function(x, response) {
			if (response && response.photoset && response.photoset.photo) {
				flickr._cache.photosetPhotos[photosetId] = response.photoset.photo;
				handler(x, response.photoset.photo)
			} else {
				console.error("requestPhotosetPhotos error")
			}
		});
	}
};

Flickr.requestPhotosetInfo = function(photosetId, handler){
	let flickr = this;
	if(this._cache.photosetInfo[photosetId]){
		handler({ fromCache: true }, this._cache.photosetInfo[photosetId]);
	} else {
		Flickr.photosets.getInfo({
			'photoset_id': photosetId,
		}, function(x, response) {
			if (response && response.photoset && response.photoset.id) {
				flickr._cache.photosetInfo[photosetId] = response.photoset;
				handler(x, response.photoset);
			} else {
				console.error("requestPhotosetInfo error")
			}
		});
	}
};

Flickr.requestPhotoInfo = function(photoId, handler){
	let flickr = this;
	if(this._cache.photoInfo[photoId]){
		handler({ fromCache: true }, this._cache.photoInfo[photoId]);
		console.log(this._cache.photoInfo[photoId])
	} else {
		Flickr.photos.getInfo({
			'photo_id': photoId
		}, function(x, response) {
			if (response && response.photo) {
				flickr._cache.photoInfo[photoId] = response.photo;
				handler(x, response.photo);
			} else {
				console.error("requestPhotoInfo error")
			}
		});
	}
};

Flickr.requestPhotosetList = function(handler){
	let flickr = this;
	if(this._cache.photosetList != null) {
		handler({ fromCache: true }, this._cache.photosetList);
	} else {
		Flickr.photosets.getList({
			'user_id': ENV.FLICKR_USER_ID,
		}, function(x, response) {
			if (response && response.photosets && response.photosets.photoset) {
				flickr._cache.photosetList = response.photosets.photoset;
				handler(x, response.photosets.photoset);
			} else {
				console.error("requestPhotosetList error")
			}
		});
	}
};

export default Flickr;