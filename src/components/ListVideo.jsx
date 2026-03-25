import { NavLink } from 'react-router-dom';
import icons from '../util/icons';
import PropTypes from 'prop-types';

const { FaRegEye, FaCirclePlay } = icons;

const ListVideo = ({ data }) => {
    const formatViews = (number) => number?.toLocaleString('vi-VN');

    return (
        <div className="mt-8 w-full">
            <ul className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data?.length > 0 ? (
                    data.map((item) => (
                        <li
                            key={item._id}
                            data-aos="fade-up"
                            className="group flex flex-col bg-white transition-colors duration-200 hover:bg-slate-50/80"
                        >
                            <NavLink
                                to={`/video/${item.slug}`}
                                title={item.name}
                                className="relative block aspect-video overflow-hidden bg-slate-900"
                            >
                                <img
                                    src={item.thumbnail}
                                    data-aos="zoom-in"
                                    alt={item.name || 'Video'}
                                    className="h-full w-full object-cover opacity-95 transition duration-500 ease-out group-hover:scale-[1.02] group-hover:opacity-100"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2">
                                    <span className="line-clamp-2 text-left text-sm font-semibold leading-snug text-white drop-shadow-sm">
                                        {item.name}
                                    </span>
                                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white text-[#2f904b] shadow-md transition group-hover:bg-white">
                                        <FaCirclePlay className="text-xl" />
                                    </span>
                                </div>
                            </NavLink>
                            <div className="flex flex-col gap-2 border-t border-slate-100 px-3 py-3 sm:px-4">
                                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                                    <time className="font-medium text-slate-500">{item.format}</time>
                                    <span className="flex items-center gap-1.5 tabular-nums text-slate-400">
                                        <FaRegEye className="text-sm" aria-hidden />
                                        <span>{formatViews(20034235)}</span>
                                    </span>
                                </div>
                                <NavLink
                                    to={`/video/${item.slug}`}
                                    className="text-xs font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-[#2f904b] hover:decoration-[#2f904b]/40"
                                >
                                    Xem video →
                                </NavLink>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="col-span-full flex flex-col items-center justify-center gap-5 bg-white py-16">
                        <img src="/img/empty_video.png" alt="" className="w-[300px] max-w-full opacity-50" />
                        <p className="text-slate-400">Không có video nào ở đây.</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

ListVideo.propTypes = {
    data: PropTypes.array,
};

export default ListVideo;
