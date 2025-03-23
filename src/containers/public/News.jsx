import {ListArticle} from "../../components/index";
import * as actions from '../../store/actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const News = () => {
    const dispatch = useDispatch();
    const { totalPage, articles } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getArticles());
    }, []);
    const [current, setCurrent] = useState(1);
    const limit = 5;
    const lastArticle = current * limit;
    const firstArticle = lastArticle - limit;
    const currentArticle = articles.slice(firstArticle, lastArticle);
    return (
        <div className="w-full px-[10%] py-8">
            <ListArticle current={current} setCurrent={setCurrent} currentArticle={currentArticle} totalPage={totalPage}/>
        </div>
    )
}
export default News