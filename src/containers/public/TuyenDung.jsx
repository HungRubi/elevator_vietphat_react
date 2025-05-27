import icons from "../../util/icons";
import { NavLink } from "react-router-dom";
import { formatMoney } from "../../util/formatMoney";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from '../../store/actions';
const { FaRegCalendarAlt } = icons;

const TuyenDung = () => {
    const dispatch = useDispatch();
    const slug = "bang-dieu-khien-cabin-cop-mat-kinh-cuong-luc-tich-hop-van-tay-va-sac-dien-thoai-thong-minh";

    useEffect(() => {
        dispatch(actions.getVideoDetail(slug));
    }, [dispatch, slug]);

    const { productNewLast, articleSuggest } = useSelector(state => state.app);

    return (
        <div className="w-full px-[5%] my-10 flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-[70%]">
                <h2 className="capitalize text-lg text-[#4ca52f]">tuyển dụng</h2>
                <h1 className="capitalize text-2xl sm:text-3xl md:text-4xl text-gray-700 mt-5 font-[600]">tuyển dụng</h1>
                <div className="mt-10 w-full">
                    <p>Do nhu cầu phát triển và mở rộng quy mô, Công ty thang máy Hybrid thông báo về việc cần tuyển dụng vị trí sau:</p>
                    <ol className="ml-4">
                        <li className="mt-1.5">1. Nhân viên sản xuất: <span className="font-[600]">05 người</span></li>
                        <li className="mt-1.5">2. Kinh nghiệm: <span className="font-[600]">không yêu cầu kinh nghiệm</span></li>
                        <li className="mt-1.5">3. Lương cơ bản + % doanh số + lương + thưởng: <span className="font-[600]">(trên 15.000.000đ)</span></li>
                    </ol>

                    <h3 className="mt-5 text-2xl text-gray-700 font-[600]">Mô tả công việc</h3>
                    <ol className="ml-4 list-disc mt-2">
                        <li>Tham gia trực tiếp vào quy trình sản xuất, lắp ráp các linh kiện và bộ phận thang máy theo bản vẽ kỹ thuật và hướng dẫn.</li>
                        <li>Vận hành máy móc, thiết bị phục vụ sản xuất (máy cắt, máy hàn, máy uốn…).</li>
                        <li>Đảm bảo đúng tiến độ và chất lượng theo yêu cầu sản xuất.</li>
                        <li>Kiểm tra, bảo trì định kỳ các công cụ, thiết bị trong dây chuyền sản xuất.</li>
                        <li>Phối hợp với các bộ phận liên quan để xử lý sự cố trong quá trình sản xuất.</li>
                        <li>Thực hiện các công việc khác theo phân công của cấp trên.</li>
                    </ol>

                    <h3 className="mt-5 text-2xl text-gray-700 font-[600]">Yêu cầu ứng viên</h3>
                    <ol className="ml-4 list-disc mt-2">
                        <li>Nam, độ tuổi từ 20 – 40, có sức khỏe tốt. Am hiểu lĩnh vực liên quan đến xây dựng, thang máy là một lợi thế.</li>
                        <li>Có thể đọc hiểu bản vẽ kỹ thuật (ưu tiên).</li>
                        <li>Chịu khó, cẩn thận, có tinh thần trách nhiệm trong công việc.</li>
                        <li>Sẵn sàng tăng ca khi có yêu cầu.</li>
                    </ol>

                    <h3 className="mt-5 text-2xl text-gray-700 font-[600]">Quyền lợi</h3>
                    <ol className="ml-4 list-disc mt-2">
                        <li>Thu nhập: [15.000.000đ - 20.000.000đ].</li>
                        <li>Thưởng hoa hồng theo doanh số sản xuất.</li>
                        <li>Được đào tạo nếu chưa có kinh nghiệm.</li>
                        <li>Hưởng đầy đủ các chế độ BHXH, BHYT, BHTN theo quy định nhà nước.</li>
                    </ol>

                    <h3 className="mt-5 text-2xl text-gray-700 font-[600]">Thời gian làm việc</h3>
                    <ol className="ml-4 list-disc mt-2">
                        <li>Từ thứ 2 đến thứ 7 (giờ hành chính hoặc theo ca).</li>
                    </ol>

                    <h3 className="mt-5 text-2xl text-gray-700 font-[600]">Nơi nhận hồ sơ</h3>
                    <ol className="ml-4 list-disc mt-2">
                        <li>Gửi hồ sơ qua email: <span className="text-blue-600 cursor-pointer">infor@phukienthangmay.vn</span></li>
                        <li>Hoặc gửi hồ sơ đến: <span className="text-blue-600 cursor-pointer ml-1">Km8 + 93 đường 5 mới, xã Nam Sơn, huyện An Dương, Hải Phòng, Việt Nam</span></li>
                    </ol>
                </div>
            </div>

            <nav className="w-full lg:w-[25%] mt-10 lg:mt-0">
                <div className="w-full bg-white shadow">
                    <div className="w-full p-2 border-l-5 border-[#2f904b]">
                        <h2 className="uppercase text-lg font-medium">tin tức mới</h2>
                    </div>
                    <ul className="w-full mt-2">
                        {articleSuggest?.map(item => (
                            <li key={item._id} className="px-2 py-4 flex gap-2.5 order_items border-b border-gray-200">
                                <NavLink to={`/news/detail/${item.slug}`} className="w-[100px] flex-none">
                                    <img src={item.thumbnail} alt={item.subject} className="w-full object-cover" />
                                </NavLink>
                                <div className="text-base leading-7">
                                    <h5 className="font-medium capitalize text-gray-900 line-clamp-2">{item.subject}</h5>
                                    <span className="text-sm text-gray-600">Tác giả: {item.author}</span>
                                    <div className="text-sm text-gray-600 flex gap-1.5">
                                        <FaRegCalendarAlt className="text-base" />
                                        <span className="leading-4">Ngày đăng: {item.formatedDate}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full bg-white shadow mt-10">
                    <div className="w-full p-2 border-l-5 border-[#2f904b]">
                        <h2 className="uppercase text-lg font-medium">Sản phẩm nổi bật</h2>
                    </div>
                    <ul className="w-full mt-2">
                        {productNewLast?.map(item => (
                            <li key={item._id} className="px-2 py-4 flex gap-2.5 order_items border-b border-gray-200">
                                <NavLink to={`/products/detail/${item.slug}`} className="w-[100px] flex-none">
                                    <img src={item.thumbnail_main} alt={item.name} className="w-full object-cover" />
                                </NavLink>
                                <div className="text-base leading-7">
                                    <h5 className="font-medium capitalize text-gray-900 line-clamp-2">{item.name}</h5>
                                    <span className="text-sm text-gray-600">
                                        đ <span className="ml-1 text-lg text-main font-medium">{formatMoney(item.price)}</span>
                                    </span>
                                    <div className="text-sm text-gray-600 flex gap-1.5">
                                        <FaRegCalendarAlt className="text-base" />
                                        <span className="leading-4">Ngày đăng: {item.formatedDate}</span>
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

export default TuyenDung;
