import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from '../../store/actions';
import icons from '../../util/icons';
import { NavLink, useParams } from "react-router-dom";
import { ListVideo } from "../../components";

const { FaRegCalendarAlt } = icons;

const VideoDetail = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();

    const format = (money) => money?.toLocaleString('vi-VN');

    useEffect(() => {
        if (slug) {
            console.log("🎯 Dispatching action getVideoDetail với slug:", slug);
            dispatch(actions.getVideoDetail(slug));
        }
    }, [dispatch, slug]);

    const { videoDetail, listVideo, articleSuggest, productNewLast } = useSelector(state => state.app);

    return (
        <div className="w-full px-4 sm:px-8 lg:px-[10%] mt-8 flex flex-col lg:flex-row justify-between gap-6 mb-15">
            <div className="w-full lg:w-7/10 bg-white shadow p-4 sm:p-5">
                <div className="w-full aspect-video mb-4">
                    <iframe
                        className="h-full w-full rounded-lg"
                        src={videoDetail?.video_url}
                        title={videoDetail?.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <ListVideo data={listVideo} />
            </div>

            <nav className="w-full lg:w-[25%] flex flex-col gap-10">
                <div className="w-full bg-white shadow">
                    <div className="w-full p-2 border-l-4 border-[#2f904b]">
                        <h2 className="uppercase text-lg font-medium">
                            tin tức mới
                        </h2>
                    </div>
                    <ul className="w-full mt-2">
                        {articleSuggest?.map(item => (
                            <li key={item._id}
                                className="px-2 py-4 flex gap-2.5 order_items border-b border-gray-200">
                                <NavLink to={`/news/detail/${item.slug}`} className="w-[100px] flex-none">
                                    <img src={item.thumbnail} alt={item.subject} className="w-full object-cover" />
                                </NavLink>
                                <div className="text-sm leading-6">
                                    <h5 className="font-medium capitalize text-gray-900 line-clamp-2">
                                        {item.subject}
                                    </h5>
                                    <span className="text-xs text-gray-600">Tác giả: {item.author}</span>
                                    <div className="text-xs text-gray-600 flex gap-1.5 mt-1">
                                        <FaRegCalendarAlt className="text-sm" />
                                        <span>Ngày đăng: {item.formatedDate}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full bg-white shadow">
                    <div className="w-full p-2 border-l-4 border-[#2f904b]">
                        <h2 className="uppercase text-lg font-medium">
                            Sản phẩm nổi bật
                        </h2>
                    </div>
                    <ul className="w-full mt-2">
                        {productNewLast?.map(item => (
                            <li key={item._id}
                                className="px-2 py-4 flex gap-2.5 order_items border-b border-gray-200">
                                <NavLink to={`/products/detail/${item.slug}`} className="w-[100px] flex-none">
                                    <img src={item.thumbnail_main} alt={item.name} className="w-full object-cover" />
                                </NavLink>
                                <div className="text-sm leading-6">
                                    <h5 className="font-medium capitalize text-gray-900 line-clamp-2">
                                        {item.name}
                                    </h5>
                                    <span className="text-xs text-gray-600">
                                        đ <span className="ml-1 text-base text-main font-medium">{format(item.price)}</span>
                                    </span>
                                    <div className="text-xs text-gray-600 flex gap-1.5 mt-1">
                                        <FaRegCalendarAlt className="text-sm" />
                                        <span>Ngày đăng: {item.formatedDate}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default VideoDetail;
