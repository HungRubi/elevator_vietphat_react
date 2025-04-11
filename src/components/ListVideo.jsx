import { NavLink } from "react-router-dom";
import Button from "./Button";
import icons from '../util/icons';
import PropTypes from "prop-types";
const { FaRegEye, FaCirclePlay } = icons

const ListVideo = ({data}) => {
    const format = (number) => number?.toLocaleString("vi-VN");
    return (
        <div className="w-full mt-8">
            <ul className="w-full flex gap-5 flex-wrap">
                {data?.length > 0 ? (
                    data?.map(item => (
                        <li key={item._id} data-aos="fade-up"
                        className="item_video bg-white shadow">
                            <NavLink to={`/video/${item.slug}`} title={item.name}
                            className="w-full relative blur_img overflow-hidden inline-block">
                                <img src={item.thumbnail} data-aos="zoom-in"
                                alt={item.name} className="w-full"/>
                                <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#00000041] flex items-center justify-center flur_bg">
                                    <FaCirclePlay className="text-7xl text-gray-200"/>
                                </div>
                            </NavLink>
                            <div className="w-full text-left p-2">
                                <NavLink to={`/video/${item.slug}`}>
                                    <h5 className="text-lg font-medium text-gray-800 capitalize leading-8 line-clamp-1">
                                        {item.name}
                                    </h5>
                                </NavLink>
                                <span className="leading-8 line-clamp-1 text-gray-500">Ngày đăng: {item.format}</span>
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex gap-2 items-center mt-2">
                                        <FaRegEye className="text-lg text-gray-500"/>
                                        {format(20034235)}
                                    </div>
                                    <NavLink to={`/video/${item.slug}`}>
                                        <Button className={"mt-2"}>Xem ngay</Button>
                                    </NavLink>
                                </div>
                            </div>
                        </li>
                    ))
                    ) : (
                        <div className="w-full flex flex-col gap-5 items-center justify-center">
                            <img src="/img/empty_video.png" alt="" className="w-[300px] opacity-50"/>
                            <p className="text-gray-400">Không có video nào ở đây?</p>
                        </div>
                    )
                }
            </ul>
        </div>
    )
}

ListVideo.propTypes = {
    data: PropTypes.array.isRequired,
};

export default ListVideo