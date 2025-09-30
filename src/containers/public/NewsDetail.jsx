import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from '../../store/actions';
import icons from '../../util/icons';
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const {FaRegCalendarAlt} = icons

const NewsDetail = () => {
    const dispatch = useDispatch();
    const {articleDetail, articleSuggest, productNewLast} = useSelector(state => state.app);
    const {slug} = useParams();
    const format = (money) => {
        return money?.toLocaleString('vi-VN')
    }
    useEffect(() => {
            if(slug){
                dispatch(actions.getArticleDetail(slug))
            }
        }, [dispatch, slug])
    return (
        <>
            <Helmet>
                <title>{articleDetail?.subject ? `${articleDetail.subject} - Thang máy Việt Phát` : 'Thang máy Việt Phát'}</title>
                <meta name="description" content={
                    articleDetail?.content
                    ? articleDetail.content.slice(0, 160) // cắt ngắn để mô tả hợp lý
                    : "Cập nhật bài viết mới nhất về thang máy, công nghệ và dịch vụ tại Thang máy Việt Phát."
                }/>
                <meta name="keywords" content="bài viết thang máy, tin tức thang máy, công nghệ thang máy, Thang máy Việt Phát" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://vmu.com.vn/news/${articleDetail?.slug}`} />

                {/* Open Graph */}
                <meta property="og:title" content={`${articleDetail?.subject} - Thang máy Việt Phát`} />
                <meta property="og:description" content={articleDetail?.content} />
                <meta property="og:type" content="news" />
                <meta property="og:url" content={`https://vmu.com.vn/news/${articleDetail?.slug}`} />
                <meta property="og:image" content={articleDetail?.thumbnail} />
            </Helmet>

            <div className="w-full px-[10%] my-8 flex justify-between max-[1000px]:px-[15px] max-[700px]:flex-col max-[700px]:gap-5">
                <div className="w-[70%] bg-white shadow p-5 max-[1483px]:w-6/10 max-[700px]:w-full">
                    <h1 className="text-[#333] text-[22px] pb-2.5">
                        {articleDetail?.subject}
                    </h1>
                    <hr className="my-[1rem] border-t border-t-[#0000008c] opacity-[0.25]"/>
                    <p className="py-2 text-[16px] leading-8 text-justify">
                        {articleDetail?.content}
                    </p>
                    <div className="w-full overflow-hidden">
                        <img src={articleDetail?.thumbnail} alt={articleDetail?.subject} className="w-full mt-5 object-center" data-aos="zoom-in-up"/>
                    </div>
                    <hr className="deliver_dashed opacity-[0.4] my-5"/>
                    <p className="pb-2 text-[16px] leading-8 text-justify">
                        Cập nhật lúc: <span className="text-blue-600">{articleDetail?.formatedDate}</span> <br />
                        Người đăng: <span className="text-blue-600">{articleDetail?.author}</span>
                    </p>
                    <hr className="deliver_dashed opacity-[0.4] mt-2.5"/>
                </div>
                <nav className="w-[25%] max-[1483px]:w-[37%] max-[700px]:flex 
                max-[700px]:w-full max-[700px]:gap-5 max-[540px]:block">
                    <div className="w-full bg-white shadow">
                        <div className="w-full p-2 border-l-5 border-[#2f904b]">
                            <h2 className="uppercase text-lg font-medium">
                                tin tức mới
                            </h2>
                        </div>
                        <ul className="w-full mt-2">
                            {articleSuggest?.map(item => (
                                <li key={item._id}
                                className="px-2 py-4 flex gap-2.5 order_items border-b border-gray-200">
                                    <NavLink to={`/news/detail/${item.slug}`}
                                    className={"w-[100px] flex-none max-[1400px]:w-[80px]"}>
                                        <img src={item.thumbnail} alt={item.subject} 
                                        className="w-full object-cover"/>
                                    </NavLink>
                                    <div className="text-base">
                                        <h5 className="font-medium capitalize text-gray-900 line-clamp-2 max-[1300px]:text-[15px]">
                                            {item.subject}
                                        </h5>
                                        <span className="text-sm text-gray-600 max-[1300px]:text-[12px]">Tác giả: {item.author}</span>
                                        <div className="text-sm text-gray-600 flex gap-1.5">
                                            <FaRegCalendarAlt className="text-base max-[1156px]:hidden"/> 
                                            <span className="leading-4 max-[1300px]:text-[12px]">
                                                <span className="max-[1156px]:hidden ">Ngày đăng: </span> {item.formatedDate}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full bg-white shadow mt-10 max-[700px]:mt-0 max-[540px]:mt-10">
                        <div className="w-full p-2 border-l-5 border-[#2f904b]">
                            <h2 className="uppercase text-lg font-medium">
                                Sản phẩm nổi bật
                            </h2>
                        </div>
                        <ul className="w-full mt-2 ">
                            {productNewLast?.map(item => (
                                <li key={item._id}
                                className="px-2 py-4 flex gap-2.5 order_items border-b border-gray-200">
                                    <NavLink to={`/products/detail/${item.slug}`}
                                    className={"w-[100px] flex-none max-[1400px]:w-[80px]"}>
                                        <img src={item.thumbnail_main} alt={item.name} 
                                        className="w-full object-cover border-1 border-[#0000001f]"/>
                                    </NavLink>
                                    <div className="text-base">
                                        <h5 className="font-medium capitalize text-gray-900 line-clamp-2 max-[1300px]:text-[15px]">
                                            {item.name}
                                        </h5>
                                        <span className="text-sm text-gray-600 max-[1300px]:text-[13px]">
                                            đ 
                                            <span className="ml-1 text-lg text-main font-medium ">
                                                {format(item.price)}
                                            </span>
                                        </span>
                                        <div className="text-sm text-gray-600 flex gap-1.5">
                                            <FaRegCalendarAlt className="text-base max-[1156px]:hidden"/> 
                                            <span className="leading-4 max-[1300px]:text-[12px]">
                                                <span className="max-[1156px]:hidden ">Ngày đăng: </span> {item.formatedDate}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NewsDetail