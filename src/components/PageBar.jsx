import { Button } from '../components/index';
import { NavLink } from 'react-router-dom';
import icons from '../util/icons';
import PropTypes from 'prop-types';

const {AiOutlineLeft, AiOutlineRight} = icons

const PageBar = ({ currentPage, totalPage, onPageChange, className }) => {
    // Tính toán các trang sẽ hiển thị
    const getVisiblePages = () => {
        const maxVisible = 3;
        let startPage = 1;
        let endPage = Math.min(totalPage, maxVisible);

        if (totalPage > maxVisible) {
            // Tính toán startPage dựa trên currentPage
            const middle = Math.floor(maxVisible / 2);
            
            if (currentPage <= middle) {
                // Nếu currentPage ở đầu
                startPage = 1;
                endPage = maxVisible;
            } else if (currentPage >= totalPage - middle) {
                // Nếu currentPage ở cuối
                startPage = totalPage - maxVisible + 1;
                endPage = totalPage;
            } else {
                // Nếu currentPage ở giữa
                startPage = currentPage - middle;
                endPage = currentPage + middle;
            }
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const visiblePages = getVisiblePages();

    return (
        <div className={`flex items-center justify-center mt-7 gap-2 ${className}`}>
            <Button className={`bg-transparent !px-0 !py-0 ${currentPage === 1 ? "hidden" : ""}`}>
                <NavLink
                    onClick={() => onPageChange(currentPage - 1)} 
                    className="w-[33px] h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center">
                    <AiOutlineLeft className='text-[12px]'/>
                </NavLink>
            </Button>

            {/* Hiển thị trang đầu và dấu ... nếu cần */}
            {visiblePages[0] > 1 && (
                <>
                    <Button className="bg-transparent !px-0 !py-0">
                        <NavLink
                            onClick={() => onPageChange(1)}
                            className="w-[33px] h-[33px] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center text-[#393939]"
                        >
                            1
                        </NavLink>
                    </Button>
                    {visiblePages[0] > 2 && (
                        <span className="px-2 text-[#393939]">...</span>
                    )}
                </>
            )}

            {/* Hiển thị các trang visible */}
            {visiblePages.map((page) => (
                <Button key={page} className="bg-transparent !px-0 !py-0">
                    <NavLink
                        onClick={() => onPageChange(page)}
                        className={`w-[33px] h-[33px] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center ${
                            currentPage === page ? 'bg-[#2f904b] text-white' : 'text-[#393939]'
                        }`}
                    >
                        {page}
                    </NavLink>
                </Button>
            ))}

            {/* Hiển thị dấu ... và trang cuối nếu cần */}
            {visiblePages[visiblePages.length - 1] < totalPage && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPage - 1 && (
                        <span className="px-2 text-[#393939]">...</span>
                    )}
                    <Button className="bg-transparent !px-0 !py-0">
                        <NavLink
                            onClick={() => onPageChange(totalPage)}
                            className="w-[33px] h-[33px] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center text-[#393939]"
                        >
                            {totalPage}
                        </NavLink>
                    </Button>
                </>
            )}

            <Button className={`bg-transparent !px-0 !py-0 ${currentPage === totalPage ? "hidden" : ""}`}>
                <NavLink
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`w-[33px] h-[33px] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center ${
                        currentPage === totalPage ? 'text-gray-400 cursor-not-allowed' : 'text-[#393939]'
                    }`}
                >
                    <AiOutlineRight className='text-[12px]' />
                </NavLink>
            </Button>

            <Button className="bg-transparent !px-0 !py-0">
                <NavLink 
                    className="w-auto h-[33px] text-[#393939] rounded-[5px] border border-[#d2d2d2] flex items-center justify-center px-2.5 capitalize">
                    Page {currentPage}/{totalPage}
                </NavLink>
            </Button>
        </div>
    )
}

PageBar.propTypes = {
    className: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default PageBar