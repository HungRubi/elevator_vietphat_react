import icons from '../../util/icons';
import {ProductsAll, PageBar} from '../../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions';

const {IoChevronUpSharp} = icons;


const Products = () => {
    const dispatch = useDispatch();
    const { totalPage, products } = useSelector(state => state.app);

    
    useEffect(() => {
        dispatch(actions.getProducts());
    }, []);

    const [current, setCurrent] = useState(1);
    const limit = 12;
    const lastProduct = current * limit;
    const firstProduct = lastProduct - limit;
    
    const currentProduct = products.slice(firstProduct, lastProduct);

    return (
        <div className="w-full pt-8 mb-15">
            <div className="w-full px-[10%] flex gap-8">
            <div className="w-[230px] flex-none">
                <div className="py-1.5 pl-1.5 uppercase text-white bg-[#2f904b] font-[600]">categories</div>
                <ul className="w-full pl-2.5">
                    <li className="w-full border-b border-b-[#ddd] py-1.5 flex items-center justify-between">
                        <span>COP/LOP</span>
                        <IoChevronUpSharp className='cursor-pointer'/>
                    </li>
                    <li className="w-full border-b border-b-[#ddd] py-1.5 flex items-center justify-between">
                        <span>Linh kiện điện</span>
                        <IoChevronUpSharp className='cursor-pointer'/>
                    </li>
                    <li className="w-full border-b border-b-[#ddd] py-1.5 flex items-center justify-between">
                        <span>Linh kiện inox</span>
                        <IoChevronUpSharp className='cursor-pointer'/>
                    </li>
                    <li className="w-full border-b border-b-[#ddd] py-1.5 flex items-center justify-between">
                        <span>Linh kiện thép</span>
                        <IoChevronUpSharp className='cursor-pointer'/>
                    </li>
                    <li className="w-full border-b border-b-[#ddd] py-1.5 flex items-center justify-between">
                        <span>Tay vịn thang máy</span>
                        <IoChevronUpSharp className='cursor-pointer'/>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <ProductsAll data={currentProduct} />
            </div>
            
        </div>
            <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent} />
        </div>
    )
}
export default Products                                 