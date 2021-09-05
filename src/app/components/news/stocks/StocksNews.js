import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions';
import NewsCard from "../news-card/NewsCard";
import TwoButtonsPagination from "../../UI/pagination/TwoButtonsPagination";
import SearchAutocomplete from "../../navigation/navbar/search-autocomplete/SearchAutocomplete";
import * as actionTypes from "../../../store/actionTypes";
import {Spinner} from "react-bootstrap";

const StocksNews = () => {
    const stocksNews = useSelector((state) => state.newsReducer.stocksNews, shallowEqual);
    const [page, setPage] = useState(0);
    const cardsPerPage = 15;
    const dispatch = useDispatch();
    const searchLoading = useSelector((state) => state.stocksReducer.searchStocksLoading);
    const searchAutocompleteData = useSelector((state) => state.stocksReducer.searchedStocks);
    const newsLoading = useSelector((state) => state.newsReducer.stockNewsLoading, shallowEqual);
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        dispatch(actions.fetchStocksMarketNews())
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

    const onSearchInputChange = (e) => {
        const searchText = e.target.value;
        if (timer) {
            clearTimeout(timer);
        }
        if (searchText.length !== 0) {
            setTimer(setTimeout(() =>
                dispatch(actions.searchStocks(searchText)), 1500)
            );
        } else {
            dispatch({type: actionTypes.SEARCH_STOCKS_SUCCESS, payload: []});
        }
    }

    const onSearchItemClick = (symbol) => {
        dispatch(actions.fetchCompanyNews(symbol));
    }


    const renderStocksNews = stocksNews.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage).map((s) => {
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
                                <h4 className="page-title font-weight-medium">Socks market news</h4>
                            </div>
                            <div className="col-12 col-md-7">
                                <SearchAutocomplete loading={searchLoading}
                                                    inputPlaceholder={"Search for company news..."}
                                                    autocompleteData={searchAutocompleteData}
                                                    onSearchChange={onSearchInputChange}
                                                    onItemClick={onSearchItemClick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!newsLoading ? <React.Fragment>
                    <div id="cards">
                        {renderStocksNews}
                    </div>
                    <div className="mt-5 mb-3 text-center">
                        <TwoButtonsPagination previousDisabled={page === 0}
                                              nextDisabled={page * cardsPerPage + cardsPerPage >= stocksNews.length - 1}
                                              handleOnPreviousClick={handleOnPreviousClick}
                                              handleOnNextClick={handleOnNextClick}/>
                    </div>
                </React.Fragment>
                : <div className="d-flex justify-content-center h-100 align-items-center">
                    <Spinner variant={'primary'} animation="border"
                             style={{width: "100px", height: "100px"}}/>
                </div>}

        </div>


    )
}

export default StocksNews;
