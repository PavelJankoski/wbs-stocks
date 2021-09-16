import React, {Fragment, useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions';
import NewsCard from "../news-card/NewsCard";
import TwoButtonsPagination from "../../UI/pagination/TwoButtonsPagination";
import {Spinner} from "react-bootstrap";

const CryptocurrencyNews = () => {
    const cryptoNews = useSelector((state) => state.newsReducer.cryptocurrencyNews, shallowEqual);
    const cryptoNewsLoading = useSelector((state) => state.newsReducer.cryptoNewsLoading, shallowEqual);
    const [page, setPage] = useState(0);
    const cardsPerPage = 16;
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
        <div className="h-100">
            <div className="row page-title-header">
                <div className="col-12">
                    <div className="page-header">
                        <div className="row w-100">
                            <div className="col-12 col-md-5 align-self-center">
                                <h4 className="page-title font-weight-medium">Crypto news</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                !cryptoNewsLoading ? <Fragment>
                        <div id="cards">{renderCryptoNews}</div>
                        <div className="mt-5 mb-3 text-center">
                            <TwoButtonsPagination previousDisabled={page === 0}
                                                  nextDisabled={page * cardsPerPage + cardsPerPage >= cryptoNews.length - 1}
                                                  handleOnPreviousClick={handleOnPreviousClick}
                                                  handleOnNextClick={handleOnNextClick}/>
                        </div>
                    </Fragment> :
                    <div className="d-flex justify-content-center h-100 align-items-center">
                        <Spinner variant={'primary'}
                                 animation="border"
                                 style={{width: "100px", height: "100px"}}/>
                    </div>
            }
        </div>


    )
}

export default CryptocurrencyNews;
