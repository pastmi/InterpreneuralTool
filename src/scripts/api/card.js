import Utils from '../utils/api'

const URI = '/';


export default {

    get() {
        return Utils.http.get(URI, 'readToken')
            .then(Utils.unwrapJsonResponse);
    },
}