import {API_DRIVER_FH} from "../../axiosConfig";

const NewsService = {
    fetchStocksMarketNews: () => {
        return API_DRIVER_FH.get("/news?category=general")
    }
}

export default NewsService;
