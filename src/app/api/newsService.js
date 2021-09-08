import {API_DRIVER_FH} from "../../axiosConfig";

const NewsService = {
    fetchNews: (category = 'general') => {
        return API_DRIVER_FH.get(`/news?category=${category}`)
    }
}

export default NewsService;
