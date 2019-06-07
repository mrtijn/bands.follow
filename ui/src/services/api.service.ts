import axios, { AxiosInstance } from 'axios';
const axiosInstance : AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    // timeout: 1000,
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJtYXJ0aWpuIiwiaWF0IjoxNTU5NzQ1NTcwLCJleHAiOjE1NTk3NDkxNzB9.f6UJw7evlcyDYlILGNvYmy-xmQNd8RgbPkhLlGBe-Tw'
    }
});

axiosInstance.interceptors.request.use((config) => {

    if(config.url !== '/user/login') {
        const token = window.localStorage.getItem('token');

        if(!token) return Promise.reject('Could not get token');
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
})

axiosInstance.interceptors.response.use((config) => {
    return config.data;
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
        return await axiosInstance.get('/artist/all')
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
    }
}