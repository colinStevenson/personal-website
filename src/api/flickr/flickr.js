import FlickrApi from './flickrapi';
import ENV from '../../env';

const Flickr = window.Flickr = new FlickrApi.Flickr({
    'api_key': ENV.FLICKR_API_KEY,
    'secret': ENV.FLICKR_SECRET,
    'user_id': ENV.FLICKR_USER_ID,
});

export default Flickr;