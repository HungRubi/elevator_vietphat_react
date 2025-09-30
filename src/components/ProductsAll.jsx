import icons from '../util/icons';
import {Button, LoveButton} from './index'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'
const {FaStar, PiShoppingCartBold, GoPlus} = icons

const ProductsAll = ({data}) => {
    function format(money) {
        return money.toLocaleString("vi-VN");
    }
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleAddToCart = (product,userId) => {
            const cartData = {
                items: [
                    {
                        productId: product._id,
                        quantity: 1,
                        price: product.price
                    }
                ]
            };
            dispatch(actions.updateCart(cartData, userId));
        }
    return (
        <div className="flex flex-wrap gap-5">
            {data.length > 0 ? (
                data.map((item => (
                    <div key={item._id} className="border border-[#cbd0dd] item_product shadow max-[500px]:!w-full" data-aos="zoom-in">
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
                                <NavLink to={`/products/detail/${item.slug}`} className={"font-medium text-lg capitalize"}>
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
                                <h5 className="text-[25px] text-[#2f904b] flex items-center gap-1"><span className='text-lg font-medium'>₫</span>{format(item.price)}</h5>
                                <Button onClick={() => handleAddToCart(item, currentUser?._id)}
                                className="h-[50px] w-[50px] flex items-center justify-center">
                                    <PiShoppingCartBold className='size-[27px]'/>
                                </Button>
                            </div>
                        </div>
                    </div>
                )))
            ) : (
                <div className="w-full flex items-center justify-center flex-col gap-5">
                    <img src="/img/products_empty.png" alt="" className='opacity-60 w-[400px]'/>
                    <p className='text-gray-400'>không có sản phẩm nào ở đây cả ^^</p>
                </div>
            )}
            
        </div>
    )
}

ProductsAll.propTypes = {
    data: PropTypes.node.isRequired,
};

export default (ProductsAll)