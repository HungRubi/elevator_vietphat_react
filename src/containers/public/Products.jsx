import icons from '../../util/icons';
import {ListProduct, PageBar} from '../../components/index';

const {IoChevronUpSharp} = icons;

const Products = () => {
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
                <ListProduct/>
            </div>
            
        </div>
            <PageBar/>
        </div>
    )
}
export default Products