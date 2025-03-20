import icons from '../util/icons';
import {Button, LoveButton} from './index'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const {FaStar, PiShoppingCartBold} = icons

const ProductsAll = ({data}) => {
    function format(money) {
        return money.toLocaleString("vi-VN");
    }
    return (
        <div className="flex flex-wrap gap-5">
            {data.length > 0 ? (
                data.map((item => (
                    <>
                        <div key={item._id} className="border border-[#cbd0dd] item_product">
                            <NavLink className="w-full" to={`/products/detail/${item.slug}`}>
                                <img src={item.thumbnail_main} alt="ảnh sản phẩm" className="w-full border-b border-b-[#cbd0dd]"/>
                            </NavLink>
                            <div className="py-2.5 px-3">
                                <div className="text-4 line-clamp-2">
                                    <LoveButton/>
                                    <NavLink to={`/products/detail/${item.slug}`}>
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
                                    <Button className="h-[50px] w-[50px] flex items-center justify-center">
                                        <PiShoppingCartBold className='size-[27px]'/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )))
            ) : (
                <p className="text-gray-500 col-span-3">Không có sản phẩm nào.</p>
            )}
            
        </div>
    )
}

ProductsAll.propTypes = {
    data: PropTypes.node.isRequired,
};

export default (ProductsAll)