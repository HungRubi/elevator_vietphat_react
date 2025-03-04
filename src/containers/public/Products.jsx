import icons from '../../util/icons';
import {ProductsAll, PageBar} from '../../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as actions from '../../store/actions'
import {setCurrentPage} from '../../store/actions/products'

const {IoChevronUpSharp} = icons;


const Products = () => {
    const dispatch = useDispatch();
    const { currentPage, totalPage, productCache } = useSelector(state => state.app);

    useEffect(() => {
        if (!productCache[currentPage]) {  // Kiểm tra nếu trang chưa có dữ liệu, mới gọi API
            dispatch(actions.getProducts(currentPage));
        }
    }, [dispatch, currentPage, productCache]);

    // Hàm thay đổi trang
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPage) {
            dispatch(setCurrentPage(newPage)); // Cập nhật Redux trước
    
            if (!productCache[newPage]) {  // Chỉ gọi API nếu trang chưa có trong cache
                dispatch(actions.getProducts(newPage));
            }
    
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên sau khi Redux đã cập nhật
            }, 100);
        }
    };


    return (
        <div className="w-full pt-8">
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
                <ProductsAll data={productCache[currentPage] || []} />
            </div>
            
        </div>
            <PageBar currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
        </div>
    )
}
export default Products