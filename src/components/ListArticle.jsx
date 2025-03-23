import { NavLink } from "react-router-dom"
import { Button, PageBar } from './index'
import PropTypes from "prop-types"

const ListArticle = ({current, totalPage, setCurrent, currentArticle}) => {
    return (
        <div className="px-[35px] pb-[30px] bg-white">
                {currentArticle.length > 0 ? (
                    currentArticle.map(article => (
                        <div key={article._id} className="w-full py-[35px] border-b border-b-[#eee] flex justify-between gap-[50px]"
                        data-aos="fade-up">
                            <NavLink 
                            to={`/news/detail/${article.slug}`} 
                            className="max-w-[200px] inline-block">
                                <img src={article.thumbnail} alt={article.subject} className="w-full" data-aos="zoom-in"/>
                            </NavLink>
                            <div className="flex-1 flex flex-col text-left" data-aos="fade-left">
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
                <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent}/>
            </div>
    )
}

ListArticle.protoTypes = {
    current: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    setCurrent: PropTypes.func.isRequired,
    currentArticle: PropTypes.array.isRequired,

}

export default ListArticle