import { NavLink } from "react-router-dom";
import {Button, PageBar} from "../../components/index";
import * as actions from '../../store/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentPageArticle} from '../../store/actions/articles';
import { memo, useMemo } from "react";


const News = () => {
    const dispatch = useDispatch();
    const { articleCache, currentPageArticle, totalPageArticle } = useSelector(state => state.app);
    const articles = useMemo(() => articleCache[currentPageArticle] || [], [articleCache, currentPageArticle]);

    
    useEffect(() => {
        if (!articleCache[currentPageArticle]) {
            dispatch(actions.getArticles(currentPageArticle));
        }
    }, [dispatch, currentPageArticle, articleCache]);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPageArticle) {
            dispatch(setCurrentPageArticle(newPage)); // Cập nhật Redux trước
    
            if (!articleCache[newPage]) {  // Chỉ gọi API nếu trang chưa có trong cache
                dispatch(actions.getArticles(newPage));
            }
    
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên sau khi Redux đã cập nhật
            }, 100);
        }
    };
    return (
        <div className="w-full px-[10%] pt-8">
            <div className="px-[35px] pb-[30px] bg-white">
                {articles.length > 0 ? (
                    articles.map(article => (
                        <div key={article._id} className="w-full py-[35px] border-b border-b-[#eee] flex justify-between gap-[50px]">
                            <NavLink 
                            to={`/news/detail/${article.slug}`} 
                            className="max-w-[200px] inline-block">
                                <img src={article.thumbnail} alt={article.subject} className="w-full" />
                            </NavLink>
                            <div className="flex-1 flex flex-col text-left">
                                <NavLink 
                                to={`/news/detail/${article.slug}`} 
                                className="text-[20px] font-[500] text-[#393939] line-clamp-1">
                                    {article.subject}
                                </NavLink>
                                <div className="block text-[14px] text-[#ccc] my-2">
                                    by {article.author} on {article.dateFormat}
                                </div>
                                <div className="text-[15px] line-clamp-2 leading-6">
                                    {article.content}
                                </div>
                                <div className="flex justify-end">
                                    <Button className="text-[13px] px-[10px] !py-[3px] rounded-[8px] mt-3">
                                        read more
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không có bài viết nào.</p>
                )}
                <PageBar currentPage={currentPageArticle} totalPage={totalPageArticle} onPageChange={handlePageChange  }/>
            </div>
        </div>
    )
}
export default memo(News)