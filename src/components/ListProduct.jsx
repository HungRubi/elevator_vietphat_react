import icons from '../util/icons';
import {Button, LoveButton} from '../components/index'
import { NavLink } from 'react-router-dom';

const {FaStar, PiShoppingCartBold} = icons

const ListProduct = () => {
    return (
        <div className="flex flex-wrap gap-5">
            <div className="border border-[#cbd0dd] item_product">
                <NavLink className="w-full" to={"/products/detail/:slug"}>
                    <img src="/img/products/1.png" alt="ảnh sản phẩm" className="w-full border-b border-b-[#cbd0dd]"/>
                </NavLink>
                <div className="py-2.5 px-3">
                    <div className="text-4 line-clamp-2">
                        <LoveButton/>
                        <NavLink to={"/products/detail/:slug"}>
                            Hệ thống mở cửa tự đông ADA, 2 chiều, có thể điều chỉnh tốc độ
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
                        <h5 className="text-[25px] text-[#2f904b] flex items-center gap-1"><span className='text-[15px]'>₫</span> 3.600.000</h5>
                        <Button className="h-[50px] w-[50px] flex items-center justify-center">
                            <PiShoppingCartBold className='size-[27px]'/>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border border-[#cbd0dd] item_product">
                <NavLink className="w-full" to={"/products/detail/:slug"}>
                    <img src="/img/products/1.png" alt="ảnh sản phẩm" className="w-full border-b border-b-[#cbd0dd]"/>
                </NavLink>
                <div className="py-2.5 px-3">
                    <div className="text-4 line-clamp-2">
                        <LoveButton/>
                        <NavLink to={"/products/detail/:slug"}>
                            Hệ thống mở cửa tự đông ADA, 2 chiều, có thể điều chỉnh tốc độ
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
                        <h5 className="text-[25px] text-[#2f904b] flex items-center gap-1"><span className='text-[15px]'>₫</span> 3.600.000</h5>
                        <Button className="h-[50px] w-[50px] flex items-center justify-center">
                            <PiShoppingCartBold className='size-[27px]'/>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border border-[#cbd0dd] item_product">
                <NavLink className="w-full" to={"/products/detail/:slug"}>
                    <img src="/img/products/1.png" alt="ảnh sản phẩm" className="w-full border-b border-b-[#cbd0dd]"/>
                </NavLink>
                <div className="py-2.5 px-3">
                    <div className="text-4 line-clamp-2">
                        <LoveButton/>
                        <NavLink to={"/products/detail/:slug"}>
                            Hệ thống mở cửa tự đông ADA, 2 chiều, có thể điều chỉnh tốc độ
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
                        <h5 className="text-[25px] text-[#2f904b] flex items-center gap-1"><span className='text-[15px]'>₫</span> 3.600.000</h5>
                        <Button className="h-[50px] w-[50px] flex items-center justify-center">
                            <PiShoppingCartBold className='size-[27px]'/>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border border-[#cbd0dd] item_product">
                <NavLink className="w-full" to={"/products/detail/:slug"}>
                    <img src="/img/products/1.png" alt="ảnh sản phẩm" className="w-full border-b border-b-[#cbd0dd]"/>
                </NavLink>
                <div className="py-2.5 px-3">
                    <div className="text-4 line-clamp-2">
                        <LoveButton/>
                        <NavLink to={"/products/detail/:slug"}>
                            Hệ thống mở cửa tự đông ADA, 2 chiều, có thể điều chỉnh tốc độ
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
                        <h5 className="text-[25px] text-[#2f904b] flex items-center gap-1"><span className='text-[15px]'>₫</span> 3.600.000</h5>
                        <Button className="h-[50px] w-[50px] flex items-center justify-center">
                            <PiShoppingCartBold className='size-[27px]'/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListProduct