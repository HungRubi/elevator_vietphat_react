import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from '../../store/actions';
import icons from '../../util/icons';
import { NavLink, useParams } from "react-router-dom";

const { FaRegCalendarAlt } = icons;

const NewsDetail = () => {
  const dispatch = useDispatch();
  const { articleDetail, articleSuggest, productNewLast } = useSelector(state => state.app);
  const { slug } = useParams();

  const format = (money) => money?.toLocaleString('vi-VN');

  useEffect(() => {
    if (slug) {
      dispatch(actions.getArticleDetail(slug));
    }
  }, [dispatch, slug]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-[10%] my-8 flex flex-col lg:flex-row gap-8">
      
      {/* LEFT CONTENT */}
      <div className="w-full lg:w-[70%] bg-white shadow p-5">
        <h1 className="text-[#333] text-[22px] pb-2.5">
          {articleDetail?.subject}
        </h1>
        <hr className="my-[1rem] border-t border-t-[#0000008c] opacity-[0.25]" />
        <p className="py-2 text-[16px] leading-8 text-justify">
          {articleDetail?.content}
        </p>
        <div className="w-full overflow-hidden">
          <img
            src={articleDetail?.thumbnail}
            alt={articleDetail?.subject}
            className="w-full mt-5 object-center"
            data-aos="zoom-in-up"
          />
        </div>
        <hr className="deliver_dashed opacity-[0.4] my-5" />
        <p className="pb-2 text-[16px] leading-8 text-justify">
          Cập nhật lúc: <span className="text-blue-600">{articleDetail?.formatedDate}</span> <br />
          Người đăng: <span className="text-blue-600">{articleDetail?.author}</span>
        </p>
        <hr className="deliver_dashed opacity-[0.4] mt-2.5" />
      </div>

      {/* SIDEBAR */}
      <nav className="w-full lg:w-[30%] flex flex-col gap-10">
        {/* Tin tức mới */}
        <div className="w-full bg-white shadow">
          <div className="w-full p-2 border-l-4 border-[#2f904b]">
            <h2 className="uppercase text-lg font-medium">Tin tức mới</h2>
          </div>
          <ul className="w-full mt-2">
            {articleSuggest?.map(item => (
              <li key={item._id} className="px-2 py-4 flex gap-2.5 border-b border-gray-200">
                <NavLink to={`/news/detail/${item.slug}`} className="w-[100px] flex-none">
                  <img src={item.thumbnail} alt={item.subject} className="w-full object-cover" />
                </NavLink>
                <div className="text-sm leading-6">
                  <h5 className="font-medium capitalize text-gray-900 line-clamp-2">{item.subject}</h5>
                  <span className="text-xs text-gray-600 block">Tác giả: {item.author}</span>
                  <div className="text-xs text-gray-600 flex gap-1.5 mt-1">
                    <FaRegCalendarAlt className="text-base" />
                    <span className="leading-4">Ngày đăng: {item.formatedDate}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sản phẩm nổi bật */}
        <div className="w-full bg-white shadow">
          <div className="w-full p-2 border-l-4 border-[#2f904b]">
            <h2 className="uppercase text-lg font-medium">Sản phẩm nổi bật</h2>
          </div>
          <ul className="w-full mt-2">
            {productNewLast?.map(item => (
              <li key={item._id} className="px-2 py-4 flex gap-2.5 border-b border-gray-200">
                <NavLink to={`/products/detail/${item.slug}`} className="w-[100px] flex-none">
                  <img src={item.thumbnail_main} alt={item.name} className="w-full object-cover" />
                </NavLink>
                <div className="text-sm leading-6">
                  <h5 className="font-medium capitalize text-gray-900 line-clamp-2">{item.name}</h5>
                  <span className="text-xs text-gray-600 block">
                    đ <span className="ml-1 text-base text-main font-medium">{format(item.price)}</span>
                  </span>
                  <div className="text-xs text-gray-600 flex gap-1.5 mt-1">
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

export default NewsDetail;
