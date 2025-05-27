import icons from '../util/icons';
import { Button, LoveButton } from './index';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const { FaStar, PiShoppingCartBold, GoPlus } = icons;

const ProductsAll = ({ data }) => {
  const format = (money) => money.toLocaleString('vi-VN');

  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleAddToCart = (product, userId) => {
    const cartData = {
      productId: product._id,
      quantity: 1,
    };
    dispatch(actions.updateCart(cartData, userId));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.length > 0 ? (
        data.map(item => (
          <div
            key={item._id}
            className="w-full border border-[#cbd0dd] shadow bg-white"
            data-aos="zoom-in"
          >
            <NavLink
              className="w-full relative overflow-hidden inline-block"
              to={`/products/detail/${item.slug}`}
            >
              <img
                src={item.thumbnail_main}
                alt="ảnh sản phẩm"
                className="w-full border-b border-b-[#cbd0dd]"
              />
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#00000041] flex items-center justify-center">
                <GoPlus className="text-7xl text-gray-200" />
              </div>
            </NavLink>
            <div className="py-2.5 px-3">
              <div className="text-4 line-clamp-2 flex flex-col gap-1">
                <LoveButton />
                <NavLink
                  to={`/products/detail/${item.slug}`}
                  className="font-medium text-base md:text-lg capitalize"
                >
                  {item.name}
                </NavLink>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-sm">
                <div className="flex gap-1 items-center">
                  <FaStar className="text-[#FFBA1E]" />
                  <span>5.0</span>
                </div>
                <div>Đã bán: 5k2</div>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <h5 className="text-xl text-[#2f904b] flex items-center gap-1">
                  <span className="text-base font-medium">₫</span>
                  {format(item.price)}
                </h5>
                <Button
                  onClick={() => handleAddToCart(item, currentUser?._id)}
                  className="h-[45px] w-[45px] flex items-center justify-center"
                >
                  <PiShoppingCartBold className="text-xl" />
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full w-full flex items-center justify-center flex-col gap-5">
          <img
            src="/img/products_empty.png"
            alt="empty"
            className="opacity-60 w-[300px]"
          />
          <p className="text-gray-400">không có sản phẩm nào ở đây cả ^^</p>
        </div>
      )}
    </div>
  );
};

ProductsAll.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ProductsAll;
