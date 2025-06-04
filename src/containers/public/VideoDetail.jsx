import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from '../../store/actions';
import icons from '../../util/icons';
import { NavLink, useParams } from "react-router-dom";
import { ListVideo } from "../../components";
import { Helmet } from "react-helmet";

const {FaRegCalendarAlt} = icons

const VideoDetail = () => {
    const dispatch = useDispatch();
    const {slug} = useParams();

    const format = (money) => {
        return money?.toLocaleString('vi-VN')
    }
    useEffect(() => {
            if(slug){
                console.log("🎯 Dispatching action getVideoDetail với slug:", slug);
                dispatch(actions.getVideoDetail(slug))
            }
        }, [dispatch, slug])
    const {videoDetail, listVideo, articleSuggest, productNewLast} = useSelector(state => state.app);

    return (
        <>
            <Helmet>
                <title>{videoDetail?.name ? `${videoDetail.name} - Thang máy Việt Phát`: 'Thang máy Việt Phát'}</title>
                <meta name="description" content={
                    videoDetail?.subject
                    ? videoDetail.subject.slice(0, 160) // cắt ngắn để mô tả hợp lý
                    : "Cập nhật video mới nhất về thang máy, công nghệ và dịch vụ tại Thang máy Việt Phát."
                }/>
                <meta name="keywords" content="video thang máy, hướng dẫn sử dụng thang máy, giới thiệu sản phẩm thang máy, Thang máy Việt Phát" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/video/your-video-slug" />
                
                {/* Open Graph tags để chia sẻ trên mạng xã hội */}
                <meta property="og:title" content="Chi tiết video - Thang máy Việt Phát" />
                <meta property="og:description" content="Xem video giới thiệu sản phẩm, hướng dẫn sử dụng và các hoạt động của Thang máy Việt Phát." />
                <meta property="og:type" content="video.other" />
                <meta property="og:url" content={`https://vmu.com.vn/video/${videoDetail?.slug}`} />
                <meta property="og:image" content={`${videoDetail?.thumbnail}`} />
            </Helmet>
            <div className="w-full px-[10%] mt-8 flex justify-between mb-15">
                <div className="w-7/10 bg-white shadow p-5">
                    <div className="w-full h-2/5">
                        <iframe 
                            className="h-full w-full rounded-lg" 
                            src={videoDetail?.video_url} 
                            title={videoDetail?.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <ListVideo data={listVideo}/>
                </div>
                <nav className="w-[25%]">
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
                                    className={"w-[100px] flex-none"}>
                                        <img src={item.thumbnail} alt={item.subject} 
                                        className="w-full object-cover"/>
                                    </NavLink>
                                    <div className="text-base leading-7">
                                        <h5 className="font-medium capitalize text-gray-900 line-clamp-2">
                                            {item.subject}
                                        </h5>
                                        <span className="text-sm text-gray-600">Tác giả: {item.author}</span>
                                        <div className="text-sm text-gray-600 flex gap-1.5">
                                            <FaRegCalendarAlt className="text-base"/> 
                                            <span className="leading-4">
                                                Ngày đăng: {item.formatedDate}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full bg-white shadow mt-10">
                        <div className="w-full p-2 border-l-5 border-[#2f904b]">
                            <h2 className="uppercase text-lg font-medium">
                                Sản phẩm nổi bật
                            </h2>
                        </div>
                        <ul className="w-full mt-2">
                            {productNewLast?.map(item => (
                                <li key={item._id}
                                className="px-2 py-4 flex gap-2.5 order_items border-b border-gray-200">
                                    <NavLink to={`/products/detail/${item.slug}`}
                                    className={"w-[100px] flex-none"}>
                                        <img src={item.thumbnail_main} alt={item.name} 
                                        className="w-full object-cover"/>
                                    </NavLink>
                                    <div className="text-base leading-7">
                                        <h5 className="font-medium capitalize text-gray-900 line-clamp-2">
                                            {item.name}
                                        </h5>
                                        <span className="text-sm text-gray-600">
                                            đ 
                                            <span className="ml-1 text-lg text-main font-medium">
                                                {format(item.price)}
                                            </span>
                                        </span>
                                        <div className="text-sm text-gray-600 flex gap-1.5">
                                            <FaRegCalendarAlt className="text-base"/> 
                                            <span className="leading-4">
                                                Ngày đăng: {item.formatedDate}
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

export default VideoDetail