import axios, { AxiosInstance } from 'axios';
import localforage from 'localforage';
const axiosInstance : AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    // timeout: 1000,
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJtYXJ0aWpuIiwiaWF0IjoxNTU5NzQ1NTcwLCJleHAiOjE1NTk3NDkxNzB9.f6UJw7evlcyDYlILGNvYmy-xmQNd8RgbPkhLlGBe-Tw'
    },
    validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
    }
});



axiosInstance.interceptors.request.use(async (config) => {

    if(config.url !== '/user/login') {
        const token = window.localStorage.getItem('token');

        if(!token) return Promise.reject('Could not get token');
        config.headers['Authorization'] = `Bearer ${token}`;
    }


    // console.log();
    if(config.method === 'get'){

        const etag = await localforage.getItem(`${config.baseURL}${config.url}`);
        config.headers['if-None-Match'] = etag;
    }
    // return 'jep';
    return config;
})


axiosInstance.interceptors.response.use(async(config) => {
    let data = config.data;
    const url : any = config.config.url;
    if(config.headers.etag && !url.includes('user')){
        if(config.status === 304) {
            try {
                data = await localforage.getItem(config.headers.etag);
            } catch (error) {
                localforage.removeItem(url);
                localforage.removeItem(config.headers.etag);
                throw error;
            }
        }else {
            localforage.setItem(url, config.headers.etag);
            localforage.setItem(config.headers.etag, config.data);
        }
    }

    return data;
})
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
        return await axiosInstance.get('/concerts/all');
    },

    async getConcert(id: string) {
        return await axiosInstance.get(`/concert/${id}`);
    },

    async createConcert(form) {
        return await axiosInstance.post('/concert/create', form);
    },

    /* Locations */
    async getLocations(): Promise<Array<any>> {
        return await axiosInstance.get('/locations/all');
    }
}