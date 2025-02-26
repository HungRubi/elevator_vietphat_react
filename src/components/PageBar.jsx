import { Button } from '../components/index';
import { NavLink } from 'react-router-dom';
import icons from '../util/icons';

const {AiOutlineLeft, AiOutlineRight} = icons

const PageBar = () => {
    return (
        <div className="flex items-center justify-center mt-7">
            <Button className="bg-transparent">
                <NavLink 
                className="w-[33px] h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center">
                    <AiOutlineLeft className='text-[12px]'/>
                </NavLink>
            </Button>
            <Button className="bg-transparent">
                <NavLink 
                className="w-[33px] h-[33px] text-white rounded-[5px] border border-[#d2d2d2] flex items-center justify-center bg-[#2f904b]">
                    1
                </NavLink>
            </Button>
            <Button className="bg-transparent">
                <NavLink 
                className="w-[33px] h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center">
                    2
                </NavLink>
            </Button>
            <Button className="bg-transparent">
                <NavLink 
                className="w-[33px] h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center">
                    3
                </NavLink>
            </Button>
            <Button className="bg-transparent">
                <NavLink 
                className="w-[33px] h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center">
                    <AiOutlineRight className='text-[12px]'/>
                </NavLink>
            </Button>
            <Button className="bg-transparent">
                <NavLink 
                className="w-auto h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center px-2.5 capitalize">
                    Page 1/3
                </NavLink>
            </Button>
        </div>
    )
}
export default PageBar