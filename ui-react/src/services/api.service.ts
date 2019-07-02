import axios, { AxiosInstance } from 'axios';
import localforage from 'localforage';
const axiosInstance : AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    // timeout: 1000,
    validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
    }
});

async function fetchData(method, url, data = {}){
    let config : any = {
        method: method,
        headers: {}
    }

    if(data) config.data = data;

    requestInterceptor(config);

    try {
        let res = await fetch('http://localhost:5000' + url, {
            withCredentials: true,
            ...config
        });



        let data = await res.json();



        responseInterceptor(res, data, res.url);

        return data;

    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}



axiosInstance.interceptors.request.use(async (config) => requestInterceptor(config));
axiosInstance.interceptors.response.use(async(config) => responseInterceptor(config, config.data, config.config.url));


async function requestInterceptor(config){
    if(config.url !== '/user/login') {
        const token = window.localStorage.getItem('token');

        if(!token) return Promise.reject('Could not get token');
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if(config.method === 'get'){

        const etag = await localforage.getItem(`${config.baseURL}${config.url}`);
        config.headers['if-None-Match'] = etag;
    }

    return config;
}

async function responseInterceptor(res, data, url){
    let etag = res.headers.etag || res.headers.get('etag');

    if(etag && !url.includes('user')){
        if(res.status === 304) {
            try {
                data = await localforage.getItem(etag);
            } catch (error) {
                localforage.removeItem(url);
                localforage.removeItem(etag);
                throw error;
            }
        }else {
            localforage.setItem(url, etag);
            localforage.setItem(etag, data);
        }
    }

    return data;
}


export default {
    /* User */
    async userLogin()  : Promise<{ token: string }>{
        return await axiosInstance.post('/user/login', {
            username: 'martijn',
            password: 'test123'
        });
    },

    /* Artists */
    async getArtists() : Promise<Array<any>>{
        return await axiosInstance.get('/artists/all')
    },

    async searchArtist(searchQuery: string) : Promise<Array<any>> {
        return await axiosInstance.get('/artist/search', {
            params: {
                searchQuery
            }
        })
    },

    async createArtist(artist: any) {
        return await axiosInstance.post('/artist/create', artist);
    },

    /* Concerts */
    async getConcerts() : Promise<Array<any>> {
        return await fetchData('GET', '/concerts/all');
        // return await axiosInstance.get('/concerts/all');
    },

    async getConcert(id: string) {
        return await fetchData('GET', `/concert/${id}`);
        // return await axiosInstance.get(`/concert/${id}`);
    },

    async createConcert(form) {
        return await axiosInstance.post('/concert/create', form);
    },

    /* Locations */
    async getLocations(): Promise<Array<any>> {
        return await axiosInstance.get('/locations/all');
    }
}