import {API_DRIVER_FH} from "../../axiosConfig";

const NewsService = {
    fetchNews: (category = 'general') => {
        return API_DRIVER_FH.get(`/news?category=${category}`)
    },

    fetchCompanyNews: (symbol) => {
        return API_DRIVER_FH.get("/company-news", {
            params: {
                symbol: symbol,
                from: new Date(Date.now() - 1000*60*60*24*90).toISOString().split("T")[0],
                to: new Date(Date.now()).toISOString().split("T")[0]
            }
        })
    }
}

export default NewsService;
