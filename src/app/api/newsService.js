import {API_DRIVER_BACKEND} from "../../axiosConfig";

const NewsService = {
    fetchNews: (category = 'general') => {
        return API_DRIVER_BACKEND.get(`/news?category=${category}`)
    },

    fetchCompanyNews: (symbol) => {
        return API_DRIVER_BACKEND.get(`companies/${symbol}/news`)
    }
}

export default NewsService;
