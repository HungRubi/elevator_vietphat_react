import { Helmet } from "react-helmet";
import {ListArticle} from "../../components/index";
import * as actions from '../../store/actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const News = () => {
    const dispatch = useDispatch();
    const { totalPage, articles } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getArticles());
    }, [dispatch]);
    const [current, setCurrent] = useState(1);
    const limit = 5;
    const lastArticle = current * limit;
    const firstArticle = lastArticle - limit;
    const currentArticle = articles.slice(firstArticle, lastArticle);
    return (
        <>
            <Helmet>
                <title>Tin tức - Thang máy Việt Phát</title>
                <meta name="description" content="Cập nhật tin tức mới nhất về công nghệ thang máy, xu hướng xây dựng, và hoạt động của Thang máy Việt Phát." />
                <meta name="keywords" content="tin tức thang máy, công nghệ thang máy, xu hướng xây dựng, tin tức Việt Phát, blog thang máy" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/news" />
            </Helmet>
            <div className="w-full px-[10%] py-8 max-[1000px]:px-[15px]">
                <ListArticle current={current} setCurrent={setCurrent} currentArticle={currentArticle} totalPage={totalPage}/>
            </div>
        </>
    )
}
export default News