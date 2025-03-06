import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from '../../store/actions';
import { formatDate } from "../../util/dateFormat";

const NewsDetail = () => {
    const dispatch = useDispatch();
    const {articleDetail} = useSelector(state => state.app);
    const slug = window.location.pathname.split('/').pop();
    useEffect(() => {
            if(slug){
                dispatch(actions.getArticleDetail(slug))
            }
        }, [dispatch, slug])
    const dateFormated = formatDate(articleDetail?.createdAt);
    return (
        <div className="w-full px-[10%] mt-8">
            <h1 className="text-[#333] text-[22px] pb-2.5">
                {articleDetail?.subject}
            </h1>
            <hr className="my-[1rem] border-t border-t-[#0000008c] opacity-[0.25]"/>
            <p className="py-2 text-[16px] leading-8 text-justify">
                {articleDetail?.content}
            </p>
            <div className="w-full px-[10%]">
                <img src={articleDetail?.thumbnail} alt="" className="w-full mt-5" />
            </div>
            <hr className="deliver_dashed opacity-[0.4] my-5"/>
            <p className="pb-2 text-[16px] leading-8 text-justify">
                Cập nhật lúc: <span className="text-blue-600">{dateFormated}</span> <br />
                Người đăng: <span className="text-blue-600">{articleDetail?.author}</span>
            </p>
            <hr className="deliver_dashed opacity-[0.4] mt-2.5"/>

        </div>
    )
}

export default NewsDetail