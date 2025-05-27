import icons from '../util/icons';
import { Button, LoveButton } from '../components/index';
import { NavLink } from 'react-router-dom';
import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const { FaStar, PiShoppingCartBold, GoPlus } = icons;

const ListProduct = ({ data, category }) => {
  const filteredProducts = useMemo(() => {
    return data?.find(cat => cat.category === category)?.products || [];
  }, [data, category]);

  function format(money) {
    return money.toLocaleString("vi-VN");
  }

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(item => (
          <div
            key={item._id}
            className="flex flex-col w-full min-w-0 h-full border border-[#cbd0dd] shadow bg-white rounded-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            data-aos="zoom-in"
          >
            <NavLink
              to={`/products/detail/${item.slug}`}
              className="relative w-full aspect-[4/5] block"
            >
              <img
                src={item.thumbnail_main}
                alt="ảnh sản phẩm"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-[#00000041] flex items-center justify-center">
                <GoPlus className="text-5xl sm:text-6xl text-gray-200" />
              </div>
            </NavLink>

            <div className="flex flex-col justify-between p-3 flex-grow">
              <div className="flex flex-col gap-2">
                <LoveButton />
                <NavLink
                  to={`/products/detail/${item.slug}`}
                  className="font-medium text-base md:text-lg leading-6 capitalize line-clamp-2"
                >
                  {item.name}
                </NavLink>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-[#FFBA1E]">
                  <FaStar className="text-[15px]" />
                  <span>5.0</span>
                </div>
                <span className="text-[13px] text-gray-600">Đã bán: 5k2</span>
              </div>

              <div className="mt-2.5 flex items-center justify-between">
                <h5 className="text-[22px] md:text-[25px] text-[#2f904b] flex items-center gap-1">
                  <span className="text-[14px]">₫</span>
                  {format(item.price)}
                </h5>
                <Button
                  onClick={() => handleAddToCart(item, currentUser?._id)}
                  className="h-[42px] w-[42px] md:h-[50px] md:w-[50px] flex items-center justify-center"
                >
                  <PiShoppingCartBold className="text-[20px] md:text-[27px]" />
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full">Không có sản phẩm nào.</p>
      )}
    </div>
  );
};

ListProduct.propTypes = {
  data: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};

export default memo(ListProduct);
