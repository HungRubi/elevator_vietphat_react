import { Button } from '../components/index';
import { NavLink } from 'react-router-dom';
import icons from '../util/icons';
import PropTypes from 'prop-types';

const {AiOutlineLeft, AiOutlineRight} = icons

const PageBar = ({ currentPage, totalPage, onPageChange }) => {
    return (
        <div className="flex items-center justify-center mt-7">
            <Button className="bg-transparent" disabled={currentPage === 1}>
                <NavLink
                onClick={() => onPageChange(currentPage - 1)} 
                className="w-[33px] h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center">
                    <AiOutlineLeft className='text-[12px]'/>
                </NavLink>
            </Button>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
                <Button key={page} className="bg-transparent">
                    <NavLink
                        onClick={() => onPageChange(page)}
                        className={`w-[33px] h-[33px] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center ${currentPage === page ? 'bg-[#2f904b] text-white' : 'text-[#393939]'}`}
                    >
                        {page}
                    </NavLink>
                </Button>
            ))}
            <Button className="bg-transparent" disabled={currentPage === totalPage}>
                <NavLink
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`w-[33px] h-[33px] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center ${currentPage === totalPage ? 'text-gray-400 cursor-not-allowed' : 'text-[#393939]'}`}
                >
                    <AiOutlineRight className='text-[12px]' />
                </NavLink>
            </Button>
            <Button className="bg-transparent">
                <NavLink 
                className="w-auto h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center px-2.5 capitalize">
                    Page {currentPage}/{totalPage}
                </NavLink>
            </Button>
        </div>
    )
}

PageBar.propTypes = {
    currentPage: PropTypes.node.isRequired,
    totalPage: PropTypes.node.isRequired,
    onPageChange: PropTypes.node.isRequired,
}
export default PageBar