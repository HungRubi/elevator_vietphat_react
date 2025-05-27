import { NavLink } from "react-router-dom";
import Button from "./Button";
import icons from '../util/icons';
import PropTypes from "prop-types";
const { FaRegEye, FaCirclePlay } = icons;

const ListVideo = ({ data }) => {
  const format = (number) => number?.toLocaleString("vi-VN");

  return (
    <div className="w-full mt-8">
      {data?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {data.map((item) => (
            <li
              key={item._id}
              data-aos="fade-up"
              className="flex flex-col bg-white shadow rounded-md overflow-hidden w-full min-w-0"
            >
              {/* Thumbnail */}
              <NavLink
                to={`/video/${item.slug}`}
                title={item.name}
                className="relative w-full aspect-video block"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#00000041] flex items-center justify-center">
                  <FaCirclePlay className="text-5xl sm:text-6xl text-gray-200" />
                </div>
              </NavLink>

              {/* Nội dung */}
              <div className="p-3 flex flex-col justify-between flex-grow">
                <NavLink to={`/video/${item.slug}`}>
                  <h5 className="text-base md:text-lg font-medium text-gray-800 capitalize leading-6 line-clamp-1">
                    {item.name}
                  </h5>
                </NavLink>
                <span className="text-sm text-gray-500 mt-1">Ngày đăng: {item.format}</span>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2 items-center text-sm text-gray-500">
                    <FaRegEye className="text-lg" />
                    {format(20034235)}
                  </div>
                  <NavLink to={`/video/${item.slug}`}>
                    <Button className="text-sm h-[36px] px-4">Xem ngay</Button>
                  </NavLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full flex flex-col gap-5 items-center justify-center">
          <img src="/img/empty_video.png" alt="" className="w-[300px] opacity-50" />
          <p className="text-gray-400">Không có video nào ở đây?</p>
        </div>
      )}
    </div>
  );
};

ListVideo.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ListVideo;
