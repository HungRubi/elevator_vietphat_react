import icons from '../util/icons';
import {Button, LoveButton} from '../components/index'
import { NavLink } from 'react-router-dom';
import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'

const {FaStar, PiShoppingCartBold, GoPlus} = icons

const ListProduct = ({data, category}) => {
    const filteredProducts = useMemo(() => {
        return data?.find(cat => cat.category === category)?.products || [];
    }, [data, category]);
    function format(money) {
        return money.toLocaleString("vi-VN");
    }
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleAddToCart = (product,userId) => {
        const cartData = {
            productId: product._id,
            quantity: 1,
        };
        dispatch(actions.updateCart(cartData, userId));
    }

    return (
        <div className="flex flex-wrap gap-5">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((item => (
                    <div key={item._id} className="border border-[#cbd0dd] item_product shadow" data-aos="zoom-in">
                        <NavLink className="w-full relative overflow-hidden inline-block blur_img" to={`/products/detail/${item.slug}`}>
                            <img src={item.thumbnail_main} alt="ảnh sản phẩm" data-aos="zoom-in"
                            className="w-full border-b border-b-[#cbd0dd]"/>
                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#00000041] flex items-center justify-center flur_bg">
                                <GoPlus className="text-7xl text-gray-200"/>
                            </div>
                        </NavLink>
                        <div className="py-2.5 px-3">
                            <div className="text-4 line-clamp-2">
                                <LoveButton/>
                                <NavLink to={`/products/detail/${item.slug}`} 
                                className={"font-medium text-lg leading-7 capitalize"}>
                                    {item.name}
                                </NavLink>
                            </div>
                            <div className=" mt-2.5 flex items-center justify-between">
                                <div className="flex gap-1 items-center justify-start">
                                    <FaStar className='text-[15px] text-[#FFBA1E]'/>
                                    <span className='text-[15px]'>5.0</span> 
                                </div>
                                <div className="text-[13px]">Đã bán: 5k2</div>
                            </div>
                            <div className=" mt-2.5 flex items-center justify-between">
                                <h5 className="text-[25px] text-[#2f904b] flex items-center gap-1"><span className='text-[15px]'>₫</span>{format(item.price)}</h5>
                                <Button onClick={() => handleAddToCart(item, currentUser?._id)}
                                className="h-[50px] w-[50px] flex items-center justify-center">
                                    <PiShoppingCartBold className='size-[27px]'/>
                                </Button>
                            </div>
                        </div>
                    </div>
                )))
            ) : (
                <p className="text-gray-500 col-span-3">Không có sản phẩm nào.</p>
            )}
            
        </div>
    )
}

ListProduct.propTypes = {
    data: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired
};


export default memo(ListProduct)