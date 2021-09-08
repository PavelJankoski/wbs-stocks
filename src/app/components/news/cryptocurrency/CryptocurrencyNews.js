import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions';
import NewsCard from "../news-card/NewsCard";
import TwoButtonsPagination from "../../UI/pagination/TwoButtonsPagination";

const CryptocurrencyNews = () => {
    const cryptoNews = useSelector((state) => state.newsReducer.cryptocurrencyNews, shallowEqual);
    const [page, setPage] = useState(0);
    const cardsPerPage = 15;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchCryptocurrenciesNews())
    }, [dispatch]);

    const handleOnPreviousClick = () => {
        setPage(page - 1);
        scrollToTop();
    }

    const handleOnNextClick = () => {
        setPage(page + 1);
        scrollToTop();
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const renderCryptoNews = cryptoNews.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage).map((s) => {
        let dateTime = new Date(s.datetime * 1000).toString().split(' ');
        return (
            <NewsCard key={s.id}
                      source={s.source}
                      day={dateTime[2]}
                      month={dateTime[1]}
                      title={s.headline}
                      description={s.summary}
                      link={s.url}
                      image={s.image}/>
        )
    })
    return (
        <div>
            <div id="cards">
                {renderCryptoNews}
            </div>
            <div className="mt-5 mb-3 text-center">
                <TwoButtonsPagination previousDisabled={page === 0}
                                      nextDisabled={page * cardsPerPage + cardsPerPage >= cryptoNews.length - 1}
                                      handleOnPreviousClick={handleOnPreviousClick}
                                      handleOnNextClick={handleOnNextClick}/>
            </div>
        </div>


    )
}

export default CryptocurrencyNews;
